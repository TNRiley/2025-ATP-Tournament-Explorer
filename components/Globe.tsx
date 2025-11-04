import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { Location, Tournament } from '../types';

interface GlobeProps {
  pinLocation: Location | null | undefined;
  selectedMonth: number | null;
  tournaments: Tournament[];
}

const getPointCategoryColor = (points: number): string => {
  if (points === 2000) return '#a855f7'; // purple-500
  if (points === 1500) return '#6366f1'; // indigo-500
  if (points === 1000) return '#3b82f6'; // blue-500
  if (points === 500) return '#f59e0b'; // amber-500
  return '#22c55e'; // green-500
};

const Globe: React.FC<GlobeProps> = ({ pinLocation, selectedMonth, tournaments }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const currentRotationRef = useRef<[number, number]>([0, -10]);

  // Main setup effect
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    
    // Clear any previous globe renderings
    svg.selectAll('*').remove();

    const projection = d3.geoOrthographic()
      .clipAngle(90)
      .rotate(currentRotationRef.current);
    projectionRef.current = projection;

    const path = d3.geoPath().projection(projection);

    svg.append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'sphere')
      .attr('fill', '#1F2937')
      .attr('stroke', '#4B5563');

    svg.append('path')
      .datum(d3.geoGraticule10())
      .attr('class', 'graticule')
      .attr('fill', 'none')
      .attr('stroke', '#374151')
      .attr('stroke-width', 0.5);

    d3.json('https://unpkg.com/world-atlas@2/countries-110m.json').then((world: any) => {
      svg.insert('path', '.graticule')
        .datum(topojson.feature(world, world.objects.countries))
        .attr('class', 'land')
        .attr('fill', '#374151')
        .attr('stroke', '#1F2937');
    });

    (svg.node() as any).drawPins = () => {};

    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      projection
        .scale(Math.min(width, height) / 2 - 10)
        .translate([width / 2, height / 2]);
      svg.selectAll('path').attr('d', path as any);
      if ((svg.node() as any).drawPins) {
        (svg.node() as any).drawPins();
      }
    });
    resizeObserver.observe(svgRef.current);

    const drag = d3.drag<SVGSVGElement, unknown>()
      .on('start', () => { d3.select(svg.node()!).interrupt(); })
      .on('drag', (event) => {
        const rotate = projection.rotate();
        const k = 75 / projection.scale();
        const newRotation: [number, number] = [
          rotate[0] + event.dx * k,
          rotate[1] - event.dy * k
        ];
        projection.rotate(newRotation);
        currentRotationRef.current = newRotation;
        svg.selectAll('path').attr('d', path as any);
        (svg.node() as any).drawPins();
      });
    
    svg.call(drag as any);

    return () => resizeObserver.disconnect();
  }, []);

  // Effect for all pin drawing logic
  useEffect(() => {
    if (!svgRef.current || !projectionRef.current) return;

    const svg = d3.select(svgRef.current);
    const projection = projectionRef.current;
    
    const drawPins = () => {
      svg.selectAll('.pin, .month-pin').remove();
      const path = d3.geoPath().projection(projection);

      if (pinLocation) {
        const coords: [number, number] = [pinLocation.lon, pinLocation.lat];
        if (d3.geoDistance(coords, [-projection.rotate()[0], -projection.rotate()[1]]) <= Math.PI / 2) {
          const centroid = path.centroid({type: 'Point', coordinates: coords});
          svg.append('circle').attr('class', 'pin').attr('cx', centroid[0]).attr('cy', centroid[1]).attr('r', 5).attr('fill', '#34D399').style('pointer-events', 'none');
          svg.append('circle').attr('class', 'pin').attr('cx', centroid[0]).attr('cy', centroid[1]).attr('r', 8).attr('fill', 'none').attr('stroke', '#34D399').attr('stroke-width', 2).style('pointer-events', 'none').attr('opacity', 0.5);
        }
      } 
      else if (selectedMonth !== null) {
        const tournamentsInMonth = tournaments.filter(t => new Date(t.startDate).getUTCMonth() === selectedMonth);
        tournamentsInMonth.forEach(t => {
          const coords: [number, number] = [t.location.lon, t.location.lat];
          if (d3.geoDistance(coords, [-projection.rotate()[0], -projection.rotate()[1]]) <= Math.PI / 2) {
            const centroid = path.centroid({type: 'Point', coordinates: coords});
            svg.append('circle')
              .attr('class', 'month-pin')
              .attr('cx', centroid[0])
              .attr('cy', centroid[1])
              .attr('r', 5)
              .attr('fill', getPointCategoryColor(t.points))
              .attr('stroke', '#111827')
              .attr('stroke-width', 1)
              .style('pointer-events', 'none');
          }
        });
      }
    };

    (svg.node() as any).drawPins = drawPins;
    
    const path = d3.geoPath().projection(projection);

    if (pinLocation) {
      const [lon, lat] = [pinLocation.lon, pinLocation.lat];
      d3.transition()
        .duration(1250)
        .tween('rotate', () => {
          const r = d3.interpolate(projection.rotate(), [-lon, -lat]);
          return (t) => {
            projection.rotate(r(t));
            currentRotationRef.current = projection.rotate();
            svg.selectAll('path').attr('d', path as any);
            drawPins();
          };
        });
    } else {
      drawPins();
    }
  }, [pinLocation, selectedMonth, tournaments]);

  return <svg ref={svgRef} className="w-full h-full cursor-move"></svg>;
};

export default Globe;