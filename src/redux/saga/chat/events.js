export const Event = {
  CONNECTED                    : 'connected',
  DISCONNECT                   : 'disconnect',
  TYPING_START                 : 'typingStart',
  TYPING_END                   : 'typingEnd',
  SET_VIEWED                   : 'setViewed',
  JOIN_THE_CREATED_CONVERSATION: 'joinTheCreatedConversation',
  MESSAGE                      : 'message',
  CREATE_CONVERSATION          : 'createConversation',
  GET_CONVERSATIONS            : 'getConversations',
}

export const ServerEvent = {
  CONNECT             : 'connect',
  TYPING_STARTED      : 'typingStarted',
  TYPING_ENDED        : 'typingEnded',
  NEW_MESSAGE         : 'newMessage',
  CHAT_ERROR          : 'chatError',
  USER_ACTIVE         : 'userActive',
  CREATED_CONVERSATION: 'createdConversation',
  CHAT_VIEWED         : 'chatViewed'
}