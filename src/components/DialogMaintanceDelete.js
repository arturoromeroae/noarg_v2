import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import { yellow } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

const DialogMaintanceDelete = ({
  data,
  action,
  set,
  actionAlert,
  actionAlertError,
  text,
}) => {
  const [load, setLoad] = useState(false);
  const handleClose = () => {
    set(false);
  };

  const handleDelete = () => {
    text("¡Se elimino el producto correctamente!");
    setLoad(true);
    let pr = {
      codProd: "string",
      nombreProducto: "string",
      descripcion: "string",
      idMarca: 0,
      idModelo: 0,
      idUnidadMedida: 0,
      idTienda: 0,
      precioBase: 0,
      imagen: "string",
      rutaImagen: "string",
      idProducto: data.idProducto,
      cantidad: 0,
      precioVenta: 0,
    };
    // Eliminar producto

    if (pr) {
      fetch("http://appdemo1.solarc.pe/api/Productos/ActualizarProducto", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pr),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          actionAlert(true);
          set(false);
          setLoad(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          actionAlertError(true);
        });
    }
  };

  return (
    <div>
      <Dialog
        open={action}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          <ReportProblemTwoToneIcon sx={{ color: yellow[800], fontSize: 50 }} />
          <br />
          {` ¿Desea eliminar el producto ${data && data.nombreProducto}?`}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Si presiona <strong>&quot;Aceptar&quot;</strong> el producto sera
            eliminado de la lista y no podra revertir el proceso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={load} onClick={handleClose} color="error">
            Cancelar
          </Button>
          {!load ? (
            <Button onClick={handleDelete} autoFocus>
              Aceptar
            </Button>
          ) : (
            <LoadingButton loading></LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogMaintanceDelete.propTypes = {
  text: PropTypes.string,
  data: PropTypes.array,
  action: PropTypes.bool,
  set: PropTypes.bool,
  actionAlert: PropTypes.bool,
  actionAlertError: PropTypes.bool,
};

export default DialogMaintanceDelete;
