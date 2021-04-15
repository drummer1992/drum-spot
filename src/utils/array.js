import get from 'lodash/get'

export const property = key => object => get(object, key)
export const toArray = x => Array.isArray(x) ? x : [x]