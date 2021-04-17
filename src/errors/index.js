export const appAssert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}