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
  postActivityData,
  postHydrationData,
  postSleepData
} from './apiCalls'
import './css/styles.css'
import './images/succulent.svg'
import './images/grey_waves.jpg'
import './images/x-icon.svg'
import Hydration from './Hydration'
import Sleep from './Sleep'
import SleepRepository from './SleepRepository'
import Activity from './Activity'
import ActivityRepository from './ActivityRepository'
import dayjs from 'dayjs'
import {
  currentUser,
  displayRandomUser,
  updateUserCard,
  datePicker,
  displayHydrationChart,
  displaySleepChart,
  displayActivityChart,
  displayActivityMinsFlightsChart,
  loadHydrationCard,
  loadSleepCard,
  loadActivityCard,
  currentHydrationChartData,
  currentSleepTimeChartData,
  currentSleepQualityChartData,
  currentActivityChartStepsData,
  currentActivityChartFlightsData,
  currentActivityChartMinutesData,
  toggleActivityModal,
  toggleSleepModal,
  toggleHydrationModal,
  submitActivityData,
  submitSleepData,
  submitHydrationData,
  addActivityButton,
  addSleepButton,
  addHydrationButton,
  activityCloseButton,
  sleepCloseButton,
  hydrationCloseButton,
  activitySubmitButton,
  sleepSubmitButton,
  hydrationSubmitButton,
  activityModal,
  sleepModal,
  hydrationModal
} from './domUpdates'

// globals
let users
let userRepo

let hydrationData
let hydrationUsers = []

let sleepData
let sleepUsers = []

let sleepRepositoryData

let activityData
let activityUsers = []

let activityRepositoryData

// functions

// on load
const fetchAllData = () => {
  Promise.all([
    fetchUserData(),
    fetchSleepData(),
    fetchActivityData(),
    fetchHydrationData()
  ]).then((allData) => parseAllData(allData))
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

const selectRandomUser = () => {
  const randomIndex = getRandomIndex(users)
  return users[randomIndex]
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
  parseActivityData(activityData)
  displayRandomUser()
}

const parseHydrationData = (hydrationData) => {
  const filteredData = {}
  hydrationData.forEach((waterLogEntry) => {
    if (waterLogEntry.userID in filteredData) {
      filteredData[waterLogEntry.userID].push({
        date: waterLogEntry.date,
        numOunces: waterLogEntry.numOunces
      })
    } else {
      filteredData[waterLogEntry.userID] = [
        {
          date: waterLogEntry.date,
          numOunces: waterLogEntry.numOunces
        }
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
        }
      ]
    }
  })
  Object.keys(filteredSleepData).forEach((userID) => {
    sleepUsers.push(new Sleep(userID, filteredSleepData))
  })
  sleepRepositoryData = new SleepRepository(sleepUsers)
}

const parseActivityData = (activityData) => {
  const filteredActivityData = {}
  activityData.forEach((activityLogEntry) => {
    if (activityLogEntry.userID in filteredActivityData) {
      filteredActivityData[activityLogEntry.userID].push({
        date: activityLogEntry.date,
        numSteps: activityLogEntry.numSteps,
        minutesActive: activityLogEntry.minutesActive,
        flightsOfStairs: activityLogEntry.flightsOfStairs
      })
    } else {
      filteredActivityData[activityLogEntry.userID] = [
        {
          date: activityLogEntry.date,
          numSteps: activityLogEntry.numSteps,
          minutesActive: activityLogEntry.minutesActive,
          flightsOfStairs: activityLogEntry.flightsOfStairs
        }
      ]
    }
  })
  Object.keys(filteredActivityData).forEach((userID) => {
    activityUsers.push(new Activity(userID, filteredActivityData))
  })
  activityRepositoryData = new ActivityRepository(activityUsers)
}

// event listeners
window.addEventListener('load', fetchAllData)
addActivityButton.addEventListener('click', toggleActivityModal)
activityCloseButton.addEventListener('click', toggleActivityModal)

addSleepButton.addEventListener('click', toggleSleepModal)
sleepCloseButton.addEventListener('click', toggleSleepModal)

addHydrationButton.addEventListener('click', toggleHydrationModal)
hydrationCloseButton.addEventListener('click', toggleHydrationModal)

activitySubmitButton.addEventListener('click', submitActivityData)
sleepSubmitButton.addEventListener('click', submitSleepData)
hydrationSubmitButton.addEventListener('click', submitHydrationData)

export {
  getRandomIndex,
  activityRepositoryData,
  selectRandomUser,
  userRepo,
  hydrationUsers,
  sleepUsers,
  activityUsers
}
