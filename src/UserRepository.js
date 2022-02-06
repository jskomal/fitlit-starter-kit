class UserRepository {
  constructor(userData) {
    this.data = userData;
  }
  returnUserById(id){
    return this.data.find((user) => {
      return user.id === id
    })
  }
  returnAvgSteps() {
    const totalSteps = this.data.reduce((acc, user) => {
      acc += user.dailyStepGoal
      return acc
    }, 0);
    return Math.floor(totalSteps/this.data.length);
  }
}

export default UserRepository;
