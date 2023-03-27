import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext'
import { UserContext } from '../context/UserContext'

function Message({message}) {
    const currentUser = useContext(UserContext)
    const {data, dispatch} = useContext(ChatContext)
    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message])

  return (
    <>

        <div className={`message ${message.sender === currentUser.uid && "owner"}`} key={Math.random()} ref={ref}>
            <img 
                className='message__profile-image'
                src={message.sender === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
                alt="profile image" 
            />

            {message.message.length > 0 && <p className='message__sent-message'>{message.message}</p>}
            <div> </div>

            {message.messageURL &&
                <img 
                    className='message__sent-image'
                    src={message.messageURL}
                    alt="profile image" 
                />
            }
        </div>


    </>
  )
}

export default Message





    