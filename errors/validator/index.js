import { appAssert } from "../index"

export class ValidationResult {
  constructor(condition, message) {
    this.valid = condition
    this.message = message
  }
}


const validate = (value, validators) => {
  for (const validator of validators) {
    const { valid, message } = validator(value)

    appAssert(valid, message)
  }
}

export const createValidator = validationSchema => {
  const keys = Object.keys(validationSchema)

  /**
   * @returns {ValidationResult}
   */
  return payload => {
    const result = new ValidationResult(true, null)

    for (const fieldName of keys) {
      try {
        validate(payload[fieldName], validationSchema[fieldName])
      } catch (e) {
        result.valid = false
        result.message = e.message

        return result
      }
    }

    return result
  }
}