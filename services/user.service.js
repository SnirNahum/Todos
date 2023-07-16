import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  
  login,
  logout,
  signup,
  getLoggedinUser,
  addFunds,
  addOrder,
  toggleOrderStatus,
}
window.userService = userService
// Demo Data:
_createUser()

function getLoggedinUser() {
  let user = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null
  )
  // if (!user) {
  //   user = { username: 'baba', password: '123' }
  //   login({ username: 'baba', password: '123' })
  // }
  return user
}

function login(credentials) {
  return storageService.query(USER_KEY).then(users => {
    const user = users.find(u => u.username === credentials.username)
    if (user) {
      return _saveUserToStorage(user)
    } else {
      return Promise.reject('Invalid credentials')
    }
  })
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return Promise.resolve()
}

function signup(credentials) {
  return storageService.query(USER_KEY).then(users => {
    const user = users.find(u => u.username === credentials.username)
    if (user) return Promise.reject('Username already taken')
    return storageService
      .post(USER_KEY, { ...credentials, balance: 600, orders: [] })
      .then(user => {
        return _saveUserToStorage(user)
      })
  })
}

function addFunds(amount) {
  const user = getLoggedinUser()

  user.balance += amount
  return storageService.put(USER_KEY, user).then(updatedUser => {
    _saveUserToStorage(updatedUser)
    return updatedUser.balance
  })
}

function addOrder(cart, total) {
  const user = getLoggedinUser()

  const order = {
    _id: utilService.makeId(),
    createdAt: Date.now(),
    items: cart,
    total,
    status: 'Pending',
  }
  user.orders.unshift(order)
  user.balance -= total
  return storageService.put(USER_KEY, user).then(updatedUser => {
    _saveUserToStorage(updatedUser)
    return updatedUser
  })
}

function toggleOrderStatus(orderId) {
  const user = getLoggedinUser()
  const order = user.orders.find(order => order._id === orderId)

  order.status = order.status === 'Pending' ? 'Approved' : 'Pending'

  return storageService.put(USER_KEY, user).then(_saveUserToStorage)
}

function _saveUserToStorage(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function _createUser() {
  const user = localStorage.getItem(USER_KEY)
  if (!user) signup({ fullname: 'Baba Ji', username: 'baba', password: '123' })
  login({ username: 'baba', password: '123' })
}
