import { reducersMap } from "./reducers-map"
import { fulfilled, rejected, pending } from '../../types'

export const defaultReducer = (state, action) => ({
  ...state,
  ...action.payload,
})

export const defaultInitialState = {
  error  : null,
  loading: false,
  loaded : false,
}

export const loadReducer = (type, successReducer, initialState) =>
  reducersMap(
    {
      [pending(type)]  : (state) => ({
        ...state,
        loading: true,
      }),
      [fulfilled(type)]: (state, action) =>
        (successReducer || defaultReducer)(
          {
            ...state,
            error  : null,
            loading: false,
            loaded : true,
          },
          action
        ),
      [rejected(type)] : (state, action) => ({
        ...state,
        loading: false,
        error  : (action.error && action.error.message) || action.error,
      }),
    },
    initialState || defaultInitialState
  )
