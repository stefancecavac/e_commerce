import { Link } from "react-router-dom"

const LoginRegister = () => {

    return (
        <div className="authlinks">

            <Link to='/user/login'>Login</Link>
            <Link to='/user/register'>register</Link>
        </div>
    )
}
export default LoginRegister