import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import { yellow } from "@mui/material/colors";
import PropTypes from "prop-types";

const DialogMaintanceDelete = ({ data, action, set }) => {

  console.log(data.idProducto);
  const handleClose = () => {
    set(false);
  };

  const handleDelete = () => {
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
          set(false);
        })
        .catch((error) => {
          console.error("Error:", error);
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
            Si presiona <strong>&quot;Aceptar&quot;</strong> el producto
            sera eliminado de la lista y no podra revertir el proceso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogMaintanceDelete.propTypes = {
  data: PropTypes.array,
  action: PropTypes.bool,
  set: PropTypes.bool,
};

export default DialogMaintanceDelete;
