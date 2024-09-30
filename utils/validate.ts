export const validateUsername = (username?: string, required?: boolean) => {
  if (!username) {
    return {error: 'Username/Email is required.', valid: false}
  }
  if (username?.includes('@')) {
    const re = /\S+@\S+\.\S+/

    if (!re.test(username)) {
      return {error: 'Invalid email address.', valid: false}
    }
    return {error: '', valid: true}
  }
  return {error: '', valid: true}
}

export const validateEmail = (email?: string, required?: boolean) => {
  if (!email) {
    return {error: 'Email is required.', valid: false}
  }

  if (email?.includes('@')) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!re.test(email)) {
      return {error: 'Invalid email address.', valid: false}
    }
    return {error: '', valid: true}
  }
  return {error: '', valid: false}
}

export const validatePassword = (password?: string, required?: boolean) => {
  if (!password) {
    return {error: 'Password is required.', valid: false}
  }
  if (password.length < 6) {
    return {error: 'Password is too short.', valid: false}
  }
  return {error: '', valid: true}
}

export const validateUrl = (url?: string, required?: boolean) => {
  if (!url) {
    return {error: 'URL is required.', valid: false}
  }
  const re = /^(http|https):\/\/[^ "]+$/
  if (!re.test(url)) {
    return {error: 'Invalid URL.', valid: false}
  }
  return {error: '', valid: true}
}
