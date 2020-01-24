const Todos = require('../models/todoModel');
const bodyParser = require('body-parser');

module.exports = function(app){
    //create middleware to parse incoming HTTP request body as JSON
    app.use(bodyParser.json());
    //body parses JSON from the http request body 
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/todos/:uname', function(req,res){

        Todos.find({ username: req.params.uname },
            function(err,todos){
                if(err) throw err;
                res.send(todos);
            });
    });

    app.get('/api/todo/:id', function(req,res){
        Todos.findById({ _id: req.params.id}, 
            function (err,todo) {
                if (err) throw err;
                res.send(todo);
            });
    });

    app.post('/api/todo', function(req,res){
        if(req.body.todo._id){ 
            //If ID exists, update the values 
            Todos.findByIdAndUpdate(req.body.todo._id, {
                todo: req.body.todo.todo, 
                isDone: req.body.todo.isDone, 
                hasAttachment: req.body.todo.hasAttachment,
                username: req.body.todo.username
            }, function(err,todo){
                if (err) throw err;
                res.send('Success!');
            });
        }
        else {
            console.log(`adding new todo:`, req.body)
            //Otherwise, create a new to do 
            const newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function(err){
                if(err) throw err;
                res.send('Successfully created new todo!')
            })
        }
    });

    app.delete('/api/todo', function(req,res){
        //Delete a todo by using the id 
        console.log(req.body)
        Todos.findByIdAndDelete(req.body._id, { useFindAndModify: false}, function(err,todo){
            if (err) throw err;
            res.send('Successfuly deleted');
        })
    })

}