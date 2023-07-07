import { Box, Grid, useTheme } from "@mui/material";
import axios from "axios";
import Analytics from "components/Dashboards/saas/Analytics";
import SaaSCard from "components/Dashboards/saas/Card";
import TotalSpent from "components/Dashboards/saas/TotalSpent";
import TotalSpent2 from "components/Dashboards/saas/TotalSpent2";
import TotalSpent3 from "components/Dashboards/saas/TotalSpent3";
import TotalSpent4 from "components/Dashboards/saas/TotalSpent4";
import TotalSpent5 from "components/Dashboards/saas/TotalSpent5";
import useTitle from "hooks/useTitle";
import BucketIcon from "icons/BucketIcon";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";
import WindowsLogoIcon from "icons/WindowsLogoIcon";
import { FC, useEffect, useState } from "react";
import { setInterval } from "timers";

const SaaS: FC = () => {
  const [temperatura, setTemperatura] = useState("");
  const [amonia, setAmonia] = useState("");
  const [nivel, setNivel] = useState("");
  const [fluxo, setFluxo] = useState("");
  const [ph, setPh] = useState("");

  useTitle("Psicultura - Tilápia");

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
      }
      if (element.variable === "temperatura_agua") {
        setTemperatura(`${element.value}`);
      }
      if (element.variable === "sensor_ph") {
        setPh(`${element.value}`);
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

  const theme = useTheme();

  const cardList = [
    {
      price: temperatura,
      Icon: BucketIcon,
      title: "Temperatura da Água",
      color: theme.palette.primary.main,
    },
    {
      price: ph || 0,
      title: "PH da Água",
      Icon: EarningIcon,
      color: theme.palette.primary.purple,
    },
    {
      price: amonia,
      Icon: WindowsLogoIcon,
      title: "Amônia",
      color: theme.palette.primary.red,
    },
    {
      price: fluxo || 0,
      Icon: PeopleIcon,
      title: "Fluxo de Água",
      color: theme.palette.primary.yellow,
    },
    {
      price: nivel,
      Icon: PeopleIcon,
      title: "Nível da Água",
      color: theme.palette.primary.yellow,
    },
  ];

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {cardList.map((card, index) => (
          <Grid item lg={3} xs={6} key={index}>
            <SaaSCard card={card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>
      </Grid>
      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent2 />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>
      </Grid>
      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent3 />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>
      </Grid>
      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent4 />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>
      </Grid>
      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent5 />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SaaS;
