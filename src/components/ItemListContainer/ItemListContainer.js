const ItemListContainer = ({greeting, modoOscuro}) => {
    return (
        <div className={`container ${modoOscuro ? "modo-oscuro" : ""}`}>
            <h1>{greeting}</h1>
        </div>
    )
}

export default ItemListContainer;