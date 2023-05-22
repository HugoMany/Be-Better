/*-------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------DECLARATION DES CLASSES JS--------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------*/

//classe qui va servir a créer le tableau qui va contenir toutes les infos prend en paramètre un tableau et sa taille
class Tableau {
    constructor(tab, X, Y) {
        this.tab = tab;
        this.X = X;
        this.Y = Y;
    }
}

//classe CaseJour qui va être utilisée pour les cases du tableau indiquant le jour : prend en paramètre la position x et y, le jour et 
//la météo
class CaseJour {
    constructor(posX, posY, jour, meteo) {
        this.posX = posX;
        this.posY = posY;
        this.jour = jour;
        this.meteo = meteo;
    }
}

//classe CaseHeure qui va être utilisée pour les cases du tableau indiquant les heures : prend en paramètre la position x et y ainsi que
//l'heure
class CaseHeure {
    constructor(posX, posY, heure) {
        this.posX = posX;
        this.posY = posY;
        this.heure = heure;
    }
}

//classe CaseMinute qui va être utilisée pour toutes les autres cases du tableau : prend en paramètre la position x et y ainsi que la 
//minute et le nom de l'activité
class CaseMinute {
    constructor(posX, posY, minute, activite) {
        this.posX = posX;
        this.posY = posY;
        this.minute = minute;
        this.activite = activite;
    }
}

/*-------------------------------------------------------------------------------------------------------------------------------------
---------------------------------CONSTRUCTION DU TABLEAU QUI VA CONTENIR LES DONNEES DE L'EMPLOIE DU TEMPS-----------------------------
-------------------------------------------------------------------------------------------------------------------------------------*/

//variable table qui va contenir le tableau final
var table=undefined

//varirables array, tailleTabHauteur et tailleTabLargeur qui vont servir à créer le grand tableau
var array = [];
const tailleTabHauteur = 13;
const tailleTabLargeur = 8;

//variables array2, tailleTabHauteur2 et tailleTabLargeur2 qui vont servir à créer un tableau pour chaque case du tableau pour pouvoir
//insérer des cases minutes
var array2 = [];
const tailleTabHauteur2 = 12;
const tailleTabLargeur2 = 1;




