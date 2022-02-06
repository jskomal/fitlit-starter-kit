// An example of how you tell webpack to use a CSS file
import './css/styles.css'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
// An example of how you tell webpack to use a JS file
import userData from './data/users'
import UserRepository from './UserRepository'
import User from './User'

let users
// query selectors
const welcomeUser = document.querySelector('#welcomeName')

// user card
const userName = document.querySelector('#name')
const userAddress = document.querySelector('#address')
const userEmail = document.querySelector('#email')
const userStrideLength = document.querySelector('#strideLength')
const userDailyStepGoal = document.querySelector('#dailyStepGoal')

// functions
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

const selectRandomUser = () => {
  const randomIndex = getRandomIndex(users)
  console.log(users[randomIndex])
  return users[randomIndex]
}

const loadRandomUser = () => {
  const randomUser = selectRandomUser()
  welcomeUser.innerText = `Welcome, ${randomUser.name}`
}

//globals
users = userData.map((person) => {
  return new User(person)
})

// event listeners
// welcomeUser.addEventListener('load', loadRandomUser)
