
class Hydration {
  constructor(filteredUserData) {
    this.userID = filteredUserData[0].userID;
    this.waterData = filteredUserData.reduce((acc, currentEntry) => {
      acc.push({[currentEntry.date]:
        currentEntry.numOunces})
      return acc
    }, [])
  }
}



export default Hydration;
