
import {useNavigate} from 'react-router-dom';

export default function Login(){

    const navigate = useNavigate();

    const handleRegisterSubmit = () => {
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
                <h1>Register</h1>
                <form onSubmit={handleRegisterSubmit}>
                    <input type="text" name="name" placeholder="Name"></input>
                    <input type="email" name="email" placeholder="Email"></input>
                    <input type="password" name="password" placeholder="Password"></input>
                    
                    <input type="submit" value="Submit" />
                </form>

                <span>Already registered? <button onClick={() => navigate("/login")}>Sign in</button></span>
            </div>
        </div>
    );
}