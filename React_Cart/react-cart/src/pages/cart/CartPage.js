import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import products from "../../data/product";
import { AppBar, Badge, Box, Grid, Toolbar, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import CartModal from "./CartModal";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { formatCurrency } from "../../utils/stringFormat";

const CartPage = () => {
  const [productsInCart, setProductsInCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const theme = useTheme();

  const totalQuantity = useMemo(
    () => productsInCart.reduce((acc, product) => acc + product.quantity, 0),
    [productsInCart]
  );

  const addToCart = (product) => {
    const productIndex = productsInCart.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex !== -1) {
      // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
      increaseQuantity(product.id);
    } else {
      // Sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng với quantity là 1
      setProductsInCart((prevProducts) => [
        ...prevProducts,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    setProductsInCart(
      productsInCart.filter((product) => product.id !== productId)
    );
  };

  const increaseQuantity = (productId) => {
    setProductsInCart((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setProductsInCart((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          height: 64,
        }}
      >
        <Toolbar>
          <Box ml={"auto"}>
            <Badge badgeContent={totalQuantity} color="warning">
              <ShoppingCartIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenCart(true)}
              />
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>

      <Box container spacing={4} marginTop={8}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 8,
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Danh sách sản phẩm
          </Typography>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {products.map((product) => (
              <Grid item xs={12} sm={4} md={3} mb={8}>
                <Card
                  key={product.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    maxWidth: 300,
                    maxHeight: 400,
                    margin: 2,
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      image={product.img}
                      title={product.name}
                      sx={{
                        maxWidth: "100%",
                        maxHeight: 140,
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontSize={12}>
                        {product?.name?.slice(0, 100)}
                        {product?.name?.length > 100 && "..."}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Giá: {formatCurrency(product.price)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: theme.palette.success.light,
                    }}
                    onClick={() => addToCart(product)}
                  >
                    Mua
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <CartModal
        productsInCart={productsInCart}
        setProductsInCart={setProductsInCart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        open={openCart}
        setOpen={setOpenCart}
      />
    </Box>
  );
};

export default CartPage;
