import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate } from "react-router-dom";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PublicIcon from "@mui/icons-material/Public";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Pequrel technologies
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeRoundedIcon></HomeRoundedIcon>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => {
              navigate("/addloc");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddBusinessIcon></AddBusinessIcon>
              </ListItemIcon>
              <ListItemText primary="Add Owner" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/listloc");
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <ListIcon></ListIcon>
              </ListItemIcon>
              <ListItemText primary="List Owner" />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => {
              navigate("/configure");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddBusinessIcon></AddBusinessIcon>
              </ListItemIcon>
              <ListItemText primary="Configure Setup" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              navigate("/addop");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PersonAddIcon></PersonAddIcon>
              </ListItemIcon>
              <ListItemText primary="Add Operator" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/listop");
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <ListIcon></ListIcon>
              </ListItemIcon>
              <ListItemText primary="List Operator" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/geography");
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <PublicIcon></PublicIcon>
              </ListItemIcon>
              <ListItemText primary="Geography data" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/addcrop");
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <AgricultureIcon></AgricultureIcon>
              </ListItemIcon>
              <ListItemText primary="Add Crop" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/listcrop");
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <ListIcon></ListIcon>
              </ListItemIcon>
              <ListItemText primary="List Crops" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />

        <List>
          <ListItem
            disablePadding
            onClick={() => {
              navigate("/settings");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon></SettingsIcon>
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              navigate("/impact");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AccessibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Pequrel Impact" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
