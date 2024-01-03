import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/Login.css'

export default function Login(){

    const navigate = useNavigate();

    const [warning, setWarning] = useState(false);

    const handleLoginSubmit = (event: any) => {
        event.preventDefault();

        setWarning(false);

        const name = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/i;
        const isValidEmail = emailRegex.test(email);

        if (!isValidEmail) displayWarningBox('An invalid email address was entered');

        if (!name)
            return;
        if (!email)
            return;
        if (!password)
            return;

        fetch('api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email, password: password })
            }
        ).then( (res) => res.json()
        
        ).then((data) => {
            console.log(data);
            if (data['error']){
                displayWarningBox(data["error"]);
            }
            else {
                navigate('/chat');
            }
                
        })

        
        
    }

    const displayWarningBox = (text : string) => {
        setWarning(true);
        let warningBox = document.querySelector(".warning-box");

        if (warningBox != null){
            warningBox.innerHTML = text;
        }
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
                    <input type="text" name="name" placeholder="Name" required></input>
                    <input type="email" name="email" placeholder="Email" required></input>
                    <input type="password" name="password" placeholder="Password" required></input>
                    
                    <input type="submit" value="Submit" />
                </form>
                <div className="warning-box" style={{'display': `${warning == true ? 'block' : 'none'}`}}>

                </div>
                <span>Don't have an account? <button onClick={() => navigate("/register")}>Register</button></span>
            </div>
        </div>
    );
}