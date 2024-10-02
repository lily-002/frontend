/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { useTranslation } from "react-i18next";

const DonutChartComponent = () => {
  const [display, setDisplay] = useState(false);
  const donutRef = useRef(null);
  const { t } = useTranslation();

  const data = {
    series: [3000, 3000],
    colors: ["#EF1748", "#26A9E1"],
    chart: {
      height: 250,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: t("description.dashboard.total"),
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
              formatter: function (w: any) {
                const sum = w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b
                }, 0)
                return `${sum}`
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value: any) {
                return value;
              },
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: [t("description.dashboard.e_invoice"), t("description.dashboard.e_archive")],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return value;
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value: number) {
          return value;
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  }

  useEffect(() => {
    if(display){
      if (typeof ApexCharts !== 'undefined') {
        const chart = new ApexCharts(donutRef.current, data);
        chart.render();
      }
    }

    setDisplay(true);

  }, [display]);

  
  return (
    <>
        <div ref={donutRef} className="py-6"></div>
    </>
  )
}

export default DonutChartComponent;