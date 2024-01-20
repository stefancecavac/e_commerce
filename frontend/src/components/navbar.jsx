import { Link } from "react-router-dom"

import LoginRegister from "./loginRegister";


import UserInfo from "./userInfo";
import { useUserContext } from "../hooks/useUserContext";

const Navbar = () => {
    const { user } = useUserContext()

    return (
        <header>
            <div className="headermain">
                <Link to='/'><h1>E-commerce</h1></Link>

                <input className='search' type="text"></input>
                {!user && (
                    <LoginRegister></LoginRegister>
                )}
                <UserInfo></UserInfo>
            </div>
           
            


        </header>
    )
}

export default Navbar