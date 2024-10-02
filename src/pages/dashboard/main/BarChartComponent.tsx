/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { useTranslation } from "react-i18next";

const BarChartComponent = () => {
    const [display, setDisplay] = useState(false);
    const areaChartRef = useRef(null);
    const { t } = useTranslation();

    const data = {
        colors: ["#EF1748"],
        series: [
          {
            name: "",
            color: "#EF1748",
            data: [
              { x: "Jan", y: 231 },
              { x: "Feb", y: 122 },
              { x: "Mar", y: 63 },
              { x: "Apr", y: 421 },
              { x: "May", y: 122 },
              { x: "Jun", y: 323 },
              { x: "Jul", y: 211 },
              { x: "Aug", y: 150 },
              { x: "Sep", y: 271 },
              { x: "Oct", y: 199 },
              { x: "Nov", y: 300 },
              { x: "Dec", y: 310 }
            ]
          }
        ],
        chart: {
          type: "bar",
          height: "150px",
          fontFamily: "Inter, sans-serif",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20%",
            borderRadiusApplication: "end",
            // borderRadius: 8,
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        states: {
          hover: {
            filter: {
              type: "darken",
              value: 1,
            },
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["transparent"],
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -14
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          floating: false,
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            }
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
        fill: {
          opacity: 1,
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
                <h2 className="text-xs font-semibold mb-1">{t("description.dashboard.TOTAL_PAYMENT")}</h2>
                <p className="font-semibold text-sm text-[#EF1748]">$120,000</p>
                
                {/* Chart area */}
                <div ref={areaChartRef}></div>
            </div>
        </>
    )
}

export default BarChartComponent;