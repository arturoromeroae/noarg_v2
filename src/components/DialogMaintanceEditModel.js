import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

const DialogMaintanceEditModel = ({ action, set }) => {
  const [model, setModel] = useState();
  const [modelCode, setModelCode] = useState();
  const [editModel, setEditModel] = useState([]);
  const [itemsModels, setItemsModels] = useState();
  const [load, setLoad] = useState();
  useEffect(() => {
    fetch("http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=modelo")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsModels(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [action]);

  const handleClose = () => {
    set(false);
    setEditModel("");
    setModel("");
  };

  const handleChange = (e) => {
    setModel(e.target.value);
  };

  console.log(model);

  const handleChangeSelect = (e) => {
    setEditModel(e.target.value);
    setModel(e.target.value);
    setModelCode(
      itemsModels.filter((p) => p.descripcion === e.target.value)[0].id
    );
  };

  const handleCreate = () => {
    setLoad(true);
    let md = {
      tabla: "modelo",
      idParam: modelCode,
      descripcion: model,
    };

    // Editar modelo
    if (md) {
      fetch("http://appdemo1.solarc.pe/api/Parametros/ModificarParametros", {
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
          setModel("");
          setLoad(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleDelete = () => {
    setLoad(true);
    let mdDelete = {
      tabla: "modelo",
      idParam: modelCode,
      descripcion: model,
    };

    // Eliminar modelo
    if (mdDelete) {
      fetch("http://appdemo1.solarc.pe/api/Parametros/EliminarParametros", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mdDelete),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          set(false);
          setModel("");
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
          Editar Modelo
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText sx={{ m: 2 }} id="alert-dialog-description">
            Seleccione el modelo a editar o eliminar.<br/>(Los campos con * son requeridos)
          </DialogContentText>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl required sx={{ m: 1, width: "30ch" }}>
              <InputLabel id="edit-model-label">Modelos</InputLabel>
              <Select
                labelId="edit-model-label"
                id="edit-model-select"
                value={editModel}
                onChange={handleChangeSelect}
                label="Modelos"
              >
                {itemsModels &&
                  itemsModels.map((m) => (
                    <MenuItem key={m.descripcion} value={m.descripcion}>
                      {m.descripcion}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ m: 1, width: "20ch" }}
              label="Editar Modelo"
              margin="dense"
              value={model}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            {!load ? (
              <IconButton
                aria-label="delete"
                disabled={!model}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <LoadingButton loading></LoadingButton>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={load} color="error">
            Cancelar
          </Button>
          {!load ? (
            <Button onClick={handleCreate} disabled={!model} autoFocus>
              Actualizar
            </Button>
          ) : (
            <LoadingButton loading></LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogMaintanceEditModel.propTypes = {
  action: PropTypes.bool,
  set: PropTypes.bool,
};

export default DialogMaintanceEditModel;
