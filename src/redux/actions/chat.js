import { Type as t } from '../types'

/**
 * Server events
 */

export const fetchedConversations = conversations => ({
  type: t.FETCHED_CONVERSATIONS,
  conversations,
})

export const receivedMessage = message => ({
  type: t.RECEIVED_MESSAGE,
  message,
})

export const typingStarted = chatId => ({
  type: t.TYPING_STARTED,
  chatId,
})

export const typingEnded = chatId => ({
  type: t.TYPING_ENDED,
  chatId,
})

export const chatViewed = payload => ({
  type: t.CHAT_VIEWED,
  payload,
})

export const receivedError = error => ({
  type: t.RECEIVED_ERROR,
  error,
})

export const userActive = payload => ({
  type: t.USER_ACTIVE,
  payload,
})

export const createdConversation = conversation => ({
  type: t.JOIN_THE_CREATED_CONVERSATION,
  conversation,
})

/**
 * Client events
 */

export const newMessage = (chatId, text) => ({
  type: t.SEND_MESSAGE,
  chatId,
  text,
})

export const typingStart = chatId => ({
  type: t.TYPING_START,
  chatId,
})

export const typingEnd = chatId => ({
  type: t.TYPING_END,
  chatId,
})

export const setViewed = chatId => ({
  type: t.SET_VIEWED,
  chatId,
})

export const createConversation = participantId => ({
  type: t.CREATE_CONVERSATION,
  participantId,
})