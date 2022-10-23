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

const DialogMaintanceAddBrand = ({ action, set }) => {
  const [brand, setBrand] = useState();
  const [load, setLoad] = useState(false);
  const handleClose = () => {
    set(false);
  };

  const handleChange = (e) => {
    setBrand(e.target.value);
  };

  const handleCreate = () => {
    setLoad(true);
    let bd = {
      tabla: "marca",
      idParam: 0,
      descripcion: brand,
    };

    // Agregar marca
    if (bd) {
      fetch("http://appdemo1.solarc.pe/api/Parametros/InsertaParametros", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bd),
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
          Agregar Marca
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Inserte la marca del producto.<br/>(Los campos con * son requeridos)
          </DialogContentText>
          <TextField
            sx={{ m: 1, width: "50ch" }}
            label="Marca"
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
            <Button onClick={handleCreate} disabled={!brand} autoFocus>
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

DialogMaintanceAddBrand.propTypes = {
  action: PropTypes.bool,
  set: PropTypes.bool,
};

export default DialogMaintanceAddBrand;
