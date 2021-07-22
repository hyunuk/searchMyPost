export const errorCode = (err) => {
  if (err.message.startsWith('Bad Request:')) {
    return 400
  }
  if (err.parent) {
    if (err.parent.code === NOT_NULL) {
      return 400
    }
    if (err.parent.code === UNIQUE) {
      return 409
    }
  }
  return 500
}
