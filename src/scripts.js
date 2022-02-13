// imports
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
import Sleep from './Sleep'
import SleepRepository from './SleepRepository'

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

// sleep card
const sleepHoursAndQuality = document.querySelector('#dailySleepHoursAndQuality')
const allTimeAvgSleepHoursAndQuality = document.querySelector('#allTimeAvgSleepHoursAndQuality')
const sleepCanvas = document.querySelector('#weeklySleepChart').getContext('2d')

// globals
let users
let userRepo
let currentUser

let hydrationData
let hydrationUsers = []
let hydrationChart

let sleepData
let sleepUsers = []
let sleepChart

let sleepRepositoryData

let activityData

let currentHydrationChartData
let currentSleepTimeChartData
let currentSleepQualityChartData

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
  return users[randomIndex]
}

const displayRandomUser = () => {
  currentUser = selectRandomUser()
  updateUserCard(currentUser)
  loadHydrationCard(currentUser)
  displayHydrationChart()
  loadSleepCard(currentUser)
  displaySleepChart()
}

const updateUserCard = (currentUser) => {
  welcomeUser.innerText = `Welcome, ${currentUser.returnFirstName()}!`
  userName.innerText = `NAME: ${currentUser.name}`
  userAddress.innerText = `ADDRESS: ${currentUser.address}`
  userEmail.innerText = `EMAIL: ${currentUser.email}`
  userStrideLength.innerText = `STRIDE LENGTH: ${currentUser.strideLength}`
  userDailyStepGoal.innerText = `DAILY STEP GOAL: ${currentUser.dailyStepGoal}`
  compareUserSteps.innerText = `Your step goal is ${
    (currentUser.dailyStepGoal / userRepo.returnAvgSteps()).toFixed(2) * 100
  }% of the average goal of ${userRepo.returnAvgSteps()}`
}

// create charts
const datePicker = datepicker('#calendar', {
  onSelect: (instance, date) => {
    loadHydrationCard(currentUser)
    hydrationChart.destroy()
    displayHydrationChart()
    loadSleepCard(currentUser)
    sleepChart.destroy()
    displaySleepChart()
  },
  startDate: new Date(2019, 5, 22),
  minDate: new Date(2019, 5, 15),
  maxDate: new Date(2020, 0, 22),
})

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
        'Like..almost a week ago',
        'A week ago',
      ],
      datasets: [
        {
          label: 'Ounces',
          data: currentHydrationChartData,
          backgroundColor: '#7699d4',
        },
      ],
    },
    options: {
      responsive: true,
    },
  })
}

const displaySleepChart = () => {
  sleepChart = new Chart(sleepCanvas, {
    type: 'line',
    data: {
      labels: [
        'Today',
        'Yesterday',
        'Presturday',
        'Yassturday',
        'So long ago',
        'Like..almost a week ago',
        'A week ago',
      ],
      datasets: [
        {
          label: 'Hours',
          data: currentSleepTimeChartData,
          backgroundColor: '#ff8552',
        },
        {
          label: 'Quality',
          data: currentSleepQualityChartData,
          backgroundColor: '#7699d4',
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
  parseSleepData(sleepData)
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

const parseSleepData = (sleepData) => {
  const filteredSleepData = {}
  sleepData.forEach((sleepLogEntry) => {
    if (sleepLogEntry.userID in filteredSleepData) {
      filteredSleepData[sleepLogEntry.userID].push({
        date: sleepLogEntry.date,
        hoursSlept: sleepLogEntry.hoursSlept,
        sleepQuality: sleepLogEntry.sleepQuality
      })
    } else {
      filteredSleepData[sleepLogEntry.userID] = [
        {
          date: sleepLogEntry.date,
          hoursSlept: sleepLogEntry.hoursSlept,
          sleepQuality: sleepLogEntry.sleepQuality
        },
      ]
    }
  })
  Object.keys(filteredSleepData).forEach((userID) => {
    sleepUsers.push(new Sleep(userID, filteredSleepData))
  })
  sleepRepositoryData = new SleepRepository(sleepUsers)
}

const loadHydrationCard = () => {
    const currentUserWater = hydrationUsers.find((user) => {
      return user.userID == currentUser.id
    })
    currentHydrationChartData = currentUserWater.getWaterInWeek(
      calendar.value.substring(4)
    )
    userWaterToday.innerText = ` ${currentUserWater.getWaterByDate(
      calendar.value.substring(4)
    )}`
}

const loadSleepCard = (randomUser) => {
  const userSleep = sleepUsers.find((user) => {
    return user.userID == randomUser.id
  })
  currentSleepTimeChartData = userSleep.getSleepTimeInWeek(calendar.value.substring(4))
  currentSleepQualityChartData = userSleep.getSleepQualityInWeek(calendar.value.substring(4))
  sleepHoursAndQuality.innerText = `You slept for ${userSleep.getSleepTimeByDate(
    calendar.value.substring(4)
  )} hours today
  at the quality of ${userSleep.getSleepQualityByDate(calendar.value.substring(4))}`
  allTimeAvgSleepHoursAndQuality.innerText = `Your all time average
  Sleep Hours: ${userSleep.getAvgSleepTime()}
  Sleep Quality: ${userSleep.getAvgSleepQuality()}`
}

// event listeners
window.addEventListener('load', fetchAllData)
