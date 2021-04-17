export const createGuard = condition => component => {
  return condition ? component : null
}