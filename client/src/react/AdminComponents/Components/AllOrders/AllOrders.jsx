import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllOrders } from "../../../../redux/actions-types/index"
import style from "./AllOrders.module.css"
import SearchBarOrders from "../SearchBarOrders/SearchBarOrders";

export default function AllClients() {

	const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userData);

	useEffect(() => {
		dispatch(getAllOrders(token));
	}, [dispatch]);

	const allOrdersClientes = useSelector((state) => state.ordersAll);

    // console.log(allOrdersClientes)


    return (
        <div className={style.cardContainer}>

            <div>
                <SearchBarOrders/>
            </div>

           {allOrdersClientes?.map((client) => {
					return (
                        <NavLink key={ client.payment_id } to={`/admin/orders/${client.payment_id}`}>
						<div className={style.cardContainer} >
                            <p><span >Nombre y Apellido del Cliente: </span>{" "}{client.User.name} {client.User.lastname}</p>

							<p>	<span >Nº de Orden:</span> {client.payment_id}</p>

                            <p>	<span >Estado de Pago:</span> {client.status}</p>

                            <p>	<span >Monto Total:</span> $ {client.total}</p>

						</div>
                        </NavLink>
					);
				})}
        </div>
    )
}


