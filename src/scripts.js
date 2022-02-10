import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
import datepicker from 'js-datepicker'

import Chart from 'chart.js/auto'

import UserRepository from './UserRepository'
import User from './User'
import {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData,
} from './apiCalls'

import './css/styles.css'

import './images/succulent.svg'
import './images/grey_waves.jpg'
import Hydration from './Hydration'

// query selectors
const welcomeUser = document.querySelector('#welcomeName')
const calendar = document.querySelector('#calendar')

// user card
const userName = document.querySelector('#name')
const userAddress = document.querySelector('#address')
const userEmail = document.querySelector('#email')
const userStrideLength = document.querySelector('#strideLength')
const userDailyStepGoal = document.querySelector('#dailyStepGoal')
const compareUserSteps = document.querySelector('#compareStepGoal')

// hydration card
const userWaterToday = document.querySelector('#waterToday')
const hydrationCanvas = document.querySelector('#hydrationChart').getContext('2d')

//globals
let users
let userRepo
let hydrationData
let sleepData
let activityData
let hydrationUsers = []
let currentUser
let currentHydrationUser
let hydrationChart
let currentHydrationChartData

const datePicker = datepicker('#calendar', {
  startDate: new Date(2019, 5, 15),
  minDate: new Date(2019, 5, 15),
  maxDate: new Date(2020, 0, 22),
})

// functions

// on load
const fetchAllData = () => {
  Promise.all([
    fetchUserData(),
    fetchSleepData(),
    fetchActivityData(),
    fetchHydrationData(),
  ]).then((allData) => parseAllData(allData))
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

const selectRandomUser = () => {
  const randomIndex = getRandomIndex(users)
  currentUser = users[randomIndex]
  currentHydrationUser = hydrationUsers.find((user) => {
    return user.userID == currentUser.id
  })
  return users[randomIndex]
}

const displayRandomUser = () => {
  const randomUser = selectRandomUser()
  updateUserCard(randomUser)
  loadHydrationCard(randomUser)
  displayHydrationChart()
}

const updateUserCard = (randomUser) => {
  welcomeUser.innerText = `Welcome, ${randomUser.returnFirstName()}!`
  userName.innerText = `NAME: ${randomUser.name}`
  userAddress.innerText = `ADDRESS: ${randomUser.address}`
  userEmail.innerText = `EMAIL: ${randomUser.email}`
  userStrideLength.innerText = `STRIDE LENGTH: ${randomUser.strideLength}`
  userDailyStepGoal.innerText = `DAILY STEP GOAL: ${randomUser.dailyStepGoal}`
  compareUserSteps.innerText = `Your step goal is ${
    (randomUser.dailyStepGoal / userRepo.returnAvgSteps()).toFixed(2) * 100
  }% of the average goal of ${userRepo.returnAvgSteps()}`
}

const displayHydrationChart = () => {
  hydrationChart = new Chart(hydrationCanvas, {
    type: 'bar',
    data: {
      labels: [
        'Today',
        'Yesterday',
        'Presturday',
        'Yassturday',
        'So long ago',
        'Like... almost a week ago',
        'a week ago',
      ],
      datasets: [
        {
          label: 'Ounces',
          data: currentHydrationChartData,
          backgroundColor: ['#7699d4', '#ff8552'],
        },
      ],
    },
    options: {
      responsive: true,
    },
  })
}

// parse fetches
const parseAllData = (allData) => {
  users = allData[0].userData.map((person) => new User(person))
  userRepo = new UserRepository(users)
  hydrationData = allData[3].hydrationData
  parseHydrationData(hydrationData)
  sleepData = allData[1].sleepData
  activityData = allData[2].activityData
  displayRandomUser()
}

const parseHydrationData = (hydrationData) => {
  const filteredData = {}
  hydrationData.forEach((waterLogEntry) => {
    if (waterLogEntry.userID in filteredData) {
      filteredData[waterLogEntry.userID].push({
        date: waterLogEntry.date,
        numOunces: waterLogEntry.numOunces,
      })
    } else {
      filteredData[waterLogEntry.userID] = [
        {
          date: waterLogEntry.date,
          numOunces: waterLogEntry.numOunces,
        },
      ]
    }
  })
  Object.keys(filteredData).forEach((userID) => {
    hydrationUsers.push(new Hydration(userID, filteredData))
  })
}

const loadHydrationCard = (randomUser) => {
  setTimeout(() => {
    const userWater = hydrationUsers.find((user) => {
      return user.userID == randomUser.id
    })
    currentHydrationChartData = userWater.getWaterInWeek(calendar.value.substring(4))
    userWaterToday.innerText = `You drank ${userWater.getWaterByDate(
      calendar.value.substring(4)
    )} oz today!`
    hydrationChart.update()
  }, 500)
}

// event listeners
window.addEventListener('load', fetchAllData)

calendar.addEventListener('blur', () => {
  const userWater = hydrationUsers.find((user) => {
    return user.userID == currentUser.id
  })
  currentHydrationUser = userWater
})

calendar.addEventListener('focusout', () => {
  setTimeout(() => {
    hydrationChart.data.datasets = [
      {
        label: 'Ounces',
        data: currentHydrationUser.getWaterInWeek(calendar.value.substring(4)),
        backgroundColor: ['#7699d4', '#ff8552'],
      },
    ]
    userWaterToday.innerText = `You drank ${currentHydrationUser.getWaterByDate(
      calendar.value.substring(4)
    )} oz today!`
    hydrationChart.update()
  },500)
})
