import React from "react";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityInput = styled.input`
  border: 0;
  width: 30px;
  height: 30px;
  font-family: "Roboto";
  font-weight: 500;
  text-align: center;
  background-color: #f5f5ef;
  border-radius: 20px;
  &:focus {
    outline: none;
  }
`;

const Product = ({ data, deleteProduct, changeQuantity }) => {
  const handleClickPlus = () => {
    changeQuantity(data.idProducto, "increment");
  };

  const handleClickMinus = () => {
    changeQuantity(data.idProducto, "decrement");
  };

  return (
    <>
      <Divider />
      <ListItem
        secondaryAction={
          <IconButton
            aria-label="deleteProduct"
            color="error"
            size="large"
            onClick={() => deleteProduct(data.idProducto)}
          >
            <DeleteForeverTwoToneIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <div>
          <p style={{ width: "220px" }}>
            <strong>Cod:</strong> {data.codProd} <br />
            <strong>Prod:</strong> {data.nombreProducto} <br />
            <strong>Precio:</strong> {data.precioVenta}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div>
              <Typography variant="h7">Cantidad</Typography>
              <QuantityContainer>
                <IconButton
                  aria-label="minus"
                  onClick={handleClickMinus}
                  color="error"
                  size="small"
                  disabled={data.cantidad <= 1}
                >
                  <RemoveCircleTwoToneIcon fontSize="inherit" />
                </IconButton>
                <QuantityInput disabled value={data.cantidad} />
                <IconButton
                  aria-label="plus"
                  onClick={handleClickPlus}
                  color="primary"
                  size="small"
                >
                  <AddCircleTwoToneIcon fontSize="inherit" />
                </IconButton>
              </QuantityContainer>
            </div>
          </div>
        </div>
      </ListItem>
      <Divider />
    </>
  );
};

Product.propTypes = {
  data: PropTypes.array,
  deleteProduct: PropTypes.string,
  changeQuantity: PropTypes.any
};

export default Product;
