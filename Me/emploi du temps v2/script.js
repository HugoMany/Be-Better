//On récupère les données de l'emploie du temps dans la base de donnée
//var jsonTimetable=getTimeTableFromId(getCookie('id'));
var jsonTimetable=[]
//Si la donnée n'existe pas on crée un tableau
if(jsonTimetable==undefined){
    jsonTimetable=[]
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
var divPlanning=document.getElementById("planning");

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
    modal.style.display = "block";
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

        //On vérifie si l'utilisateur a entré toutes les infos
        if (jourChoisi != "" && activiteChoisie != "" && heureDebutChoisie != "" && minuteDebutChoisie != "" && heureFinChoisie != "" && minuteFinChoisie != "") {
            //On va vérifier si les heures sont cohérentes 
            var debutActivite = heureDebutChoisie + minuteDebutChoisie;
            var finActivite = heureFinChoisie + minuteFinChoisie;
            if (finActivite > debutActivite) {

                var errPresence = 0;

                //On vérifie si le jour est déjà présent dans le json
                for (let i in jsonTimetable) {
                    if (jsonTimetable[i]["day"] == jourChoisi) {
                        var index = i;
                        errPresence += 1;
                    }
                }

                //S'il n'est pas présent on peut l'ajouter
                if (errPresence == 0) {
                    jsonTimetable.push({ day: jourChoisi, activity: [] })
                }

                //On cherche l'index du jour correspondant
                if (index == undefined) {
                    index = jsonTimetable.length - 1;
                }

                //On cherche les erreurs de chevauchement dans le planning
                var errAccu = [];
                for (let j in jsonTimetable[index]['activity']) {
                    var hd = jsonTimetable[index]['activity'][j]['activityStart']
                    var hf = jsonTimetable[index]['activity'][j]['activityEnd']

                    //3 cas de chevauchements d'activités
                    if ((debutActivite >= hd && debutActivite < hf) || (finActivite > hd && finActivite <= hf)||(hd>=debutActivite && hf<=finActivite)) {
                        errAccu.push(j);
                    }

                }

                //Si aucun cas de chevauchement dans les activités
                if (errAccu.length == 0) {
                    //On ajoute l'activité au json au jour correspondant
                    jsonTimetable[index]['activity'].push({ activityName: activiteChoisie, activityStart: debutActivite, activityEnd: finActivite });

                    // on ferme la fenêtre
                    modal.style.display = "none";

                    //On supprime dans la base de donnée pour ajouter sa nouvelle version après modification
                    //deleteTimeTableFromId(getCookie('id'),JSON.stringify(jsonTimetable));
                    //divPlanning.remove();
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
                        btnDeleteOld.textContent = "Delete old activity : " + jsonTimetable[index]['activity'][errAccu[0]]['activityName'];
                    }
                    if (errAccu.length > 1) {
                        btnDeleteOld.textContent = "Delete old activities : " + jsonTimetable[index]['activity'][errAccu[0]]['activityName'];
                        for (let k = 1; k < errAccu.length; k++) {
                            btnDeleteOld.textContent += " / " + jsonTimetable[index]['activity'][errAccu[k]]['activityName']
                        }
                    }

                    var btnDeleteNew = document.getElementById("btnDeleteNew")

                    //Si appuie sur le bouton deleteOld on supprime la/les ancienne(s) activité(s) et on ajoute la nouvelle
                    btnDeleteOld.onclick = function () {
                        if (errAccu.length == 1) {
                            jsonTimetable[index]['activity'].splice(errAccu[0], 1)
                        }
                        if (errAccu.length > 1) {
                            for (let k = 0; k < errAccu.length; k++) {
                                jsonTimetable[index]['activity'].splice(errAccu[0], 1)
                            }
                        }
                        jsonTimetable[index]['activity'].push({ activityName: activiteChoisie, activityStart: debutActivite, activityEnd: finActivite })
                        modalErr.style.display = 'none'

                        //On supprime dans la base de donnée pour ajouter sa nouvelle version après modification
                        //deleteTimeTableFromId(getCookie('id'),JSON.stringify(jsonTimetable));
                        //divPlanning.remove();
                        ajoutJSON();
                    }

                    //Si on appuie sur deleteNew on n'ajoute simplement pas l'activité
                    btnDeleteNew.onclick = function () {
                        modalErr.style.display = 'none'

                        //On supprime dans la base de donnée pour ajouter sa nouvelle version après modification
                        //deleteTimeTableFromId(getCookie('id'),JSON.stringify(jsonTimetable));
                        //divPlanning.remove();
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
}


//On remplit les jours dans leur ordre dans la question1
document.getElementById("day01").innerHTML = currDate.format("dddd");
document.getElementById("day02").innerHTML = datePlus1.format("dddd");
document.getElementById("day03").innerHTML = datePlus2.format("dddd");
document.getElementById("day04").innerHTML = datePlus3.format("dddd");
document.getElementById("day05").innerHTML = datePlus4.format("dddd");
document.getElementById("day06").innerHTML = datePlus5.format("dddd");
document.getElementById("day07").innerHTML = datePlus6.format("dddd");

//On remplit la valeur de chaque date sous un format précis
document.getElementById("day01").value = currDate.format("DDMMYYYY");
document.getElementById("day02").value = datePlus1.format("DDMMYYYY");
document.getElementById("day03").value = datePlus2.format("DDMMYYYY");
document.getElementById("day04").value = datePlus3.format("DDMMYYYY");
document.getElementById("day05").value = datePlus4.format("DDMMYYYY");
document.getElementById("day06").value = datePlus5.format("DDMMYYYY");
document.getElementById("day07").value = datePlus6.format("DDMMYYYY");


function delActivity(){
    //On affiche le modal
    modalSupp.style.display = "block";
    //Fermeture du modal si appuie sur la croix
    var close2 = document.getElementById("close2");
    close2.onclick = function () {
        modalSupp.style.display = "none";
    }

    btnSupp=document.getElementById("btnSupp");
    //Quand on appuie sur le bouton supprimer on récupère le jour pour lequel on veut supprimer une activite
    btnSupp.onclick=function(){
        var jourChoisiSupp = document.getElementById("Q01").value;
        var index2=null;
        for(let i in jsonTimetable){
            if(jsonTimetable[i]['day']==jourChoisiSupp){
                index2=i;
            }
        }

        //S'il n'y a aucune activité pour le jour choisi on fait apparaitre une alerte
        var jourCorrespondant=jsonTimetable[index2];
        if(jourCorrespondant==undefined){
            alert('Please choose a day with activities');   
        }

        //S'il y a des activités alors on peut les récuperer
        else{
            var allActivite=jourCorrespondant['activity']
            modalSuppContent=document.getElementById("modalSuppContent");

            //On fait apparaitre un nouveau formulaire pour que l'utilisateur choisisse quelle activité il veut supprimer
            var activityTitle=document.createElement('h3')
            var activityTitleContent = document.createTextNode("Choisir activite a supprimer");
            activityTitle.appendChild(activityTitleContent)
            modalSuppContent.appendChild(activityTitle)

            var activitySuppChoix=document.createElement('select')
            activitySuppChoix.setAttribute("id", "Q02");
            activitySuppChoix.setAttribute("class", "select");
            modalSuppContent.appendChild(activitySuppChoix)

            var defaultOption=document.createElement('option');
            var defaultOptionContent = document.createTextNode("--Please choose an activity--");
            defaultOption.setAttribute("value","")
            defaultOption.appendChild(defaultOptionContent);
            activitySuppChoix.appendChild(defaultOption);

            for(let k=0;k<allActivite.length;k++){
                var option=document.createElement('option');
                option.setAttribute("value",k)
                var optionContent=document.createTextNode(allActivite[k]['activityName']+" ("+allActivite[k]['activityStart']+"-"+allActivite[k]['activityEnd']+")")
                option.appendChild(optionContent);
                activitySuppChoix.appendChild(option);
            }

            var btnSuppActivity=document.createElement('button');
            btnSuppActivity.setAttribute("type","submit");
            btnSuppActivity.setAttribute("class","btn_btn-primary");
            btnSuppActivity.setAttribute("id","btnSuppActivity");
            var btnSuppActivityContent = document.createTextNode("Delete activity");
            btnSuppActivity.appendChild(btnSuppActivityContent);
            modalSuppContent.appendChild(btnSuppActivity);

            //Si l'utilisateur appuie sur la croix on supprime le nouveau formulaire et on ferme la page
            close2.onclick = function () {
                activitySuppChoix.remove();
                activityTitle.remove()
                btnSuppActivity.remove();
                modalSupp.style.display="none";
            }
            
            //Si l'utilisateur appuie sur le bouton supprimer alors on enlève l'activité de la liste et on ferme la page en supprimant 
            //le nouveau formulaire
            btnSuppActivity.onclick=function(){

                if(activitySuppChoix.value==""){
                    alert("Please select the activity to be deleted")
                }
                else{
                    activiteASupp=document.getElementById("Q02").value
                    allActivite.splice(activiteASupp,1);
                    //Si suite à la suppression de l'activité il n'y en a plus dans le jour on supprime le jour du json
                    if(allActivite.length==0){
                        jsonTimetable.splice(index2,1)
                    }
                    activitySuppChoix.remove();
                    activityTitle.remove()
                    btnSuppActivity.remove();
                    modalSupp.style.display="none";

                    //On supprime dans la base de donnée pour ajouter sa nouvelle version après modification
                    //deleteTimeTableFromId(getCookie('id'),JSON.stringify(jsonTimetable));
                    //divPlanning.remove();
                    ajoutJSON();  
                }
            }
        }
    }
}

