export const pending = type => `${type}.pending`
export const fulfilled = type => `${type}.fulfilled`
export const rejected = type => `${type}.rejected`

export const Type = {
  CREATE_ADVERTISEMENT: 'advertisement/create',
  FETCH_ADVERTISEMENTS: 'advertisements/fetch',
  FETCH_USER          : 'user/fetch',
  SIGN_IN_USER        : 'user/signIn',
  SIGN_UP_USER        : 'user/signUp',
  LOG_OUT_USER        : 'user/logOut',
}