
import {useNavigate} from 'react-router-dom';

export default function Login(){

    const navigate = useNavigate();

    const handleRegisterSubmit = (event : any) => {
        event.preventDefault();

        const name = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValidEmail = emailRegex.test(email);

        if (!isValidEmail) return;

        if (!name)
            return;
        if (!email)
            return;
        if (!password)
            return;

        fetch('api/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email, password: password })
            }
        ).then( (res) => console.log(res));

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
                    <input type="text" name="name" placeholder="Name" required></input>
                    <input type="email" name="email" placeholder="Email" required></input>
                    <input type="password" name="password" placeholder="Password" required></input>
                    
                    <input type="submit" value="Submit" />
                </form>

                <span>Already registered? <button onClick={() => navigate("/login")}>Sign in</button></span>
            </div>
        </div>
    );
}