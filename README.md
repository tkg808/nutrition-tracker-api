# Nutrition-Tracker API

This is the repo for the back-end of the Nutrition-Tracker app. The purpose of this app is to help people who want to identify their personal caloric needs and to help them track the nutritional facts of the foods they eat.

Disclaimer - This is not dietary advice, nor is it a substitute for professional advice from a doctor or dietician.

### Nutritional-Tracker Front-End

The front-end for this app can be found at:

> https://github.com/tkg808/nutrition-tracker.git

### CalorieNinjas API

This API uses data from a 3rd-party API, CalorieNinjas. You can find more information on this API at:

> https://calorieninjas.com/api

## Technologies Used

* VScode
* JavaScript
* Node
* Express
* MongoDB
* Mongoose
* Passport
* Bcrypt

## Models

### User

* One to Many relationship with Food.

### Food

* Many to One relationship with User.

## Endpoints

### GET

* /api/foods

### SHOW

* /api/foods/:id

### POST

* /api/foods
* /api/signup
* /api/login

### EDIT

* /api/foods/:id

### DELETE

* /api/foods/:id

## Contribution Guidelines

### How to Contribute

Feel free to contribute to this app with code or suggestions. If you would like to contribute code - install the app, checkout to a dev branch, play with the code, then submit a pull request.

### How to Identify Bugs

You can submit an issue on the git repo, or work on a dev branch and submit a pull request with suggested code to fix the bug. Please detail the bug and recommendations for solutions if possible.

### How to Propose Improvements

You can submit an issue on the git repository detailing your suggestion.