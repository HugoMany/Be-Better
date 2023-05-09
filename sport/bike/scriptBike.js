function generateProgram(){
    const level=document.getElementById("difficultySelect").value;

    const url=`http://localhost:3000/api/sport/bike/${level}`;
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
        //Appelle la fonction bikeProgram avec en paramètre data pour pouvoir exploiter le json    
        bikeProgram(data)
    })    
    .catch(error => {    
        console.error(error);
        alert('Error in the creation of the program ! Check that you have chosen the difficulty.');
    });

}

function bikeProgram(data){

        //On fait en sorte que la partie ou l'utilisateur choisi son programme ne soit plus visible
        const principal=document.getElementById("principal")
        principal.style.display="none"
        nbExercises=data.length
    
        //On sélectionne 1 exercice parmis tous ceux qui sont proposés
        let indexExo=Math.floor(Math.random() * nbExercises)

        //On crée une nouvelle div qu'on va afficher et qui va contenir toutes les infos sur le programme
        //à réaliser
        let body=document.getElementById("body")
        var programPage = document.createElement('div');
        programPage.setAttribute("id","programPage");
        body.appendChild(programPage);

        var exName = document.createElement('p');
        var exNameContent = document.createTextNode(data[indexExo].exerciceName);
        exName.appendChild(exNameContent);
        programPage.appendChild(exName);
        var exDescription = document.createElement('p');
        var exDescriptionContent = document.createTextNode(data[indexExo].description);
        exDescription.appendChild(exDescriptionContent);
        programPage.appendChild(exDescription);

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