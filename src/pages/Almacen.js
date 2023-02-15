import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import defaultImage from "../image/default-image.jpg";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import AssignmentTurnedInTwoToneIcon from "@mui/icons-material/AssignmentTurnedInTwoTone";
import LoadingSpinner from "../components/LoadingSpinner";
import DialogAlmacenDelete from "../components/DialogAlmacenDelete";
import DialogAlmacenEdit from "../components/DialogAlmacenEdit";
import DialogAlmacenCatalog from "../components/DialogAlmacenCatalog";
import DialogAlmacenStock from "../components/DialogAlmacenStock";
import Box from "@mui/material/Box";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import DialogAlmacenExcel from "../components/DialogAlmacenExcel";
import Cookies from "js-cookie";

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
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

const Almacen = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCatalog, setOpenCatalog] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [openExcel, setOpenExcel] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedRowDelete, setSelectedRowDelete] = useState(0);
  const [successCreated, setSuccessCreated] = useState(false);
  const [errorCreated, setErrorCreated] = useState(false);
  const [textAlert, setTextAlert] = useState();
  const [hideCol, setHideCol] = useState();

  let getUserInfo = Cookies.get('user');
  let user = getUserInfo && JSON.parse(getUserInfo);
  let currentUser = user.userName;
  
  useEffect(() => {
    currentUser === 'arturo' || currentUser === 'JGONZALES' ? setHideCol(false) : setHideCol(true);
  }, [])

  const handleClickOpen = (params) => {
    setOpenEdit(true);
    setSelectedRow(params);
  };

  const handleClickOpenDelete = (params) => {
    setOpenDelete(true);
    setSelectedRowDelete(params);
  };

  const handleClickCatalog = () => {
    setOpenCatalog(true);
  };

  const handleClickStock = () => {
    setOpenStock(true);
  };

  const handleClickExcel = () => {
    setOpenExcel(true);
  };

  const columns = [
    { field: "idProducto", headerName: "ID", hide: true, width: 80 },
    { field: "codProd", headerName: "Codigo", width: 150 },
    { field: "nombreProducto", headerName: "Producto", width: 450 },
    { field: "descripcion", headerName: "Descripcion", width: 470 },
    { field: "stock", headerName: "Cantidad", width: 100 },
    { field: "precioBase", headerName: "P. Base", width: 90, hide: hideCol },
    { field: "precioVenta", headerName: "P. Venta", width: 90 },
    { field: "marca", headerName: "Marca", width: 100 },
    { field: "modelo", headerName: "Modelo", width: 100 },
    { field: "ubicacion", headerName: "Ubicacion", width: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Editar | Eliminar",
      width: 130,
      getActions: (params) => [
        <IconButton
          key={params.row.idProducto}
          aria-label="delete"
          color="primary"
          onClick={() => handleClickOpen(params.row)}
        >
          <EditIcon />
        </IconButton>,
        <IconButton
          aria-label="delete"
          color="secondary"
          key={params.row.idProducto}
          onClick={() => handleClickOpenDelete(params.row)}
        >
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
          src={`https://appdemo1.solarc.pe/imagenes/${items.row.codProd}.JPG`}
          alt={items.row.nombreProducto}
        />
      ),
    },
  ];

  useEffect(() => {
    fetch("https://appdemo1.solarc.pe/api/Productos/GetProductos")
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

  useEffect(() => {
    fetch("https://appdemo1.solarc.pe/api/Productos/GetProductos")
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
  }, [successCreated]);

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
          Almacen
        </Typography>
        <div style={{ height: 680, width: "100%" }}>
          <DataGrid
            rows={items}
            columns={columns}
            components={{ Toolbar: QuickSearchToolbar }}
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

          <Button
            variant="outlined"
            sx={{ m: 1 }}
            startIcon={<AssignmentTurnedInTwoToneIcon />}
            onClick={handleClickStock}
          >
            Reporte de Stock
          </Button>
          <Button
            variant="outlined"
            sx={{ m: 1 }}
            startIcon={<ArticleTwoToneIcon />}
            onClick={handleClickCatalog}
          >
            Reporte de Catálogo
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            endIcon={<NoteAddTwoToneIcon />}
            onClick={handleClickExcel}
          >
            Cargar Excel
          </Button>
        </div>
        {/* Eliminar productos */}
        <DialogAlmacenDelete
          open={openDelete}
          set={setOpenDelete}
          data={selectedRowDelete}
          actionAlert={setSuccessCreated}
          actionAlertError={setErrorCreated}
          text={setTextAlert}
        />
        {/* Editar productos */}
        <DialogAlmacenEdit
          open={openEdit}
          set={setOpenEdit}
          data={selectedRow}
          actionAlert={setSuccessCreated}
          actionAlertError={setErrorCreated}
          text={setTextAlert}
        />
        {/* Imprimir catalogo */}
        <DialogAlmacenCatalog open={openCatalog} set={setOpenCatalog} />
        {/* Imprimir stock */}
        <DialogAlmacenStock open={openStock} set={setOpenStock} />
        {/* Enviar excel */}
        <DialogAlmacenExcel
          open={openExcel}
          set={setOpenExcel}
          actionAlert={setSuccessCreated}
          actionAlertError={setErrorCreated}
          text={setTextAlert}
        />
        {/* Mensaje de producto creado */}
        <SuccessAlert
          actionSuccess={setSuccessCreated}
          success={successCreated}
          text={textAlert}
        />
        {/* Mensaje de error producto creado */}
        <ErrorAlert actionError={setErrorCreated} error={errorCreated} />
      </>
    );
  }
};

export default Almacen;
