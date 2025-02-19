import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import {
	getAllCategoriesForForm,
	getDetails,
	updateProduct,
	setDetails,
} from "../../../../redux/actions-types";
import back from "../../../components/svg/volver-flecha.png";

// Components
import AddImages from "../../../components/CreationProduct/components/AddImages";
import AddInfo from "../../../components/CreationProduct/components/AddInfo";
import AddVariants from "../../../components/CreationProduct/components/AddVariants";

// Utils
import s from "../../../components/CreationProduct/ProductCreate.module.css";
import style from "../../../AdminComponents/Components/DeleteProduct/DeleteProduct.module.css";
import {
	handleDeleteImg,
	handleSizeDelete,
} from "../../../components/CreationProduct/handlers";

function validate(input) {
	let errors = {};
	// errors.button = false;

	if (!input.name || input.name === "") {
		errors.name = <i>"Debe ingresar un nombre del producto!"</i>;
		// errors.button = true;
	}
	if (!input.description || input.description === "") {
		errors.description = <i>"Debe ingresar una description del producto!"</i>;
		// errors.button = true;
	}

	if (!input.images.length) {
		errors.images = <i>"Debe agregar al menos una imagen producto!"</i>;
		// errors.button = true;
	}

	// if (!input.previousPrice || input.previousPrice < 0) {
	// 	errors.previousPrice = <i>"Debe ingresar un importe valido!"</i>;
	// 	// errors.button = true;
	// }
	if (!input.currentPrice || input.currentPrice < 0) {
		errors.currentPrice = <i>"Debe ingresar un importe valido!"</i>;
		// errors.button = true;
	}
	if (!input.color || input.color === "") {
		errors.color = <i>"Debe ingresar un color de prenda!"</i>;
		// errors.button = true;
	}
	if (!input.gender || input.gender === "") {
		errors.gender = <i>"Debe ingresar un genero!"</i>;
		// errors.button = true;
	}
	if (!input.brandName || input.brandName === "") {
		errors.brandName = <i>"Debe ingresar una marca!"</i>;
		// errors.button = true;
	}
	
	return errors;
}

