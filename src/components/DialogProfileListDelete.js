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

const DialogProfileListDelete = ({ data, open, set, actionAlert, text }) => {
  const [load, setLoad] = useState(false);
  const handleClose = () => {
    set(false);
  };

  // Eliminar usuario
  const handleDelete = () => {
    let us = {
      userName: data.userName,
      userPass: 0,
      nombres: "string",
      idPerfil: data.idPerfil,
      idTienda: 1,
      estadoReg: 0,
    };

    if (us) {
      setLoad(true);
      text("Se elimino el usuario correctamente");
      fetch("http://appdemo1.solarc.pe/api/Account/UsuariosActualizar", {
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
          actionAlert(true);
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
          {` ¿Desea eliminar el usuario ${data && data.userName}?`}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Si presiona <strong>&quot;Aceptar&quot;</strong> el usuario sera
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

DialogProfileListDelete.propTypes = {
  data: PropTypes.array,
  open: PropTypes.bool,
  set: PropTypes.bool,
  actionAlert: PropTypes.bool,
  text: PropTypes.string,
};

export default DialogProfileListDelete;
