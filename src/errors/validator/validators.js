import isNil from 'lodash/isNil'
import { ValidationResult } from "./index"

export const array = validator => arr => validator(arr)
array.each = validator => array(arr => arr.every(validator))
array.some = validator => array(arr => arr.some(validator))

export const required = message => value => new ValidationResult(!isNil(value), message)
export const maxLength = (n, message) => value => new ValidationResult(value.length <= n, message)
export const minLength = (n, message) => value => new ValidationResult(value.length >= n, message)
export const max = (n, message) => value => new ValidationResult(value <= n, message)
export const min = (n, message) => value => new ValidationResult(value >= n, message)