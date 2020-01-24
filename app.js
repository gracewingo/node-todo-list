const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const config = require('./config');
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');
const cors = require('cors')

app.set('view engine', 'ejs');
app.use(cors())
app.use('/assets', express.static(__dirname + '/public'));

app.use('/', function(req, res, next){
  next();
});

mongoose.set('useFindAndModify', false);
mongoose.connect(config.getDbConnectionString(), {useUnifiedTopology: true, useNewUrlParser: true } );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database")
});

setupController(app);
apiController(app);

app.listen(port, () => console.log("listening on port 3001!"));











/*
Requirements: 
- a user can add, edit, and delete 'todos'
- each todo can be marked as complete 
- each todo can have on optional file attachment 
- one person cannot access the todos of another 


Config: 
- in real environments, encript and decode the password and username 

//before i push this to Github - definitely encrypt the password OR put in gitignore? 
*/
