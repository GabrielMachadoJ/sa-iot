import {
  AppBar,
  Box,
  styled,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { H2 } from "components/Typography";
import { TitleContext } from "contexts/TitleContext";
import { FC, useContext } from "react";

// root component interface
interface DashboardNavBarProps {
  setShowMobileSideBar: () => void;
}

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(() => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
}));

// root component
const DashboardNavbar: FC<DashboardNavBarProps> = ({
  setShowMobileSideBar,
}) => {
  const { title } = useContext(TitleContext);
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  if (downSm) {
    return (
      <DashboardNavbarRoot position="sticky">
        <StyledToolBar>
          <Box flexGrow={1} textAlign="center">
            <H2
              fontSize={21}
              lineHeight={0}
              mx={1}
              fontWeight="700"
              color="text.primary"
            >
              {title}
            </H2>
          </Box>
        </StyledToolBar>
      </DashboardNavbarRoot>
    );
  }

  return (
    <DashboardNavbarRoot position="sticky">
      <StyledToolBar>
        <Box flexGrow={1} textAlign="center">
          <H2
            fontSize={21}
            lineHeight={0}
            mx={1}
            fontWeight="700"
            color="text.primary"
          >
            {title}
          </H2>
        </Box>
      </StyledToolBar>
    </DashboardNavbarRoot>
  );
};

export default DashboardNavbar;
