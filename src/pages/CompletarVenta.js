import React from "react";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import TextField from '@mui/material/TextField';

let getSellInfo = Cookies.get("sell");
let productsCookies = getSellInfo && JSON.parse(getSellInfo);

const sellContainer = styled.div`
  display: flex;
`

const rows = [
  { field: "idProducto", headerName: "ID", hide: true, width: 80 },
  { field: "codProd", headerName: "Código", width: 100 },
  { field: "nombreProducto", headerName: "Producto", width: 220 },
  { field: "marca", headerName: "Marca", width: 80 },
  { field: "precioVenta", headerName: "Precio", width: 80 },
  { field: "", headerName: "Cantidad", width: 80 },
  { field: "total", headerName: "Total", width: 80 },
];

const CompletarVenta = () => {
  if (!productsCookies) {
    return <Navigate to="/repuestos" replace />;
  }

  const handleGetRowId = (e) => {
    return e.idProducto;
  };

  return (
    <>
      <Header />
      <Typography sx={{ m: 1, textAlign: "center" }} variant="h2" gutterBottom>
        Emitir Comprobante
      </Typography>
      <sellContainer>
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
          />
        </Box>
        <div>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </div>
      </sellContainer>
    </>
  );
};

export default CompletarVenta;
