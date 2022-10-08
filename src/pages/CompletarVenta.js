import React, { useState } from "react";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import Button from "@mui/material/Button";
import LocalOfferTwoToneIcon from "@mui/icons-material/LocalOfferTwoTone";
import Divider from "@mui/material/Divider";
import ReceiptLongTwoToneIcon from "@mui/icons-material/ReceiptLongTwoTone";
import MoneyOffTwoToneIcon from "@mui/icons-material/MoneyOffTwoTone";

const SellContainer = styled.div`
  display: flex;
`;

const BillContainer = styled.div`
  margin: 20px;
  width: 50%;
`;

const CompletarVenta = () => {
  const [pay, setPay] = useState();
  let getSellInfo = Cookies.get("sell");
  let productsCookies = getSellInfo && JSON.parse(getSellInfo);
  let lodash = require("lodash");
  let allPrices = [];
  let total = lodash.sum(allPrices);
  const selectedRow = "";

  const rows = [
    { field: "idProducto", headerName: "ID", hide: true, width: 80 },
    { field: "codProd", headerName: "Código", width: 100 },
    { field: "nombreProducto", headerName: "Producto", width: 220 },
    { field: "marca", headerName: "Marca", width: 80 },
    { field: "precioVenta", headerName: "Precio", width: 80 },
    { field: "cantidad", headerName: "Cantidad", width: 80 },
    { headerName: "Total", width: 80, valueGetter: (params) => params.row.cantidad * params.row.precioVenta },
  ];

  if (!productsCookies) {
    return <Navigate to="/repuestos" replace />;
  }

  let sum = 0;

  productsCookies.forEach(element => {
    sum += element.cantidad * element.precioVenta;
  });

  const handleGetRowId = (e) => {
    return e.idProducto;
  };

  const handleChange = event => {
    setPay(event.target.value);
    console.log('value is:', event.target.value);
  };

  return (
    <>
      <Header />
      <Typography sx={{ m: 1, textAlign: "center" }} variant="h2" gutterBottom>
        Emitir Comprobante
      </Typography>
      <SellContainer>
        <Box sx={{ p: 2, height: 650, width: "50%" }}>
          <DataGrid
            getRowId={handleGetRowId}
            rows={productsCookies}
            columns={rows}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
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
        </Box>
        <BillContainer>
          <FormControl sx={{ minWidth: 210 }}>
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
          <TextField
            sx={{ ml: 5 }}
            id="outlined-basic"
            label="Cliente"
            variant="outlined"
          />
          <TextField
            sx={{ ml: 5 }}
            id="outlined-basic"
            label="RUC"
            variant="outlined"
          />
          <TextField
            sx={{ mt: 5 }}
            id="outlined-basic"
            label="Subtotal"
            variant="outlined"
            value={sum ? sum.toFixed( 2 ) : 0}
            disabled
          />
          <TextField
            sx={{ m: 5 }}
            id="outlined-basic"
            label="Monto a Pagar"
            variant="outlined"
            value={sum ? (sum * 1.18).toFixed( 2 ) : 0}
            disabled
          />
          <TextField
            sx={{ mt: 5 }}
            id="outlined-basic"
            label="Pagó con soles"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Vuelto"
            variant="outlined"
            disabled
          />
          <Button
            sx={{ width: "215px", ml: 5, mt: 2 }}
            variant="outlined"
            endIcon={<AddCircleTwoToneIcon />}
          >
            Agregar productos
          </Button>
          <Divider sx={{ marginTop: "50px" }} />
          <Typography
            sx={{ m: 5, textAlign: "center" }}
            variant="h5"
            gutterBottom
            color="primary"
          >
            <LocalOfferTwoToneIcon color="primary" /> Descuentos Adicionales
          </Typography>
          <TextField
            sx={{ mr: 5 }}
            id="outlined-basic"
            label="Monto a pagar"
            variant="outlined"
            value={sum ? (sum * 1.18).toFixed( 2 ) : 0}
            disabled
          />
          <FormControl sx={{ minWidth: 210 }}>
            <InputLabel id="demo-simple-select-label">Descuento</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Descuento"
              value={selectedRow.modelo}
            >
              <MenuItem key="{model.id}" value="{model.descripcion}">
                test
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ ml: 5 }}
            id="outlined-basic"
            label="Monto del descuento"
            variant="outlined"
          />
          <TextField
            sx={{ mt: 5 }}
            id="outlined-basic"
            label="Nuevo precio de venta"
            variant="outlined"
          />
          <Button
            sx={{ width: "215px", mt: 15 }}
            variant="contained"
            endIcon={<ReceiptLongTwoToneIcon />}
          >
            Emitir Comprobante
          </Button>
          <Button
            sx={{ width: "215px", mt: 15, ml: 2 }}
            variant="contained"
            endIcon={<MoneyOffTwoToneIcon />}
            color="error"
          >
            Cancelar Compra
          </Button>
        </BillContainer>
      </SellContainer>
    </>
  );
};

export default CompletarVenta;
