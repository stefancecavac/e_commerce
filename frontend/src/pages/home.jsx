import{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useProductContext } from '../hooks/useProductHook';
import ProductCard from '../components/productCard';
import FilterCard from '../components/filterCard';


const Home = () => {
    const { products, dispatch } = useProductContext();
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [search , setSearch] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/products?category=${category}&status=${status}&search=${search}`);
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_PRODUCTS', payload: json });
                }
            } catch (error) {
                console.log('fetch error', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [dispatch, category, status , search]);

    const handleFilterChangeCategory = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const handleFilterChangeStatus = (selectedStatus) => {
        setStatus(selectedStatus);
    };
    const handleSearchChange = (searchTerm) => {
        setSearch(searchTerm);
    };


    return (
        <div className="home">
            <FilterCard
                category={category}
                status={status}
                search={search}
                onCategoryChange={handleFilterChangeCategory}
                onStatusChange={handleFilterChangeStatus}
                onSearchChange={handleSearchChange}
            />
            <div className="homecontent">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    products && products.map((product) => (
                        <Link key={product._id} to={`/product-details/${product._id}`}>
                            <ProductCard product={product} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
