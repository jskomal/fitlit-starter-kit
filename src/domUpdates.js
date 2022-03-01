import datepicker from 'js-datepicker'
import Chart from 'chart.js/auto'
import dayjs from 'dayjs'
import {
  getRandomIndex,
  activityRepositoryData,
  selectRandomUser,
  userRepo,
  hydrationUsers,
  sleepUsers,
  activityUsers
} from './scripts'
import { postSleepData, postHydrationData, postActivityData } from './apiCalls'

// query selectors
const welcomeUser = document.querySelector('#welcomeName')
const calendar = document.querySelector('#calendar')

// Add user input data
const addActivityButton = document.querySelector('#addActivityButton')
const addSleepButton = document.querySelector('#addSleepButton')
const addHydrationButton = document.querySelector('#addHydrationButton')

const activityCloseButton = document.querySelector('#activityClose')
const sleepCloseButton = document.querySelector('#sleepClose')
const hydrationCloseButton = document.querySelector('#hydrationClose')

const activitySubmitButton = document.querySelector('#activitySubmit')
const sleepSubmitButton = document.querySelector('#sleepSubmit')
const hydrationSubmitButton = document.querySelector('#hydrationSubmit')

const activityModal = document.querySelector('#activityModal')
const sleepModal = document.querySelector('#sleepModal')
const hydrationModal = document.querySelector('#hydrationModal')

// Modal inputs
const activityStepsInput = document.querySelector('#activityStepsInput')
const activityMinsInput = document.querySelector('#activityMinsInput')
const activityFlightsInput = document.querySelector('#activityFlightsInput')

const sleepTimeInput = document.querySelector('#sleepTimeInput')
const sleepQualityInput = document.querySelector('#sleepQualityInput')

const hydrationOzInput = document.querySelector('#hydrationOzInput')
const activityResponse = document.querySelector('#activityResponse')
const sleepResponse = document.querySelector('#sleepResponse')
const hydrationResponse = document.querySelector('#hydrationResponse')

const activityModalWrapper = document.querySelector('.activity-modal-wrapper')
const sleepModalWrapper = document.querySelector('.sleep-modal-wrapper')
const hydrationModalWrapper = document.querySelector('.hydration-modal-wrapper')
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
const allTimeAvgSleepHoursAndQuality = document.querySelector(
  '#allTimeAvgSleepHoursAndQuality'
)
const sleepCanvas = document.querySelector('#weeklySleepChart').getContext('2d')

// activity card
const userSteps = document.querySelector('#userSteps')
const userMins = document.querySelector('#userMins')
const userFlights = document.querySelector('#userFlights')
const userMiles = document.querySelector('#userMiles')
const worldSteps = document.querySelector('#worldSteps')
const worldMins = document.querySelector('#worldMins')
const worldFlights = document.querySelector('#worldFlights')
const activityCanvas = document.querySelector('#weeklyActivityChart').getContext('2d')
const activityFlightsMinsCanvas = document
  .querySelector('#weeklyActivityMinsFlightsChart')
  .getContext('2d')

//DOM updates
let currentUser
let currentHydrationChartData
let currentSleepTimeChartData
let currentSleepQualityChartData
let currentActivityChartStepsData
let currentActivityChartFlightsData
let currentActivityChartMinutesData
let hydrationChart
let sleepChart
let activityChart
let activityMinsChart

const displayRandomUser = () => {
  currentUser = selectRandomUser()
  updateUserCard(currentUser)
  loadHydrationCard(currentUser)
  displayHydrationChart()
  loadSleepCard(currentUser)
  displaySleepChart()
  loadActivityCard(currentUser)
  displayActivityChart()
  displayActivityMinsFlightsChart()
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
  maxDate: new Date(2020, 0, 22)
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
        'A week ago'
      ],
      datasets: [
        {
          label: 'Ounces',
          data: currentHydrationChartData,
          backgroundColor: '#7699d4'
        }
      ]
    },
    options: {
      responsive: true
    }
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
        'A week ago'
      ],
      datasets: [
        {
          label: 'Hours',
          data: currentSleepTimeChartData,
          backgroundColor: '#ff8552'
        },
        {
          label: 'Quality',
          data: currentSleepQualityChartData,
          backgroundColor: '#7699d4'
        }
      ]
    },
    options: {
      responsive: true
    }
  })
}

const displayActivityChart = () => {
  activityChart = new Chart(activityCanvas, {
    type: 'bar',
    data: {
      labels: [
        'Today',
        'Yesterday',
        'Presturday',
        'Yassturday',
        'So long ago',
        'Like...almost a week ago',
        'A week ago'
      ],
      datasets: [
        {
          label: 'Steps',
          data: currentActivityChartStepsData,
          backgroundColor: '#ff8552'
        }
      ]
    },
    options: {
      responsive: true
    }
  })
}

