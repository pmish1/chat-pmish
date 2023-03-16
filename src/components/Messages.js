import { doc, setDoc } from "firebase/firestore"
import { useContext, useEffect } from "react"
import { ChatContext } from "../context/ChatContext"
import { db } from "../Firebase"
import Message from "./Message"

function Messages() {

    const {data, dispatch} = useContext(ChatContext)

    // useEffect(() => {
    //     const createChats = async () => {
    //         try {
    //             await setDoc(doc(db, "chats", data.chatId), {});
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     return () => {createChats()}
    // })

  return (
    <div className="messages">
        <Message />
    </div>
  )
}

export default Messages