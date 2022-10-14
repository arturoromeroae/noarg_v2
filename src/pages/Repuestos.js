import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import styled from "styled-components";
import LocalGroceryStoreTwoToneIcon from "@mui/icons-material/LocalGroceryStoreTwoTone";
import defaultImage from "../image/default-image.jpg";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Cart from "../components/Cart";
import LoadingSpinner from "../components/LoadingSpinner";
import DialogAddEdit from "../components/DialogAddEdit";
import Box from '@mui/material/Box';

const ImageTable = styled.img`
  transition: linear 0.3s;
  border-radius: 100%;
  &:hover {
    transform: scale(1.5);
    transition: linear 0.3s;
    margin-left: auto;
    margin-right: auto;
    cursor: zoom-in;
  }
`;

const TableContainer = styled.div`
  display: flex;
  width: 100%;
  height: 700px;
  border-radius: 20%;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    </Box>
  );
}

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

const Repuestos = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsBrands, setItemsBrands] = useState([]);
  const [itemsModels, setItemsModels] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [addToCart, setAddToCart] = useState();
  const [addToCartEdit, setAddToCartEdit] = useState();
  const [count, setCount] = useState(0);
  const [countEdit, setCountEdit] = useState(0);

  const handleClickOpen = (params) => {
    setOpen(true);
    setSelectedRow(params);
  };

  const handleCart = (params) => {
    setAddToCart(params);
    setCount(count + 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCartEdit = (params) => {
    if(params.stock > 0){
      setOpenEdit(true);
    }
    setAddToCartEdit(params);
    setCountEdit(countEdit + 1)
  };

  const columns = [
    { field: "idProducto", headerName: "ID", hide: true, width: 80 },
    { field: "codProd", headerName: "Codigo", width: 150 },
    { field: "nombreProducto", headerName: "Producto", width: 450 },
    {
      field: "descripcion",
      type: "actions",
      headerName: "Descripcion",
      width: 400,
      getActions: (params) => [
        <p style={{ cursor: params.row.stock > 0 && "pointer", color: params.row.stock > 0 ? "blue" : "red" }} onClick={() => handleCartEdit(params.row)}>
          {params.row.descripcion}
        </p>
      ],
    },
    {
      field: "stock",
      type: "actions",
      headerName: "Cantidad",
      width: 100,
      getActions: (params) => [
        <p style={{ cursor: params.row.stock > 0 && "pointer", color: params.row.stock > 0 ? "blue" : "red" }} onClick={() => handleCartEdit(params.row)}>
          {params.row.stock}
        </p>
      ],
    },
    { field: "precioVenta", headerName: "P. Venta", width: 90 },
    {
      field: "ubicacion",
      type: "actions",
      headerName: "Ubicación",
      width: 100,
      getActions: (params) => [
        <p style={{ cursor: params.row.stock > 0 && "pointer", color: params.row.stock > 0 ? "blue" : "red" }} onClick={() => handleCartEdit(params.row)}>
          {params.row.ubicacion}
        </p>
      ],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Agregar",
      width: 100,
      getActions: (params) => [
        <IconButton
          aria-label="add"
          color="primary"
          onClick={() => handleCart(params.row)}
          disabled={params.row.stock <= 0}
        >
          <LocalGroceryStoreTwoToneIcon />
        </IconButton>
      ],
    },
    {
      field: "image",
      headerName: "Imagen",
      width: 70,
      renderCell: (items) => (
        <ImageTable
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = defaultImage;
          }}
          width={50}
          src={`http://appdemo1.solarc.pe/imagenes/${items.row.codProd}.JPG`}
          alt={
            items.row.nombreProducto
              ? items.row.nombreProducto
              : "Imagen por defeto"
          }
          onClick={() => handleClickOpen(items.row)}
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
        <Typography
          sx={{ m: 1, textAlign: "center" }}
          variant="h2"
          gutterBottom
        >
          Repuestos
        </Typography>
        <TableContainer>
          <DataGrid
            rows={items}
            components={{ Toolbar: QuickSearchToolbar }}
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
          <Cart dataCart={addToCart} dataCount={count} />
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
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = defaultImage;
                }}
                width={500}
                src={`http://appdemo1.solarc.pe/imagenes/${selectedRow.codProd}.JPG`}
                alt={
                  selectedRow.nombreProducto
                    ? selectedRow.nombreProducto
                    : "Imagen por defeto"
                }
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
          </DialogActions>
        </Dialog>

        <DialogAddEdit info={addToCartEdit} infoEdit={handleCart} setAction={setOpenEdit} action={openEdit} counter={countEdit} />
      </>
    );
  }
};

export default Repuestos;
