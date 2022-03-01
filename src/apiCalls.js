const fetchUserData = () => {
  return fetch('http://localhost:3001/api/v1/users')
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

const fetchSleepData = () => {
  return fetch('http://localhost:3001/api/v1/sleep')
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

const fetchActivityData = () => {
  return fetch('http://localhost:3001/api/v1/activity')
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

const fetchHydrationData = () => {
  return fetch('http://localhost:3001/api/v1/hydration')
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

const postSleepData = (newSleepData) => {
  fetch('http://localhost:3001/api/v1/sleep', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSleepData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to send sleep data')
    } else {
      sleepResponse.innerText = 'Successfully submitted your data!'
      response.json()
    }
  })
}

const postHydrationData = (newHydrationData) => {
  fetch('http://localhost:3001/api/v1/hydration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newHydrationData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to send hydration data')
    } else {
      hydrationResponse.innerText = 'Successfully submitted your data!'
      response.json()
    }
  })
}

const postActivityData = (newActivityData) => {
  fetch('http://localhost:3001/api/v1/activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newActivityData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to send activity data')
    } else {
      activityResponse.innerText = 'Successfully submitted your data!'
      response.json()
    }
  })
}

export {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData,
  postSleepData,
  postHydrationData,
  postActivityData,
}
