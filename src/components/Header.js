import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../image/LOGO.png";
import Cookies from "js-cookie";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ModalNotification from "./ModalNotification";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import NotificationsOffTwoToneIcon from "@mui/icons-material/NotificationsOffTwoTone";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorAlert, setAnchorAlert] = useState(null);
  const [notified, setNotified] = useState(0);
  const [open, setOpen] = useState(false);
  const [infoSell, setInfoSell] = useState();
  const navigate = useNavigate();

  let getUserInfo = Cookies.get("user");
  let user = getUserInfo && JSON.parse(getUserInfo);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setAnchorAlert(null);
  };

  // Menu Usuario
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Menu Alerta
  const handleOpenAlertMenu = (event) => {
    setAnchorAlert(event.currentTarget);
  };

  const handleCloseAlertMenu = () => {
    setAnchorAlert(null);
  };

  const handleOpenModal = (prop) => {
    setOpen(true);
    setInfoSell(prop);
  };

  const logout = () => {
    Cookies.remove("user");
    handleCloseUserMenu();
    navigate("/");
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetch("https://appdemo1.solarc.pe/api/Venta/GetVentaNot")
      .then((res) => res.json())
      .then(
        (result) => {
          let uniqueIds = result.data.filter(
            (ele, ind) =>
              ind === result.data.findIndex((elem) => elem.nro === ele.nro)
          );
          setNotified(uniqueIds);
        },
        (error) => {
          console.error(error);
        }
      );
  }, [open]);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "black", width: "100%" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <img width={40} src={logo} alt="Logo NOARG" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key="inicio" onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "black", width: "100%" }}
                    to="/inicio"
                  >
                    Inicio
                  </Link>
                </MenuItem>
                <MenuItem key="cotizaciones" onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "black", width: "100%" }}
                    to="/cotizaciones"
                  >Cotizaciones</Link>
                </MenuItem>
                <MenuItem key="repuestos" onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "black", width: "100%" }}
                    to="/repuestos"
                  >Respuestos</Link>
                </MenuItem>
                <MenuItem key="almacen" onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "black", width: "100%" }}
                    to="/almacen"
                  >Almacen</Link>
                </MenuItem>
                <MenuItem key="mantenimiento" onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "black", width: "100%" }}
                    to="/mantenimiento"
                  >Mantenimiento</Link>
                </MenuItem>
                <MenuItem key="ventas" onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "black", width: "100%" }}
                    to="/ventas"
                  >Ventas</Link>
                </MenuItem>
                <MenuItem key="clientes" onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "black", width: "100%" }}
                    to="/clientes"
                  >Clientes</Link>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
            >
              <img width={40} src={logo} alt="Logo NOARG" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/inicio"
              >
                <Button
                  key="inicio"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Inicio
                </Button>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/cotizaciones"
              >
                <Button
                  key="cotizaciones"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Cotizaciones
                </Button>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/repuestos"
              >
                <Button
                  key="repuestos"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Repuestos
                </Button>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/almacen"
              >
                <Button
                  key="almacen"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  almacen
                </Button>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/mantenimiento"
              >
                <Button
                  key="mantenimiento"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Mantenimiento
                </Button>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/ventas"
              >
                <Button
                  key="ventas"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Ventas
                </Button>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/clientes"
              >
                <Button
                  key="clientes"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Clientes
                </Button>
              </Link>
            </Box>

            {notified &&
              (user.userName === "ALMACEN" || user.userName === "arturo") && (
                <MenuItem>
                  <Tooltip title="Notificaciones">
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                      onClick={handleOpenAlertMenu}
                    >
                      <Badge
                        badgeContent={Object.keys(notified).length}
                        color="error"
                      >
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px", maxHeight: "250px" }}
                    id="menu-appbar"
                    anchorEl={anchorAlert}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorAlert)}
                    onClose={handleCloseAlertMenu}
                  >
                    {notified &&
                      notified.map((n) => (
                        <>
                          <MenuItem
                            key={n.serie + n.nro}
                            onClick={() => handleOpenModal(n)}
                          >
                            <>
                              <ListItemAvatar key={n.serie + n.nro}>
                                <Avatar>
                                  {n.usuario ? n.usuario.substring(0, 1).toUpperCase() : "N"}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={n.serie + n.nro}
                                key={n.nro}
                              />
                            </>
                          </MenuItem>
                          <Divider />
                        </>
                      ))}
                  </Menu>
                </MenuItem>
              )}
            {!notified &&
              (user.userName === "ALMACEN" || user.userName === "arturo") && (
                <MenuItem>
                  <IconButton size="large" color="inherit">
                    <Badge color="error" badgeContent="0">
                      <NotificationsOffTwoToneIcon />
                    </Badge>
                  </IconButton>
                </MenuItem>
              )}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Opciones de Perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "green" }}>
                    {user.userName.substring(0, 1).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/cuenta"
                >
                  <MenuItem key="1">
                    <Typography textAlign="center">Cuenta</Typography>
                  </MenuItem>
                </Link>
                {(user.userName === "JGONZALES" && (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/agregar-usuarios"
                  >
                    <MenuItem key="2">
                      <Typography textAlign="center">
                        Agregar Usuarios
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
                <MenuItem key="3" onClick={logout}>
                  <Typography textAlign="center">Cerrar Sesión</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ModalNotification open={open} set={setOpen} info={infoSell} />
    </>
  );
};
export default ResponsiveAppBar;
