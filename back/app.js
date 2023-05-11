const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const puppeteer = require('puppeteer')

const userModel=require('./Model/userModel');
const muscuModel=require('./Model/muscuModel');
const timeTableModel = require('./Model/timeTableModel');

const swimModel = require('./Model/swimModel')
const bikeModel = require('./Model/bikeModel')
const { log } = require('console');

const runModel = require('./Model/runModel');
const userCaractModel = require('./Model/userCaractModel');


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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,UPTDATE, OPTIONS');
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
app.post('/api/user/login/', async (req, res) => {
  try {
    userModel.findOne({
      email: req.body.email,
      passw: req.body.passw,
    }).then(userModel => res.status(200).json(userModel));
    
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

 /* 
 
 
Caracteristique
 
 
 */
 //Create a caract Profile
 app.get('/api/user/caract/:id/:sexe/:newWeigh/:height', (req, res, next) => {
  const caractUser = new userCaractModel(  {   
    idUser: req.params.id,
    sexe: req.params.sexe,
    allWeigh: [{value:req.params.newWeigh, date:Date.now()}],
    height: req.params.height,
}); 
  caractUser.save()
     .then(() => res.status(201).json({ message: 'Caractéristique de l"utilisateur '+req.params.id+' ont bien été enregistré'}))
     .catch(error => res.status(400).json({ error }));
 });

 app.get('/api/user/caract/:id/:newWeigh', (req, res, next) => {
  userCaractModel.findOne({idUser:req.params.id})
  .then(userCaractModel => {
    res.status(200).json(userCaractModel);
    userCaractModel["allWeigh"].push({value:req.params.newWeigh,date:Date.now()});
    console.log(userCaractModel["allWeigh"]);
    userCaractModel.save();
  }
    )
  .catch(error => res.status(404).json({ error }));
 });

app.get('/api/user/caract/:id' , (req, res, next) => {
  userCaractModel.findOne({idUser:req.params.id})
  .then(userCaractModel => {
    res.status(201).json(userCaractModel);
  }).catch(
    error => res.status(401).json({error})
  );
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

// Ex: http://localhost:3000/api/sport/fitness/facile/deltoide
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

/*

Time Table

*/
//Creer
app.post('/api/timetable/create', async (req, res) => {
  try {
    const newTimeTableModel = new timeTableModel({
      id: req.body.id,
      dateOfMonday: req.body.dateOfMonday,
      timeTable: req.body.timeTable,
    });
    // console.log(req.body.timeTable);
    const savedTimeTableModel = await newTimeTableModel.save();
    // res.status(201).json(savedTimeTableModel);
  } catch (err) {
    res.status(400).send(err);
  }
});


//Creer
app.post('/api/timetable/create', async (req, res) => {
  try {
    const newTimeTableModel = new timeTableModel({
      id: req.body.id,
      dateOfMonday: req.body.dateOfMonday,
      timeTable: req.body.timeTable,
    });
    // console.log(req.body.timeTable);
    const savedTimeTableModel = await newTimeTableModel.save();
    // res.status(201).json(savedTimeTableModel);
  } catch (err) {
    res.status(400).send(err);
  }
});


// Modifier
app.post('/api/timetable/update/:idUser', async (req, res) => {
   {
    const timeTable = await timeTableModel.findOne({ id:  req.params.idUser});
    if (!timeTable) {
      res.status(404).send('Aucun emploi du temps trouvé avec cet ID.');
      return;
    }
    timeTable.dateOfMonday = req.body.dateOfMonday;
    timeTable.timeTable = req.body.timeTable;
    const savedTimeTableModel = await timeTable.save();
    res.status(200).json(savedTimeTableModel);
  }
  // } catch (err) {
  //   res.status(400).send(err);
  // }
});

//Read
app.get('/api/timetable/one/:idUser', (req, res, next) => {
  timeTableModel.findOne({ id: req.params.idUser})
    .then(timeTableModel => res.status(200).json(timeTableModel))
    .catch(error => res.status(404).json({ error }));
});

//Delete
app.get('/api/timetable/delete/:idUser', async (req, res) => {
    const idUser = req.params.idUser;
  
      // Trouver tous les éléments ayant l'ID spécifié dans la base de données
      const timeTableModelToDelete = await timeTableModel.find({ id: idUser });
  
      // Supprimer les éléments de la base de données
      await timeTableModel.deleteMany({ id: idUser });
  
      // Retourner la liste des éléments supprimés
      res.status(200).json({
        message: `Tous les éléments avec l'ID ${idUser} ont été supprimés`,
        elements: timeTableModelToDelete
      });
    
  });


/* 

Run model

*/

app.get('/api/sport/run', (req, res, next) => {
  const run = new runModel({
    exerciceName:"empty",
    description:"empty",
    level:0,
    fract:false,
}); 
run.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
 });

 // Ex: http://localhost:3000/api/sport/run/1/yes
 app.get('/api/sport/run/:level/:fract', (req, res) => {
  const levelP = req.params.level;
  const fractP = req.params.fract;
  console.log(levelP);
  console.log(fractP);

  runModel.find({ level: levelP, fract: fractP})
  .then(runModel => res.status(200).json(runModel))
  .catch(error => res.status(404).json({ error }));
  // res.send(`Les paramètres sont ${levelP} et ${fractP}`);
});

/*

Swim

*/

app.get('/api/sport/swim', (req, res, next) => {
  const swim = new swimModel({
    exerciceName:"empty",
    description:"empty",
    level:0,
}); 
swim.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
 });

// Ex: http://localhost:3000/api/sport/swim/1
app.get('/api/sport/swim/:level', (req, res) => {
  const levelP = req.params.level;
  console.log(levelP);
  
  swimModel.find({ level: levelP})
  .then(swimModel => res.status(200).json(swimModel))
  .catch(error => res.status(404).json({ error }));
  // res.send(`Les paramètres sont ${levelP});
});

/*

Bike

*/

app.get('/api/sport/bike', (req, res, next) => {
  const bike = new bikeModel({
    exerciceName:"empty",
    description:"empty",
    level:0,
}); 
bike.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
 });

// Ex: http://localhost:3000/api/sport/bike/1
app.get('/api/sport/bike/:level', (req, res) => {
  const levelP = req.params.level;
  console.log(levelP);
  
  bikeModel.find({ level: levelP})
  .then(bikeModel => res.status(200).json(bikeModel))
  .catch(error => res.status(404).json({ error }));
  // res.send(`Les paramètres sont ${levelP});
});

module.exports = app;
