<!doctype html>
<html>
  <head>
  </head>
  <body>
      <h1>Nutrition calculator</h1>
      <p>This is a nutrition calculator that allows users who have registered to save food with their nutrition data. The user can afterwards use these to calculate total nutrition values and energy from a desired amount of food. This application does not take all possible nutrition data into account but only the macro nutrients Protein, Carbohydrates and Fat.</p>
      <p>The application is writtein mainly in javascript using the Backbone framework together with a few other javascript libraries. The users data is stored in an external Mongo database for persistance. Data sent between the database and the backbone application (RESTful) is mediated by php-scripts.</p>

      <p>Following is a list of the libraries and extensions used by this application:</p>
      <ul>
        <li>Backbone</li>
        <li>Relational (Backbone extension)</li>
        <li>jQuery</li>
        <li>Require.js</li>
        <li>Order (Require.js plugin)</li>
        <li>Underscore</li>
      </ul>

      <h2>Application Files</h2>

      <dl>
        <dt><h4>index.html</h4></dt>
        <dd>The webpage on where the application runs. Contains templates that are rendered from the Backbone views.</dd>

        <dt><h4>main.js</h4></dt>
        <dd>The application entrance. Sets Require.js configuration and runs the backbone router.</dd>

        <dt><h4>router.js</h4></dt>
        <dd>The Backbone router.</dd>

        <dt><h4>auth.js</h4></dt>
        <dd>Provides functions for handling the user login session.</dd>

        <dt><h3>Collections</h3></dt>
        <dd><dl>
          <dt><h4>calculatoritems.js</h4></dt>
          <dd>A Backbone collection containing calculatoritem models. Has a function totals() to return the sum of the nutrition values of all calculatoritems in the collection.</dd>
          <dt><h4>food.js</h4></dt>
          <dd>A Backbone collection containing food models.</dd>
          <dt><h4>users.js</h4></dt>
          <dd>A Backbone collection containing user models.</dd>
        </dl></dd>

        <dt><h3>Models</h3></dt>
        <dd><dl>
          <dt><h4>calculatoritem.js</h4></dt>
          <dd>Calculator Item model. Contains data to be used for the nutrition calculator "rows". Has functions protein(), carbohydrates(), fat() and energy() to calculate nutrition data of the food depending on the user entered food weight.</dd>
          <dt><h4>food.js</h4></dt>
          <dd>Food model. Contains data for users food stored in the application.</dd>
          <dt><h4>user.js</h4></dt>
          <dd>User model. A user of the nutrition calculator application.</dd>
        </dl></dd>

        <dt><h3>Views</h3></dt>
        <dd><dl>
          <dt><h4>calculator.js</h4></dt>
          <dd>Calculator view. Displays the nutrition calculator and handles its user interaction.</dd>
          <dt><h4>login.js</h4></dt>
          <dd>Login view. Displays and handles a user login form.</dd>
          <dt><h4>menu.js</h4></dt>
          <dd>Menu view. Displays and handles the application main menu for navigation.</dd>
          <dt><h4>registration.js</h4></dt>
          <dd>Registration view. Displays and handles a user registration form.</dd>
        </dl></dd>

        <dt><h3>PHP-files</h3></dt>
        <dd><dl>
          <dt><h4>mongo-calculatoritem.php</h4></dt>
          <dd>Mediates operations on the calculatoritems collection of the database.</dd>
          <dt><h4>mongo-food.php</h4></dt>
          <dd>Mediates operations on the food collection of the database.</dd>
          <dt><h4>mongo-user.php</h4></dt>
          <dd>Mediates operations on the users collection of the database.</dd>
        </dl></dd>
      </dl>
  </body>
</html>