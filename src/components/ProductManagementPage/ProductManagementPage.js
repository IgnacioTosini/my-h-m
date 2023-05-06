import { Link } from 'react-router-dom';

const ProductManagementPage = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/addproductform">Agregar producto</Link></li>
                <li><Link to="/searchproductform">Buscar producto</Link></li>
            </ul>
        </nav>
    );
}

export default ProductManagementPage;