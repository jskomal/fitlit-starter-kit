import currentUser from './scripts'
import datepicker from 'js-datepicker'
import Chart from 'chart.js/auto'
import dayjs from 'dayjs'

//DOM updates

const displayRandomUser = () => {
  currentUser = selectRandomUser()
  updateUserCard(currentUser)
  loadHydrationCard(currentUser)
  displayHydrationChart()
  loadSleepCard(currentUser)
  displaySleepChart()
  loadActivityCard(currentUser)
  displayActivityChart()
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

const displayActivityChart = () => {
  activityChart = new Chart(activityCanvas, {
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
          label: 'Steps',
          data: currentActivityChartStepsData,
          backgroundColor: '#ff8552',
        },
        {
          label: 'Minutes Active',
          data: currentActivityChartMinutesData,
          backgroundColor: '#333',
        },
        {
          label: 'Flights Climbed',
          data: currentActivityChartFlightsData,
          backgroundColor: '#7699d4',
        },
      ],
    },
    options: {
      responsive: true,
    },
  })
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

const loadSleepCard = (currentUser) => {
  const userSleep = sleepUsers.find((user) => user.userID == currentUser.id)
  currentSleepTimeChartData = userSleep.getSleepTimeInWeek(
    calendar.value.substring(4)
  )
  currentSleepQualityChartData = userSleep.getSleepQualityInWeek(
    calendar.value.substring(4)
  )
  sleepHoursAndQuality.innerText = `You slept for ${userSleep.getSleepTimeByDate(
    calendar.value.substring(4)
  )} hours today
  at the quality of ${userSleep.getSleepQualityByDate(
    calendar.value.substring(4)
  )}`
  allTimeAvgSleepHoursAndQuality.innerText = `
  Sleep Hours: ${userSleep.getAvgSleepTime()}
  Sleep Quality: ${userSleep.getAvgSleepQuality()}`
}

const loadActivityCard = (currentUser) => {
  const userActivity = activityUsers.find(
    (user) => user.userID == currentUser.id
  )
  currentActivityChartStepsData = userActivity.getWeeklySteps(
    calendar.value.substring(4)
  )
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