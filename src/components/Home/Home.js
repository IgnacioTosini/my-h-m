import Carousel from '../Carousel/Carousel';

const Home = ({modoOscuro}) => {
    return (
        <div className={`App ${modoOscuro ? "modo-oscuro" : ""}`}>
            <Carousel modoOscuro={modoOscuro} />
        </div>
    )
}

export default Home;