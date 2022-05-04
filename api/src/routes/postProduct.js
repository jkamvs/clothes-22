const { Router } = require("express");
const { Product, Category, ProductDetail } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken');

router.post("", async (req, res) => {
  let {
    name,
    description,
    info,
    gender,
    brandName,
    images,
    isOffertPrice,
    previousPrice,
    currentPrice,
    color,
    variants,
    category,
  } = req.body;

  //----------------------------AUTHORIZATION--------------------------------------------------------
  const authorization = req.get("authorization");

  let token = null;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error);
  }

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token is missing or invalid!" });
  }
  //------------------------------------------------------------------------------------

  /** Variants
   *
   * {
   * "brandSize": "US 5",
   * "isInStock": true,
   * "stock": 100
   * },
   *
   */

  // Generador de ID automáticos
  var newId = function () {
    return parseInt((Math.random() + Date.now()).toString().substring(7));
  };
  const id = newId();

  // Comprobando existencia de productos en STOCK a través de las variantes
  const isThereProducts = variants.reduce(
    (totalStock, variant) => totalStock + variant.stock,
    0
  );

  try {
    // Creación de producto en la tabla Products
    let [productCreated, created] = await Product.findOrCreate({
      where: {
        id,
        name,
        image: images[0],
        isOffertPrice,
        previousPrice,
        currentPrice,
        brandName,
        color,
        isInStock: isThereProducts ? true : false,
      },
    });

    // Se busca y agrega categoría al producto
    let categoryDDBB = await Category.findByPk(category);
    await productCreated.addCategory(categoryDDBB);

    // category.forEach(async (el) => {
    // 	let categoryDDBB = await Category.findByPk(el);
    // 	await productCreated.addCategory(categoryDDBB);
    // });
  } catch (e) {
    console.log(e.message);
  }

  try {
    let [productCreated, created] = await ProductDetail.findOrCreate({
      where: {
        id,
        name,
        description,
        info,
        gender,
        brandName,
        images,
        isOffertProduct: isOffertPrice,
        previousPrice,
        currentPrice,
        color,
        variants,
      },
    });

    // Se busca y agrega categoría al producto
    let productDDBB = await Product.findByPk(id);
    await productCreated.setProduct(productDDBB);

    // category.forEach(async (el) => {
    // 	let productDDBB = await Product.findByPk(id);
    // 	await productCreated.setProduct(productDDBB);
    // });

    if (created) {
      res.status(200).send("Detalles creados exitosamente!");
    } else {
      res.status(404).send("Producto existente");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
