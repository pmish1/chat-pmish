import Input from "./Input"
import Messages from "./Messages"

function Chat() {
  return (
    <div className="chat">
        <span>Talking to</span>
        <Messages />
        <Input />
    </div>
  )
}

export default Chat