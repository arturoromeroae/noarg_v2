import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import defaultImage from "../image/default-image.jpg";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NoteAddTwoToneIcon from '@mui/icons-material/NoteAddTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import LoadingSpinner from "../components/LoadingSpinner";
import DialogAlmacenDelete from "../components/DialogAlmacenDelete";
import DialogAlmacenEdit from "../components/DialogAlmacenEdit";

const Almacen = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedRowDelete, setSelectedRowDelete] = useState(0);

  const handleClickOpen = (params) => {
    setOpenEdit(true);
    setSelectedRow(params);
  };

  const handleClickOpenDelete = (params) => {
    setOpenDelete(true);
    setSelectedRowDelete(params);
  };

  const columns = [
    { field: "idProducto", headerName: "ID", hide: true, width: 80 },
    { field: "codProd", headerName: "Codigo", width: 150 },
    { field: "nombreProducto", headerName: "Producto", width: 500 },
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
      width: 130,
      getActions: (params) => [
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => handleClickOpen(params.row)}
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
          alt={items.row.nombreProducto}
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

          <Button variant="outlined" sx={{ m: 1 }} startIcon={<AssignmentTurnedInTwoToneIcon />}>
            Reporte Stock
          </Button>
          <Button variant="outlined" sx={{ m: 1 }} startIcon={<ArticleTwoToneIcon />}>
            Reporte Stock
          </Button>
          <Button variant="contained" sx={{ m: 1 }} endIcon={<NoteAddTwoToneIcon />}>
            Cargar Excel
          </Button>
        </div>
        <DialogAlmacenDelete open={openDelete} set={setOpenDelete} data={selectedRowDelete} />
        <DialogAlmacenEdit open={openEdit} set={setOpenEdit} data={selectedRow} />
      </>
    );
  }
};

export default Almacen;
