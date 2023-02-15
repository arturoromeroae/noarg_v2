import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import LoadingButton from "@mui/lab/LoadingButton";
import { yellow } from "@mui/material/colors";
import PropTypes from "prop-types";

const DialogClientDelete = ({ data, open, set }) => {
  const [load, setLoad] = useState(false);
  const handleClose = () => {
    set(false);
  };

  // Eliminar usuario
  const handleDelete = () => {
    let us = {
      "idCliente": data.idCliente
    }

    if (us) {
      setLoad(true);
      fetch("https://appdemo1.solarc.pe/api/Cliente/EliminarCliente", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(us),
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
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          <ReportProblemTwoToneIcon sx={{ color: yellow[800], fontSize: 50 }} />
          <br />
          {` ¿Desea eliminar el cliente ${data.nombres ? data.nombres : data.razonSocial}?`}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Si presiona <strong>&quot;Aceptar&quot;</strong> el cliente sera
            eliminado y no podra revertir el proceso.
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

DialogClientDelete.propTypes = {
  data: PropTypes.array,
  open: PropTypes.bool,
  set: PropTypes.bool
};

export default DialogClientDelete;
