import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
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
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import DoDisturbOffTwoToneIcon from "@mui/icons-material/DoDisturbOffTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import DialogVentasAnular from "../components/DialogVentasAnular";
import DialogVentasImprimir from "../components/DialogVentasImprimir";

const TableContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No se encontraron resultados</Box>
    </StyledGridOverlay>
  );
}

const Ventas = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [openNull, setOpenNull] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const [selectedRowNull, setSelectedRowNull] = useState(0);
  const [selectedRowPrint, setSelectedRowPrint] = useState(0);
  const [valueI, setValueI] = React.useState(dayjs());
  const [valueF, setValueF] = React.useState(dayjs());

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "/" + mm + "/" + dd;

  const handleClickOpenNull = (params) => {
    setOpenNull(true);
    setSelectedRowNull(params);
  };

  const handleClickOpenPrint = (params) => {
    setOpenPrint(true);
    setSelectedRowPrint(params);
    setLoading(true);
  };

  const handleChangeInicio = (newValue) => {
    setValueI(newValue);
  };

  const handleChangeFinal = (newValue) => {
    setValueF(newValue);
  };

  const columns = [
    { field: "idVentaCab", headerName: "ID", hide: true, width: 80 },
    { field: "numero", headerName: "Número", width: 150 },
    { field: "comprobante", headerName: "Comprobante", width: 200 },
    { field: "razonSocial", headerName: "Razón Social", flex: true },
    { field: "total", headerName: "Total", width: 150 },
    { field: "estado", headerName: "Estado", width: 150 },
    { field: "usuario", headerName: "Usuario", width: 150 },
    {
      field: "null",
      type: "actions",
      headerName: "Anular | Imprimir",
      width: 150,
      getActions: (params) => [
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleClickOpenNull(params.row)}
        >
          <DoDisturbOffTwoToneIcon />
        </IconButton>,
        <IconButton 
          aria-label="delete" 
          color="primary" 
          onClick={() => handleClickOpenPrint(params.row)}>
          <LocalPrintshopTwoToneIcon />
        </IconButton>,
      ],
    },
  ];

  useEffect(() => {
    fetch(
      `http://appdemo1.solarc.pe/api/Venta/ConsultaVenta?IdSede=1&TipoComprobante=1&FechaDesde=${today}&FechaHasta=${today}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (result.data) {
            setItems(result.data);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const getCotizaciones = () => {
    let url = `http://appdemo1.solarc.pe/api/Venta/ConsultaVenta?IdSede=1&TipoComprobante=1&FechaDesde=${valueI.$y
      }.${parseInt(valueI.$M) + 1}.${valueI.$D}&FechaHasta=${valueF.$y
      }.${parseInt(valueF.$M) + 1}.${valueF.$D}`;
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.data) {
            setItems(result.data);
          } else {
            setItems([]);
          }
        },
        (error) => {
          setError(error);
        }
      );
  };

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
          Ventas
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
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
            />
          </div>
          <div style={{ margin: 10 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Fecha de inicio"
                  inputFormat="MM-DD-YYYY"
                  value={valueI}
                  onChange={handleChangeInicio}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Fecha de fin"
                  inputFormat="MM-DD-YYYY"
                  value={valueF}
                  onChange={handleChangeFinal}
                  renderInput={(params) => <TextField {...params} />}
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Usuario"
                    value={selectedRowNull.modelo}
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
                    value={selectedRowNull.modelo}
                  >
                    <MenuItem key="{model.id}" value="{model.descripcion}">
                      test
                    </MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={() => {
                    getCotizaciones();
                  }}
                  endIcon={<SearchTwoToneIcon />}
                >
                  Buscar
                </Button>
              </Stack>
            </LocalizationProvider>
          </div>
        </TableContainer>
        <DialogVentasAnular open={openNull} set={setOpenNull} data={selectedRowNull} />
        <DialogVentasImprimir openPrintModal={openPrint} setPrint={setOpenPrint} dataPrint={selectedRowPrint} load={loading} setLoad={setLoading} />
      </>
    );
  }
};

export default Ventas;
