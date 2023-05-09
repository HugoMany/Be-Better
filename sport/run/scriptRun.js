function generateProgram(){
    const level=document.getElementById("difficultySelect").value;
    const fract=document.getElementById("splitSelect").value;

    const url=`http://localhost:3000/api/sport/run/${level}/${fract}`;
    console.log(url);
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
        runProgram(data)
    })    
    .catch(error => {    
        console.error(error);
        alert('Error in the creation of the program ! Check that you have chosen the difficulty and if you want to do split training.');
    });

}

function runProgram(data){

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
}