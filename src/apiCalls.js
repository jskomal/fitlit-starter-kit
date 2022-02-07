const userDataAPI = fetch('https://fitlit-api.herokuapp.com/api/v1/users')
.then(response => response.json())
.catch(error => console.log(error))
console.log(userDataAPI)


const userDataSleepAPI = fetch('https://fitlit-api.herokuapp.com/api/v1/sleep')
.then((response) => response.json())
.catch((error) => console.log(error))

const userDataActivityAPI = fetch('https://fitlit-api.herokuapp.com/api/v1/activity')
.then((response) => response.json())
.catch((error) => console.log(error))

const userDataHydrationAPI = fetch('https://fitlit-api.herokuapp.com/api/v1/hydration')
.then((response) => response.json())
.catch((error) => console.log(error))

export default { userDataAPI, userDataSleepAPI, userDataActivityAPI, userDataHydrationAPI }

