import { reduceReducers } from "./helpers/reduce-reducers"
import { reducersMap } from "./helpers/reducers-map"
import { Type as t } from "../types"
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import { softCombineReducers } from "./helpers/soft-combine-reducers"
import { pickers } from "../../utils/array"
import { Alert } from "react-native"

const INITIAL_STATE = {
  chatIdByParticipantIdMap: {},
  conversationByIdMap     : {},
}

const byParticipantId = c => c.participant._id

const makeChatIdByParticipantIdMap = (state, action) => (
  mapValues(keyBy(action.conversations, byParticipantId), pickers.objectId)
)

const enrichChatIdByParticipantIdMap = (state, action) => ({
  ...state,
  [action.conversation.participant._id]: action.conversation._id,
})

const makeConversationByIdMap = (state, action) => keyBy(action.conversations, '_id')

const enrichConversationByIdMap = (state, action) => ({
  ...state,
  [action.conversation._id]: action.conversation,
})

const saveReceivedMessage = (state, action) => {
  state[action.message.chatId].messages.push(action.message)
}

const updateUserStatus = (state, action) => {
  const conversation = state[action.payload.chatId]

  conversation.participant.isActive = action.payload.isActive
  conversation.participant.lastSeen = action.payload.lastSeen
}

const updateViewedStatus = (state, action) => {
  const conversation = state[action.payload.chatId]

  conversation.messages = conversation.messages.map(msg => {
    if (msg.senderId !== action.payload.userId) {
      msg.viewed = true
    }

    return msg
  })
}

const errorHandler = (state, action) => {
  Alert.alert('Помилка чату!', action.error.message)

  return state
}

export default reduceReducers(
  INITIAL_STATE,
  softCombineReducers({
    chatIdByParticipantIdMap: reducersMap({
      [t.FETCHED_CONVERSATIONS]        : makeChatIdByParticipantIdMap,
      [t.JOIN_THE_CREATED_CONVERSATION]: enrichChatIdByParticipantIdMap,
    }),
    conversationByIdMap     : reducersMap({
      [t.FETCHED_CONVERSATIONS]        : makeConversationByIdMap,
      [t.JOIN_THE_CREATED_CONVERSATION]: enrichConversationByIdMap,
      [t.RECEIVED_MESSAGE]             : saveReceivedMessage,
      [t.USER_ACTIVE]                  : updateUserStatus,
      [t.CHAT_VIEWED]                  : updateViewedStatus,
    }),
  }),
  reducersMap({
    [t.RECEIVED_ERROR]: errorHandler,
    [t.LOG_OUT_USER]  : () => INITIAL_STATE,
  })
)

export const selectConversationByParticipantId = id => state => {
  const chatId = state.chat.chatIdByParticipantIdMap[id]

  return chatId && state.chat.conversationByIdMap[chatId]
}

export const selectConversations = state => Object.values(state.chat.conversationByIdMap)