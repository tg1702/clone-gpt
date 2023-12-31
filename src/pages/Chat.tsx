import '../css/Chat.css'
import { useState, useEffect } from 'react';


export default function Chat(){

    const [sidebarState, setSidebarState] = useState('flex');
    const [popupState, setPopupState] = useState('none');

    const [messages, setMessages] = useState( [
        {sender: "You", content: "Hello"},

        {sender: "Clone GPT",
        content: "Hello Back"
        }
    ]);

    const username = "Thelema Grannum";

    

    useEffect(() => {

        /*
        fetch("api/users/")
        .then((response) => response.json())
        .then((data) => setMessages(data));

        */

            document.addEventListener("click", () => {
                setTimeout(closePopup, 3000);
            });
        
       
    }, [popupState]);

    function closePopup(){
        setPopupState('none');
    }
    
    const chats = [
        {
            title: "How to make an omlet",
            messages: messages,
        }
    ]

    async function sendToServer(event: any){
        event.preventDefault();

        setMessages([...messages, {sender: "You", content: event.target[0].value}]);
        
    }
    const createChat = () => {

    }

    const openSidebar = () =>{
        setSidebarState('flex')
    }
    const closeSidebar = () => {
        setSidebarState('none');  
    }

    const showPopup = () => {
        setPopupState('block');
    }

    return (
        <>
            <div className="chat-body">
                <div className="main-chat-area">

                <div className="chat-header">
                  
                  <div className="hamburger">
                  <i className="fa-solid fa-bars" onClick={openSidebar} style={{'display': `${sidebarState == 'flex' ?'none' : 'block'}`}}></i>

                  <div className="sidebar-title">
                    <h3>Clone GPT</h3>
                </div>
                  </div>

                  <div className="user-info">
                    <span className="username">
                  {username}
                    </span>
                    <i className="fa-solid fa-caret-down" onClick={showPopup}></i>
                  </div>
                  
                    <div className="popup" style={{'display': `${popupState}`}}>
                        <span >Sign out</span>
                    </div>

                 
                </div>

               
            <div className="chat-messages">
            {
            
                messages.map((msg, id) => {
                    return <div className="chatbox" key={id}>
                      <div className="sender-name">
                          {msg.sender}
                      </div>
                      <div className="sender-body">
                          {msg.content}
                      </div>
                      <hr></hr>
                    </div>
                    ; 
                  })
            
            
            }
            </div>
           

            <div className="message-input">
                <form onSubmit={sendToServer} id="message-input-form">
                    <textarea name="message-box" form="message-input-form" placeholder="Message Clone GPT"/>

                    <button type="submit"><i className="fa-regular fa-circle-up"></i></button>
                </form>
                
                <div>
                 
                </div>
               
                </div>
            </div>
            
                
            <div className="sidebar" style={{'display': `${sidebarState}`}}>

                <div className="sidebar-header">
                

                <div className="close">
                    <i className="fa-solid fa-xmark" onClick={closeSidebar}></i>
                </div>
                
                </div>
                

                <button onSubmit={createChat}> 
                    <span className="button-icon">

                    </span>
                    <span className="button-text">
                        New Conversation
                    </span>
                </button>

                <div className="chat-list">
                    <h3>Previous chats</h3>
                    {chats.map((chat, id) =>{
                        return <div className="chat-title" key={id}>
                            <button>
                                {chat.title}
                            </button>
                            
                        </div>;
                    })}
                </div>

            </div>
            </div>
            
        </>
    );
}