import { useState } from 'react';
import { useUserContext } from "../hooks/useUserContext";
import { Link } from 'react-router-dom';
import { UseLogout } from "../hooks/useLogout";

const UserInfo = () => {
    const { user } = useUserContext();
    const { logout } = UseLogout();

    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleLogout = async () => {
        await logout();
    }

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    }

    return (
        user && (
            <div className="userinfo">

                {isMenuVisible && (
                    <div className="menu">
                        <div className='menuuser'>
                            <p>{user.email}</p>
                            <button onClick={toggleMenu}>X</button>
                            </div>
                            <Link to='/addproduct'><button>Add Product</button></Link>
                            <Link to='/userproducts'><button>My Products</button></Link>
                            <button onClick={handleLogout}>Logout</button>
                      
                    </div>
                )}
                <p>{user.email}</p>
                <button onClick={toggleMenu}>Menu</button>
            </div>
        )
    );
}

export default UserInfo;