//fontion qui va permettre de créer un tableau vierge d'activité mais pouvant accuillir le jsonTimetable
function createTableau(tailleTabHauteur,tailleTabLargeur,tailleTabHauteur2,tailleTabLargeur2,array,array2){

    //On crée une nouvelle instance de la classe tableau
    var tableauPlanning = new Tableau(array, tailleTabLargeur, tailleTabHauteur)

    //On va parcourir le tableau et on va différencier trois types de cases :
    // -les cases pour lesquelles x=0 sont les cases qui vont indiquer les heures
    // -les cases pour lesquelles y=0 sont les cases qui vont indiquer les jours
    // -les autres cases qui vont elles-mêmes contenir des tableaux pour les minutes
    for (let x = 0; x < tailleTabLargeur; x++) {
        array[x] = [];
        for (let y = 0; y < tailleTabHauteur; y++) {
            if (x == 0 || y == 0) {
                //Si x=0 et y!=0 alors les cases sont des CaseHeure
                if (x == 0 && y != 0) {
                    //On utilise un switch case sur y pour définir le paramètre heure pour la création de nouvelle instance de la 
                    //classe CaseHeure :
                    //Ex si y=1 heure=08 ou si y=5 heure=12
                    switch (y) {
                        case 1:
                            array[x][y] = new CaseHeure(x, y, "08");
                            break;
                        case 2:
                            array[x][y] = new CaseHeure(x, y, "09");
                            break;
                        case 3:
                            array[x][y] = new CaseHeure(x, y, "10");
                            break;
                        case 4:
                            array[x][y] = new CaseHeure(x, y, "11");
                            break;
                        case 5:
                            array[x][y] = new CaseHeure(x, y, "12");
                            break;
                        case 6:
                            array[x][y] = new CaseHeure(x, y, "13");
                            break;
                        case 7:
                            array[x][y] = new CaseHeure(x, y, "14");
                            break;
                        case 8:
                            array[x][y] = new CaseHeure(x, y, "15");
                            break;
                        case 9:
                            array[x][y] = new CaseHeure(x, y, "16");
                            break;
                        case 10:
                            array[x][y] = new CaseHeure(x, y, "17");
                            break;
                        case 11:
                            array[x][y] = new CaseHeure(x, y, "18");
                            break;
                        case 12:
                            array[x][y] = new CaseHeure(x, y, "19");
                            break;
                        default:
                            array[x][y] = new CaseHeure(x, y, "0");
                            break;
    
                    }
                }
                //Si x!0 et y=0 alors on crée une nouvelle instance de la classe CaseJour avec comme paramètre jour la création d'un
                //moment en rajoutant des jours par rapport à la valeur de x
                if (x != 0 && y == 0) {
    
                    array[x][y] = new CaseJour(x, y, moment().add(x - 1, 'days'));
                }
            }
            //Pour chaque autres cases on va créer une nouvelle instance de la classe Tableau de paramètre array2, tailleTabLargeur2 et 
            //tailleTabHauteur2
            else {
                array2 = []
                array[x][y] = new Tableau(array2, tailleTabLargeur2, tailleTabHauteur2);
                
                //On va parcourir chaques cases du nouveau tableau créé dans lesquelles on va créer une nouvelle instance de la 
                //classe  CaseMinute
                for (let x2 = 0; x2 < tailleTabLargeur2; x2++) {
                    array2[x2] = [];
                    for (let y2 = 0; y2 < tailleTabHauteur2; y2++) {
                        //On utilise un switch case sur y2 pour pouvoir donner le paramètre minute :
                        //Ex si y2=0 on associe a minute la valeur de l'heure correspondant à la case minute + 00
                        //ou si y2=6 on associe a minute la valeur de l'heure correspondant à la case minute + 30
                        switch (y2) {
                            case 0:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "00", undefined);
                                break;
                            case 1:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "05", undefined);
                                break;
                            case 2:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "10", undefined);
                                break;
                            case 3:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "15", undefined);
                                break;
                            case 4:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "20", undefined);
                                break;
                            case 5:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "25", undefined);
                                break;
                            case 6:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "30", undefined);
                                break;
                            case 7:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "35", undefined);
                                break;
                            case 8:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "40", undefined);
                                break;
                            case 9:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "45", undefined);
                                break;
                            case 10:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "50", undefined);
                                break;
                            case 11:
                                array2[x2][y2] = new CaseMinute(x2, y2, tableauPlanning.tab[0][y].heure + "55", undefined);
                                break;
                            default:
                                array2[x2][y2] = new CaseMinute(x, y, tableauPlanning.tab[0][y].heure + "0", undefined);
                                break;
                        }
                    }
                }
            }
        }
    } 
    //On retourne le tableau vierge
    return(tableauPlanning)
}


/*-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------AJOUT DES DONNES DU JSON DANS LE TABLEAU----------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------*/

//On utilise seTimeout pour créer un temporisation sur la fonction ajoutJSON pour pouvoir récupérer le jsonTimetable
setTimeout(ajoutJSON, 300);

