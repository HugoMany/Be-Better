const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const userModel=require('./Model/userModel');
const muscuModel=require('./Model/muscuModel');

mongoose.connect("mongodb+srv://BBT:0cka7EfxFSpfDkBk@cluster0.54ar39o.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('La connexion réussie !'))
  .catch(() => console.log('La connexion échouée !'));

// const 
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


/*


POST

*/
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


/*


Get

*/
app.get('/api/user/:sex/:firstName/:email/:tel/:passw/:age/', (req, res, next) => {
  const user = new userModel({
    sex: req.params.sex,
    firstName: req.params.firstName ,
    email: req.params.email,
    tel: req.params.tel,
    passw: req.params.passw,
    age: req.params.age,    
}); 
  user.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
 });




// Creation Programme sport
app.get('/api/sport/fitness', (req, res, next) => {
  const user = new muscuModel({
    exerciceName:"empty",
    description:"empty",
    level:0,
    numberOfRep:0,
    photo:"empty", 
}); 
  user.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
 });

// Ex: http://localhost:3000/api/sport/fitness/all
app.get('/api/sport/fitness/all', (req, res) => {
  muscuModel.find()
  .then(muscuModel => res.status(200).json(muscuModel))
  .catch(error => res.status(404).json({ error }));
  // res.send(`Les paramètres sont ${levelP} et ${muscularGroupP}`);
});

// Ex: http://localhost:3000/api/sport/fitness/id
app.get('/api/sport/fitness/:id', (req, res) => {
  muscuModel.findOne({ _id:  req.params.id})
  .then(muscuModel => res.status(200).json(muscuModel))
  .catch(error => res.status(404).json({ error }));
  // res.send(`Les paramètres sont ${levelP} et ${muscularGroupP}`);
});

// Ex: http://localhost:3000/api/sport/facile/deltoide
 app.get('/api/sport/fitness/:level/:muscularGroup', (req, res) => {
  const levelP = req.params.level;
  const muscularGroupP = req.params.muscularGroup;
  console.log(levelP);
  console.log(muscularGroupP);

  muscuModel.find({ level: levelP, muscularGroup: muscularGroupP})
  .then(muscuModel => res.status(200).json(muscuModel))
  .catch(error => res.status(404).json({ error }));
  // res.send(`Les paramètres sont ${levelP} et ${muscularGroupP}`);
});

app.get('/api/', (req, res) => {
  // Ouvre le fichier texte
  fs.readFile('.docAPI.txt', 'utf8', (err, data) => {
    if (err) {
      // Gère les erreurs s'il y en a
      console.error(err);
      res.status(500).send('Erreur serveur');
    } else {
      // Renvoie les données du fichier texte en réponse à la requête
      res.send(data);
    }
  });
});


 app.get('/api/user/alluser', (req, res, next) => {
    userModel.find()
      .then(userModel => res.status(200).json(userModel))
      .catch(error => res.status(400).json({ error }));

 });


 app.get('/api/user/oneuser/:id', (req, res, next) => {
  userModel.findOne({ _id: req.params.id })
    .then(userModel => res.status(200).json(userModel))
    .catch(error => res.status(404).json({ error }));
});





module.exports = app;
