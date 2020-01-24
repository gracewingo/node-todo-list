//get config.json file in this folder 
const configValues = require('./config');

//require returns an module.exports function 
//when we require config, we get this getDb object with a method 
//returns the connection link to the database 
module.exports = {
    getDbConnectionString: function(){
        return `mongodb+srv://${configValues.uname}:${configValues.pwd}@node-udemy-9vcbz.mongodb.net/nodetodosample?retryWrites=true&w=majority`
    }
}


