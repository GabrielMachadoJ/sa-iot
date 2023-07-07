import { Box, styled } from "@mui/material";
import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

// styled components
const Wrapper = styled(Box)(({ theme }) => ({
  width: `calc(100% - 80px)`,
  maxWidth: 1400,
  margin: "auto",
  paddingLeft: 80,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: 0,
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
}));

const DashboardLayout: FC = ({ children }) => {
  return (
    <Fragment>
      <Wrapper>
        <DashboardNavbar setShowMobileSideBar={() => {}} />
        {children || <Outlet />}
      </Wrapper>
    </Fragment>
  );
};

export default DashboardLayout;
