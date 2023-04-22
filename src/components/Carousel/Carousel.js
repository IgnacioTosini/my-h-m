import React, { useState, useEffect, useContext } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';

const Carousel = () => {
  const [products, setProducts] = useState([]);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <>
      <div className={`carousel ${darkMode ? "modo-oscuro" : ""}`}>
        <h2 className="carousel__title">Productos destacados</h2>
        <Slider className="carousel__slider" {...settings} draggable={false}>
          {products.map((product) => (
            <div key={product.id} className="carousel__slide">
              <Link to={`/productDetailViewLink/${product.id}`}>
                <img className="carousel__image" src={product.image} alt={product.title} />
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
