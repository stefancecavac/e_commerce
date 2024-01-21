import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { useProductContext } from '../hooks/useProductHook'

const AddProduct = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [dateAdded, setDateAdded] = useState('')
    const [category, setCategory] = useState('')
    

    const { products } = useProductContext()
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const { dispatch } = useProductContext()

    const { user } = useUserContext()

    const postProduct = async (e) => {
        e.preventDefault()
        setLoading(false)
        try {
           
            const response = await fetch('http://localhost:4000/api/products', {
                method: 'POST',
                body: JSON.stringify({ title, description, price, dateAdded, category}),
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'POST_PRODUCTS', payload: json });
                setTitle('');
                setDescription('');
                setPrice('');
                setDateAdded('')
                setCategory('')
                setError(null);
                setLoading(true)
            } else {
                const errorMessage = json && json.error ? json.error : 'Failed to add product';
                setError(errorMessage);
            }
        }
        catch (error) {
            console.log(error)

        }


    }
    console.log(products)
    return (
        <div className='addproduct'>

            <form onSubmit={(postProduct)}>
                <h2>add product</h2>
                <label>title:</label>
                <input type="text"
                    onChange={e => setTitle(e.target.value)}
                    value={title}></input>

                <label>description:</label>
                <input
                    onChange={e => setDescription(e.target.value)}
                    value={description}></input>

                <label>price:</label>
                <input type="number"
                    onChange={e => setPrice(e.target.value)}
                    value={price}></input>

                <label>Category:</label>
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">Select category</option>
                    {['electronic', 'furniture', 'automotive', 'other'].map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <button disabled={loading} type="submit">add</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default AddProduct