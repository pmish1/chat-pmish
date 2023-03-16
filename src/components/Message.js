import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { UserContext } from '../context/UserContext'

function Message({m}) {
    const currentUser = useContext(UserContext)
    const {data, dispatch} = useContext(ChatContext)

  return (
    <>
        {currentUser.uid === m.sender ? 
            <div className='message owner'>
                {m.message && 
                    <>
                        <img 
                            className='message__profile-image'
                            src={currentUser.photoURL}
                            alt="profile image" 
                        />
                        <p className='message__sent-message'>{m.message}</p>
                    </>
                }
                {m.messageURL && 
                    <>
                        <img 
                            className='message__sent-image'
                            src={m.messageURL}
                            alt="profile image" 
                        />
                    </>
                }
            </div>
        :
            <div className='message'>
                {m.message && 
                    <>
                        <img 
                            className='message__profile-image'
                            src={data.user.photoURL}
                            alt="profile image" 
                        />
                        <p className='message__sent-message'>{m.message}</p>
                    </>
                }
                {m.messageURL && 
                    <>
                        <img 
                            className='message__sent-image'
                            src={m.messageURL}
                            alt="profile image" 
                        />
                    </>
                }
            </div>
        }
    </>
  )
}

export default Message