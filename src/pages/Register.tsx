

export default function Login(){

    const handleRegisterSubmit = () => {

    }

    return (
        <div className="register-body">
            <div className="close-button">

            </div>

            <div className="form-container">

                <form onSubmit={handleRegisterSubmit}>
                    <input type="text" name="name" placeholder="Name"></input>
                    <input type="email" name="email" placeholder="Email"></input>
                    <input type="password" name="password" placeholder="Password"></input>
                    
                    <input type="submit" value="Submit" />
                </form>
                <span>Already registered? Sign in</span>
            </div>
        </div>
    );
}