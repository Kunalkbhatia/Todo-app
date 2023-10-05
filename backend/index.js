const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const app = express();
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const SECRET = 'SECr3t';

mongoose.connect('mongodb+srv://bhatiakbkb:Kunal2301@cluster0.25igx1o.mongodb.net/');

// schema creation tells us that how our document will be looking like 
const todoSchema = new mongoose.Schema({
    Task:String,
    Description:String
});

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    assignedTodo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todos' }]
});

// creating a model is like creating a collection 
const Todos = new mongoose.model('Todos' , todoSchema);
const Users = new mongoose.model('Users' , userSchema);



// auth middleware

const authenticationJwt = (req,res,next)=>{
    const authheader = req.headers.authorization;
    if(authheader){
        let token = authheader.split(' ')[1];
        jwt.verify(token, SECRET, (error, user) => {
            if (error) {
              return res.sendStatus(403);
            }
            req.user = user;
            next();
          });
        }
    else{
        res.sendStatus(401);
    }
};

app.post('/user/Signup' , async (req,res) => {
    const {username , password} = req.body;
    const user = await Users.findOne({username});   
    if(user){
        res.status(403).json({ message: 'Admin already exists' });
    }
    else{
        const newUser = await Users.create({ username, password });
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token , newUser});
    }
});

app.post('/user/Signin' , async(req,res) => {
    console.log("im hitted");
    const {username , password} = req.headers;
    const user = await Users.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});


// route to create todo
app.post('/user/newTodo' ,authenticationJwt , async (req , res) => {
    try{
        const newTodo = await Todos.create(req.body);
        const user = await Users.findOne({ username: req.user.username });
        user.assignedTodo.push(newTodo._id);
        await user.save();

        res.status(200).json({
            success:true,
            message:"new todo added",
            newTodo
        });
    }
    catch(error){
        console.log(error);
    }
});
// route to get all todos 
app.get('/user/getTodos' ,authenticationJwt, async (req , res) => {
    try{
        const allTodos = await Todos.find();
        const user = await Users.findOne({username : req.user.username})
        const userTodos = allTodos.filter(todo => user.assignedTodo.includes(todo._id));
        res.status(200).json({
            success:true,
            userTodos
        });
    }
    catch(error){
        console.log(error);
    }
});
// route to get todo by id
app.get('/user/getTodo/:id'  , async (req , res) => {
    try{
        const todo = await Todos.findById(req.params.id);
        res.status(200).json({
            success:true,
            todo
        });
    }
    catch(error){
        console.log(error);
    }
});
// route to delete todo

app.delete('/user/deleteTodo/:id' , authenticationJwt , async (req , res) => {
    try{
        const todo = await Todos.findByIdAndRemove(req.params.id);
        const result = await Users.findOneAndUpdate(
            { username:req.user.username },
            { $pull: { assignedTodo: req.params.id } }
          );
        res.status(200).json({
            success:true,
            todo
        });
    }
    catch(error){
        console.log(error);
    }
});


app.listen(PORT , () => console.log(`server is listening on ${PORT}`));