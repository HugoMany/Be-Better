const express = require('express');
const mongoose = require('mongoose');

//Import models

const userModel=require('./Model/userModel');

mongoose.connect("mongodb+srv://BBT:0cka7EfxFSpfDkBk@cluster0.54ar39o.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// const 
const app = express();
app.use(express.json());


// Post methde
app.post('/api/user', (req, res, next) => {
   delete req.body._id;
   const thing = new userModel({
     ...req.body
   });
   user.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
 });

// Get methode
app.get('/api/user', (req, res, next) => {
   const user = new userModel({
      sex:0,       
      firstName:"Hugo", 
      email:"hugo@gmail.com",     
      tel:"+336123456789",       
      passw:"coucou",      
      age:19,        

  
  });
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



/*------------------------------------------------------------------------------------------------------
-----------------------------------------------MUSCU----------------------------------------------------
------------------------------------------------------------------------------------------------------*/

app.get('/api/muscu', (req, res, next) => {
  const user = new muscuModel({
     nomExo:"pompes",       
     niveau:1, 
     nbRep:6,     
     photo:" ",       
       

 
 });
 user.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));

});