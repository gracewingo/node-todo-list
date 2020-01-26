const Todos = require('../models/todoModel');

module.exports = function(app){
    //set up a get request api endpoint 
    app.get('/api/setupTodos', function(req,res) {

        //seed database 
        const starterTodos = [
            {
                username: "test",
                todo: "Get local greens",
                isDone: false,
                hasAttachment: false
            },
            {
                username: "test",
                todo: "Learn Node",
                isDone: false,
                hasAttachment: false
            }
        ];
        
        Todos.create(starterTodos, function(err, results){
            if (err) throw err;
            res.send(results);
        })
    })
}