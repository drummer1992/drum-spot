import { io } from 'socket.io-client'
import { select, takeEvery, put, all, call, actionChannel } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { fulfilled, Type as t } from '../../types'
import { selectAuth } from '../../reducers/user'
import c from '../../../config'
import chatChannel from './channel'
import chatWatcher from './watcher'

const mainChannel = channel => socket => {
  return eventChannel(emitter => {
    channel(socket, emitter)

    return () => {
      socket.disconnect()
    }
  })
}

function* chatSaga(chatChannel, socket) {
  const channel = yield call(mainChannel(chatChannel), socket)

  yield takeEvery(channel, function* (action) {
    yield put(action)
  })
}

export default function* () {
  const channel = yield actionChannel(fulfilled(t.FETCH_USER))

  yield takeEvery(channel, function* () {
    const { token } = yield select(selectAuth)

    const socket = io(c.HOST, {
      query     : { token },
      path      : `${c.API_PREFIX}/chat`,
    })

    yield all([
      chatSaga(chatChannel, socket),
      chatWatcher(socket),
    ])
  })

}