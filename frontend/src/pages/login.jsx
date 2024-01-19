import { useState } from "react"
import { useLogin } from "../hooks/useLogin"


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error , loading} = useLogin()

    const submitLogin = async(e) => {
        e.preventDefault()

        await login(email,password)
    }

    return (
        <div className="login">

        <form onSubmit={(submitLogin)}>
            <h2>login</h2>
            <label>email:</label>
            <input type="text"
                onChange={e => setEmail(e.target.value)}
                value={email}></input>

            <label>password:</label>
            <input type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}></input>

                <button disabled={loading} type="submit">login</button>

                {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default Login