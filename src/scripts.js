// An example of how you tell webpack to use a JS file
import userData from './data/users'
import UserRepository from './UserRepository'
import User from './User'
// An example of how you tell webpack to use a CSS file
import './css/styles.css'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let users
// query selectors
const welcomeUser = document.querySelector('#welcomeName')

// user card
const userName = document.querySelector('#name')
const userAddress = document.querySelector('#address')
const userEmail = document.querySelector('#email')
const userStrideLength = document.querySelector('#strideLength')
const userDailyStepGoal = document.querySelector('#dailyStepGoal')

//globals
users = userData.map((person) => {
  return new User(person)
})

// functions
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

const selectRandomUser = () => {
  const randomIndex = getRandomIndex(users)
  return users[randomIndex]
}

const displayRandomUser = () => {
  const randomUser = selectRandomUser()
  welcomeUser.innerText = `Welcome, ${randomUser.returnFirstName()}!`
  userName.innerText = `name: ${randomUser.name}`
  userAddress.innerText = `address: ${randomUser.address}`
  userEmail.innerText = `email: ${randomUser.email}`
  userStrideLength.innerText = `your stride length: ${randomUser.strideLength}`
  userDailyStepGoal.innerText = `your daily step goal: ${randomUser.dailyStepGoal}`
}



// event listeners
window.addEventListener('load', displayRandomUser)