export default function UpdateProduct() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [canAddImage, setCanAddImage] = useState(false);
	const { productId } = useParams();
	const { token } = useSelector((state) => state.userData);

	useEffect(() => {
		dispatch(getDetails(productId));
	}, [dispatch, productId]);

	const productToUpdate = useSelector((state) => state.details);

	useEffect(() => {
		dispatch(getAllCategoriesForForm());
	}, [dispatch]);

	let categories = useSelector((state) => state.categoriesForForm);

	//Categorias para devolver keys
	//let categories = useSelector((state) => state.categoriesForForm);
	// console.log(categories)
	// console.log(productToUpdate)
	// const initialState = {
	// 	name: productToUpdate.name,
	// 	description: productToUpdate.description,
	// 	images: productToUpdate.images,
	// 	previousPrice: productToUpdate.previousPrice,
	// 	isOffertPrice: productToUpdate.isOffertPrice,
	// 	currentPrice: productToUpdate.currentPrice,
	// 	color: productToUpdate.color,
	// 	gender: productToUpdate.gender,
	// 	brandName: productToUpdate.brandName,
	// 	// category: [],
	// 	info: productToUpdate.info,
	// 	variants: productToUpdate.variants,
	// };

	const stateErrors = {
		name: "",
		description: "",
		images: [],
		previousPrice: 0,
		isOffertPrice: false,
		currentPrice: 0,
		color: "",
		gender: "",
		brandName: "",
		// category: [],
		category:'',
		info: {
			aboutMe: "",
			sizeAndFit: "",
			careInfo: "",
		},
		variants: [],
	};
	const [input, setInput] = useState({
		name: "",
		description: "",
		images: [],
		previousPrice: 0,
		isOffertPrice: false,
		currentPrice: 0,
		color: "",
		gender: "",
		brandName: "",
		category: "",
		info: {
			aboutMe: "",
			sizeAndFit: "",
			careInfo: "",
		},
		variants: [],
	});
	const [errors, setError] = useState(stateErrors);
	const idCategory = categories.find(
		(e) => e.id === productToUpdate.CategoryId
	);
	let nameCategories = idCategory?.title;
	const [nameCategory, setNameCategory] = useState(nameCategories);

	useEffect(() => {
		setNameCategory(nameCategories);
	}, [nameCategories, idCategory]);
	useEffect(() => {
		setInput(productToUpdate);
	}, [productToUpdate]);

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setError(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	}

	function handleSelectCategoryOnChange(e) {
		const value = e.target.value;
		e.preventDefault();

		setInput((prev) => ({
			...prev,
			category: Number(value),
		}));
		// set Error a revisar

		setError(
			validate({
				...input,
				category: Number(value),
			})
		);
		let categoryName = categories.find((e) => e.id === Number(value));
		setNameCategory(categoryName.title);
	}

	function handleDeleteSelectCategory(e) {
		e.preventDefault();
		setInput((prev) => ({
			...prev,
			category: "",
		}));

		setError(
			validate({
				...input,
				category: "",
			})
		);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (Object.values(errors).length !== 0) {
			Swal.fire(
				'Faltan campos que rellenar!',
				'',
				'warning'
			  )
		} else {
			dispatch(updateProduct(productId, input, token));
			navigate("/admin/allproducts");
		}
	}

	function handleCheck(e) {
		setInput({
			...input,
			[e.target.name]: !input.isOffertPrice,
		});
	}

	const handleChangeInfoAditional = (e) => {
		e.preventDefault();
		setInput({
			...input,
			info: {
				...input.info,
				[e.target.name]: e.target.value,
			},
		});
	};
	//para futuros keyPress
	// const handleKeyPress = (e) => {
	// 	if (e.key === "Enter") {
	// 		setInput({
	// 			...input,
	// 			category: [...input.category, e.target.value],
	// 		})
	// 		console.log(e)
	// 		console.log(input.category)
	// 	}
	// }

	return (
		<div className={s.container}>
			
			{productToUpdate?.name ? (
				<form className={s.form} onSubmit={(e) => handleSubmit(e)}>
					<div className={style.imgContainer}>
						<NavLink to={`/admin/allproducts`} style={{ textDecoration: "none" }}>
							<img src={back} alt='Img back' className={style.img} />
						</NavLink>
					</div>
					<div className={s.sectionOne}>
						<div className={s.name}>
							<label>Nombre: </label>
							<input
								className={s.input}
								type='text'
								placeholder='Ingrese el nombre'
								name='name'
								value={input.name}
								onChange={(e) => handleChange(e)}
							/>
							{errors.name && <p>{errors.name}</p>}
						</div>

						<div className={s.description}>
							<label>Descripción: </label>
							<textarea
								className={s.input}
								type='text'
								placeholder='Ingrese descripción'
								name='description'
								value={input.description}
								onChange={(e) => handleChange(e)}
							></textarea>
							{errors.description && <p>{errors.description}</p>}
						</div>
					</div>

					<div className={s.sectionTwo}>
						<AddImages
							canAddImage={canAddImage}
							setCanAddImage={setCanAddImage}
							input={input}
							setInput={setInput}
							errors={errors}
							setError={setError}
							validate={validate}
						/>

						<div className={s.imageContainerGlobal}>
							{input.images?.length ? (
								input.images.map((el, idx) => {
									return (
										<div key={`addedImg${idx}`} className={s.imageContainer}>
											<button
												className={s.button}
												onClick={(e) => handleDeleteImg(e, el, input, setInput)}
											>
												Eliminar
											</button>
											<img
												className={s.imagen}
												src={`https://${el}`}
												alt={`Added img number ${idx + 1}`}
											/>
										</div>
									);
								})
							) : (
								<p>No hay imagenes</p>
							)}
						</div>
					</div>

					<div className={s.sectionThree}>
						<div>
							<label>El producto se encuentra en oferta? </label>
							<input
								className={s.offertProduct}
								type='checkbox'
								name='isOffertPrice'
								value={input.isOffertPrice}
								onChange={(e) => handleCheck(e)}
							/>
						</div>

						{input.isOffertPrice && (
							<div>
								<label>Precio anterior: </label>
								<input
									className={s.input}
									type='number'
									placeholder='Ingrese precio anterior'
									name='previousPrice'
									value={input.previousPrice}
									onChange={(e) => handleChange(e)}
								/>
								{errors.previousPrice && input.previousPrice !== "" ? (
									<p>{errors.previousPrice}</p>
								) : (
									""
								)}
							</div>
						)}

						<div>
							<label>Precio actual: </label>
							<input
								className={s.input}
								type='number'
								placeholder='Ingrese precio'
								name='currentPrice'
								value={input.currentPrice}
								onChange={(e) => handleChange(e)}
							/>
							{errors.currentPrice && <p>{errors.currentPrice}</p>}
						</div>
					</div>

					<div className={s.sectionFour}>
						<div>
							<label>Marca: </label>
							<input
								className={s.input}
								type='text'
								placeholder='Ingrese marca'
								name='brandName'
								value={input.brandName}
								onChange={(e) => handleChange(e)}
							/>
							{errors.brandName && <p>{errors.brandName}</p>}
						</div>

						<div>
							<label>Color: </label>
							<input
								className={s.input}
								type='text'
								placeholder='Ingrese color'
								name='color'
								value={input.color}
								onChange={(e) => handleChange(e)}
							/>
							{errors.color && <p>{errors.color}</p>}
						</div>

						<div>
							<label>Género: </label>
							<select
								className={s.input}
								type='text'
								placeholder='Ingrese género'
								name='gender'
								value={input.gender}
								onChange={(e) => handleChange(e)}
							>
								<option>Seleccionar</option>
								<option value={"men"}>Hombre</option>
								<option value={"women"}>Mujer</option>
							</select>
							<h5>
								Género seleccionado:{" "}
								{input.gender === ""
									? "Seleccionar género"
									: input.gender === "women"
									? "Mujer"
									: "Hombre"}
							</h5>
						</div>
					</div>
					<div className={s.sectionFive}>
						<label>Categories: </label>
						<select className={s.input} onChange={handleSelectCategoryOnChange}>
							<optgroup value='categories' label='Man'>
								{categories
									?.filter((el) => el.genre === "men")
									.map((el) => (
										<option value={el.id} key={el.id} name={el.title}>
											{el.title}
										</option>
									))}
							</optgroup>
							<optgroup value='categories' label='Woman'>
								{categories
									?.filter((el) => el.genre === "women")
									.map((el) => (
										<option value={el.id} key={el.id} name={el.title}>
											{el.title}
										</option>
									))}
							</optgroup>
						</select>
						<div className={s.categoriesContainerGeneral}>
							{input.category !== "" ? (
								<div className={s.categoriesContainer}>
									<span value={input.category} className={s.spanCategory}>
										{nameCategory}
									</span>
									<button
										className={s.buttonCategory}
										value={input.category}
										onClick={(e) => handleDeleteSelectCategory(e)}
									>
										x
									</button>
								</div>
							) : (
								""
							)}
						</div>
					</div>

					<div className={s.sectionSix}>
						<div>
							<AddInfo
								input={input}
								setInput={setInput}
								errors={errors}
								setError={setError}
								validate={validate}
							/>

							<fieldset className={s.showInfo}>
								<legend>Información adicional actual: </legend>
								{(input.info?.aboutMe ||
									input.info?.sizeAndFit ||
									input.info?.careInfo) && (
									<div>
										<label>About Me:</label>
										<input
											type='text'
											value={input.info.aboutMe}
											name='aboutMe'
											className={s.input}
											onChange={(e) => handleChangeInfoAditional(e)}
										></input>
										<br />
										<label>Size and Fit:</label>
										<input
											type='text'
											value={input.info.sizeAndFit}
											name='sizeAndFit'
											className={s.input}
											onChange={(e) => handleChangeInfoAditional(e)}
										></input>
										<br />
										<label>Care info:</label>
										<input
											type='text'
											value={input.info.careInfo}
											name='careInfo'
											className={s.input}
											onChange={(e) => handleChangeInfoAditional(e)}
										></input>
									</div>
								)}
							</fieldset>
						</div>

						<div>
							<AddVariants input={input} setInput={setInput} />
							{input.variants?.length ? (
								<fieldset className={s.showInfo}>
									<legend>Variantes: </legend>
									{input.variants.map((el, idx) => {
										return (
											<div
												key={`${el.brandSize}${idx}`}
												className={s.eachVariant}
											>
												<p>{`Talle: ${el.brandSize} Stock: ${el.stock}`}</p>
												<button
													className={s.buttonCategory}
													onClick={(e) =>
														handleSizeDelete(e, el, input, setInput)
													}
												>
													x
												</button>
											</div>
										);
									})}
								</fieldset>
							) : (
								""
							)}
						</div>
						<button
							type='submit'
							className={
								Object.values(errors).length === 0 ? s.btn : s.btnDisable
							}
						>
							Modificar Producto
						</button>
					</div>
				</form>
			) : (
				<p>No se encontraron productos</p>
			)}
		</div>
	);
}
