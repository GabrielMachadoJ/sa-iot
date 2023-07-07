import { Box, Card, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import axios from "axios";
import { H5 } from "components/Typography";
import { FC, useEffect, useState } from "react";
import Chart from "react-apexcharts";

const TotalSpent: FC = () => {
  const theme = useTheme();
  const [temperatura, setTemperatura] = useState("");
  const [amonia, setAmonia] = useState("");
  const [nivel, setNivel] = useState("");
  const [fluxo, setFluxo] = useState("");
  const [ph, setPh] = useState("");
  const [dataAmonia, setDataAmonia] = useState<any>([]);
  const [dataPh, setDataPh] = useState<any>([]);

  const getData = async () => {
    const response: any = await axios.get("https://api.tago.io/data", {
      headers: {
        "device-token": "947c8e44-2457-4f8a-a66a-67e4dcaa871c",
      },
    });
    response.data.result.forEach((element: any) => {
      if (element.variable === "nivel_da_agua") {
        setNivel(`${element.value}`);
      }
      if (element.variable === "sensor_amonia") {
        setAmonia(`${element.value}`);
        setDataAmonia((prevDataAmonia: any) => [
          ...prevDataAmonia,
          element.value,
        ]);
      }
      if (element.variable === "temperatura_agua") {
        setTemperatura(`${element.value}`);
      }
      if (element.variable === "ph_da_agua") {
        setPh(`${element.value}`);
        setDataPh((prevDataPh: any) => [...prevDataPh, element.value]);
      }
      if (element.variable === "fluxo_da_agua") {
        setFluxo(`${element.value}`);
      }
    });
  };

  useEffect(() => {
    setInterval(() => {
      getData();
    }, 60000);
  }, []);

  const data = {
    series: [
      {
        name: "Spent",
        data: dataPh.map((value: any, index: any) => [index, value]).slice(-10), // Converta os valores para um array [index, value]
      },
    ],
  };

  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      toolbar: { show: false },
      type: "line",
      animations: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main],
    dataLabels: { enabled: false },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    states: {
      active: {
        filter: { type: "none" },
      },
      hover: {
        filter: { type: "none" },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      type: "category",
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },

    annotations: {
      yaxis: [
        {
          y: 100, // Valor da referência no eixo Y
          borderColor: theme.palette.secondary.main,
          strokeDashArray: 3,
          label: {
            borderColor: theme.palette.secondary.main,
            style: {
              color: theme.palette.secondary.main,
              background: theme.palette.background.paper,
            },
            text: "Referência 1", // Texto da referência
          },
        },
        {
          y: 200, // Valor da referência no eixo Y
          borderColor: theme.palette.secondary.main,
          strokeDashArray: 3,
          label: {
            borderColor: theme.palette.secondary.main,
            style: {
              color: theme.palette.secondary.main,
              background: theme.palette.background.paper,
            },
            text: "Referência 2", // Texto da referência
          },
        },
      ],
    },

    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: {
            height: 350,
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                colors: theme.palette.text.disabled,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 500,
              },
            },
          },
        },
      },
    ],
  };

  const chartSeries = data.series;

  return (
    <Card
      sx={{
        paddingX: 4,
        height: "100%",
        paddingBottom: "1.5rem",
        paddingTop: "calc(1.5rem + 15px)",
        [theme.breakpoints.down(425)]: { padding: "1.5rem" },
      }}
    >
      <H5>Tanque 01 - PH</H5>

      <Box
        sx={{
          "& .apexcharts-tooltip *": {
            fontFamily: theme.typography.fontFamily,
            fontWeight: 500,
          },
          "& .apexcharts-tooltip": {
            boxShadow: 0,
            borderRadius: 4,
            alignItems: "center",
            "& .apexcharts-tooltip-text-y-value": { color: "primary.main" },
            "& .apexcharts-tooltip.apexcharts-theme-light": {
              border: `1px solid ${theme.palette.divider}`,
            },
            "& .apexcharts-tooltip-series-group:last-child": {
              paddingBottom: 0,
            },
          },
        }}
      >
        <Chart
          height={245}
          options={chartOptions}
          series={chartSeries}
          type="line"
        />
      </Box>
    </Card>
  );
};

export default TotalSpent;
