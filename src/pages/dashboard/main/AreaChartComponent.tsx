/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

interface AreaChartComponentProps {
    title: string;
    total: number | string;
    textColor: string;
}

const AreaChartComponent = ({ title, total, textColor }: AreaChartComponentProps) => {
    const [display, setDisplay] = useState(false);
    const areaChartRef = useRef(null);
    const data = {
        chart: {
          height: "150px",
          width: "100%",
          type: "area",
          fontFamily: "Inter, sans-serif",
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#0071BD",
            gradientToColors: ["#0071BD"],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 6,
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: 0
          },
        },
        series: [
          {
            name: "New users",
            data: [ 6000, 5800, 6100, 5900, 6200, 6400],
            color: "#0071BD",
          },
        ],
        xaxis: {
          categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
      }


    useEffect(() => {
        if(display){
            if (typeof ApexCharts !== 'undefined') {
                const chart = new ApexCharts(areaChartRef.current, data);
                chart.render();
            }
        }

        setDisplay(true);

    }, [display]);

    return (
        <>
            <div className="relative">
                <h2 className="text-xs font-semibold pb-2">{title}</h2>
                
                {/* Chart area */}
                <div ref={areaChartRef}></div>
                <h2 className={`font-bold text-lg text-[${textColor}]  absolute bottom-2 left-0`}>{total}</h2>
            </div>
        </>
    )
}

export default AreaChartComponent;