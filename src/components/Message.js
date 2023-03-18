import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { UserContext } from '../context/UserContext'

function Message({messages}) {
    const currentUser = useContext(UserContext)
    const {data, dispatch} = useContext(ChatContext)

    messages.map((message) => console.log(message))

  return (
    <>
        {messages?.map((m) => {
            return (
                <div className={`message ${m.sender === currentUser.uid && "owner"}`} key={Math.random()}>
                    <img 
                        className='message__profile-image'
                        src={m.sender === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
                        alt="profile image" 
                    />

                    {m.message.length > 0 && <p className='message__sent-message'>{m.message}</p>}
                    <div> </div>

                    {m.messageURL &&
                        <img 
                            className='message__sent-image'
                            src={m.messageURL}
                            alt="profile image" 
                        />
                    }
                </div>
            )
        })}
    </>
  )
}

export default Message





    