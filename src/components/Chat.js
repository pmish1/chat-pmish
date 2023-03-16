import { useContext } from "react"
import Input from "./Input"
import Messages from "./Messages"
import {ChatContext} from '../context/ChatContext'

function Chat() {

    const {data, dispatch} = useContext(ChatContext)


  return (
    <div className="chat">
        {data && <span>{data.user.talkingTo}</span>}
        <Messages />
        <Input />
    </div>
  )
}

export default Chat