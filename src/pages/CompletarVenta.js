import React, { useEffect, useState } from "react";
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
import DialogAdd from "../components/DialogAdd";
import CreditCardTwoToneIcon from "@mui/icons-material/CreditCardTwoTone";
import InputAdornment from "@mui/material/InputAdornment";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import Clients from "../components/ClientsAuto";
import IconButton from "@mui/material/IconButton";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import DialogAlert from "../components/DialogAlert";

const SellContainer = styled.div`
  display: flex;
`;

const BillContainer = styled.div`
  margin: 20px;
  width: 50%;
`;

const FormContainer = styled.form``;

const InputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CompletarVenta = () => {
  const [pay, setPay] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [billType, setBillType] = useState();
  const [billNumber, setBillNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [newProducts, setNewProducts] = useState();
  const [action, setAction] = useState(false);

  let getSellInfo = Cookies.get("sell");
  let productsCookies = getSellInfo && JSON.parse(getSellInfo);
  const selectedRow = "";

  const rows = [
    { key: 1, field: "idProducto", headerName: "ID", hide: true, width: 80 },
    { key: 2, field: "codProd", headerName: "Código", width: 100 },
    { key: 3, field: "nombreProducto", headerName: "Producto", width: 250 },
    { key: 4, field: "marca", headerName: "Marca", width: 80 },
    { key: 5, field: "precioVenta", headerName: "Precio (S/)", width: 90 },
    { key: 6, field: "cantidad", headerName: "Cantidad", width: 80 },
    {
      key: 7,
      headerName: "Total",
      width: 80,
      valueGetter: (params) =>
        "S/ " + params.row.cantidad * params.row.precioVenta,
    },
    { key: 8, field: "ubicacion", headerName: "Ubicación", width: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Eliminar",
      width: 80,
      getActions: (params) => [
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleAlert(params.row.idProducto)}
        >
          <DeleteForeverTwoToneIcon />
        </IconButton>,
      ],
    },
  ];

  if (!productsCookies) {
    return <Navigate to="/repuestos" replace />;
  }

  let sum = 0;

  productsCookies.forEach((element) => {
    sum += element.cantidad * element.precioVenta;
  });

  const handleGetRowId = (e) => {
    return e.idProducto;
  };

  const handleChange = (event) => {
    setPay(event.target.value);
  };

  const handleActionModal = (action) => {
    if (action === "open") {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  const handleBillNumber = (event) => {
    setBillType(event.target.value);
  };

  const handleAlert = (productId) => {
    setNewProducts(
      productsCookies.filter((product) => product.idProducto !== productId)
    );
    setAction(true);
  };

  const handleDelete = () => {
    if (newProducts) {
      Cookies.set("sell", JSON.stringify(newProducts).toString(), {
        expires: 0.3,
      });
    }
    setAction(false);
  };

  useEffect(() => {
    if (billType > 0) {
      fetch(
        `http://appdemo1.solarc.pe/api/Maestro/GetNroComprobante?IdTipoDoc=${billType}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setBillNumber(result.data);
            setLoading(true);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [billType]);

  return (
    <>
      <Header />
      <Typography sx={{ m: 1, textAlign: "center" }} variant="h2" gutterBottom>
        Emitir Comprobante
      </Typography>
      <SellContainer>
        <Box sx={{ p: 2, height: 650, width: "55%" }}>
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
          <Typography
            sx={{ mb: 2, textAlign: "center" }}
            variant="h5"
            gutterBottom
            color="primary"
          >
            <CreditCardTwoToneIcon color="primary" /> Datos de la compra
          </Typography>
          <FormContainer>
            <InputsContainer>
              <FormControl sx={{ m: 2, minWidth: 210 }} required>
                <InputLabel id="demo-simple-select-label">
                  Tipo Comprobante
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Tipo Comprobante"
                  value={billType}
                  onChange={handleBillNumber}
                >
                  <MenuItem key="nota" value={1}>
                    Nota de Venta
                  </MenuItem>
                  <MenuItem key="boleta" value={2}>
                    Boleta de Venta
                  </MenuItem>
                  <MenuItem key="factura" value={3}>
                    Factura
                  </MenuItem>
                  <MenuItem key="cotizacion" value={4}>
                    Cotización
                  </MenuItem>
                </Select>
              </FormControl>
              <Clients />
              {billType > 1 && billType < 4 && (
                <TextField
                  sx={{ m: 2 }}
                  id="outlined-basic"
                  label="RUC"
                  variant="outlined"
                  type="text"
                />
              )}
              <TextField
                sx={{ m: 2 }}
                id="outlined-basic"
                label="Subtotal"
                variant="outlined"
                value={sum ? "S/ " + sum.toFixed(2) : 0}
                disabled
              />
              <TextField
                sx={{ m: 2 }}
                id="outlined-basic"
                label="Monto a Pagar"
                variant="outlined"
                value={sum ? "S/ " + (sum * 1.18).toFixed(2) : 0}
                disabled
              />
              <TextField
                sx={{ m: 2 }}
                id="outlined-basic"
                label="Pagó con soles"
                variant="outlined"
                onChange={handleChange}
                type="number"
                required
              />
              <TextField
                sx={{ m: 2 }}
                id="outlined-basic"
                label="Vuelto"
                variant="outlined"
                value={pay ? "S/ " + (pay - sum * 1.18).toFixed(2) : "S/ " + 0}
                disabled
              />
              <TextField
                sx={{ m: 2, maxWidth: "210px" }}
                id="input-with-icon-textfield"
                label="Numero de Factura"
                value={
                  loading
                    ? billNumber[0].serieDoc + "-" + billNumber[0].nroDoc
                    : null
                }
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PointOfSaleRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <Button
                sx={{ width: "200px", height: "50px", p: 0, m: 2 }}
                variant="outlined"
                endIcon={<AddCircleTwoToneIcon />}
                onClick={() => handleActionModal("open")}
              >
                Agregar productos
              </Button>
            </InputsContainer>
            <Divider sx={{ marginTop: "30px" }} />
            <Typography
              sx={{ m: 1, textAlign: "center" }}
              variant="h5"
              gutterBottom
              color="secondary"
            >
              <LocalOfferTwoToneIcon color="secondary" /> Descuentos Adicionales
            </Typography>
            <TextField
              sx={{ m: 2 }}
              id="outlined-basic"
              label="Monto a pagar"
              variant="outlined"
              value={sum ? "S/ " + (sum * 1.18).toFixed(2) : 0}
              disabled
            />
            <FormControl sx={{ m: 2, minWidth: 210 }}>
              <InputLabel id="demo-simple-select-label">Descuento</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Descuento"
                value={selectedRow.modelo}
              >
                <MenuItem key="{model.id}" value="0">
                  S/
                </MenuItem>
                <MenuItem key="{model.id}" value="1">
                  %
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ m: 2 }}
              id="outlined-basic"
              label="Monto del descuento"
              variant="outlined"
            />
            <TextField
              sx={{ m: 2 }}
              id="outlined-basic"
              label="Nuevo precio de venta"
              variant="outlined"
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ width: "215px", m: 1 }}
                variant="contained"
                endIcon={<ReceiptLongTwoToneIcon />}
              >
                Emitir Comprobante
              </Button>
              <Button
                sx={{ width: "215px", m: 1 }}
                variant="contained"
                endIcon={<MoneyOffTwoToneIcon />}
                color="error"
              >
                Cancelar Compra
              </Button>
            </div>
          </FormContainer>
        </BillContainer>
      </SellContainer>

      <DialogAdd addProduct={handleActionModal} action={openModal} />
      <DialogAlert
        deleteProduct={handleDelete}
        action={action}
        cancel={setAction}
      />
    </>
  );
};

export default CompletarVenta;
