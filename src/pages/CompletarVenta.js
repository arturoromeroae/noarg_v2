import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
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
import DialogClient from "../components/DialogClients";
import CreditCardTwoToneIcon from "@mui/icons-material/CreditCardTwoTone";
import InputAdornment from "@mui/material/InputAdornment";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import Clients from "../components/ClientsAuto";
import IconButton from "@mui/material/IconButton";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import DialogAlert from "../components/DialogAlert";
import print from "../components/PdfBill";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ClientsDni from "../components/ClientsDniAuto";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HomeIcon from "@mui/icons-material/Home";
import ContactMailTwoToneIcon from "@mui/icons-material/ContactMailTwoTone";
import PaymentsIcon from "@mui/icons-material/Payments";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import FaceRetouchingNaturalTwoToneIcon from "@mui/icons-material/FaceRetouchingNaturalTwoTone";

const SellContainer = styled.div`
  display: flex;
  @media (max-width: 800px) {
    display: inline-block;
  }
`;

const TableContainer = styled.div`
  padding: 20px;
  height: 730px;
  width: 55%;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0;
    margin: 0;
  }
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
  @media (max-width: 800px) {
    display: block;
    width: 100%;
    flex-wrap: nowrap;
  }
`;

const CompletarVenta = () => {
  const [pay, setPay] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModalClient, setOpenModalClient] = useState(false);
  const [billType, setBillType] = useState();
  const [billNumber, setBillNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingSell, setLoadingSell] = useState(false);
  const [newProducts, setNewProducts] = useState();
  const [action, setAction] = useState(false);
  const [name, setName] = useState();
  const [cl, setCl] = useState();
  const [clDni, setClDni] = useState();
  const [cliente, setCliente] = useState();
  const [direccion, setDireccion] = useState();
  const [referencia, setReferencia] = useState();
  const [email, setEmail] = useState();
  const [textErrorCl, setTextErrorCl] = useState("");
  const [textErrorPay, setTextErrorPay] = useState("");
  const [customErrorCl, setCustomErrorCl] = useState(false);
  const [customErrorPay, setCustomErrorPay] = useState(false);
  const [data, setData] = useState();
  const [idCab, setIdCab] = useState();
  const [cart, setCart] = useState();
  const [clientsCompare, setClientsCompare] = useState();
  const [ruc, setRuc] = useState();
  const [dni, setDni] = useState();
  const [razonSocial, setRazonSocial] = useState();
  const [tipoCl, setTipoCl] = useState(0);
  const selectedRow = "";
  const navigate = useNavigate();

  // Cookies productos
  let getSellInfo = localStorage.getItem("sell");
  let productsCookies = getSellInfo && JSON.parse(getSellInfo);

  // Cookies usuario
  let getUserInfo = Cookies.get("user");
  let user = getUserInfo && JSON.parse(getUserInfo);

  // Obtener la fecha
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  // Informacion RUC y razon social
  useEffect(() => {
    // Obtener clientes
    fetch("http://appdemo1.solarc.pe/api/Cliente/GetClientes")
      .then((res) => res.json())
      .then(
        (result) => {
          setClientsCompare(result.data);
        },
        (error) => {
          console.error(error);
        }
      );
  }, []);

  useEffect(() => {
    if (cl && cl.rucCliente) {
      setRuc(cl.rucCliente);
      setDni("");
      setTipoCl(1);
      setRazonSocial(cl.razonSocial);
      setCliente(cl.razonSocial);
      setDireccion(cl.direccion);
      setClDni("");
    } else if (clDni && clDni.dni) {
      setDni(clDni.dni);
      setRuc("");
      setTipoCl(2);
      setRazonSocial(clDni.razonSocial);
      setCliente(clDni.nombres);
      setDireccion(clDni.direccion);
      setCl("");
    } else {
      if (clDni) {
        setCliente(cliente);
        setDireccion(direccion);
        setDni(clDni);
        setRuc("");
        setRazonSocial(direccion);
        setTipoCl(2);
      } else if (cl) {
        setCliente(cliente);
        setDireccion(direccion);
        setDni("");
        setRuc(cl);
        setRazonSocial(direccion);
        setTipoCl(1);
      }
    }
  }, [clDni, cl]);

  // Obtener la hora
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  let h = addZero(today.getHours());
  let m = addZero(today.getMinutes());
  let s = addZero(today.getSeconds());
  let time = h + ":" + m + ":" + s;

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
          key={params.row.idProducto}
          aria-label="delete"
          color="error"
          onClick={() => handleAlert(params.row)}
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

  const handleChangeClient = (e) => {
    setCliente(e.target.value);
  };

  const handleChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };

  const handleChangeReferencia = (e) => {
    setReferencia(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePay = (e) => {
    setPay(e.target.value);
  };

  const handleChangeDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const handleActionModal = (action) => {
    if (action === "open") {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  const handleActionModalClient = (action) => {
    if (action === "open") {
      setOpenModalClient(true);
      setCl("");
      setClDni("");
    } else {
      setOpenModalClient(false);
      setCl("");
      setClDni("");
    }
  };

  const handleBillNumber = (event) => {
    setBillType(event.target.value);
  };

  const handleAlert = (productId) => {
    setNewProducts(
      productsCookies.filter(
        (product) => product.idProducto !== productId.idProducto
      )
    );
    setAction(true);
    setName(productId);
  };

  const handleDelete = () => {
    if (newProducts) {
      localStorage.setItem("sell", JSON.stringify(newProducts).toString());
    }
    setAction(false);
  };

  const handleCancelSell = () => {
    localStorage.removeItem("sell");
    navigate("/repuestos");
  };

  const handleSell = () => {
    setCustomErrorCl(false);
    setCustomErrorPay(false);
    setTextErrorCl("");
    setTextErrorPay("");

    if (billType !== 4) {
      if (cliente && pay) {
        setLoadingSell(true);
        print(
          productsCookies,
          cliente,
          dni,
          email,
          referencia,
          direccion,
          pay,
          billNumber,
          billType,
          sum,
          discount,
          ruc,
          razonSocial
        );
        setData({
          usuario: user.userName,
          idOrigen: 0,
          total: (sum * 1.18).toFixed(2),
          carritoDet: productsCookies,
        });
      } else if (!cliente) {
        setCustomErrorCl(true);
        setTextErrorCl("Debe introducir el cliente");
      } else if (billType !== 4) {
        setCustomErrorPay(true);
        setTextErrorPay("Debe introducir el monto");
      }
    } else {
      if (cl || cliente !== "") {
        setLoadingSell(true);
        print(
          productsCookies,
          cl,
          dni,
          direccion,
          pay,
          billNumber,
          billType,
          sum,
          discount,
          ruc,
          razonSocial
        );
        setData({
          usuario: user.userName,
          idOrigen: 0,
          total: sum.toFixed(2),
          carritoDet: productsCookies,
        });
      } else if (!cl || cliente === "") {
        setCustomErrorCl(true);
        setTextErrorCl("Debe introducir el cliente");
      }
    }
  };

  // Obtener numero de comprobante
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

  // Insertar carrito
  useEffect(() => {
    if (data) {
      fetch("http://appdemo1.solarc.pe/api/Carrito/InsertaCarrito", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setIdCab(data["data"]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [data]);

  // Obtener carrito
  useEffect(() => {
    if (idCab) {
      fetch(
        `http://appdemo1.solarc.pe/api/Carrito/GetCarrito?IdCarrito=${idCab}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setCart(result["data"]);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [idCab]);

  // Insertar venta
  let sellData = {
    fecha: `${yyyy}-${mm}-${dd}T${time}`,
    idCliente: 1,
    tipoVenta: billType,
    subTotal: sum,
    igv: sum * 0.18,
    total: sum,
    vuelto: pay - sum,
    porcDscto: 0,
    valorDscto: 0,
    valorVenta: sum,
    idSede: 1,
    idPedCab: idCab,
    usuario: `${user.userName}`,
    rucCliente: ruc,
    razonSocial: razonSocial,
    idOrigen: 1,
    ventaDet: cart,
  };

  // Insertar cotizacion
  let cotizeData = {
    fecha: `${yyyy}-${mm}-${dd}T${time}`,
    idCliente: 1,
    tipoVenta: billType,
    subTotal: sum,
    igv: sum * 0.18,
    total: sum,
    vuelto: pay - sum,
    porcDscto: 0,
    valorDscto: 0,
    valorVenta: sum,
    idSede: 1,
    idPedCab: idCab,
    usuario: `${user.userName}`,
    rucCliente: ruc,
    razonSocial: razonSocial,
    idOrigen: 1,
    cotizaDet: cart,
  };

  // Enviar email
  let emailData = {
    destinatario: "string",
    asunto: "Venta",
    cliente: cl,
    fecha: `${yyyy}-${mm}-${dd}T${time}`,
    documento: dni ? dni : ruc,
    subTotal: sum / 1.18,
    igv: 0,
    total: sum,
    emailDet: cart,
  };

  // Cliente de la venta
  let clienteVenta = {
    idCliente: 0,
    idTipoCliente: tipoCl,
    rucCliente: ruc,
    razonSocial: cliente,
    direccion: direccion,
    dni: dni,
    apellidos: "",
    nombres: cliente,
    email: email,
    teléfono: "string",
    referencia: referencia,
  };

  let clienteDni = null;

  useEffect(() => {
    if (billType !== 4 && cart) {
      if (typeof cl === "object") {
        clienteDni = clientsCompare.findIndex(
          (cp) => cp.rucCliente === cl.rucCliente
        );
      }

      if (typeof clDni === "object") {
        clienteDni = clientsCompare.findIndex((cp) => cp.dni === clDni.dni);
      }

      if (cl && typeof cl === "string") {
        clienteDni = clientsCompare.findIndex((cp) => cp.rucCliente === cl);
      }

      if (clDni && typeof clDni === "string") {
        clienteDni = clientsCompare.findIndex((cp) => cp.dni === clDni);
      }

      // Enviar email venta
      fetch("http://appdemo1.solarc.pe/api/Venta/EnviarEmail", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })
        .then((response) => response.json())
        .then(() => {})
        .catch((error) => {
          console.error("Error:", error);
        });

      // Guardar Cliente
      if (clienteDni === -1) {
        fetch("http://appdemo1.solarc.pe/api/Cliente/Registrar%20Clientes", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clienteVenta),
        })
          .then((response) => response.json())
          .then(() => {})
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      // Insertar Venta
      fetch("http://appdemo1.solarc.pe/api/Venta/InsertaVenta", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellData),
      })
        .then((response) => response.json())
        .then(() => {
          setLoadingSell(false);
          localStorage.removeItem("sell");
          navigate("/ventas");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [cart]);

  useEffect(() => {
    if (billType === 4 && cart) {
      // Guardar Cliente
      if (clienteDni === -1) {
        fetch("http://appdemo1.solarc.pe/api/Cliente/Registrar%20Clientes", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clienteVenta),
        })
          .then((response) => response.json())
          .then(() => {})
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      // Guardar Cotizacion
      fetch("http://appdemo1.solarc.pe/api/Cotiza/InsertaCotiza", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cotizeData),
      })
        .then((response) => response.json())
        .then(() => {
          setLoadingSell(false);
          localStorage.removeItem("sell");
          navigate("/cotizaciones");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [cart]);

  return (
    <>
      <Header />
      {!loadingSell && (
        <>
          <Typography
            sx={{ m: 1, textAlign: "center" }}
            variant="h2"
            gutterBottom
          >
            Emitir Comprobante
          </Typography>
          <SellContainer>
            <TableContainer>
              <DataGrid
                getRowId={handleGetRowId}
                rows={productsCookies}
                columns={rows}
                pageSize={12}
                rowsPerPageOptions={[12]}
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
            </TableContainer>
            <BillContainer>
              <Typography
                sx={{ mb: 2, textAlign: "center" }}
                variant="h5"
                gutterBottom
                color="primary"
              >
                <CreditCardTwoToneIcon color="primary" /> Datos de la compra
              </Typography>
              <p style={{ textAlign: "center" }}>
                Los campos con * son requeridos
              </p>
              <FormContainer>
                <InputsContainer>
                  <FormControl sx={{ m: 1, minWidth: 210 }} required>
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
                  <TextField
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    label="Cliente"
                    variant="outlined"
                    type="text"
                    onChange={handleChangeClient}
                    errorCl={customErrorCl}
                    errorText={textErrorCl}
                    value={cliente}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ContactMailTwoToneIcon />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />
                  {billType !== 2 && billType !== 3 && (
                    <ClientsDni getClDni={setClDni} />
                  )}
                  {billType > 1 && billType < 4 && <Clients getCl={setCl} />}
                  <TextField
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={handleChangeEmail}
                    value={email}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ m: 1, width: 435 }}
                    id="outlined-basic"
                    label="Dirección"
                    variant="outlined"
                    onChange={handleChangeDireccion}
                    value={direccion}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    label="Referencia"
                    variant="outlined"
                    onChange={handleChangeReferencia}
                    value={referencia}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddLocationAltIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    label="Subtotal"
                    variant="outlined"
                    value={sum ? "S/ " + (sum / 1.18).toFixed(2) : 0}
                    disabled
                  />
                  <TextField
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    label="Monto a Pagar"
                    variant="outlined"
                    value={sum ? "S/ " + sum.toFixed(2) : 0}
                    disabled
                  />
                  {billType !== 4 && (
                    <TextField
                      sx={{ m: 1 }}
                      id="outlined-basic"
                      label="Pagó con soles"
                      variant="outlined"
                      error={customErrorPay}
                      helperText={textErrorPay}
                      onChange={handleChangePay}
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PaymentsIcon />
                          </InputAdornment>
                        ),
                      }}
                      required
                    />
                  )}
                  {billType !== 4 && (
                    <TextField
                      sx={{ m: 1 }}
                      id="outlined-basic"
                      label="Vuelto"
                      variant="outlined"
                      value={pay ? "S/ " + (pay - sum).toFixed(2) : "S/ " + 0}
                      disabled
                    />
                  )}
                  <TextField
                    sx={{ m: 1, maxWidth: "210px" }}
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
                  <Button
                    sx={{ width: "200px", height: "50px", p: 0, m: 2 }}
                    variant="outlined"
                    endIcon={<FaceRetouchingNaturalTwoToneIcon />}
                    onClick={() => handleActionModalClient("open")}
                    color="secondary"
                  >
                    Actualizar clientes
                  </Button>
                </InputsContainer>
                <Divider sx={{ marginTop: "20px" }} />
                <Typography
                  sx={{ m: 1, textAlign: "center" }}
                  variant="h5"
                  gutterBottom
                  color="secondary"
                >
                  <LocalOfferTwoToneIcon color="secondary" /> Descuentos
                  Adicionales
                </Typography>
                <InputsContainer>
                  <TextField
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    label="Monto a pagar"
                    variant="outlined"
                    value={sum ? "S/ " + sum.toFixed(2) : 0}
                    disabled
                  />
                  <FormControl sx={{ m: 1, minWidth: 210 }}>
                    <InputLabel id="demo-simple-select-label">
                      Descuento
                    </InputLabel>
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
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    label="Monto del descuento"
                    variant="outlined"
                    onChange={handleChangeDiscount}
                  />
                  <TextField
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    label="Nuevo precio de venta"
                    variant="outlined"
                  />
                </InputsContainer>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    sx={{ width: "215px", m: 1 }}
                    variant="contained"
                    endIcon={<ReceiptLongTwoToneIcon />}
                    onClick={handleSell}
                    disabled={!billType}
                  >
                    Emitir Comprobante
                  </Button>
                  <Button
                    sx={{ width: "215px", m: 1 }}
                    variant="contained"
                    endIcon={<MoneyOffTwoToneIcon />}
                    color="error"
                    onClick={handleCancelSell}
                  >
                    Cancelar Compra
                  </Button>
                </div>
              </FormContainer>
            </BillContainer>
          </SellContainer>

          <DialogAdd addProduct={handleActionModal} action={openModal} />
          <DialogClient
            close={handleActionModalClient}
            action={openModalClient}
          />
          <DialogAlert
            deleteProduct={handleDelete}
            action={action}
            cancel={setAction}
            pr={name}
          />
        </>
      )}
      {loadingSell && <LoadingSpinner />}
    </>
  );
};

export default CompletarVenta;
