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
    
  }
}

export default UserRepository;
