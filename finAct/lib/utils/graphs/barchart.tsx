import React, { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 70, left: 60 };

type Group = {
    id: string;
    month: number;
    fWI: number;
    sWI: number;
    return: number;
    weeklySpent: number;
    weeklySave: number;
}

type dataUser = {
  firstname: string;
  sfirstname: string;
}

type StackedBarplotProps = {
    width: number;
    height: number;
    data: Group[];
    dataUser: dataUser[];
};

export const StackedBarplot = ({
    width,
    height,
    data,
    dataUser,
}: StackedBarplotProps) => {
  // bounds = area inside the graph axis = calculated by substracting the margins
  // const axesRef = useRef(null);
  const svgRef = useRef(null);

  const barwidth = 50;
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis
  const fWIMax = d3.max(data.map(x => x.fWI)) || 0;
  const sWIMax = d3.max(data.map(x => x.sWI)) || 0;
  let max = 0;
  if (fWIMax > sWIMax) {
      max = fWIMax
  } else {
      max = sWIMax
  }

  // X axis
  const xScale = useMemo(() => {
    return d3
      .scaleBand<string>()
      .domain(data.map(x => x.id))
      .range([0, boundsWidth])
      .padding(0.17);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max + 1000 || 2000])
      .range([boundsHeight, 0])
  }, [data, height]);

  useEffect(() => {
    const svgContainer = d3.select(svgRef.current);
    svgContainer.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgContainer
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgContainer.append("g").call(yAxisGenerator);

    d3
    .select('svg')
      .selectAll('.rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('month', d => d.id)
      .attr(`${dataUser[0].firstname}`, d => d.fWI)
      .attr('class', 'bar')
      .attr('x', d => xScale(d.id) || "")
      .attr('y', d => yScale(d.fWI))
      .style('fill', '#33adff')
      .attr('width', xScale.bandwidth()/3)
      .attr('height', d =>  {return boundsHeight - yScale(d.fWI)})
      .attr('index', d => d.id)
      .attr("transform", `translate(${[MARGIN.left + 12, MARGIN.top].join(",")})`)

      d3
      .select('svg')
        .selectAll('.rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('month', d => d.id)
        .attr(`${dataUser[0].sfirstname}`, d => d.sWI)
        .attr('class', 'bar')
        .attr('x', d => xScale(d.id) || '')
        .attr('y', d => yScale(d.sWI))
        .style('fill', '#ffddee')
        .attr('width', xScale.bandwidth()/3)
        .attr('height', d =>  {return boundsHeight - yScale(d.sWI)})
        .attr('index', d => d.id)
        .attr("transform", `translate(${[MARGIN.left + 12 + xScale.bandwidth()/3, MARGIN.top].join(",")})`)
  }, [])

  return (
    <React.Fragment>
      <div className='main'>
        <div className='container'>
          <div id='title'>Monthly Income's</div>
          <div className='visHolder'>
            <div id='tooltip' style={{opacity: 0}}></div>
            <div className='overlay' style={{opacity: 0}}></div>
            <svg width={width} height={height} ref={null}>
            <g
                ref={svgRef}
                transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
              />
            </svg>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
