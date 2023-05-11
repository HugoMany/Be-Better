//fonction qui va s'activer quand le bouton "Generate program" sera appuyé
function generateProgram() {
    //On récupère les données que l'utilisateur a entré
    const muscularGroup = document.getElementById("muscularGroupSelect").value
    const difficulty = document.getElementById("difficultySelect").value

    //On récupère tous les exercices correspondant à l'envie de l'utilisateur sous forme d'un fichier json
    const url = `http://localhost:3000/api/sport/fitness/${difficulty}/${muscularGroup}`
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

function muscuProgram(data) {

    //On fait en sorte que la partie ou l'utilisateur choisi son programme ne soit plus visible
    const principal = document.getElementById("principal")
    principal.style.display = "none"
    nbExercises = data.length

    //On sélectionne 5 exercices différents parmis tous ceux qui sont proposés
    table = [];
    while (table.length != 5) {
        let j = Math.floor(Math.random() * nbExercises)
        if (table.includes(j) == false) {
            table.push(j)
        }
    }

    //On crée une nouvelle div qu'on va afficher et qui va contenir toutes les infos sur le programme
    //à réaliser
    let body = document.getElementById("body")
    var programPage = document.createElement('div');
    programPage.setAttribute("id", "programPage");
    body.appendChild(programPage);

    //On récupère le temps que l'utilisateur a entré pour indiquer combien de circuit(s) il doit faire
    var timeEx = document.getElementById("timeSelect").value
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
        divEx.setAttribute("id", data[element]._id);
        programPage.appendChild(divEx);
        
        var legend1 = document.createElement('p');
        var legend1Content = document.createTextNode("Exercise's name :");
        legend1.appendChild(legend1Content);
        divEx.appendChild(legend1);
        var exName = document.createElement('p');
        var exNameContent = document.createTextNode(data[element].exerciceName);
        exName.appendChild(exNameContent);
        divEx.appendChild(exName);
        var legend2 = document.createElement('p');
        var legend2Content = document.createTextNode("Description :");
        legend2.appendChild(legend2Content);
        divEx.appendChild(legend2);
        var exDescription = document.createElement('p');
        var exDescriptionContent = document.createTextNode(data[element].description);
        exDescription.appendChild(exDescriptionContent);
        divEx.appendChild(exDescription);
        var legend3 = document.createElement('p');
        var legend3Content = document.createTextNode("Number of repetitions :");
        legend3.appendChild(legend3Content);
        divEx.appendChild(legend3);
        var exNbRep = document.createElement('p');
        var exNbRepContent = document.createTextNode(data[element].numberOfRep);
        exNbRep.appendChild(exNbRepContent);
        divEx.appendChild(exNbRep);
        var exPhoto = document.createElement('img');
        var exPhotoContent = document.createTextNode(data[element].photo);
        exPhoto.appendChild(exPhotoContent);
        divEx.appendChild(exPhoto);
    }

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
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
    if (nom_fichier != null) {
        html2pdf().set(opt).from(element).save()
    } else {
        alert("Veuillez choisir un nom ")
    }
}

