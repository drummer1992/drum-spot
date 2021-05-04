import get from 'lodash/get'

export const property = key => object => get(object, key)
export const toArray = x => Array.isArray(x) ? x : [x]
export const last = array => array[array.length - 1]

export const pickers = {
  objectId: o => o._id,
}