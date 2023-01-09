import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingSpinner from "../components/LoadingSpinner";
import DialogClientsEdit from "../components/DialogClientsEdit";
import DialogClientsDelete from "../components/DialogClientsDelete";
import DialogClientsAdd from "../components/DialogClientsAdd";
import Button from '@mui/material/Button';
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone';

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

const Clientes = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [data, setData] = useState([]);

  const handleClickOpen = (params) => {
    setData(params);
    setOpen(true);
  };

  const handleClickOpenDelete = (params) => {
    setOpenDelete(true);
    setData(params);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const columns = [
    { field: "idCliente", headerName: "ID", hide: true, width: 80 },
    { field: "nombres", headerName: "Nombres", width: 600 },
    { field: "dni", headerName: "DNI", width: 150 },
    { field: "rucCliente", headerName: "RUC", width: 150 },
    { field: "direccion", headerName: "Direccion", width: 470 },
    { field: "telefono", headerName: "Teléfono", width: 90 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "tipoDoc", headerName: "Tipo Documento", width: 125 },
    { field: "referencia", headerName: "Referencia", width: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Editar | Eliminar",
      width: 130,
      getActions: (params) => [
        <IconButton
          key={params.row.idCliente}
          aria-label="delete"
          color="primary"
          onClick={() => handleClickOpen(params.row)}
        >
          <EditIcon />
        </IconButton>,
        <IconButton
          aria-label="delete"
          color="secondary"
          key={params.row.idCliente}
          onClick={() => handleClickOpenDelete(params.row)}
        >
          <DeleteIcon />
        </IconButton>,
      ],
    },
  ];

  useEffect(() => {
    fetch("http://appdemo1.solarc.pe/api/Cliente/GetClientes")
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
  }, [open, openDelete]);

  useEffect(() => {
    fetch("http://appdemo1.solarc.pe/api/Cliente/GetClientes")
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
    return e.idCliente;
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
          Clientes
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
                    field: "nombres",
                    sort: "asc",
                  },
                ],
              },
            }}
          />
          <Button variant="contained" endIcon={<PersonAddAlt1TwoToneIcon />} sx={{ margin: 3 }} onClick={() => handleClickOpenAdd()}>
            Agregar Cliente
          </Button>
        </div>

        <DialogClientsEdit action={open} close={setOpen} client={data} />
        <DialogClientsDelete
          open={openDelete}
          set={setOpenDelete}
          data={data}
        />
        <DialogClientsAdd action={openAdd} close={setOpenAdd} client={data} />
      </>
    );
  }
};

export default Clientes;
