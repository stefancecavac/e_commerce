import { Link } from "react-router-dom"

import LoginRegister from "./loginRegister";


import UserInfo from "./userInfo";
import { useUserContext } from "../hooks/useUserContext";

const Navbar = () => {
    const { user } = useUserContext()

    return (
        <header>
            <Link to='/'><h1>E-commercre website</h1></Link>


            {!user && (
              <LoginRegister></LoginRegister>
            )}

            <UserInfo></UserInfo>



        </header>
    )
}

export default Navbar