import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import LoadingSpinner from "../components/LoadingSpinner";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import RemoveShoppingCartTwoToneIcon from "@mui/icons-material/RemoveShoppingCartTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import styled from "styled-components";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Cotizaciones = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsBrands, setItemsBrands] = useState([]);
  const [itemsModels, setItemsModels] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [value, setValue] = React.useState(dayjs());

  const handleClickOpen = (params) => {
    setOpen(true);
    setSelectedRow(params);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const columns = [
    { field: "numero", headerName: "Comprobante", width: 150 },
    { field: "comprobante", headerName: "Tipo", width: 150 },
    { field: "razonSocial", headerName: "Cliente", width: 250 },
    { field: "estado", headerName: "Estado", width: 120 },
    { field: "usuario", headerName: "Vendedor", width: 150 },
    { field: "total", headerName: "Total", width: 120 },
    {
      field: "actions",
      type: "actions",
      headerName: "Anular / Vender",
      width: 120,
      getActions: (params) => [
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleClickOpen(params.row)}
        >
          <RemoveShoppingCartTwoToneIcon />
        </IconButton>,
        <IconButton aria-label="delete" color="primary">
          <ShoppingCartTwoToneIcon />
        </IconButton>,
      ],
    },
  ];

  useEffect(() => {
    fetch(
      "http://appdemo1.solarc.pe/api/Cotiza/ConsultaCotiza?IdSede=1&Usuario=JGONZALES&TipoComprobante=4&FechaDesde=2022.01.01&FechaHasta=2022.09.09"
    )
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
  }, []);

  const handleGetRowId = (e) => {
    return e.numero;
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
        <Typography
          sx={{ m: 1, textAlign: "center" }}
          variant="h2"
          gutterBottom
        >
          Cotizaciones
        </Typography>
        <TableContainer>
          <div style={{ height: 650, width: "62%" }}>
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
          </div>
          <div style={{ margin: 10 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Fecha de inicio"
                  inputFormat="MM-DD-YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Fecha de fin"
                  inputFormat="MM-DD-YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Usuario"
                    value={selectedRow.modelo}
                  >
                    <MenuItem key="{model.id}" value="{model.descripcion}">
                      test
                    </MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" endIcon={<SearchTwoToneIcon />}>
                  Buscar
                </Button>
              </Stack>
            </LocalizationProvider>
          </div>
        </TableContainer>
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
                    value={selectedRow.precioBase ? selectedRow.precioBase : 0}
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
                    <InputLabel id="demo-simple-select-label">Marca</InputLabel>
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
      </>
    );
  }
};

export default Cotizaciones;
