
import {useNavigate} from 'react-router-dom';

export default function Login(){

    const handleRegisterSubmit = () => {

    }

    const navigate = useNavigate();

    return (
        <div className="register-body">
            <div className="close-button">
            <i className="fa-solid fa-xmark"></i>
            </div>

            <div className="form-container">

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