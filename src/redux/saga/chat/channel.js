import { Event as e, ServerEvent as se } from "./events"
import {
  receivedMessage,
  fetchedConversations,
  chatViewed,
  receivedError,
  userActive,
  typingStarted,
  typingEnded,
  createdConversation,
} from "../../actions/chat"

export default function chatChannel(socket, dispatch) {
  const handleConnect = () => {
    socket.emit(e.CONNECTED)

    socket.emit(e.GET_CONVERSATIONS, conversations => {
      dispatch(fetchedConversations(conversations))
    })
  }

  const handleNewConversation = chatId => {
    socket.emit(e.JOIN_THE_CREATED_CONVERSATION, chatId, conversation => {
      dispatch(createdConversation(conversation))
    })
  }

  socket.on(se.CONNECT, handleConnect)
  socket.on(se.CREATED_CONVERSATION, handleNewConversation)
  socket.on(se.TYPING_STARTED, chatId => dispatch(typingStarted(chatId)))
  socket.on(se.TYPING_ENDED, chatId => dispatch(typingEnded(chatId)))
  socket.on(se.NEW_MESSAGE, message => dispatch(receivedMessage(message)))
  socket.on(se.CHAT_ERROR, error => dispatch(receivedError(error)))
  socket.on(se.USER_ACTIVE, user => dispatch(userActive(user)))
  socket.on(se.CHAT_VIEWED, chatId => dispatch(chatViewed(chatId)))
}