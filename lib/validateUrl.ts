export function isValidUrl(str: string) {
  try {
    new URL(str.startsWith('http') ? str : `https://${str}`)
    return true
  } catch {
    return false
  }
}
