export const CATCH_ERROR = 'CATCH_ERROR'

export function catchError(error) {
  return {
    type: CATCH_ERROR,
    error
  }
}
