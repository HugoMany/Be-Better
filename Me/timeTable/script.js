//On récupère les données de l'emploie du temps dans la base de donnée
if(getTimeTableFromId(getCookie('id'))!=undefined){
    var jsonTimetable=getTimeTableFromId(getCookie('id'));
}
//var jsonTimetable = []
//Si la donnée n'existe pas on crée un tableau
if (jsonTimetable == undefined) {
    var jsonTimetable = []
}

const currDate = moment(); // get current date
const datePlus1 = moment().add(1, 'days'); //date de demain
const datePlus2 = moment().add(2, 'days'); //date dans 2 jours
const datePlus3 = moment().add(3, 'days');
const datePlus4 = moment().add(4, 'days');
const datePlus5 = moment().add(5, 'days');
const datePlus6 = moment().add(6, 'days');

var modal = document.getElementById("myModal");
var modalErr = document.getElementById("myModalErr");
var modalSupp = document.getElementById("myModalSupp");
var divPlanning = document.getElementById("planning");

//On remplit les jours dans leur ordre dans la question1
document.getElementById("day1").innerHTML = currDate.format("dddd");
document.getElementById("day2").innerHTML = datePlus1.format("dddd");
document.getElementById("day3").innerHTML = datePlus2.format("dddd");
document.getElementById("day4").innerHTML = datePlus3.format("dddd");
document.getElementById("day5").innerHTML = datePlus4.format("dddd");
document.getElementById("day6").innerHTML = datePlus5.format("dddd");
document.getElementById("day7").innerHTML = datePlus6.format("dddd");

//On remplit la valeur de chaque date sous un format précis
document.getElementById("day1").value = currDate.format("DDMMYYYY");
document.getElementById("day2").value = datePlus1.format("DDMMYYYY");
document.getElementById("day3").value = datePlus2.format("DDMMYYYY");
document.getElementById("day4").value = datePlus3.format("DDMMYYYY");
document.getElementById("day5").value = datePlus4.format("DDMMYYYY");
document.getElementById("day6").value = datePlus5.format("DDMMYYYY");
document.getElementById("day7").value = datePlus6.format("DDMMYYYY");



//fonction qui va se déclancher quand l'utilisateur va vouloir ajouter une activité au planning
function addActivity() {
    //On affiche le modal
    modal.style.display = "flex";
    //Fermeture du modal si appuie sur la croix
    var close = document.getElementById("close");
    close.onclick = function () {
        modal.style.display = "none"
    }
    //Si l'utilisateur appuie sur submit
    var btnSubmit = document.getElementById("btn");

    btnSubmit.onclick = function () {

        //On récupère les données entrées par l'utilisateur
        var activiteChoisie = document.getElementById("Q2").value;
        var jourChoisi = document.getElementById("Q1").value
        var heureDebutChoisie = document.getElementById("Q3").value;
        var minuteDebutChoisie = document.getElementById("Q4").value;
        var heureFinChoisie = document.getElementById("Q5").value;
        var minuteFinChoisie = document.getElementById("Q6").value;

        //On réinitialise les valeurs dans le questionnaire
        document.getElementById("Q2").value="";
        document.getElementById("Q1").value="daySelectDefault";
        document.getElementById("Q3").value="hdSelectDefault";
        document.getElementById("Q4").value="mdSelectDefault";
        document.getElementById("Q5").value="hfSelectDefault";
        document.getElementById("Q6").value="mfSelectDefault";

        //Appel de la fonction addToPlanning
        addToPlanning(activiteChoisie, jourChoisi, heureDebutChoisie, minuteDebutChoisie, heureFinChoisie, minuteFinChoisie);
    }
}

