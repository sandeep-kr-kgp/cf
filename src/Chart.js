import React, { useEffect, useRef } from 'react';
import * as C3 from 'c3';
import 'c3/c3.css';
const Chart = ({ data = { color: 'tomato' }, height = 500, width = 300 }) => {
    const chartRef = useRef();
    useEffect(() => {
        generateChart(height, width);

    }, [height, width]);
    const generateChart = (height, width) => {
        C3.generate({
            bindto: chartRef.current,
            size: {
                height: height,
                width: width
            },
            data: {
                x: 'Region',
                columns: [
                    ['Sales', 50, 100, 80, 120],
                    ['Region', 'East', 'North', 'West', 'South']
                ],
                type: 'spline',
                colors: {
                    'Sales': '#fff'
                }
            },
            axis: {
                x: {
                    type: 'category'
                }
            }
        })
    }
    return (
        <div className='absolute'>
            <div style={{ backgroundColor: data.color, height: `${height}px`, width: `${width}px` }} ref={chartRef}></div>
        </div>
    )
}

export default Chart;
