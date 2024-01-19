import { useState } from "react"
import { UseRegister } from "../hooks/useRegister"


const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register , loading, error} = UseRegister()

    const submitRegister = async(e) => {
        e.preventDefault()

        await register(email,password)
    }

    return (
        <div className="register">

        <form onSubmit={submitRegister}>
            <h2>register</h2>
            <label>email:</label>
            <input type="text"
                onChange={e => setEmail(e.target.value)}
                value={email}></input>

            <label>password:</label>
            <input type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}></input>

                <button disabled={loading} type="submit">register</button>

                {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default Register