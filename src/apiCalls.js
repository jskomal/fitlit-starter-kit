const userDataFetch = fetch('https://fitlit-api.herokuapp.com/api/v1/users')
.then(response => response.json())
.catch(error => console.log(error))

const userDataSleep = fetch('https://fitlit-api.herokuapp.com/api/v1/sleep')
.then((response) => response.json())
.catch((error) => console.log(error))

const userDataActivity = fetch('https://fitlit-api.herokuapp.com/api/v1/activity')
.then((response) => response.json())
.catch((error) => console.log(error))

const userDataHydration = fetch('https://fitlit-api.herokuapp.com/api/v1/hydration')
.then((response) => response.json())
.catch((error) => console.log(error))

export default { userDataFetch, userDataSleep, userDataActivity, userDataHydration }

