class Hydration {
  constructor(filteredUserData) {
    this.userID = filteredUserData[0].userID
    this.waterData = filteredUserData.reduce((acc, currentEntry) => {
      acc.push({ [currentEntry.date]: currentEntry.numOunces })
      return acc
    }, [])
  }

  //[{ '2019/06/15': 85 },
  // { '2019/06/16': 69 },
  // { '2019/06/22': 54 }]

  getWaterByDate(date) {
    return this.waterData.find((waterLogEntry) => {
      return waterLogEntry[date]
    })[date]
  }
}

export default Hydration
