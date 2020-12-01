export function generatePassword(): string {
  return Math.random().toString(30).substr(2, 6)
}