function addToPlanning(activiteChoisie, jourChoisi, heureDebutChoisie, minuteDebutChoisie, heureFinChoisie, minuteFinChoisie) {
    //On vérifie si l'utilisateur a entré toutes les infos
    if (jourChoisi != "" && activiteChoisie != "" && heureDebutChoisie != "" && minuteDebutChoisie != "" && heureFinChoisie != "" && minuteFinChoisie != "") {
        var dataparse=jsonTimetable
        //On va vérifier si les heures sont cohérentes 
        var debutActivite = heureDebutChoisie + minuteDebutChoisie;
        var finActivite = heureFinChoisie + minuteFinChoisie;
        if (finActivite > debutActivite) {

            var errPresence = 0;
            //On vérifie si le jour est déjà présent dans le json
            for (let i in dataparse) {
                if (dataparse[i]["day"] == jourChoisi) {
                    var index = i;
                    errPresence += 1;
                }
            }
            //S'il n'est pas présent on peut l'ajouter
            if (errPresence == 0) {
                dataparse.push({ day: jourChoisi, activity: [] })
            }

            //On cherche l'index du jour correspondant
            if (index == undefined) {
                index = dataparse.length - 1;
            }

            //On cherche les erreurs de chevauchement dans le planning
            var errAccu = [];
            for (let j in dataparse[index]['activity']) {
                var hd = dataparse[index]['activity'][j]['activityStart']
                var hf = dataparse[index]['activity'][j]['activityEnd']

                //3 cas de chevauchements d'activités
                if ((debutActivite >= hd && debutActivite < hf) || (finActivite > hd && finActivite <= hf) || (hd >= debutActivite && hf <= finActivite)) {
                    errAccu.push(j);
                }

            }

            //Si aucun cas de chevauchement dans les activités
            if (errAccu.length == 0) {
                //On ajoute l'activité au json au jour correspondant
                dataparse[index]['activity'].push({ activityName: activiteChoisie, activityStart: debutActivite, activityEnd: finActivite });

                // on ferme la fenêtre
                modal.style.display = "none";

                jsonTimetable=dataparse
                //On supprime dans la base de donnée pour ajouter sa nouvelle version après modification
                deleteTimeTableFromId(getCookie('id'),jsonTimetable);
                ajoutJSON();
            }

            //Si chevauchement 2 possibilités
            // - On supprime la/les activité(s) pour ajouter la nouvelle
            // - On supprime la nouvelle activité
            else {

                modal.style.display = "none"
                modalErr.style.display = "block"

                var btnDeleteOld = document.getElementById("btnDeleteOld")
                if (errAccu.length == 1) {
                    btnDeleteOld.textContent = "Delete old activity : " + dataparse[index]['activity'][errAccu[0]]['activityName'];
                }
                if (errAccu.length > 1) {
                    btnDeleteOld.textContent = "Delete old activities : " + dataparse[index]['activity'][errAccu[0]]['activityName'];
                    for (let k = 1; k < errAccu.length; k++) {
                        btnDeleteOld.textContent += " / " + dataparse[index]['activity'][errAccu[k]]['activityName']
                    }
                }

                var btnDeleteNew = document.getElementById("btnDeleteNew")

                //Si appuie sur le bouton deleteOld on supprime la/les ancienne(s) activité(s) et on ajoute la nouvelle
                btnDeleteOld.onclick = function () {
                    if (errAccu.length == 1) {
                        dataparse[index]['activity'].splice(errAccu[0], 1)
                    }
                    if (errAccu.length > 1) {
                        for (let k = 0; k < errAccu.length; k++) {
                            dataparse[index]['activity'].splice(errAccu[0], 1)
                        }
                    }
                    dataparse[index]['activity'].push({ activityName: activiteChoisie, activityStart: debutActivite, activityEnd: finActivite })
                    modalErr.style.display = 'none'

                    jsonTimetable=dataparse

                    //On supprime dans la base de donnée pour ajouter sa nouvelle version après modification
                    deleteTimeTableFromId(getCookie('id'),jsonTimetable);
                    ajoutJSON();
                }

                //Si on appuie sur deleteNew on n'ajoute simplement pas l'activité
                btnDeleteNew.onclick = function () {
                    modalErr.style.display = 'none'

                    jsonTimetable=dataparse

                    //On supprime dans la base de donnée pour ajouter sa nouvelle version après modification
                    deleteTimeTableFromId(getCookie('id'),jsonTimetable);
                    ajoutJSON();
                }
            }
        }

        //Message d'erreur
        else {
            alert("Please choose consistent times")
        }

        //Message d'erreur
    }
    else {
        alert('Please fill in all the information before validating');
    }
}
