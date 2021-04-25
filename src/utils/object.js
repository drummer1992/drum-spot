import isEqual from 'lodash/isEqual'

export const difference = (value, other) => {
  const result = Array.isArray(value) ? [] : {}

  for (const key of Object.keys(value)) {
    if (!isEqual(value[key], other[key]) && other[key] !== undefined) {
      result[key] = other[key]
    }
  }

  return result
}