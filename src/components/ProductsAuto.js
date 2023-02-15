import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from 'prop-types';

const ProductsAuto = ({ pr, getPr }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
    fetch("https://appdemo1.solarc.pe/api/Productos/GetProductos")
      .then((res) => res.json())
      .then(
        (result) => {
          setOptions(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ m: 1, width: "210px" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, value) => pr(value)}
        isOptionEqualToValue={(option, value) => option.nombreProducto === value.nombreProducto}
        getOptionLabel={(option) => option.nombreProducto}
        options={options}
        loading={loading}
        inputValue={getPr && getPr.nombreProducto}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nombre Producto"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
};

ProductsAuto.propTypes = {
  pr: PropTypes.any,
  getPr: PropTypes.any
};

export default ProductsAuto;
