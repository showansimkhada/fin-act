'use client'
import Navbars from "@/pages/components/navBar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { getYear } from "@/lib/funcPage";
import { lsUser } from "@/lib/redux";
import { useSelector } from "react-redux";
import BS, { IBS } from "@/lib/utils/models/bsModel";
import * as d3 from "d3";

type Props = {
    userData: IUSER[],
    bsData: IBS[]
}

export default function Report({ userData, bsData }: Props ) {

    const width = 800, height = 400;
    const [isClient, setIsClient] = useState(false);
    const username = String(useSelector(lsUser))
    const dataUser = bsData.filter((x) => {
        return x.username === username
    })

    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })
    

    useEffect(() => {
        setIsClient(true)
        const  barWidth = width / 275;

        // select tooltip and overlay
        var tooltip = d3.select('#tooltip');
        var overlay = d3.select('.overlay');

        // svg container
        var svgContainer = d3.select(".visHolder")
            .append('svg')
            .attr("width", width)
            .attr("height", height)
        
        // Select first person earning
        const fWE = dataUser.map(x => {
            return x.fWE
        })
        
        // Select second person earning
        const sWE = dataUser.map(x => {
            return x.sWE
        })

        const years = dataUser.map(x => {
            return getYear(x.date)
        })

        // find min and max
        var minE = d3.min(fWE) || 0;
        var x = d3.min(sWE) || 0
        if (minE > x) {
            minE = x;
        }

        var maxE = d3.max(fWE) || 0;
        var x = d3.max(sWE) || 0
        if (maxE < x) {
            maxE = x;
        }

        // Get unique years
        var dates: number[] = [];
        for (let obj of dataUser.map(x => getYear(x.date))) {
            let x = parseInt(obj)
            if (!dates.includes(x)) {
                dates.push(x)
            }
        }

        var maxDate = new Date(Number(d3.max(dates)), 1, 1).getFullYear()
        var minDate = new Date(Number(d3.min(dates)), 1, 1).getFullYear()

        // xScale and yScale
        // create x-axis scale// Generate line
        const xScale = d3
            .scaleLinear()
            .domain([0, fWE.length - 1])
            .range([0, width]);
        
        const scale = d3
            .scaleTime()
            .domain([minDate - 1, maxDate + 1])
            .range([0, width]);

        // create y-axis scale
        var yScale = d3
            .scaleLinear()
            .domain([0, maxE]).range([height, 30]);

        // Generate lines
        const generateScaledLine = d3
            .line()
            .x((d, i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal)

        // create x and y axis texts
        // create y-axis text
        svgContainer
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -200)
            .attr('y', 10)
            .text('Income');
        
        // create x-axis text
        svgContainer
            .append('text')
            .attr('x', width/2)
            .attr('y', height)
            .text('Years');
            
        // Setting x-axis and y-axis
        // creating x-axis
        var xAxis = d3.axisBottom(scale);

        // creating y-axis
        var yAxis = d3.axisLeft(yScale);

        // adding x-axis into svg
        svgContainer
            .append('g')
            .call(xAxis)
            .attr('transform', `translate(50, ${height-20})`)
        
        // adding y-axis into svg
        svgContainer
            .append('g')
            .call(yAxis)
            .attr('transform', `translate(50, -20)`)
        
        // Get data to draw into svg
        svgContainer
            .selectAll('.line')
            .data([sWE])
            .join('path')
            .attr("d", (d) => generateScaledLine(d))
            .attr('fill', 'none')
            .attr('stroke', 'blue')
            .attr('transform', `translate(50, -20)`)

        svgContainer
            .selectAll('.line')
            .data([fWE])
            .join('path')
            .attr("d", (d) => generateScaledLine(d))
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('transform', `translate(50, -20)`)
            // .on('mouseover', function (event, d) {
            //     // d or datum is the height of the
            //     // current rect
            //     // var i = getAttribute('index');
            //     var x = event.pageX
            //     console.log(event)
            //     overlay
            //       .transition()
            //       .duration(0)
            //       .style('opacity', 0.9)
            //       .style('transform', 'translateX(60px)');
            //     tooltip.transition().duration(200).style('opacity', 0.9);
            //     tooltip
            //       .html(
            //         d +
            //           '<br>' +
            //           '$' +
            //         //   d[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
            //           ' Billion'
            //       )
            //       .style('left', 30 + 'px')
            //       .style('top', height + 'px')
            //       .style('transform', 'translateX(60px)');
            //   })
            //   .on('mouseout', function () {
            //     tooltip.transition().duration(200).style('opacity', 0);
            //     overlay.transition().duration(200).style('opacity', 0);
            //   });

    }, [isClient, bsData])

    if (isClient) {
        return (
            <>
            <Navbars/>
            <React.Fragment>
                <div className='main' style={{marginTop: "60px"}}>
                    <div className='container'>
                        <div className="d-flex flex-row">
                            <div className="d-flex" id='title'>Trend of your Income</div>
                        </div>
                        <div className='visHolder'>
                            <div id='tooltip' style={{opacity: 0}}></div>
                            <div className='overlay' style={{opacity: 0}}></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await dbConnect()
    /* find all the data in our database */
    const findBS = await BS.find({})
    const data = findBS.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    });
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const bsData = data.map((doc) => {
      const bsData = JSON.parse(JSON.stringify(doc))
      return bsData
    })

    /* find all the data in our database */
    const findUser = await User.find({})
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const userData = findUser.map((doc) => {
      const userData = JSON.parse(JSON.stringify(doc))
      return userData
    })
  
    return { props: { bsData: bsData, userData: userData } }
}