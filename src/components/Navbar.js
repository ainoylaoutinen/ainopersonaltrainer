import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { withRouter } from "react-router-dom";

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { history } = props;

  const menuItems = [
    { menuTitle: "Customerlist", page: "/Customerlist" },
    { menuTitle: "Traininglist", page: "/Traininglist" },
    { menuTitle: "Calendar", page: "/Calendar" },
    { menuTitle: "Statistics", page: "/Statistics" },
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (page) => {
    history.push(page);
    setAnchorEl(null);
  };

  return (
    <div className="root">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h5" align="center" sx={{ flexGrow: 1 }}>
              Personal Trainer
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map((menuItem) => {
                  const { menuTitle, page } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(page)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default withRouter(Navbar);
