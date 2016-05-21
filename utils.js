export function makeArray(object) {
  if (!object) {
    return []
  } else if (!Array.isArray(object)) {
    return [object]
  } else {
    return object
  }
}
