

export default function Login(){

    const handleLoginSubmit = () => {

    }

    return (
        <div className="login-body">
            <div className="close-button">

            </div>

            <div className="form-container">

                <form onSubmit={handleLoginSubmit}>
                    <input type="text" name="name" placeholder="Name"></input>
                    <input type="email" name="email" placeholder="Email"></input>
                    <input type="password" name="password" placeholder="Password"></input>
                    
                    <input type="submit" value="Submit" />
                </form>
                <span>Don't have an account? Register</span>
            </div>
        </div>
    );
}