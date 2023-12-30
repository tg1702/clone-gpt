import {Link} from 'react-router-dom';

export default function Home () {

    const navigateToChat = () => {

    }
    
    return (
        <>
            <div className="main-body">
        <div className="header">
        <span className="appName">
          Clone GPT
        </span>

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
            <span className="home-text">The Future of AI is here</span>
            <button onClick={navigateToChat}>
             <Link to="/register">Start Here</Link> 
            </button>
          </div>
        </div>
        <div className='what-is'>
          <span className="what-is header">What is Clone GPT?</span>
          <hr className="horizontal-divider"></hr>

          <div className="description-container">

          <div className="description-text">
            Clone GPT is an (almost) identical replica of OpenAI's Chat GPT. Clone GPT was built uusing the MERN stack along with the OpenAI API to generate responses from the GPT-3.5 model
          </div>
          <div className="description-image">
            <img src="./src/assets/description-img.jpg" height='100px' width='100px' >
            </img>
          </div>

          </div>
          
        </div>

        <div className="about">
          <span className="about-name">About</span>

          <div className="about-text">
            <span>
              Developer: Thelema Grannum
            </span>

            <span>
              Source Code: <a href="">
              insert_github_link
              </a>
            </span>
          </div>
        </div>

      </div>
        </>
    );
   
    
    
}