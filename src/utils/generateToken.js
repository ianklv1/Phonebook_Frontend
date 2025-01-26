export const generateToken = email => {
  const data = JSON.stringify({
    email,
    createdAt: new Date().toISOString()
  })

  const token = btoa(data)
  return token
}
