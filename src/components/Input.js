import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { db, storage } from '../Firebase'
import { arrayUnion, doc, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import {v4 as uuid} from 'uuid'
import {MdDriveFolderUpload} from 'react-icons/md'

import {UserContext} from '../context/UserContext'
import { ChatContext } from '../context/ChatContext'

import {CiImageOn} from 'react-icons/ci'

import addImage from '../images/addImage.png'

function Input() {
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null)


    const lastM = image ? "Image was sent" : message

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
                        console.log("")
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

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {lastM}
            })
            await updateDoc(doc(db, "userChats", data.user.talkingToID), {
                [data.chatId + ".lastMessage"]: {lastM}
            })

            setImage(null)
            setMessage("")

        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div className='input'>
        <form className='input__form' onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder={data.user ? "write message" : "select a friend"} 
                onChange={e => setMessage(e.target.value)}
                value={message ? message : ""}
                disabled={data.user ? false : true}
            />
            <input 
                type="file" 
                onChange={e => setImage(e.target.files[0])}
                id="send-file"
                disabled={data.user ? false: true}
            />
            <label htmlFor="send-file">
                {/* <img className="image-icon" src={addImage} alt="add image" /> */}
                <MdDriveFolderUpload size="45px" color="#60a386"/>
            </label>
            <button type="submit" disabled={data.user ? false : true}>Send</button>
        </form>
    </div>
  )
}

export default Input