//Fonction ajoutJSON qui va utiliser la fonction createTableau pour récupérer un tableau vide et y ajouter les activités du jsonTimetable
function ajoutJSON() {
    var dataparse=jsonTimetable;
    //On utilise la fonction createTableau pour récupérer un tableau vierge et on le stock dans la variable tableauPlanning
    var tableauPlanning=createTableau(tailleTabHauteur,tailleTabLargeur,tailleTabHauteur2,tailleTabLargeur2,array,array2);
    //On parcoure le jsonTimetable et le tableauPlanning et si on voit un jour du json qui est présent dans le tableau ça signifie qu'on
    //peut ajouter les activités de ce jour du json dans le tableau
    for (let i in dataparse) {
        for (let j = 1; j < tailleTabLargeur; j++) {
            if (dataparse[i]['day'] == tableauPlanning.tab[j][0]['jour'].format("DDMMYYYY")) {
                //Pour chacune des activités présentent on va :
                for (let k in dataparse[i]['activity']) {
                    //Récupérer l'heure de début d'activité
                    var heureActD = dataparse[i]['activity'][k]['activityStart'].substr(0, 2)
                    //Grâce à cette heure on va utiliser la fonction getHour définie en dessous qui va récupérer l'indice correspondant
                    //à cette heure pour le tableau
                    var indiceHD=getHour(heureActD);
                    //On récupère la minute de début d'activité
                    var minuteActD = dataparse[i]['activity'][k]['activityStart'].substr(2, 2)
                    //Grâce à cette minute on va utiliser la fonction getMinute définie en dessous qui va récupérer l'indice correspondant
                    //à cette heure pour le tableau
                    var indiceMD=getMinute(minuteActD);
                    //On se rend à la case du tableau correspondant aux indices obtenus et on ajoute le nom de l'activité à cette case
                    tableauPlanning.tab[j][indiceHD].tab[0][indiceMD]['activite']=dataparse[i]['activity'][k]['activityName']
                    //On fait pareil pour l'heure et la minute de fin
                    var heureActF = dataparse[i]['activity'][k]['activityEnd'].substr(0, 2)
                    var indiceHF=getHour(heureActF);
                    var minuteActF = dataparse[i]['activity'][k]['activityEnd'].substr(2, 2)
                    var indiceMF=getMinute(minuteActF);
                    
                    //On va parcourir chaque case du tableau entre les indices de l'heure de début et les indices de l'heure de fin et 
                    //pour chacune des cases on va ajouter le nom de l'activité
                    while(indiceHD.toString()+indiceMD.toString()!=indiceHF.toString()+indiceMF.toString()){
                        indiceMD+=1
                        if(indiceMD==12){
                            indiceMD=0;
                            indiceHD+=1
                        }
                        tableauPlanning.tab[j][indiceHD].tab[0][indiceMD]['activite']=dataparse[i]['activity'][k]['activityName']
                    }
                    tableauPlanning.tab[j][indiceHF].tab[0][indiceMF]['activite']=undefined;
                }
            }
        }
    }

    //On stock le tableau fini dans la varirable table
    table = tableauPlanning

    //Utilisation de la fonction drawPlanning pour l'affichage sur l'écran
    drawPlanning()
}

//Fonction getHour qui va permettre de récupèrer l'indice correspondant dans le tableau à l'heure mis en paramètre grâce à un switch case
function getHour(heure){
    switch (heure) {
        case '08':
            var indiceH = 1;
            break;
        case '09':
            var indiceH = 2;
            break;
        case '10':
            var indiceH = 3;
            break;
        case '11':
            var indiceH = 4;
            break;
        case '12':
            var indiceH = 5;
            break;
        case '13':
            var indiceH = 6;
            break;
        case '14':
            var indiceH = 7;
            break;
        case '15':
            var indiceH = 8;
            break;
        case '16':
            var indiceH = 9;
            break;
        case '17':
            var indiceH = 10;
            break;
        case '18':
            var indiceH = 11;
            break;
        case '19':
            var indiceH = 12;
            break;
        default:
            var indiceH=0;
            break;
    }
    return(indiceH)
}

//Fonction getMinute qui va permettre de récupèrer l'indice correspondant dans le tableau à l'heure mis en paramètre grâce à un switch case
function getMinute(minute){
    switch (minute) {
        case '00':
            var indiceM = 0;
            break;
        case '05':
            var indiceM = 1;
            break;
        case '10':
            var indiceM = 2;
            break;
        case '15':
            var indiceM = 3;
            break;
        case '20':
            var indiceM = 4;
            break;
        case '25':
            var indiceM = 5;
            break;
        case '30':
            var indiceM = 6;
            break;
        case '35':
            var indiceM = 7;
            break;
        case '40':
            var indiceM = 8;
            break;
        case '45':
            var indiceM = 9;
            break;
        case '50':
            var indiceM = 10;
            break;
        case '55':
            var indiceM = 11;
            break;
        default:
            var indiceM=0;
            break;
    }
    return(indiceM)
}

/*-------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------AFFICHAGE------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------*/

//Variable qui définie les différentes tailles des tableaux et des cases pour l'affichage
const planningSize = 1000;
const tailleCaseHauteur = planningSize / tailleTabHauteur;
const tailleCaseLargeur = planningSize / tailleTabLargeur;
const tailleCaseHauteur2 = tailleCaseHauteur / tailleTabHauteur2;
const tailleCaseLargeur2 = tailleCaseLargeur / tailleTabLargeur2;

