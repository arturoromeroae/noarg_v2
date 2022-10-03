import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import styled from "styled-components";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import DoDisturbOffTwoToneIcon from "@mui/icons-material/DoDisturbOffTwoTone";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

let getSellInfo = Cookies.get("sell");
let productsCookies = getSellInfo && JSON.parse(getSellInfo);

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 400px;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Ventas = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);
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
    { field: "idVentaCab", headerName: "ID", hide: true, width: 80 },
    { field: "numero", headerName: "Número", width: 150 },
    { field: "comprobante", headerName: "Comprobante", width: 200 },
    { field: "razonSocial", headerName: "Razón Social", width: 150 },
    { field: "total", headerName: "Total", width: 150 },
    { field: "estado", headerName: "Estado", width: 150 },
    { field: "usuario", headerName: "Usuario", width: 150 },
    {
      field: "null",
      type: "actions",
      headerName: "Anular",
      width: 100,
      getActions: (params) => [
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => handleClickOpen(params.row)}
        >
          <DoDisturbOffTwoToneIcon />
        </IconButton>,
      ],
    },
    {
      field: "print",
      type: "actions",
      headerName: "Imprimir",
      width: 100,
      getActions: (params) => [
        <IconButton aria-label="delete" color="primary">
          <LocalPrintshopTwoToneIcon />
        </IconButton>,
      ],
    },
  ];

  useEffect(() => {
    fetch(
      "http://appdemo1.solarc.pe/api/Venta/ConsultaVenta?IdSede=1&TipoComprobante=1&FechaDesde=2021-01-02&FechaHasta=2022-09-09"
    )
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
    return e.idVentaCab;
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
          Ventas
        </Typography>
        <TableContainer>
          <div style={{ height: 650, width: "70%" }}>
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
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Tipo de Comprobante
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tipo de Comprobante"
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
      </>
    );
  }
};

export default Ventas;
