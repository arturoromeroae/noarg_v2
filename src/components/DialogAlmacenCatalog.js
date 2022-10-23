import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import LoadingButton from "@mui/lab/LoadingButton";
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
    fetch("http://appdemo1.solarc.pe/api/Productos/GetProductos")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result.data);
        },
        (error) => {
          console.log(error);
        }
      );

    fetch("http://appdemo1.solarc.pe/api/Productos/DownloadFilePDF")
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
          <LocalPrintshopTwoToneIcon color="primary" sx={{ fontSize: 50 }} />
          <br />
          Imprimir Reporte de Catálogo
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center" }}
            id="alert-dialog-slide-description"
          >
            <strong>Fecha: </strong>
            {dd + "/" + mm + "/" + yyyy}
            <br />
            <strong>Cantidad de Productos: </strong>
            {items && items.length}
          </DialogContentText>
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