//Fonction qui est appelé dans ajoutJSON pour avoir un aperçu visuel du planning
function drawPlanning(){
    //On récupère l'élément avec un id=planning dans la page html
    var planning = document.getElementById("planning");
    //Si cet élément n'existe pas on fait rien
    if(planning==undefined){
    }
    //S'il existe on le supprime
    else{
        planning.remove();
    }
    //On crée exactement le même élément
    var planning=document.createElement("div");
    planning.setAttribute("id","planning");
    planning.style.height=planningSize+"px";
    planning.style.width=planningSize+"px";
    planning.style.display="block"
    document.getElementById("body").appendChild(planning)
    //On parcoure table.tab[0] qui va enfaite nous donner les heures et on va les afficher
    for(let i in table.tab[0]){
        var heureAff=document.createElement('div');
        heureAff.setAttribute("id",table.tab[0][i]['heure']+"h");
        var heureAffContent = document.createTextNode(table.tab[0][i]['heure']+"h");
        heureAff.appendChild(heureAffContent);
        planning.appendChild(heureAff);
        heureAff.style.display="block";
        heureAff.style.height=tailleCaseHauteur+"px";
        heureAff.style.width=tailleCaseLargeur+"px";
        heureAff.style.position="absolute";
        heureAff.style.lef="0px";
        //On définit la position de la div par la taille de la case multiplié par l'indice
        heureAff.style.top=tailleCaseHauteur*i+"px";
    }
    
    //On parcoure table.tab qui va enfaite nous donner les jours et on va les afficher   
    for(let i in table.tab){
        var jour=table.tab[i][0];
        if(jour!=undefined){
            //On récupère toutes les infos à afficher tel que le jour, la date et la météo
            var jourAff=document.createElement('div');
            jourAff.setAttribute("id","jour"+i);
            var jourAffName=document.createElement('p');
            jourAffName.setAttribute("id","jourName"+i)
            var jourAffNameContent=document.createTextNode(jour['jour'].format('dddd'))
            jourAffName.appendChild(jourAffNameContent);
            var jourAffDate=document.createElement("p");
            jourAffDate.setAttribute("id","jourDate"+i);
            var jourAffDateContent=document.createTextNode(jour['jour'].format("DD")+"/"+jour['jour'].format("MM")+"/"+jour['jour'].format("YYYY"))
            jourAffDate.appendChild(jourAffDateContent);
            var jourAffMeteo=document.createElement("p");
            jourAffMeteo.setAttribute("id","jourMeteo"+i);
            var jourAffMeteoContent=document.createTextNode(jour['meteo']);
            jourAffMeteo.appendChild(jourAffMeteoContent);
            jourAff.appendChild(jourAffName);
            //jourAff.appendChild(jourAffDate);
            //jourAff.appendChild(jourAffMeteo);
            planning.appendChild(jourAff);
            jourAff.style.display="block";
            jourAff.style.position="absolute";
            jourAff.style.top="0px";
            //On définit la position de la div par la taille de la case multiplié par l'indice
            jourAff.style.left=tailleCaseLargeur*i+"px";
            jourAff.style.height=tailleCaseHauteur+"px";
            jourAff.style.width=tailleCaseLargeur+"px";
        }
    }

    //On parcoure les autres cases du tableau
    for(let x=1;x<tailleTabLargeur;x++){
        for(let y=1;y<tailleTabHauteur;y++){
            for(let y1=0;y1<tailleTabHauteur2;y1++){

                var actPresence=table.tab[x][y].tab[0][y1];
                //Si la case parcourue contient une activité 
                if(actPresence['activite']!=undefined){
                    //On va regarder si cette activtité est la même que celle d'avant
                    var memeAct=0;
                    if(y1>0){
                        if(table.tab[x][y].tab[0][y1-1]['activite']==actPresence['activite']){
                            memeAct=1;
                        }
                    }
                    if(y1==0 && y!=1){
                        if(table.tab[x][y-1].tab[0][11]['activite']==actPresence['activite']){
                            memeAct=1;
                        }
                    }
                    //Si c'est le début de l'activité alors on crée un div contenant toutes les infos nécessaires
                    if(memeAct==0){
                        var activityAff=document.createElement("div");
                        activityAff.setAttribute("class","activityAff");
                        activityAff.style.position="absolute";
                        activityAff.style.display="block"
                        activityAff.style.left=tailleCaseLargeur*x+"px"
                        activityAff.style.top=tailleCaseHauteur*y+tailleCaseHauteur2*y1+"px";
                        activityAff.style.width=tailleCaseLargeur+"px";
                        let indiceY=y;
                        let indiceY1=y1;
                        let actHauteur=tailleCaseHauteur2

                        //On cherche la fin de l'activité et à chaque nouvelle case contenant la même activité on incrémente actHauteur 
                        //de tailleCaseHauteur2
                        while(table.tab[x][indiceY].tab[0][indiceY1]['activite']==actPresence['activite']){
                            indiceY1+=1;
                            if(indiceY1==12){
                                indiceY1=0;
                                indiceY+=1;
                            }
                            actHauteur+=tailleCaseHauteur2;
                        }
                        //On définit la hauteur de la div comme étant actHauteur comme ça on obtient une div correspondant à la bonne 
                        //hauteur par rapport à la durée de l'activité
                        activityAff.style.height=actHauteur+"px";
                        activityAff.style.border="1px solid #888"
                        activityAffContent=document.createTextNode(actPresence['activite']);
                        activityAff.setAttribute("activityName",actPresence['activite']);
                        activityAff.setAttribute("id",table.tab[x][0]['jour'].format("DDMMYYYY")+actPresence['minute']+table.tab[x][indiceY].tab[0][indiceY1]['minute']+actPresence['activite'])
                        activityAff.appendChild(activityAffContent);
                        planning.appendChild(activityAff);                        
                    }
                }    
            }
        }
    }
    //On appelle la fonction mvtPlanning définit plus bas pour gérer les différents évenements click dans le planning
    mvtPlanning()
}

