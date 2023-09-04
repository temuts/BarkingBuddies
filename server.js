// Dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3003;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({});

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes)

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
