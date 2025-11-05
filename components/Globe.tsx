import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { Tournament } from '../types';

// Props
interface GlobeProps {
  pinLocation: Tournament | null | undefined;
  selectedMonth: number | null;
  tournaments: Tournament[];
  onTournamentSelect: (tournament: Tournament | null) => void;
}

// D3 simulation node type
interface TournamentNode extends Tournament, d3.SimulationNodeDatum {}

const getPointCategoryColor = (points: number): string => {
  if (points === 2000) return '#a855f7'; // purple-500
  if (points === 1500) return '#6366f1'; // indigo-500
  if (points === 1000) return '#3b82f6'; // blue-500
  if (points === 500) return '#f59e0b';  // amber-500
  return '#22c55e'; // green-500
};

const formatDateRange = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const endMonth = endDate.toLocaleString('default', { month: 'short' });

  const startDay = startDate.getUTCDate();
  const endDay = endDate.getUTCDate();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
};

const Globe: React.FC<GlobeProps> = ({ pinLocation, selectedMonth, tournaments, onTournamentSelect }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const currentRotationRef = useRef<[number, number]>([0, -10]);
  const initialScaleRef = useRef<number>(0);
  const lastTransformRef = useRef(d3.zoomIdentity);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [activeTournament, setActiveTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    let projection = projectionRef.current;

    // Helper created in outer scope of effect once path exists (after projection is defined)
    let path: d3.GeoPath<any, d3.GeoPermissibleObjects>;

    const cleanup = () => {
      if (resizeObserverRef.current && svgRef.current) {
        resizeObserverRef.current.unobserve(svgRef.current);
      }
    };

    if (!projection) {
      projection = d3.geoOrthographic().clipAngle(90).rotate(currentRotationRef.current);
      projectionRef.current = projection;

      svg.selectAll('*').remove(); // Clear on first setup

      const { width, height } = (svg.node() as SVGSVGElement).getBoundingClientRect();
      const initialScale = Math.min(width, height) / 2 - 10;
      projection.scale(initialScale).translate([width / 2, height / 2]);
      initialScaleRef.current = initialScale;

      path = d3.geoPath().projection(projection);

      // Initial elements with immediate 'd' so they render before interaction
      svg.append('path')
        .datum({ type: 'Sphere' })
        .attr('class', 'sphere')
        .attr('fill', '#1F2937')
        .attr('stroke', '#4B5563')
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('d', path as any)
        .on('click', () => {
          onTournamentSelect(null);
          setActiveTournament(null);
        });

      svg.append('path')
        .datum(d3.geoGraticule10())
        .attr('class', 'graticule')
        .attr('fill', 'none')
        .attr('stroke', '#374151')
        .attr('stroke-width', 0.5)
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('d', path as any);

      // Initial render function
      const initialRender = () => {
        svg.selectAll('path').attr('d', path as any);
        if ((svg.node() as any).drawPins) (svg.node() as any).drawPins();
      };

      // Load land and re-render when it arrives
      d3.json('https://unpkg.com/world-atlas@2/countries-110m.json')
        .then((world: any) => {
          const land = topojson.feature(world, world.objects.countries);
          svg.insert('path', '.graticule')
            .datum(land as any)
            .attr('class', 'land')
            .attr('fill', '#374151')
            .attr('stroke', '#1F2937')
            .attr('vector-effect', 'non-scaling-stroke')
            .attr('d', path as any);

          initialRender(); // ensure countries appear immediately after load
        })
        .catch(() => {
          // Fail silently; sphere + graticule still render
        });

      // Resize handling
      const ro = new ResizeObserver(entries => {
        if (!entries || entries.length === 0 || !projection) return;
        const { width, height } = entries[0].contentRect;
        const newInitialScale = Math.min(width, height) / 2 - 10;
        initialScaleRef.current = newInitialScale;
        projection.scale(newInitialScale * lastTransformRef.current.k).translate([width / 2, height / 2]);
        svg.selectAll('path').attr('d', path as any);
        if ((svg.node() as any).drawPins) (svg.node() as any).drawPins();
      });
      resizeObserverRef.current = ro;
      ro.observe(svgRef.current);

      // Zoom + rotate handling
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 10])
        .on('start', (event) => {
          lastTransformRef.current = event.transform;
        })
        .on('zoom', (event) => {
          if (!projection) return;
          const { transform } = event;
          const previousTransform = lastTransformRef.current;
          lastTransformRef.current = transform;

          const currentScale = transform.k;
          projection.scale(initialScaleRef.current * currentScale);

          // Pan (drag) vs zoom behavior
          if (currentScale === previousTransform.k) {
            const dx = transform.x - previousTransform.x;
            const dy = transform.y - previousTransform.y;

            if (dx !== 0 || dy !== 0) {
              const rotate = projection.rotate();
              const sensitivity = 75 / projection.scale();
              const newRotation: [number, number] = [rotate[0] + dx * sensitivity, rotate[1] - dy * sensitivity];
              projection.rotate(newRotation);
              currentRotationRef.current = newRotation;
            }
          } else {
            // Keep cursor point anchored during zoom
            const pointer = d3.pointer(event, svg.node());
            const geoPointBeforeZoom = projection.invert(pointer);

            projection.scale(initialScaleRef.current * currentScale);

            const screenPointAfterZoom = projection(geoPointBeforeZoom);

            const dx = pointer[0] - (screenPointAfterZoom?.[0] ?? 0);
            const dy = pointer[1] - (screenPointAfterZoom?.[1] ?? 0);

            if (dx !== 0 || dy !== 0) {
              const rotate = projection.rotate();
              const sensitivity = 75 / projection.scale();
              const newRotation: [number, number] = [rotate[0] + dx * sensitivity, rotate[1] - dy * sensitivity];
              projection.rotate(newRotation);
              currentRotationRef.current = newRotation;
            }
          }

          svg.selectAll('path').attr('d', path as any);
          if ((svg.node() as any).drawPins) (svg.node() as any).drawPins();
        });

      svg.call(zoom as any);

      // One-time initial render after stage is built
      initialRender();
    }

    // From here on, we know projection exists
    const finalProjection = projectionRef.current!;
    path = d3.geoPath().projection(finalProjection);

    // Pin drawing
    const drawPins = () => {
      svg.selectAll('.pin-group, .tooltip-group').remove();

      const tournamentsToShow = selectedMonth !== null
        ? tournaments.filter(t => new Date(t.startDate).getUTCMonth() === selectedMonth)
        : tournaments;

      const [rotLon, rotLat] = finalProjection.rotate() as [number, number];
      const visibleTournaments = tournamentsToShow.filter(t => {
        const coords: [number, number] = [t.location.lon, t.location.lat];
        return d3.geoDistance(coords, [-rotLon, -rotLat]) <= Math.PI / 2;
      });

      const nodes: TournamentNode[] = visibleTournaments.map(t => {
        const proj = finalProjection([t.location.lon, t.location.lat]) as [number, number];
        const [x, y] = proj ?? [NaN, NaN];
        return { ...t, fx: x, fy: y };
      }).filter(n => Number.isFinite(n.fx!) && Number.isFinite(n.fy!));

      if (nodes.length > 0) {
        d3.forceSimulation(nodes)
          .force('collide', d3.forceCollide().radius(7).strength(0.8))
          .force('x', d3.forceX<TournamentNode>(d => d.fx!).strength(0.1))
          .force('y', d3.forceY<TournamentNode>(d => d.fy!).strength(0.1))
          .tick(120)
          .stop();
      }

      const pinGroups = svg.selectAll<SVGGElement, TournamentNode>('.pin-group')
        .data(nodes, d => (d as any).id)
        .join('g')
        .attr('class', 'pin-group')
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .style('cursor', 'pointer')
        .on('click', (event, d) => {
          event.stopPropagation();
          onTournamentSelect(d);
          setActiveTournament(d);
        });

      pinGroups.append('circle')
        .attr('r', 5)
        .attr('fill', d => getPointCategoryColor(d.points))
        .attr('stroke', '#111827')
        .attr('stroke-width', 1);

      if (activeTournament) {
        const activeNode = nodes.find(n => n.id === activeTournament.id);
        if (activeNode) {
          const final = activeTournament.draw.find(m => m.round === 1);
          const tooltipGroup = svg.append('g')
            .attr('class', 'tooltip-group')
            .attr('transform', `translate(${activeNode.x}, ${activeNode.y})`)
            .style('pointer-events', 'none');

          tooltipGroup.append('foreignObject')
            .attr('x', 10)
            .attr('y', -110)
            .attr('width', 250)
            .attr('height', 200)
            .append('xhtml:body')
            .style('font', '12px sans-serif')
            .style('margin', '0')
            .style('padding', '0')
            .html(`
              <div style="background-color: rgba(17, 24, 39, 0.9); color: #D1D5DB; border-radius: 8px; padding: 12px; border: 1px solid #4B5563; backdrop-filter: blur(4px); pointer-events: auto;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <h4 style="font-weight: 600; color: white; font-size: 14px; margin: 0; padding-right: 16px;">${activeTournament.name}</h4>
                  <button id="close-tooltip" style="background: none; border: none; color: #9CA3AF; font-size: 18px; cursor: pointer; padding: 0; line-height: 1;">&times;</button>
                </div>
                <p style="font-size: 11px; margin: 0 0 4px 0;">${activeTournament.locationName}</p>
                <p style="font-size: 11px; font-family: monospace; margin: 0 0 12px 0;">${formatDateRange(activeTournament.startDate, activeTournament.endDate)}</p>
                ${final ? `
                <div style="border-top: 1px solid #4B5563; padding-top: 8px;">
                  <h5 style="font-weight: 600; font-size: 12px; margin: 0 0 4px 0; color: #9CA3AF;">Final</h5>
                  <p style="margin: 0; font-size: 12px; ${final.winner === final.player1.name ? 'font-weight: bold; color: white;' : ''}">${final.player1.name}</p>
                  <p style="margin: 0; font-size: 12px; ${final.winner === final.player2.name ? 'font-weight: bold; color: white;' : ''}">${final.player2.name}</p>
                  <p style="font-size: 14px; font-family: monospace; margin: 4px 0 0 0; color: #34D399;">${final.score}</p>
                </div>` : '<p style="font-size: 11px; color: #6B7280;">Finals data not available.</p>'}
              </div>
            `);

          svg.select('#close-tooltip').on('click', (event) => {
            event.stopPropagation();
            setActiveTournament(null);
          });
        }
      }
    };
    (svg.node() as any).drawPins = drawPins;

    // Handle pin-driven rotation and render
    if (pinLocation) {
      if (activeTournament?.id !== pinLocation.id) {
        setActiveTournament(null);
      }
      const [lon, lat] = [pinLocation.location.lon, pinLocation.location.lat];
      d3.transition().duration(1250).tween('rotate', () => {
        const r = d3.interpolate(finalProjection.rotate(), [-lon, -lat]);
        return (t) => {
          const newRotation = finalProjection.rotate(r(t) as [number, number]).rotate();
          currentRotationRef.current = [newRotation[0], newRotation[1]];
          svg.selectAll('path').attr('d', path as any);
          drawPins();
        };
      });
    } else {
      drawPins();
    }

    return cleanup;
  }, [pinLocation, selectedMonth, tournaments, onTournamentSelect, activeTournament]);

  return <svg ref={svgRef} className="w-full h-full cursor-move"></svg>;
};

export default Globe;
