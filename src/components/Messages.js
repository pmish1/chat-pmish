import { doc, onSnapshot, setDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/ChatContext"
import { db } from "../Firebase"
import Message from "./Message"

function Messages() {
    const [messages, setMessages] = useState(null)

    const {data, dispatch} = useContext(ChatContext)

    useEffect(() => {  
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                Object.entries(doc.data()).map((e) => setMessages(e[1]))
            })
            return () => {unsub()}
        }
        data.chatId && getMessages()
    }, [data.chatId])  //this updates when signed in user clicks on a chat


  return (
    <div className="messages">
        {messages?.map((m) => {
            console.log(m);
            return <Message m={m} key={Math.random()}/>
        })}
    </div>
  )
}

export default Messages