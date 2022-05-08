import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CardDetail from "./react/components/CardDetail/CardDetail";
import Construction from "./react/components/Construction/Construction";
// import CreationProduct from "./react/components/CreationProduct/CreationProduct";
import Home from "./react/components/Home/Home.jsx";
import Landing from "./react/components/Landing/Landing";
import ProductCreate from "./react/components/CreationProduct/ProductCreate";
import Footer from "./react/components/Footer/Footer";
import Admin from "./react/AdminComponents/Pages/Admin";
import Login from "./react/components/Login/Login";
import ShoppingBag from "./react/components/ShoppingCart/ShoppingBag/ShoppingBag";
import PayPlataform from "./react/components/PayPlataform/PayPlataform";
import ProfileUser from "./react/components/ProfileUser/ProfileUser";
import OrderDetail from "./react/UserOrders/OrderDetail";
import UserOrders from "./react/UserOrders/UserOrders";
import axios from "axios";
import Failure from "./react/components/back Urls/failure";

function App() {
	const [user, setUSer] = useState(null);

	useEffect(() => {
		const getUser = () =>
			axios({
				url: "http://localhost:3001/auth/login/success",
				method: "GET",
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": true,
				},
			})
				.then((response) => {
					if (response.status === 200) return response.data;
					else throw new Error("Authentication has been failed");
				})
				.then((resObject) => {
					setUSer(resObject.user);
				})
				.catch((e) => console.log(e));

		getUser();
	}, []);

	console.log(user);

	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Landing />} />
				<Route path={"/home"} element={<Home />} />
				<Route path={"/detail/:productId"} element={<CardDetail />} />
				<Route path={"/creation"} element={<ProductCreate />} />
				<Route path={"/about"} element={<Construction />} />
				<Route path={"/account"} element={<Construction />} />
				<Route path={"/construction"} element={<Construction />} />
				<Route path={"/admin/*"} element={<Admin />} />
				<Route path={"/login"} element={<Login />} />
				<Route path={"/bag"} element={<ShoppingBag />} />
				<Route path={"/pay"} element={<PayPlataform />} />
				<Route path={"/user/profile/:id"} element={<ProfileUser />} />
				<Route path={"/user/orders"} element={<UserOrders />} />
				<Route path={"/user/orders/:idOrder"} element={<OrderDetail />} />
				<Route path={"/failure"} element={<Failure />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
