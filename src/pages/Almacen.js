import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import Spinner from "../components/Spinner";
import styled from "styled-components";
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
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import NoteAddTwoToneIcon from '@mui/icons-material/NoteAddTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 400px;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Almacen = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);
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
          alt={items.row.nombreProducto}
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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
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
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Typography
          sx={{ m: 1, textAlign: "center" }}
          variant="h2"
          gutterBottom
        >
          Almacen
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

          <Button variant="outlined" sx={{ m: 1 }} startIcon={<AssignmentTurnedInTwoToneIcon />}>
            Reporte Stock
          </Button>
          <Button variant="outlined" sx={{ m: 1 }} startIcon={<ArticleTwoToneIcon />}>
            Reporte Stock
          </Button>
          <Button variant="contained" sx={{ m: 1 }} endIcon={<NoteAddTwoToneIcon />}>
            Cargar Excel
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
                      alt={selectedRow.nombreProducto}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="Código Producto"
                      value={selectedRow.codProd ? selectedRow.codProd : 0}
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Cantidad"
                      value={selectedRow.stock ? selectedRow.stock : 0}
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Precio Base"
                      value={
                        selectedRow.precioBase ? selectedRow.precioBase : 0
                      }
                      margin="dense"
                    />
                    <TextField
                      disabled
                      fullWidth
                      label="Aumento de stock"
                      margin="dense"
                    />
                    <TextField
                      label="Aumento sobre el precio base"
                      id="outlined-start-adornment"
                      margin="dense"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      disabled
                      sx={{ m: 1, width: "25ch" }}
                      margin="dense"
                      id="outlined-disabled"
                      label="Total"
                      defaultValue="0"
                    />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleClose}>Aceptar</Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
};

export default Almacen;
