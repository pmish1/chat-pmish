import React from 'react'

function Message() {
  return (
    <>
        <div className='message'>
            <img 
                className='message__profile-image'
                src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="profile image" 
            />
            <p className='message__sent-message'>example message</p>
            <img 
                className='message__sent-image'
                src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="sent image" 
            />
        </div>
        <div className='message owner'>
            <img 
                className='message__profile-image'
                src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="profile image" 
            />
            <p className='message__sent-message'>example message</p>
            <img 
                className='message__sent-image'
                src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="sent image" 
            />
        </div>
        <div className='message owner'>
            <img 
                className='message__profile-image'
                src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="profile image" 
            />
            <p className='message__sent-message'>example message</p>
            <img 
                className='message__sent-image'
                src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="sent image" 
            />
        </div>
        
        
    </>
  )
}

export default Message