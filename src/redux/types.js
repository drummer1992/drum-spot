export const pending = type => `${type}.pending`
export const fulfilled = type => `${type}.fulfilled`
export const rejected = type => `${type}.rejected`

export const Type = {
  CREATE_ADVERTISEMENT: 'advertisement/create',
  UPDATE_ADVERTISEMENT: 'advertisement/update',
  DELETE_ADVERTISEMENT: 'advertisement/delete',
  FETCH_ADVERTISEMENTS: 'advertisements/fetch',
  FETCH_USER          : 'user/fetch',
  SIGN_IN_USER        : 'user/signIn',
  LOG_OUT_USER        : 'user/logOut',
}