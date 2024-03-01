import '../css/Home.css';
import {Link} from 'react-router-dom';

export default function Home () {

    const navigateToChat = () => {

    }
    
    return (
        <>
    <div className="main-body">
        <div className="nav-header">
        <h1 className="appName">
          Clone GPT
        </h1>

        <div className="buttons">
          <button>
            <Link to="/login">
              Login
            </Link>
          </button>
          <button>
          <Link to="/register">
              Register
            </Link>
          </button>
        </div>
        </div>

        <div className="main-content">
          <div className="home">
            <h2 className="home-text">The Future of AI is here</h2>
            <button onClick={navigateToChat}>
             <Link to="/register">Start Here</Link> 
            </button>
          </div>
        </div>
        <div className='what-is'>
          <h3 className="what-is header">What is Clone GPT?</h3>
          <hr className="horizontal-divider"></hr>

          <div className="description-container">

          <div className="description-text">
            Clone GPT is a web application heavily inspired by OpenAI's Chat GPT. Clone GPT was built using the MERN stack along with the Google AI API to generate responses. Create your own personalized chats by registering now!
          </div>
          <div className="description-image">
            <img src="./src/assets/description-img.jpg" >
            </img>
          </div>

          </div>
          
        </div>

        <div className="about">
            <div className="about-name">
                <h2>About</h2>
            </div>
          

          <div className="about-text">
            <span>
              Developer: Thelema Grannum
            </span>

            <span>
              Source Code: <a href="https://github.com/tg1702/clone-gpt">
              View on GitHub
              </a>
            </span>
          </div>
        </div>

      </div>
        </>
    );
   
    
    
}