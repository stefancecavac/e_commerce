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

              
                {user ? (
                    <UserInfo></UserInfo>
                ) : (
                    <LoginRegister></LoginRegister>
                )}
                
              
            </div>
           
            


        </header>
    )
}

export default Navbar