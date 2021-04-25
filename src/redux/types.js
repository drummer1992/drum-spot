export const pending = type => `${type}.pending`
export const fulfilled = type => `${type}.fulfilled`
export const rejected = type => `${type}.rejected`

export const Type = {
  CREATE_ADVERTISEMENT      : 'advertisement/create',
  UPDATE_ADVERTISEMENT      : 'advertisement/update',
  DELETE_ADVERTISEMENT      : 'advertisement/delete',
  DELETE_ADVERTISEMENT_IMAGE: 'advertisement/image/delete',
  ADD_ADVERTISEMENT_IMAGE   : 'advertisement/image/add',
  FETCH_ADVERTISEMENTS      : 'advertisements/fetch',
  FETCH_USER                : 'user/fetch',
  SIGN_IN_USER              : 'user/signIn',
  LOG_OUT_USER              : 'user/logOut',
  FETCH_INITIAL_TOKEN       : 'user/initialToken',
  ADD_TO_FAVORITES          : 'user/favorites/add',
  DELETE_FROM_FAVORITES     : 'user/favorites/delete',
  FETCH_FAVORITES           : 'user/favorites/fetch',
}