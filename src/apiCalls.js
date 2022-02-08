const fetchUserData = () => {
  fetch('https://fitlit-api.herokuapp.com/api/v1/users')
  .then(response => response.json())
  
}

const fetchSleepData = () => {
  fetch('https://fitlit-api.herokuapp.com/api/v1/sleep')
  .then(response => response.json())
}

const fetchActivityData = () => {
  fetch('https://fitlit-api.herokuapp.com/api/v1/activity')
  .then(response => response.json())
}

const fetchHydrationData = () => {
  fetch('https://fitlit-api.herokuapp.com/api/v1/hydration')
  .then(response => response.json())
}

export {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData
}