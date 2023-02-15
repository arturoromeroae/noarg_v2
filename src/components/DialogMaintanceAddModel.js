import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

const DialogMaintanceAddModel = ({ action, set }) => {
  const [model, setModel] = useState();
  const [load, setLoad] = useState(false);
  const handleClose = () => {
    set(false);
  };

  const handleChange = (e) => {
    setModel(e.target.value);
  };

  const handleCreate = () => {
    setLoad(true);
    let md = {
      tabla: "modelo",
      idParam: 0,
      descripcion: model,
    };

    // Agregar modelo
    if (md) {
      fetch("https://appdemo1.solarc.pe/api/Parametros/InsertaParametros", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(md),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          set(false);
          setLoad(false);
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
          Agregar Modelo
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Inserte el modelo del producto.<br/>(Los campos con * son requeridos)
          </DialogContentText>
          <TextField
            sx={{ m: 1, width: "50ch" }}
            label="Modelo"
            margin="dense"
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={load} onClick={handleClose} color="error">
            Cancelar
          </Button>
          {!load ? (
            <Button onClick={handleCreate} disabled={!model} autoFocus>
              Crear
            </Button>
          ) : (
            <LoadingButton loading>Crear</LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogMaintanceAddModel.propTypes = {
  action: PropTypes.bool,
  set: PropTypes.bool,
};

export default DialogMaintanceAddModel;