const displayActivityMinsFlightsChart = () => {
  activityMinsChart = new Chart(activityFlightsMinsCanvas, {
    type: 'line',
    data: {
      labels: [
        'Today',
        'Yesterday',
        'Presturday',
        'Yassturday',
        'So long ago',
        'Like...almost a week ago',
        'A week ago'
      ],
      datasets: [
        {
          label: 'Minutes Active',
          data: currentActivityChartMinutesData,
          backgroundColor: '#7699d4'
        },
        {
          label: 'Flights Climbed',
          data: currentActivityChartFlightsData,
          backgroundColor: '#5D5D5D'
        }
      ]
    },
    options: {
      responsive: true
    }
  })
}

const loadHydrationCard = () => {
  const currentUserWater = hydrationUsers.find((user) => {
    return user.userID == currentUser.id
  })
  currentHydrationChartData = currentUserWater.getWaterInWeek(calendar.value.substring(4))
  userWaterToday.innerText = ` ${currentUserWater.getWaterByDate(
    calendar.value.substring(4)
  )}`
}

const loadSleepCard = (currentUser) => {
  const userSleep = sleepUsers.find((user) => user.userID == currentUser.id)
  currentSleepTimeChartData = userSleep.getSleepTimeInWeek(calendar.value.substring(4))
  currentSleepQualityChartData = userSleep.getSleepQualityInWeek(
    calendar.value.substring(4)
  )
  sleepHoursAndQuality.innerText = `You slept for ${userSleep.getSleepTimeByDate(
    calendar.value.substring(4)
  )} hours today
  at the quality of ${userSleep.getSleepQualityByDate(calendar.value.substring(4))}`
  allTimeAvgSleepHoursAndQuality.innerText = `
  Sleep Hours: ${userSleep.getAvgSleepTime()}
  Sleep Quality: ${userSleep.getAvgSleepQuality()}`
}

const loadActivityCard = (currentUser) => {
  const userActivity = activityUsers.find((user) => user.userID == currentUser.id)
  currentActivityChartStepsData = userActivity.getWeeklySteps(calendar.value.substring(4))
  currentActivityChartMinutesData = userActivity.getWeeklyMinutesActive(
    calendar.value.substring(4)
  )
  currentActivityChartFlightsData = userActivity.getWeeklyFlightsClimbed(
    calendar.value.substring(4)
  )
  userSteps.innerText = `Number of Steps: ${userActivity.getDailySteps(
    calendar.value.substring(4)
  )}`
  userMins.innerText = `Minutes Active: ${userActivity.getMinutesActiveByDate(
    calendar.value.substring(4)
  )}`
  userFlights.innerText = `Flights Climbed: ${userActivity.getDailyFlights(
    calendar.value.substring(4)
  )}`
  userMiles.innerText = `Miles Walked: ${userActivity.getMileageByDate(
    currentUser,
    calendar.value.substring(4)
  )}`
  worldSteps.innerText = `VS the world average of: ${activityRepositoryData.getAllAvgStepsByDate(
    calendar.value.substring(4)
  )}`
  worldMins.innerText = `VS the world average of: ${activityRepositoryData.getAllAvgMinsActiveByDate(
    calendar.value.substring(4)
  )}`
  worldFlights.innerText = `VS the world average of: ${activityRepositoryData.getAllAvgStairsByDate(
    calendar.value.substring(4)
  )}`
}

const toggleActivityModal = (event) => {
  event.preventDefault()
  activityModalWrapper.classList.toggle('hidden')
  activityModal.classList.toggle('hidden')
}

const toggleSleepModal = (event) => {
  event.preventDefault()
  sleepModal.classList.toggle('hidden')
  sleepModalWrapper.classList.toggle('hidden')
}

const toggleHydrationModal = (event) => {
  event.preventDefault()
  hydrationModal.classList.toggle('hidden')
  hydrationModalWrapper.classList.toggle('hidden')
}

const submitActivityData = (event) => {
  event.preventDefault()
  if (activityFlightsInput.value && activityMinsInput.value && activityStepsInput.value) {
    postActivityData({
      userID: currentUser.id,
      date: dayjs(),
      flightsOfStairs: activityFlightsInput.value,
      minutesActive: activityMinsInput.value,
      numSteps: activityStepsInput.value
    })
  }
  activityResponse.innerText = 'Please fill out all fields before submitting'
}

const submitSleepData = (event) => {
  event.preventDefault()
  if (sleepTimeInput.value && sleepQualityInput.value) {
    postSleepData({
      userID: currentUser.id,
      date: dayjs(),
      hoursSlept: sleepTimeInput.value,
      sleepQuality: sleepQualityInput.value
    })
  }
  sleepResponse.innerText = 'Please fill out all fields before submitting'
}
const submitHydrationData = (event) => {
  event.preventDefault()
  if (hydrationOzInput.value) {
    postHydrationData({
      userID: currentUser.id,
      date: dayjs(),
      numOunces: hydrationOzInput.value
    })
  }
  hydrationResponse.innerText = 'Please fill out all fields before submitting'
}

export {
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
}
