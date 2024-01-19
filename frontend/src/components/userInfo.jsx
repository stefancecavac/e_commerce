import { useUserContext } from "../hooks/useUserContext"
import {Link} from 'react-router-dom'

import { UseLogout } from "../hooks/useLogout";

const UserInfo = () => {
    const { user } = useUserContext()
   
    const {logout} = UseLogout()

    const handleLogout = async () => {
        await logout();

    }
    return (
        user && (

        <div className="userinfo">

            <Link to='/addproduct'> <button >add product</button></Link>
    
            <p>{user.email}</p>
            <button onClick={handleLogout}>logout</button>
        </div>
        )
    )
}

export default UserInfo