import React, { useState, useEffect, useContext } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FireBaseEcommerce/database';

const Carousel = () => {
  // Se define el estado para almacenar los productos obtenidos de la DB
  const [products, setProducts] = useState([]);
  // Se utiliza el hook useContext para acceder al valor de "darkMode" dentro del contexto "DarkModeContext"
  const { darkMode } = useContext(DarkModeContext);
  // En un efecto que se ejecuta solo una vez al cargar el componente,
  // se realiza una petición HTTP a la DB para obtener los productos y actualizar el estado "products"
  useEffect(() => {
    const getProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsDocsRef = await getDocs(productsCollection);
      const productDocs = productsDocsRef.docs;
      const products = productDocs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(products);
    }
    getProducts();
  }, []);

  // Se definen las opciones de configuración para el componente Slider de react-slick
  const settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: -20,
    arrow: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 0.8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 0.6,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Se devuelve el JSX del componente, que utiliza el componente Slider para mostrar los productos en un carousel
  return (
    <>
      <div className={`carousel ${darkMode ? "modo-oscuro" : ""}`}>
        <h2 className="carousel__title">Productos destacados</h2>
        {/* Se utiliza el componente Slider de react-slick para mostrar los productos en un carousel */}
        <Slider className="carousel__slider" {...settings} draggable={false}>
          {/* Por cada producto se genera un slide con sus datos */}
          {products.map((product) => (
            <div key={product.id} className="carousel__slide">
              {/* Al hacer clic en el producto se redirige a la página de detalles del producto */}
              <Link to={`/productDetailViewLink/${product.id}`}>
                <img className="carousel__image" src={product.imageURL} alt={product.title} />
                <h3 className="carousel__subtitle">{product.title}</h3>
                <p className="carousel__price">{product.price}$</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;
