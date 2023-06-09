import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { UserContext } from '../context/UserContext'
import { db } from '../Firebase'

function Chats() {
    const [chats, setChats] = useState(null)
    const currentUser = useContext(UserContext)
    const {data, dispatch} = useContext(ChatContext)


    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            })
            return () => {unsub()}
        }
        //only works if comparing against currentUser.uid
        currentUser.uid && getChats()
    }, [currentUser])

    const handleClick = (userInfo) => {
        dispatch({type: 'CHANGE_USER', payload: userInfo})
    }

  return (
    <>
        {chats && Object.entries(chats).map((chat) => {
            return (
                <div className="chats" key={chat[0]} onClick={() => handleClick(chat)}>
                    <img 
                        src={chat[1]?.photoURL}  
                        alt="profile image"
                        />

                    <div className='chats__sent'>
                        {chat[1].lastMessage.lastM && <p>Sent: {chat[1].lastMessage.lastM}</p>}
                    </div>

                    <div className='chats__user'>
                        <h3>{chat[1]?.talkingTo}</h3>
                    </div>
                </div>
            )
        })}
    </>
  )
}

export default Chats