import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import defaultImage from "../image/default-image.jpg";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Shop2TwoToneIcon from '@mui/icons-material/Shop2TwoTone';
import QueueTwoToneIcon from '@mui/icons-material/QueueTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import LoadingSpinner from "../components/LoadingSpinner";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Mantenimiento = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsBrands, setItemsBrands] = useState([]);
  const [itemsModels, setItemsModels] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);

  const handleClickOpen = (params) => {
    setOpen(true);
    setSelectedRow(params);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "idProducto", headerName: "ID", hide: true, width: 80 },
    { field: "codProd", headerName: "Codigo", width: 150 },
    { field: "nombreProducto", headerName: "Producto", width: 500 },
    { field: "descripcion", headerName: "Descripcion", width: 500 },
    { field: "stock", headerName: "Cantidad", width: 100 },
    { field: "precioBase", headerName: "P. Base", width: 90 },
    { field: "precioVenta", headerName: "P. Venta", width: 90 },
    { field: "marca", headerName: "Marca", width: 100 },
    { field: "modelo", headerName: "Modelo", width: 100 },
    { field: "ubicacion", headerName: "Ubicacion", width: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Accion",
      width: 100,
      getActions: (params) => [
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => handleClickOpen(params.row)}
        >
          <EditIcon />
        </IconButton>,
        <IconButton aria-label="delete" color="secondary">
          <DeleteIcon />
        </IconButton>,
      ],
    },
    {
      field: "image",
      headerName: "Imagen",
      width: 100,
      renderCell: (items) => (
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = defaultImage;
          }}
          width={100}
          src={`http://appdemo1.solarc.pe/imagenes/${items.row.codProd}.JPG`}
          alt={
            items.row.nombreProducto
              ? items.row.nombreProducto
              : "Imagen por defeto"
          }
        />
      ),
    },
  ];

  useEffect(() => {
    fetch("http://appdemo1.solarc.pe/api/Productos/GetProductos")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    fetch("http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=marca")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsBrands(result.data);
        },
        (error) => {
          setError(error);
        }
      );

    fetch("http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=modelo")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsModels(result.data);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  const handleGetRowId = (e) => {
    return e.idProducto;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <>
        <Header />
        <LoadingSpinner />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Typography sx={{ m: 1, textAlign: "center" }} variant="h2" gutterBottom>
          Mantenimiento
        </Typography>
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={items}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={handleGetRowId}
            initialState={{
              sorting: {
                sortModel: [
                  {
                    field: "codProd",
                    sort: "asc",
                  },
                ],
              },
            }}
          />
          <Button sx={{ m: 1 }} variant="contained" startIcon={<Shop2TwoToneIcon />}>
            Agregar Producto
          </Button>
          <Button sx={{ m: 1 }} variant="outlined" color="success" endIcon={<QueueTwoToneIcon />}>
            Agregar Marca
          </Button>
          <Button sx={{ m: 1 }} variant="outlined" color="success" endIcon={<DriveFileRenameOutlineTwoToneIcon />}>
            Editar Marca
          </Button>
          <Button sx={{ m: 1 }} variant="outlined" endIcon={<QueueTwoToneIcon />}>
            Agregar Modelo
          </Button>
          <Button sx={{ m: 1 }} variant="outlined" endIcon={<DriveFileRenameOutlineTwoToneIcon />}>
            Editar Modelo
          </Button>

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
          >
            <DialogTitle>{selectedRow.nombreProducto}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = defaultImage;
                      }}
                      width={250}
                      src={`http://appdemo1.solarc.pe/imagenes/${selectedRow.codProd}.JPG`}
                      alt={
                        selectedRow.nombreProducto
                          ? selectedRow.nombreProducto
                          : "Imagen por defeto"
                      }
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      sx={{ width: "30ch" }}
                      label="Código Producto"
                      value={selectedRow.codProd ? selectedRow.codProd : 0}
                      margin="dense"
                    />
                    <TextField
                      sx={{ m: 1, width: "31ch" }}
                      label="Producto"
                      value={
                        selectedRow.nombreProducto
                          ? selectedRow.nombreProducto
                          : ""
                      }
                      margin="dense"
                    />
                    <TextField
                      sx={{ width: "62ch" }}
                      multiline
                      label="Descripción"
                      value={
                        selectedRow.descripcion ? selectedRow.descripcion : ""
                      }
                      margin="dense"
                    />
                    <TextField
                      sx={{ width: "20ch" }}
                      label="Cantidad"
                      value={selectedRow.stock ? selectedRow.stock : 0}
                      margin="dense"
                    />
                    <TextField
                      sx={{ m: 1, width: "20ch" }}
                      label="Precio Base"
                      value={
                        selectedRow.precioBase ? selectedRow.precioBase : 0
                      }
                      margin="dense"
                    />
                    <TextField
                      sx={{ width: "20ch" }}
                      label="Precio Venta"
                      value={
                        selectedRow.precioVenta ? selectedRow.precioVenta : 0
                      }
                      margin="dense"
                    />
                    <TextField
                      sx={{ width: "41ch" }}
                      id="outlined-basic"
                      variant="outlined"
                      type="file"
                      inputProps={{
                        multiple: true,
                      }}
                    />
                    <FormControl sx={{ ml: 1, width: "20ch" }}>
                      <InputLabel id="demo-simple-select-label">
                        Marca
                      </InputLabel>
                      {selectedRow.marca && (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Marca"
                          value={selectedRow.marca}
                        >
                          {itemsBrands.map((brand) => (
                            <MenuItem key={brand.id} value={brand.descripcion}>
                              {brand.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </FormControl>
                    <FormControl sx={{ my: 1, width: "20ch" }}>
                      <InputLabel id="demo-simple-select-label">
                        Modelo
                      </InputLabel>
                      {selectedRow.modelo && (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Modelo"
                          value={selectedRow.modelo}
                        >
                          {itemsModels.map((model) => (
                            <MenuItem key={model.id} value={model.descripcion}>
                              {model.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </FormControl>
                    <TextField
                      sx={{ m: 1, width: "41ch" }}
                      margin="dense"
                      id="outlined-disabled"
                      label="Ubicación"
                      value={selectedRow.ubicacion ? selectedRow.ubicacion : 0}
                    />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleClose}>Modificar</Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
};

export default Mantenimiento;
