import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import LoadingButton from "@mui/lab/LoadingButton";
import { cyan, blue } from "@mui/material/colors";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAlmacenCatalog = ({ open, set }) => {
  const [items, setItems] = useState();
  const [print, setPrint] = useState();
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  const handleClose = () => {
    set(false);
  };

  const handlePrint = () => {
    set(false);
  };

  useEffect(() => {
    fetch("https://appdemo1.solarc.pe/api/Productos/GetProductos")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result.data);
        },
        (error) => {
          console.log(error);
        }
      );

    fetch("https://appdemo1.solarc.pe/api/Productos/DownloadFilePDF")
      .then((res) => res.json())
      .then(
        (result) => {
          setPrint(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Imprimir Reporte de Catálogo
        </DialogTitle>
        <DialogContent>
          {items && (
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem>
                <ListItemAvatar sx={{ textAlign: "center" }}>
                  <Avatar sx={{ bgcolor: blue[100] }}>
                    <CalendarMonthTwoToneIcon color="primary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Fecha"
                  secondary={dd + "/" + mm + "/" + yyyy}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: cyan[50] }}>
                    <InventoryTwoToneIcon sx={{ color: cyan[500] }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Cantidad de Productos en sistema"
                  secondary={items.length}
                />
              </ListItem>
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          {print ? (
            <Button
              onClick={handlePrint}
              download={"reporte_catalogo-" + dd + "-" + mm + "-" + yyyy}
              href={"data:application/pdf;base64," + print.oFile}
            >
              Imprimir
            </Button>
          ) : (
            <LoadingButton loading></LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogAlmacenCatalog.propTypes = {
  open: PropTypes.bool,
  set: PropTypes.bool,
};

export default DialogAlmacenCatalog;
