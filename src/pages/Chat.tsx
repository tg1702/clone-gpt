import '../css/Chat.css'


export default function Chat(){

    const username = "Thelema Grannum";

    const messages = [
        {sender: "You", content: "Hello"},

        {sender: "Clone GPT",
        content: "Hello Back"
        }
    ]

    const chats = [
        {
            title: "How to make an omlet",
            messages: messages,
        }
    ]

    const sendToServer = () => {

    }

    const createChat = () => {

    }

    const closeSidebar = () => {

    }
    return (
        <>
            <div className="chat-body">
                <div className="main-chat-area">

                <div className="chat-header">
                  
                  <span className="username">
                  {username}
                  </span>
                  <i className="fa-solid fa-caret-down"></i>
                    

                 
                </div>

               
            <div className="chat-messages">
            {messages.map((msg, id) => {
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
                <form onSubmit={sendToServer}>
                    <input type="text" name="message-box" id="" placeholder="Message Clone GPT" />

                    
                    
                </form>
                <div>
                <i className="fa-regular fa-circle-up"></i> 
                </div>
               
                </div>
            </div>
            
                
            <div className="sidebar">

                <div className="sidebar-header">
                <div className="sidebar-title">
                    <h3>Clone GPT</h3>
                </div>

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
                    {chats.map((chat, id) =>{
                        return <div className="chat-title" key={id}>
                            {chat.title}
                        </div>;
                    })}
                </div>

            </div>
            </div>
            
        </>
    );
}