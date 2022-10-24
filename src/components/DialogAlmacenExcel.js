import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const DialogAlmacenExcel = ({
  open,
  set,
  actionAlert,
  actionAlertError,
  text,
}) => {
  const [file, setFile] = useState();
  const [load, setLoad] = useState(false);
  const handleClose = () => {
    set(false);
    setFile("");
  };

  const handleChange = (e) => {
    setFile(e.target.value);
  };

  const handleUpload = () => {
    setLoad(true);
    const selectedExcel = document.getElementById("inputExcel");
    let formdata = new FormData();
    formdata.append("FileData", selectedExcel.files[0]);
    formdata.append("IdUsuarioCreacion", "1");
    let fileUpoad = {
      method: "POST",
      body: formdata,
    };

    // Agregar marca
    if (formdata) {
      text("!Se subio el archivo correctamente!");
      fetch("http://appdemo1.solarc.pe/api/Productos/UploadFileXLS", fileUpoad)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          set(false);
          setLoad(false);
          setFile("");
          if(data.code === "500"){
            actionAlertError(true);
          }else{
            actionAlert(true);
          }
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
          Cargar archivo Excel
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description" sx={{ m: 2 }}>
            Seleccione el archivo <strong>&quot;.xlsx&quot;</strong>.
            <br />
            (Los campos con * son requeridos)
          </DialogContentText>
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Seleccionar archivo
            <input
              id="inputExcel"
              onChange={handleChange}
              hidden
              accept=".xlsx"
              type="file"
            />
          </Button>
          <TextField
            sx={{ m: 1, width: "30ch" }}
            label="Archivo"
            margin="dense"
            value={file && file}
            InputLabelProps={{ shrink: true }}
            required
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={load} onClick={handleClose} color="error">
            Cancelar
          </Button>
          {!load ? (
            <Button onClick={handleUpload} disabled={!file} autoFocus>
              Enviar
            </Button>
          ) : (
            <LoadingButton loading>Enviar</LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogAlmacenExcel.propTypes = {
  open: PropTypes.bool,
  set: PropTypes.bool,
  actionAlert: PropTypes.bool,
  actionAlertError: PropTypes.bool,
  text: PropTypes.string,
};

export default DialogAlmacenExcel;