const modalModif=document.getElementById("myModalModif");
const modalEdit=document.getElementById("myModalEdit");

//On définit la fonction mvtPlanning qui va gérer les clicks dans le planning
function mvtPlanning(){
    //Si on appuie sur la croix la page va se fermer et on réinitialise les données dans le modal
    var close3 = document.getElementById("close3");
    close3.onclick = function () {
        modalModif.style.display = "none";

        document.getElementById("dayContent").innerHTML="Day : "
        document.getElementById("hdContent").innerHTML="Start time : "
        document.getElementById("hfContent").innerHTML="End time : "
        document.getElementById("nameContent").innerHTML="Activity name : "
    }

    //On crée un addEventListener sur les clicks sur le planning
    planning.addEventListener("click", function(e){
        //Si le click est sur une activité alors on récupère toutes les infos sur l'activités qui sont passés en id pour ensuite les 
        //afficher dans le modal
        if(e.target.className=="activityAff"){
            var dayAct=e.target.id.substr(0,8);
            var hdAct=e.target.id.substr(8,4);
            var hfAct=e.target.id.substr(12,4);
            var nameAct=e.target.id.substr(16,e.target.id.length-16)
            document.getElementById("dayContent").innerHTML+=moment(dayAct,"DDMMYYYY").format('dddd');
            document.getElementById("hdContent").innerHTML+=e.target.id.substr(8,2)+"h"+e.target.id.substr(10,2);
            document.getElementById("hfContent").innerHTML+=e.target.id.substr(12,2)+"h"+e.target.id.substr(14,2);
            document.getElementById("nameContent").innerHTML+=nameAct;
            modalModif.style.display="block"
            
            //Bouton edit qui va lancer la fonction editActivity si il est appuyé
            btnEdit=document.getElementById("btnEdit")
            btnEdit.onclick=function(){
                editActivity(dayAct,hdAct,hfAct,nameAct);
            };

            //Bouton delete qui va lancer la fonction delActivity si il est appuyé
            btnDelete=document.getElementById("btnDelete");
            btnDelete.onclick=function(){
                delActivity(dayAct,hdAct,hfAct,nameAct);
            };
        }

    })
}

