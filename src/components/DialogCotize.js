import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import { yellow } from "@mui/material/colors";
import PropTypes from "prop-types";

const DialogCotize = ({ open, action, dataNull, reload }) => {
  const [nulled, setNulled] = useState();
  const handleClose = () => {
    action(false);
  };

  const handleDelete = () => {
    setNulled(true);
    action(false);
  };

  let nullBill = {
    fecha: "2022-10-10T06:27:09.545Z",
    idCliente: 0,
    tipoVenta: 0,
    subTotal: 0,
    igv: 0,
    total: 0,
    vuelto: 0,
    porcDscto: 0,
    valorDscto: 0,
    valorVenta: 0,
    idSede: 0,
    idPedCab: 0,
    usuario: "string",
    rucCliente: "string",
    razonSocial: "string",
    idOrigen: 1,
    isAnulado: 1,
    idVentaCab: dataNull.idVentaCab,
    cotizaDet: [
      {
        idVentaCab: 0,
        idProducto: 0,
        cantidad: 0,
        precioVenta: 0,
        valorVenta: 0,
        subTotal: 0,
        total: 0,
        idOrigen: 0,
        isAnulado: 0,
      },
    ],
  };

  useEffect(() => {
    if (dataNull) {
      fetch("http://appdemo1.solarc.pe/api/Cotiza/InsertaCotiza", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nullBill),
      })
        .then((response) => response.json())
        .then(() => {
          setNulled();
          reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [nulled]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          <ReportProblemTwoToneIcon sx={{ color: yellow[800], fontSize: 50 }} />
          <br />
          {` ¿Desea cancelar la cotización ${dataNull.numero}?`}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Si presiona <strong>`&quot;Aceptar`&quot;</strong> cotización sera anulada de la
            lista y no podra revertir el proceso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button autoFocus onClick={handleDelete}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogCotize.propTypes = {
    open: PropTypes.bool,
    action: PropTypes.bool,
    dataNull: PropTypes.array,
    reload: PropTypes.any
};

export default DialogCotize;
