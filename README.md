# Get Fit Get Lit!
-------
### Overview

Get Fit Get Lit is an interactive webpage that tracks a user's wellness data and renders it on a dashboard. Our goal is to present a useful application for a user to view their latest data, goals, and milestones. 

This app is built using JavaScript, HTML, CSS, and utilizes Test Driven Development with Mocha and Chai. This application also involves the use of a API server.

- The user can choose a date that will display their water intake for the selected day and over the course of that last week
- The user can see their sleep time and sleep quality and compare that data against the rest of their week
- The user can track their active mintues, flights of stairs climbed, and distance walked/steps taken for the day, as well as over the past week
- The user can view their daily steps and see where they stand with the average amount of daily steps compared to other users 
- The user can enter custom data for all activity, sleep, and hydration categories. The user will see an error if they leave a blank field and will see a confirmation if data submission is succcessful

 
![Pick a date to show user data](https://media1.giphy.com/media/HhvitJgHADGc2lpa3z/giphy.gif)


![The user can enter custom activity data](https://media4.giphy.com/media/eRvyLjiLxMaldZuesz/giphy.gif)

![The user can enter custom sleep data](https://media1.giphy.com/media/kWQs3ebzMxT7D9RQG6/giphy.gif)

![The user can enter custom hydration data but will receive an error if fields are blank](https://media0.giphy.com/media/MOLXQvXpTkta7o8Tem/giphy.gif)


---------
### Installation Instructions
 - Fork and Clone [this](https://github.com/jskomal/get-fit-get-lit) repository
 - `CD` into the directory
 - Run `npm install` 
 - Run `npm start`
 - Fork and Clone [this link](https://github.com/turingschool-examples/fitlit-api)
 - `CD` into the directory
 - Run `npm install` 
 - Run `npm start`
 - In your browser, go to [this link](http://localhost:8080/)


-----------

### Future Features

 - Add functionality on the Activity card that will display miles walked based on a user's number of steps as well as a user's active minutes by the day and by the week
 - Add functionality on the Activity card that will display if a user reached their step goal for a given day as well as display data that shows all the days where a user exceeded their step goal
 - Add functionality on the Activity card that will display a user's all time stair climbing record
 - Add functionality on the Activity card that will display the average number of stairs climbed, steps taken, and active minutes of all users for a specific date
 - Finally, add accessibilty features that will function with a screen reader as well as a colorblind extension


---------

### Contributors

Katie Toler | [GitHub](https://github.com/KATIETOLER)

Jordan Skomal | [GitHub](https://github.com/jskomal)

Jessica Fatta | [GitHub](https://github.com/JessFatta)

--------
### Links

Repository Link: [Get Fit Get Link 😎](https://github.com/jskomal/get-fit-get-lit)

------------
### Architecture & Technologies Used
This application was built using JavaScript, CSS, and HTML and utilizes Test Driven Development with Mocha and Chai.

This application consists of a series of six class files and their corresponding test files, as well as the scripts, css, and HTML files. Lastly, there is the apiCalls file which holds the fetch calls for retrieving the data.

------------
### Wins & Challenges
##### Wins
- Successfully implement APIs and Fetch Calls
- Applied Chart.js, Dayjs, and js-datepicker dependencies to provide a better user experience via charts and a calendar

##### Challenges
- Implementing Dayjs presented an opportunity to learn how to use plug-ins such as isBetween
- Webpack poses an added layer of abstraction in web development that, while extremely useful, decentralizes the structure of the user data and requires a higher level view to understand