//Fonction editActivity qui va donner à l'utilisateur la possibilité de modifier les infos sur l'activité et prend en paramètre le jour,
//l'heure de début et de fin ainsi que le nom de l'activité
function editActivity(day,hd,hf,name){
    //On ferme le modalModif
    modalModif.style.display="none"
    //On ouvre le modalEdit
    modalEdit.style.display="block"
    var close4 = document.getElementById("close4");
    //Si on appuie sur la croix la page va se fermer et on réinitialise les données dans le modal
    close4.onclick = function () {
        modalEdit.style.display = "none";

        document.getElementById("dayContent").innerHTML="Day : "
        document.getElementById("hdContent").innerHTML="Start time : "
        document.getElementById("hfContent").innerHTML="End time : "
        document.getElementById("nameContent").innerHTML="Activity name : "
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

    //On remplit les valeurs par défault comme étant les valeurs actuelles du l'activité
    document.getElementById("daySelect").innerHTML=moment(day,"DDMMYYYY").format('dddd');
    document.getElementById("daySelect").value=day;
    document.getElementById("Q02").value=name
    document.getElementById("hdSelect").innerHTML=hd.substr(0,2)+"h";
    document.getElementById("hdSelect").value=hd.substr(0,2);
    document.getElementById("mdSelect").innerHTML=hd.substr(2,2)+"min";
    document.getElementById("mdSelect").value=hd.substr(2,2);
    document.getElementById("hfSelect").innerHTML=hf.substr(0,2)+"h";
    document.getElementById("hfSelect").value=hf.substr(0,2);
    document.getElementById("mfSelect").innerHTML=hf.substr(2,2)+"min";
    document.getElementById("mfSelect").value=hf.substr(2,2);

    //A l'appuie sur le bouton edit on récupère les infos changé ou non par l'utilisateur 
    var btnEdit2=document.getElementById("btnEdit2");
    btnEdit2.onclick = function () {
        var activiteChoisie = document.getElementById("Q02").value;
        var jourChoisi = document.getElementById("Q01").value
        var heureDebutChoisie = document.getElementById("Q03").value;
        var minuteDebutChoisie = document.getElementById("Q04").value;
        var heureFinChoisie = document.getElementById("Q05").value;
        var minuteFinChoisie = document.getElementById("Q06").value;

        //On ferme le modalEdit
        modalEdit.style.display="none";

        //On supprime l'activité et on la remplace par l'ancienne
        delActivity(day,hd,hf,name);
        addToPlanning(activiteChoisie, jourChoisi, heureDebutChoisie, minuteDebutChoisie, heureFinChoisie, minuteFinChoisie);

        //On réinitialise les valeurs du questionnaire
        document.getElementById("Q01").value=day;
        document.getElementById("Q03").value=hd.substr(0,2);
        document.getElementById("Q04").value=hd.substr(2,2);
        document.getElementById("Q05").value=hf.substr(0,2);
        document.getElementById("Q06").value=hf.substr(2,2);
    }
}

//Fonction qui va supprimer une activité et prend en paramètre le jour, l'heure de début et de fin ainsi que le nom de l'activité
function delActivity(day,hd,hf,name){
    var dataparse=jsonTimetable
    //On parcoure le json
    for(let i in dataparse){
        //On trouve le jour correspondant à day dans le json
        if(dataparse[i]['day']==day){
            //On parcoure l'ensemble des activités
            var allActivite=dataparse[i]['activity'];
            //On trouve l'activité correspondante au nom et aux heures entrés en paramètres
            for(let j in allActivite){
                if(dataparse[i]['activity'][j]['activityName']==name && dataparse[i]['activity'][j]['activityStart']==hd && dataparse[i]['activity'][j]['activityEnd']==hf){
                    //On supprime l'activité correspondante du json
                    dataparse[i]['activity'].splice(j,1);
                                        
                    //Si suite à la suppression de l'activité il n'y en a plus dans le jour on supprime le jour du json                        
                    if (allActivite.length == 0) {
                        dataparse.splice(i, 1)
                    }
                }
            }
        }
    }
    //jsonTimetable=JSON.stringify(dataparse);
    //On réinitialise le modal
    modalModif.style.display="none"
    document.getElementById("dayContent").innerHTML="Day : "
    document.getElementById("hdContent").innerHTML="Start time : "
    document.getElementById("hfContent").innerHTML="End time : "
    document.getElementById("nameContent").innerHTML="Activity name : "

    jsonTimetable=dataparse
    //On supprime dans la base de donnée pour ajouter sa nouvelle version après modification
    deleteTimeTableFromId(getCookie('id'),jsonTimetable);
    ajoutJSON();
}