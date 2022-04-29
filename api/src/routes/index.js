const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Importando los archivos para las rutas
// const routerProductos = require("./productos");
// const routerCategoriaPrincipal = require("./categoriaPrincipal");
// const routerTipoDePrenda = require("./tipoDePrenda");

// Modularizando las rutas
// router.use("/productos", routerProductos);
// router.use("/tipo-de-prenda", routerTipoDePrenda);
// router.use("/categoria-principal", routerCategoriaPrincipal);

router.use("/categories", require("./routers/getCategories"));
router.use("/products", require("./routers/getProducts"));
router.use("/products/detail", require("./routers/getProductsDetails"));

// Modularizando las rutas

const getCategories = require("./routers/getCategories");
const getProducts = require("./routers/getProducts");

router.use("/categories", getCategories);
router.use("/products", getProducts);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
