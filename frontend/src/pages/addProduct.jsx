import { useState } from 'react'
import {useUserContext} from '../hooks/useUserContext'
import {useProductContext} from '../hooks/useProductHook'

const AddProduct = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const {dispatch} = useProductContext()

    const {user} = useUserContext()

    const postProduct = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:4000/api/products' ,{
                method:'POST',
                body: JSON.stringify({ title, description, price}),
                headers: {
                  'Authorization': `Bearer ${user.token}`,
                  'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'POST_PRODUCTS' ,payload:json})
                setTitle('')
                setDescription('')
                setPrice('')
            }
        }
        catch(error){
            console.log(error)
        }
        
       
    }

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


            <button type="submit">add</button>
            <button >x</button>


        </form>
        </div>
    )
}

export default AddProduct