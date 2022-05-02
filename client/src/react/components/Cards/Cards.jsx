import React from "react";

// import Construction from "../Construction/Construction";
import css from "./Cards.module.css";

export default function Cards({
  name,
  image,
  isOffertPrice,
  previousPrice,
  currentPrice,
}) {
  // const handleClickAddCart = (event) => (
  // 	<Construction/> //provisorio hasta que este el carrito
  // )
  return (
    <div className={css.container}>
      <img src={image} alt="Product Img" />
      <div className={css.price}>
        <h3>{isOffertPrice ? previousPrice : `$ ${currentPrice} `}</h3>
        {isOffertPrice ? <h4>{`Precio de oferta $ ${currentPrice}`}</h4> : null}
      </div>
      <h5 className={css.title}>{name}</h5>
      {/* <button onClick={(e)=>handleClickAddCart(e)}>Agregar al carrito</button> */}
    </div>
  );
}
