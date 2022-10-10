import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import defaultImage from "../image/default-image.jpg";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Shop2TwoToneIcon from '@mui/icons-material/Shop2TwoTone';
import QueueTwoToneIcon from '@mui/icons-material/QueueTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import LoadingSpinner from "../components/LoadingSpinner";
import DialogMaintanceEdit from "../components/DialogMaintanceEdit";
import DialogMaintanceDelete from "../components/DialogMaintanceDelete";

const Mantenimiento = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedRowDelete, setSelectedRowDelete] = useState(0);

  const handleClickOpenEdit = (params) => {
    setOpen(true);
    setSelectedRow(params);
  };

  const handleClickOpenDelete = (params) => {
    setOpenDelete(true);
    setSelectedRowDelete(params);
  };

  const columns = [
    { field: "idProducto", headerName: "ID", hide: true, width: 80 },
    { field: "codProd", headerName: "Codigo", width: 150 },
    { field: "nombreProducto", headerName: "Producto", width: 450 },
    { field: "descripcion", headerName: "Descripcion", width: 500 },
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
          aria-label="delete"
          color="primary"
          onClick={() => handleClickOpenEdit(params.row)}
        >
          <EditIcon />
        </IconButton>,
        <IconButton aria-label="delete" color="secondary" onClick={() => handleClickOpenDelete(params.row)}>
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
        <Typography sx={{ m: 1, textAlign: "center" }} variant="h2" gutterBottom>
          Mantenimiento
        </Typography>
        <div style={{ height: 650, width: "100%" }}>
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
          <Button sx={{ m: 1 }} variant="contained" startIcon={<Shop2TwoToneIcon />}>
            Agregar Producto
          </Button>
          <Button sx={{ m: 1 }} variant="outlined" color="success" endIcon={<QueueTwoToneIcon />}>
            Agregar Marca
          </Button>
          <Button sx={{ m: 1 }} variant="outlined" color="success" endIcon={<DriveFileRenameOutlineTwoToneIcon />}>
            Editar Marca
          </Button>
          <Button sx={{ m: 1 }} variant="outlined" endIcon={<QueueTwoToneIcon />}>
            Agregar Modelo
          </Button>
          <Button sx={{ m: 1 }} variant="outlined" endIcon={<DriveFileRenameOutlineTwoToneIcon />}>
            Editar Modelo
          </Button>
        </div>
        <DialogMaintanceEdit action={open} set={setOpen} data={selectedRow} />
        <DialogMaintanceDelete action={openDelete} set={setOpenDelete} data={selectedRowDelete} />
      </>
    );
  }
};

export default Mantenimiento;
