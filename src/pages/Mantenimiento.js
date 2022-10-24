import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import defaultImage from "../image/default-image.jpg";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Shop2TwoToneIcon from "@mui/icons-material/Shop2TwoTone";
import QueueTwoToneIcon from "@mui/icons-material/QueueTwoTone";
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone";
import LoadingSpinner from "../components/LoadingSpinner";
import DialogMaintanceEdit from "../components/DialogMaintanceEdit";
import DialogMaintanceDelete from "../components/DialogMaintanceDelete";
import DialogCreate from "../components/DialogCreate";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import DialogMaintanceAddModel from "../components/DialogMaintanceAddModel";
import DialogMaintanceAddBrand from "../components/DialogMaintanceAddBrand";
import DialogMaintanceEditModel from "../components/DialogMaintanceEditModel";
import DialogMaintanceEditBrand from "../components/DialogMaintanceEditBrand";
import Box from "@mui/material/Box";

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

const Mantenimiento = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [openEditBrand, setOpenEditBrand] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedRowDelete, setSelectedRowDelete] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [successCreated, setSuccessCreated] = useState(false);
  const [errorCreated, setErrorCreated] = useState(false);
  const [textAlert, setTextAlert] = useState();

  const handleClickOpenEdit = (params) => {
    setOpen(true);
    setSelectedRow(params);
  };

  const handleClickOpenDelete = (params) => {
    setOpenDelete(true);
    setSelectedRowDelete(params);
  };

  const handleClickCreate = () => {
    setOpenCreate(true);
  };

  const handleClickCreateModel = () => {
    setOpenModel(true);
  };

  const handleClickCreateBrand = () => {
    setOpenBrand(true);
  };

  const handleClickEditModel = () => {
    setOpenEditModel(true);
  };

  const handleClickEditBrand = () => {
    setOpenEditBrand(true);
  };

  const columns = [
    { field: "idProducto", headerName: "ID", hide: true, width: 80 },
    { field: "codProd", headerName: "Codigo", width: 150 },
    { field: "nombreProducto", headerName: "Producto", width: 450 },
    { field: "descripcion", headerName: "Descripcion", width: 475 },
    { field: "stock", headerName: "Cantidad", width: 100 },
    { field: "precioBase", headerName: "P. Base", width: 90 },
    { field: "precioVenta", headerName: "P. Venta", width: 90 },
    { field: "marca", headerName: "Marca", width: 100 },
    { field: "modelo", headerName: "Modelo", width: 100 },
    { field: "ubicacion", headerName: "Ubicacion", width: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Editar | Eliminar",
      width: 150,
      getActions: (params) => [
        <IconButton
          key={params.row.idProducto}
          aria-label="delete"
          color="primary"
          onClick={() => handleClickOpenEdit(params.row)}
        >
          <EditIcon />
        </IconButton>,
        <IconButton
          key={params.row.idProducto}
          aria-label="delete"
          color="secondary"
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
          src={`http://appdemo1.solarc.pe/imagenes/${items.row.codProd}.JPG`}
          alt={
            items.row.nombreProducto
              ? items.row.nombreProducto
              : "Imagen por defeto"
          }
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
  }, []);

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
          Mantenimiento
        </Typography>
        <div style={{ height: 695, width: "100%" }}>
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
            sx={{ m: 1 }}
            variant="contained"
            startIcon={<Shop2TwoToneIcon />}
            onClick={handleClickCreate}
          >
            Agregar Producto
          </Button>
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            color="success"
            endIcon={<QueueTwoToneIcon />}
            onClick={handleClickCreateBrand}
          >
            Agregar Marca
          </Button>
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            color="success"
            endIcon={<DriveFileRenameOutlineTwoToneIcon />}
            onClick={handleClickEditBrand}
          >
            Editar Marca
          </Button>
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            endIcon={<QueueTwoToneIcon />}
            onClick={handleClickCreateModel}
          >
            Agregar Modelo
          </Button>
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            endIcon={<DriveFileRenameOutlineTwoToneIcon />}
            onClick={handleClickEditModel}
          >
            Editar Modelo
          </Button>
        </div>
        {/* Agregar productos */}
        <DialogCreate
          setOpen={setOpenCreate}
          open={openCreate}
          actionAlert={setSuccessCreated}
          actionAlertError={setErrorCreated}
          text={setTextAlert}
        />
        {/* Editar productos */}
        <DialogMaintanceEdit
          action={open}
          set={setOpen}
          data={selectedRow}
          actionAlert={setSuccessCreated}
          actionAlertError={setErrorCreated}
          text={setTextAlert}
        />
        {/* Eliminar productos */}
        <DialogMaintanceDelete
          action={openDelete}
          set={setOpenDelete}
          data={selectedRowDelete}
          actionAlert={setSuccessCreated}
          actionAlertError={setErrorCreated}
          text={setTextAlert}
        />
        {/* Agregar modelos */}
        <DialogMaintanceAddModel action={openModel} set={setOpenModel} />
        {/* Editar modelos */}
        <DialogMaintanceEditModel
          action={openEditModel}
          set={setOpenEditModel}
        />
        {/* Agregar marcas */}
        <DialogMaintanceAddBrand action={openBrand} set={setOpenBrand} />
        {/* Editar marcas */}
        <DialogMaintanceEditBrand
          action={openEditBrand}
          set={setOpenEditBrand}
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

export default Mantenimiento;
