# Nutrition calculator
This is a nutrition calculator which allows users who have registered to save food with their nutrition data. The user can afterwards use these to calculate total nutrition values and energy from a desired amount of food. This application does not take all possible nutrition data into account but only the macro nutrients Protein, Carbohydrates and Fat.

The application is writtein mainly in javascript using the Backbone framework together with a few other javascript libraries. The users data is stored in an external Mongo database for persistance. Data sent between the database and the backbone application (RESTful) is mediated by php-scripts.

Following is a list of the libraries and extensions used by this application:

* Backbone
  * Relational
* Underscore
* jQuery
* Require.js
  * Order


## Application files

### index.html
The webpage on where the application runs. Contains templates that are rendered from the Backbone views.

### main.js
The application entrance. Sets Require.js configuration and runs the backbone router.

### router.js
The Backbone router.

### auth.js
Provides functions for handling the user login session.


## Collections

### calculatoritems.js
A Backbone collection containing calculatoritem models. Has a function totals() to return the sum of the nutrition values of all calculatoritems in the collection.

### food.js
A Backbone collection containing food models.

### users.js
A Backbone collection containing user models.


## Models

### calculatoritem.js
Calculator Item model. Contains data to be used for the nutrition calculator "rows". Has functions protein(), carbohydrates(), fat() and energy() to calculate nutrition data of the food depending on the user entered food weight.

### food.js
Food model. Contains data for users food stored in the application.

### user.js
User model. A user of the nutrition calculator application.


## Views

### calculator.js
Calculator view. Displays the nutrition calculator and handles its user interaction.

### login.js
Login view. Displays and handles a user login form.

### menu.js
Menu view. Displays and handles the application main menu for navigation.

### registration.js
Registration view. Displays and handles a user registration form.


## PHP-files

### mongo-calculatoritems.php
Mediates operations on the calculatoritems collection of the database.

### mongo-food.php
Mediates operations on the food collection of the database.

### mongo-user.php
Mediates operations on the users collection of the database.
