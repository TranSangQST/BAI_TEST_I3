import React, { useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatCurrency } from "../../utils/stringFormat";

const CartModal = ({
  open,
  setOpen,
  productsInCart,
  setProductsInCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const total = useMemo(
    () =>
      productsInCart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
    [productsInCart]
  );

  const confirmBuy = () => {
    setProductsInCart(() => []);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: 1,
          boxShadow: 24,
          p: 2,
          maxWidth: "80vw",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Giỏ hàng của bạn
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            overflowY: "scroll",
            maxHeight: 400,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Tên sản phẩm</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Hình ảnh</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Giá</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Số lượng</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsInCart.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <img
                      src={product.img}
                      alt={product.name}
                      width="50"
                      height="50"
                    />
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.quantity} </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: 120,
                      }}
                    ></Box>
                    <IconButton
                      color="primary"
                      onClick={() => increaseQuantity(product.id)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => decreaseQuantity(product.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            mt: 3,
          }}
        >
          <Typography variant="h6" gutterBottom ml={"auto"}>
            Tổng giá tiền: {formatCurrency(total)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={confirmBuy}
            ml={"auto"}
          >
            Xác nhận mua hàng
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CartModal;
