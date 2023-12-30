import {useNavigate} from 'react-router-dom';
import '../css/Login.css'

export default function Login(){

    const navigate = useNavigate();

    const handleLoginSubmit = () => {
        navigate("/chat");
    }

    const navigateClose = () => {
        navigate("/");
    }

    return (
        <div className="login-body">
            <div className="close-button">
                <i className="fa-solid fa-xmark" onClick={navigateClose}></i>
            </div>

            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" name="name" placeholder="Name"></input>
                    <input type="email" name="email" placeholder="Email"></input>
                    <input type="password" name="password" placeholder="Password"></input>
                    
                    <input type="submit" value="Submit" />
                </form>
                <span>Don't have an account? <button onClick={() => navigate("/register")}>Register</button></span>
            </div>
        </div>
    );
}