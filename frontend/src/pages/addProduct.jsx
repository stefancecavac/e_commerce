import { useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import { useProductContext } from '../hooks/useProductHook';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const { dispatch } = useProductContext();
    const { user } = useUserContext();

    const postProduct = async (e) => {
        e.preventDefault();
        setLoading(false);

        try {
            const response = await fetch('http://localhost:4000/api/products', {
                method: 'POST',
                body: JSON.stringify({ title, description, price, category, image }),
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'POST_PRODUCTS', payload: json });
                setTitle('');
                setDescription('');
                setPrice('');
                setCategory('');
                setImage(null); // Clear the image state after successful upload
                setError(null);
                setLoading(true);
            } else {
                const errorMessage = json && json.error ? json.error : 'Failed to add product';
                setError(errorMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const convertTo64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const base64 = await convertTo64(file);
            console.log(base64)
            setImage(base64);
        }
    };

    return (
        <div className='addproduct'>
            <form onSubmit={postProduct}>
                <h2>add product</h2>
                <input
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    onChange={(e) => handleFileUpload(e)}
                />

                <label>title:</label>
                <input
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label>description:</label>
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

                <label>price:</label>
                <input
                    type='number'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />

                <label>Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value=''>Select category</option>
                    {['electronic', 'furniture', 'automotive', 'other'].map(
                        (category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        )
                    )}
                </select>

                <button disabled={loading} type='submit'>
                    add
                </button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default AddProduct;
