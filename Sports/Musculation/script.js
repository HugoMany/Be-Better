//fonction qui va s'activer quand le bouton "Generate program" sera appuyé
function generateProgram(){
    //On récupère les données que l'utilisateur a entré
    const muscularGroup=document.getElementById("muscularGroupSelect").value
    const difficulty=document.getElementById("difficultySelect").value
    
    //On récupère tous les exercices correspondant à l'envie de l'utilisateur sous forme d'un fichier json
    const url=`http://localhost:3000/api/sport/fitness/${difficulty}/${muscularGroup}`
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        
    .then(response => {   
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
        
    })    
    .then(data => {
        //Appelle la fonction muscuProgram avec en paramètre data pour pouvoir exploiter le json    
        muscuProgram(data)
    })    
    .catch(error => {    
        console.error(error);
        alert('Error in the creation of the program ! Check that you have chosen the right muscle group and difficulty.');
    });

}

function muscuProgram(data){

    //On fait en sorte que la partie ou l'utilisateur choisi son programme ne soit plus visible
    const principal=document.getElementById("principal")
    principal.style.display="none"
    nbExercises=data.length

    //On sélectionne 5 exercices différents parmis tous ceux qui sont proposés
    table=[];
    while(table.length!=5){
        let j=Math.floor(Math.random() * 5)
        if(table.includes(j)==false){
            table.push(j)
        }
    }

    //On crée une nouvelle div qu'on va afficher et qui va contenir toutes les infos sur le programme
    //à réaliser
    let body=document.getElementById("body")
    var programPage = document.createElement('div');
    programPage.setAttribute("id","programPage");
    body.appendChild(programPage);
    
    //On récupère le temps que l'utilisateur a entré pour indiquer combien de circuit(s) il doit faire
    var timeEx=document.getElementById("timeSelect").value
    var nbSerie = document.createElement('h1');
    switch (timeEx) {
        case 'five':
            var nbSerieContent = document.createTextNode("Do this tour only once");
            break;
        case 'ten':
            var nbSerieContent = document.createTextNode("Repeat this circuit twice in the same way, taking a one-minute break between the two ");
            break;
        case 'fifteen':
            var nbSerieContent = document.createTextNode("Repeat this circuit three times in the same way, taking a one-minute break between two circuits ");
            break;
        case 'twenty':
            var nbSerieContent = document.createTextNode("Repeat this circuit four times in the same way, taking a one-minute break between two circuits ");
            break;
        default:
            var nbSerieContent = document.createTextNode("Do this tour only once");
            break;

    }
    nbSerie.appendChild(nbSerieContent);
    programPage.appendChild(nbSerie);

    //Temps de pause nécessaire entre deux exercices
    var pause = document.createElement('h3');
    var pauseContent = document.createTextNode("Don't forget to take a 20 to 30 second break between each exercise");
    pause.appendChild(pauseContent);
    programPage.appendChild(pause);


    //On affiche pour chaque exercice séléctionné aléatoirement son nom, sa description, le nombre de 
    //répétitions et sa photo
    for (const element of table) {
        var divEx = document.createElement('div');
        divEx.setAttribute("id",data[element]._id);
        programPage.appendChild(divEx);

        var exName = document.createElement('p');
        var exNameContent = document.createTextNode(data[element].exerciceName);
        exName.appendChild(exNameContent);
        divEx.appendChild(exName);
        var exDescription = document.createElement('p');
        var exDescriptionContent = document.createTextNode(data[element].description);
        exDescription.appendChild(exDescriptionContent);
        divEx.appendChild(exDescription);
        var exNbRep = document.createElement('p');
        var exNbRepContent = document.createTextNode(data[element].numberOfRep);
        exNbRep.appendChild(exNbRepContent);
        divEx.appendChild(exNbRep);
        var exPhoto = document.createElement('img');
        var exPhotoContent = document.createTextNode(data[element].photo);
        exPhoto.appendChild(exPhotoContent);
        divEx.appendChild(exPhoto);
    }

    //On crée un bouton finish pour quand l'utilisateur aura fini son programme il pourra revenir au menu
    //de choix
    var buttonFinish = document.createElement('input');
    buttonFinish.setAttribute('type','button')
    buttonFinish.setAttribute('value','FINISH')
    buttonFinish.setAttribute('onclick','finishExercise()')
    programPage.appendChild(buttonFinish);
}

//Fonction qui va s'activer quand l'utilisateur va appuyer sur le bouton FINISH et qui va supprimer la div
//contenant le programme pour ensuite reafficher le menu de choix
function finishExercise(){
    programPage.remove();
    const principal=document.getElementById("principal")
    principal.style.display="block"
}
