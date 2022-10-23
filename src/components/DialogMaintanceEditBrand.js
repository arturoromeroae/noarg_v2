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

const DialogMaintanceEditBrand = ({ action, set }) => {
  const [brand, setBrand] = useState();
  const [brandCode, setBrandCode] = useState();
  const [editBrand, setEditBrand] = useState([]);
  const [itemsBrands, setItemsBrands] = useState();
  const [load, setLoad] = useState();
  useEffect(() => {
    fetch("http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=marca")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsBrands(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [action]);

  const handleClose = () => {
    set(false);
    setEditBrand("");
    setBrand("");
  };

  const handleChange = (e) => {
    setBrand(e.target.value);
  };

  console.log(brand);

  const handleChangeSelect = (e) => {
    setEditBrand(e.target.value);
    setBrand(e.target.value);
    setBrandCode(
      itemsBrands.filter((p) => p.descripcion === e.target.value)[0].id
    );
  };

  const handleCreate = () => {
    setLoad(true);
    let md = {
      tabla: "marca",
      idParam: brandCode,
      descripcion: brand,
    };

    // Editar marca
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
          setBrand("");
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
      tabla: "marca",
      idParam: brandCode,
      descripcion: brand,
    };

    // Eliminar marca
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
          setBrand("");
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
        <DialogTitle id="alert-dialog-title-brand" sx={{ textAlign: "center" }}>
          Editar Marca
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText sx={{ m: 2 }} id="alert-dialog-description-brand">
            Seleccione la marca a editar o eliminar.<br/>(Los campos con * son requeridos)
          </DialogContentText>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl required sx={{ m: 1, width: "30ch" }}>
              <InputLabel id="edit-brand-label">Marcas</InputLabel>
              <Select
                labelId="edit-brand-label"
                id="edit-model-select"
                value={editBrand}
                onChange={handleChangeSelect}
                label="Marcas"
              >
                {itemsBrands &&
                  itemsBrands.map((m) => (
                    <MenuItem key={m.descripcion} value={m.descripcion}>
                      {m.descripcion}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ m: 1, width: "20ch" }}
              label="Editar Marca"
              margin="dense"
              value={brand}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            {!load ? (
              <IconButton
                aria-label="delete"
                disabled={!brand}
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
            <Button onClick={handleCreate} disabled={!brand} autoFocus>
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

DialogMaintanceEditBrand.propTypes = {
  action: PropTypes.bool,
  set: PropTypes.bool,
};

export default DialogMaintanceEditBrand;
