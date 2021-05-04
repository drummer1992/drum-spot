import { takeEvery } from 'redux-saga/effects'
import { Type as t } from '../../types'
import { Event as e } from './events'

export default function* chatWatcher(socket) {
  yield takeEvery(t.SEND_MESSAGE, action => {
    socket.emit(e.MESSAGE, { chatId: action.chatId, text: action.text })
  })

  yield takeEvery(t.TYPING_START, action => {
    socket.emit(e.TYPING_START, action.chatId)
  })

  yield takeEvery(t.TYPING_END, action => {
    socket.emit(e.TYPING_END, action.chatId)
  })

  yield takeEvery(t.SET_VIEWED, action => {
    socket.emit(e.SET_VIEWED, action.chatId)
  })

  yield takeEvery(t.CREATE_CONVERSATION, action => {
    socket.emit(e.CREATE_CONVERSATION, action.participantId)
  })

  yield takeEvery(t.LOG_OUT_USER, () => {
    socket.disconnect()
  })
}