import "./Landing.css"
import { Link } from 'react-router-dom'

function Landing()
{
    return(
        <div>
        <form action="/home">
            <p>
                <label>Username or email address</label><br/>
                <input type="text" name="first_name" required />
            </p>
            <p>
                <label>Password</label>
                <br/>
                <input type="password" name="password" required />
            </p>
            <p>
                <button id="sub_btn" type="submit">Login</button>
            </p>
            <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
        </form>
            </div>
    )
}

export default Landing;