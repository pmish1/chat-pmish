import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { db, storage } from '../Firebase'
import { arrayUnion, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import {v4 as uuid} from 'uuid'

import {UserContext} from '../context/UserContext'
import { ChatContext } from '../context/ChatContext'

function Input() {
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null)

    const currentUser = useContext(UserContext)
    const {data, dispatch} = useContext(ChatContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const storageRef = ref(storage, data.chatId)
        try {
            if (image) {

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        console.log(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion(
                                    {
                                        messageURL: downloadURL,
                                        message, 
                                        date: Timestamp.fromDate(new Date()),
                                        sender: currentUser.uid,
                                        reciever: data.user.talkingToID
                                    }
                                )
                                    
                            })
                        })
                    }
                )
                setImage(null)
                setMessage("")
            } else {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion(
                        {
                            message, 
                            sender: currentUser.uid,
                            reciever: data.user.talkingToID,
                            date: Timestamp.fromDate(new Date())
                        }
                    )
                })
                setMessage("")
            }
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div className='input'>
        <form className='input__form' onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="write message" 
                onChange={e => setMessage(e.target.value)}
                value={message ? message : ""}
            />
            <input 
                type="file" 
                onChange={e => setImage(e.target.files[0])}
                id="send-file"
            />
            <label htmlFor="send-file">IMG</label>
            <button type="submit">Send</button>
        </form>
    </div>
  )
}

export default Input