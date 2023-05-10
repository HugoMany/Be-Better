function generateProgram(){
    const level=document.getElementById("difficultySelect").value;
    const fract=document.getElementById("splitSelect").value;

    const url=`http://localhost:3000/api/sport/run/${level}/${fract}`;
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
        //Appelle la fonction runProgram avec en paramètre data pour pouvoir exploiter le json    
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

        var legend1 = document.createElement('p');
        var legend1Content = document.createTextNode("Exercise's name :");
        legend1.appendChild(legend1Content);
        programPage.appendChild(legend1);
        var exName = document.createElement('p');
        var exNameContent = document.createTextNode(data[indexExo].exerciceName);
        exName.appendChild(exNameContent);
        programPage.appendChild(exName);
        var legend2 = document.createElement('p');
        var legend2Content = document.createTextNode("Description :");
        legend2.appendChild(legend2Content);
        programPage.appendChild(legend2);
        var exDescription = document.createElement('p');
        var exDescriptionContent = document.createTextNode(data[indexExo].description);
        exDescription.appendChild(exDescriptionContent);
        programPage.appendChild(exDescription);
    
        var buttonProgramPage = document.createElement('div');
        buttonProgramPage.setAttribute("id", "buttonProgramPage");
        body.appendChild(buttonProgramPage);
        //On crée un bouton finish pour quand l'utilisateur aura fini son programme il pourra revenir au menu
        //de choix
        var buttonFinish = document.createElement('input');
        buttonFinish.setAttribute('type', 'button')
        buttonFinish.setAttribute('value', 'FINISH')
        buttonFinish.setAttribute('onclick', 'finishExercise()')
        buttonProgramPage.appendChild(buttonFinish);
    
        //On crée un bouton generatePdf dans le cas où l'utilisateur veuille télécharger le prgramme qu'il vient de faire 
        var buttonGeneratePdf = document.createElement('input');
        buttonGeneratePdf.setAttribute('type', 'button')
        buttonGeneratePdf.setAttribute('value', 'Generate PDF')
        buttonGeneratePdf.setAttribute('onclick', 'generatePdf()')
        buttonProgramPage.appendChild(buttonGeneratePdf);
    }
    
    //Fonction qui va s'activer quand l'utilisateur va appuyer sur le bouton FINISH et qui va supprimer la div
    //contenant le programme pour ensuite reafficher le menu de choix
    function finishExercise() {
        buttonProgramPage.remove();
        programPage.remove();
        const principal = document.getElementById("principal")
        principal.style.display = "block"
    }
    
    //Fonction qui va s'activer quand l'utilisateur va appuyer sur le bouton Generate PDF et qui va télécharger un document pdf contenant
    //le programme 
    function generatePdf() {
        //nom du fichier | file name
        var nom_fichier = prompt("Nom du fichier PDF :");
        //generer le pdf
        var element = document.getElementById('programPage');
        var opt = {
            margin: 1,
            filename: `${nom_fichier}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        if (nom_fichier != null) {
            html2pdf().set(opt).from(element).save()
        } else {
            alert("Veuillez choisir un nom ")
        }
    }