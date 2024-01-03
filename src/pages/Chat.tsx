import '../css/Chat.css';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Chat(){

    interface Messages{
        sender: string;
        content: string;
    }
    
    interface Chats {
        title: string;
        messages: Messages[];
        user_id: string;
        _id: string;
        timestamp: string;

    }

    const navigate = useNavigate();

    const [sidebarState, setSidebarState] = useState('flex');
    const [popupState, setPopupState] = useState('none');

    const [messages, setMessages] = useState<Messages[]>([]);

    

    const [username, setUsername] = useState("");
    const [userId, setUserID] = useState("");
    const [chats, setChats] = useState<Chats[]>([]);

    
    const navigateHome = () => {
        navigate('/');
    }

    useEffect(() => {
            let user = Cookies.get("User ID");
            if (user != null){
                user = decodeURI(user.slice(2));
                const verified_user = JSON.parse(user);
                setUsername(verified_user.username);
                setUserID(verified_user.user_id);
            }
            
            console.log(username);
            console.log(userId);

            if (userId)
                fetch(`api/users${userId}/chats`).then((res) => res.json()).then((data : Chats[]) =>{
                    setChats([...data, ...chats]);
            });
            

               document.querySelector(".sidebar")?.addEventListener("click", () => {
                setTimeout(closePopup, 500);
            });
        

       
    }, [popupState, username, userId]);

    function closePopup(){
        setPopupState('none');
    }

    
    const loadMessages = (chatMessages: Messages[]) => {
        setMessages(chatMessages);
    }

    async function sendToServer(event: any){
        event.preventDefault();

        setMessages([...messages, {sender: "You", content: event.target[0].value}]);
        
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
                        <span onClick={navigateHome} >Sign out</span>
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
                

                <button onClick={closeSidebar}> 
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
                            <button onClick={() => loadMessages(chat.messages)}>
                                {chat.title}
                            </button>
                            
                        </div>
                    })}
                </div>

            </div>
            </div>
            
        </>
    );
}