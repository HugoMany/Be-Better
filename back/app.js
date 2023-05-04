const express = require('express');
const mongoose = require('mongoose');
// const url = require("url"); 
//Import models

const userModel=require('./Model/userModel');
const muscuModel=require('./Model/muscuModel');


mongoose.connect("mongodb+srv://BBT:0cka7EfxFSpfDkBk@cluster0.54ar39o.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// const 
const app = express();
app.use(express.json());


app.post('/api/user/', async (req, res) => {
  try {
    const newUser = new UserModel({
      sex: req.body.sex,
      firstName: req.body.firstName,
      email: req.body.email,
      tel: req.body.tel,
      passw: req.body.passw,
      age: req.body.age
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get methode
app.get('/api/user/', (req, res, next) => {
  const user = new userModel({
    sex: 0,
    firstName: 'John',
    email: 'john@example.com',
    tel: '+33 6 12345678',
    passw: 'azertghe567',
    age: 25,    
});
  // console.log(url.parse(req.url).pathname);
  // let page = 
  user.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
 });

// Creation Programme sport

app.get('/api/sport/fitness', (req, res, next) => {
  const user = new muscuModel({
    exerciceName:"empty",
    description:"empty",
    muscularGroup:"empty",
    level:0,
    numberOfRep:0,
    photo:"empty", 
});
  // console.log(url.parse(req.url).pathname);
  // let page = 
  user.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
 });

 
 app.get('/api/alluser', (req, res, next) => {
    userModel.find()
      .then(userModel => res.status(200).json(userModel))
      .catch(error => res.status(400).json({ error }));

 });
 app.get('/api/nballuser', (req, res, next) => {
  userModel.find()
    .then(userModel => {

      // const json = userModel;
      // const obj = JSON.parse(json);
      // console.log(obj.id);
      // console.log(userModel);
      //const email = JSON.parse(username);
      let i=0;
      while(userModel[i].email!=undefined){
        console.log(userModel[i].email);
        console.log(i);
        i++;
      }
      res.status(200).json(userModel);
      


    })
    .catch(error => res.status(400).json({ error }));

});

 app.get('/api/oneuser/:id', (req, res, next) => {
  userModel.findOne({ _id: req.params.id })
    .then(userModel => res.status(200).json(userModel))
    .catch(error => res.status(404).json({ error }));
});



 app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
   
 });

module.exports = app;
