/*-------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------DECLARATION DES CLASSES JS--------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------*/

class Tableau {
    constructor(tab, X, Y) {
        this.tab = tab;
        this.X = X;
        this.Y = Y;
    }
}

class CaseJour {
    constructor(posX, posY, jour, meteo) {
        this.posX = posX;
        this.posY = posY;
        this.jour = jour;
        this.meteo = meteo;
    }
}

class CaseHeure {
    constructor(posX, posY, heure) {
        this.posX = posX;
        this.posY = posY;
        this.heure = heure;
    }
}

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

var table=undefined
const tailleTabHauteur = 13;
const tailleTabLargeur = 8;
const tailleTabHauteur2 = 12;
const tailleTabLargeur2 = 1;
var array = [];
var array2 = [];


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
                if (x == 0 && y != 0) {
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
                if (x != 0 && y == 0) {
    
                    array[x][y] = new CaseJour(x, y, moment().add(x - 1, 'days'));
                }
            }
            else {
                array2 = []
                array[x][y] = new Tableau(array2, tailleTabLargeur2, tailleTabHauteur2);
    
                for (let x2 = 0; x2 < tailleTabLargeur2; x2++) {
                    array2[x2] = [];
                    for (let y2 = 0; y2 < tailleTabHauteur2; y2++) {
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
    
    return(tableauPlanning)
}


/*-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------AJOUT DES DONNES DU JSON DANS LE TABLEAU----------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------*/


setTimeout(ajoutJSON, 300);

function ajoutJSON() {
    var tableauPlanning=createTableau(tailleTabHauteur,tailleTabLargeur,tailleTabHauteur2,tailleTabLargeur2,array,array2)
    for (let i in jsonTimetable) {
        for (let j = 1; j < tailleTabLargeur; j++) {
            if (jsonTimetable[i]['day'] == tableauPlanning.tab[j][0]['jour'].format("DDMMYYYY")) {
                for (let k in jsonTimetable[i]['activity']) {
                    var heureActD = jsonTimetable[i]['activity'][k]['activityStart'].substr(0, 2)
                    var indiceHD=getHour(heureActD);
                    var minuteActD = jsonTimetable[i]['activity'][k]['activityStart'].substr(2, 2)
                    var indiceMD=getMinute(minuteActD);
                    tableauPlanning.tab[j][indiceHD].tab[0][indiceMD]['activite']=jsonTimetable[i]['activity'][k]['activityName']
                    var heureActF = jsonTimetable[i]['activity'][k]['activityEnd'].substr(0, 2)
                    var indiceHF=getHour(heureActF);
                    var minuteActF = jsonTimetable[i]['activity'][k]['activityEnd'].substr(2, 2)
                    var indiceMF=getMinute(minuteActF);
                    while(indiceHD.toString()+indiceMD.toString()!=indiceHF.toString()+indiceMF.toString()){
                        indiceMD+=1
                        if(indiceMD==12){
                            indiceMD=0;
                            indiceHD+=1
                        }
                        tableauPlanning.tab[j][indiceHD].tab[0][indiceMD]['activite']=jsonTimetable[i]['activity'][k]['activityName']
                    }
                    tableauPlanning.tab[j][indiceHF].tab[0][indiceMF]['activite']=undefined;
                }
            }
        }
    }
    table = tableauPlanning
    drawPlanning()
}


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


const planningSize = 700;
const tailleCaseHauteur = planningSize / tailleTabHauteur;
const tailleCaseLargeur = planningSize / tailleTabLargeur;
const tailleCaseHauteur2 = tailleCaseHauteur / tailleTabHauteur2;
const tailleCaseLargeur2 = tailleCaseLargeur / tailleTabLargeur2;
// planning.style.height=planningSize+"px";
// planning.style.width=planningSize+"px";
// planning.style.display="block"

function drawPlanning(){
    var planning = document.getElementById("planning");
    if(planning==undefined){
    }
    else{
        planning.remove();
    }
    var planning=document.createElement("div");
    planning.setAttribute("id","planning");
    planning.style.height=planningSize+"px";
    planning.style.width=planningSize+"px";
    planning.style.display="block"
    document.getElementById("body").appendChild(planning)
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
        heureAff.style.top=tailleCaseHauteur*i+"px";
    }

    for(let i in table.tab){
        var jour=table.tab[i][0];
        if(jour!=undefined){
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
            jourAff.style.left=tailleCaseLargeur*i+"px";
            jourAff.style.height=tailleCaseHauteur+"px";
            jourAff.style.width=tailleCaseLargeur+"px";
        }
    }

    for(let x=1;x<tailleTabLargeur;x++){
        for(let y=1;y<tailleTabHauteur;y++){

            for(let y1=0;y1<tailleTabHauteur2;y1++){

                var actPresence=table.tab[x][y].tab[0][y1];
                if(actPresence['activite']!=undefined){
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
                        while(table.tab[x][indiceY].tab[0][indiceY1]['activite']==actPresence['activite']){
                            indiceY1+=1;
                            if(indiceY1==12){
                                indiceY1=0;
                                indiceY+=1;
                            }
                            actHauteur+=tailleCaseHauteur2;
                        }
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

    mvtPlanning()
}

const modalModif=document.getElementById("myModalModif");
const modalEdit=document.getElementById("myModalEdit");

function mvtPlanning(){

    var close3 = document.getElementById("close3");
    close3.onclick = function () {
        modalModif.style.display = "none";

        document.getElementById("dayContent").innerHTML="Day : "
        document.getElementById("hdContent").innerHTML="Start time : "
        document.getElementById("hfContent").innerHTML="End time : "
        document.getElementById("nameContent").innerHTML="Activity name : "
    }

    planning.addEventListener("click", function(e){
        if(e.target.className=="activityAff"){
            var dayAct=e.target.id.substr(0,8);
            var hdAct=e.target.id.substr(8,4);
            var hfAct=e.target.id.substr(12,4);
            var nameAct=e.target.id.substr(16,e.target.id.length-16)
            document.getElementById("dayContent").innerHTML+=moment(dayAct,"DDMMYYYY").format('dddd');
            document.getElementById("hdContent").innerHTML+=e.target.id.substr(8,2)+"h"+e.target.id.substr(10,2)+"min";
            document.getElementById("hfContent").innerHTML+=e.target.id.substr(12,2)+"h"+e.target.id.substr(14,2)+"min";
            document.getElementById("nameContent").innerHTML+=nameAct;
            modalModif.style.display="block"
            
            btnEdit=document.getElementById("btnEdit")
            btnEdit.onclick=function(){
                editActivity(dayAct,hdAct,hfAct,nameAct);
            };

            btnDelete=document.getElementById("btnDelete");
            btnDelete.onclick=function(){
                delActivity(dayAct,hdAct,hfAct,nameAct);
            };
        }

    })
}

function editActivity(day,hd,hf,name){
    modalModif.style.display="none"

    modalEdit.style.display="block"
    var close4 = document.getElementById("close4");
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

    var btnEdit2=document.getElementById("btnEdit2");
    btnEdit2.onclick = function () {
        var activiteChoisie = document.getElementById("Q02").value;
        var jourChoisi = document.getElementById("Q01").value
        var heureDebutChoisie = document.getElementById("Q03").value;
        var minuteDebutChoisie = document.getElementById("Q04").value;
        var heureFinChoisie = document.getElementById("Q05").value;
        var minuteFinChoisie = document.getElementById("Q06").value;

        modalEdit.style.display="none";

        delActivity(day,hd,hf,name);
        addToPlanning(activiteChoisie, jourChoisi, heureDebutChoisie, minuteDebutChoisie, heureFinChoisie, minuteFinChoisie);

        document.getElementById("Q01").value=day;
        document.getElementById("Q03").value=hd.substr(0,2);
        document.getElementById("Q04").value=hd.substr(2,2);
        document.getElementById("Q05").value=hf.substr(0,2);
        document.getElementById("Q06").value=hf.substr(2,2);
    }
}

function delActivity(day,hd,hf,name){
    for(let i in jsonTimetable){
        if(jsonTimetable[i]['day']==day){
            var allActivite=jsonTimetable[i]['activity'];
            for(let j in allActivite){
                if(jsonTimetable[i]['activity'][j]['activityName']==name && jsonTimetable[i]['activity'][j]['activityStart']==hd && jsonTimetable[i]['activity'][j]['activityEnd']==hf){
                    jsonTimetable[i]['activity'].splice(j,1);
                                        
                    //Si suite à la suppression de l'activité il n'y en a plus dans le jour on supprime le jour du json                        
                    if (allActivite.length == 0) {
                        jsonTimetable.splice(i, 1)
                    }
                }
            }
        }
    }
    
    modalModif.style.display="none"
    document.getElementById("dayContent").innerHTML="Day : "
    document.getElementById("hdContent").innerHTML="Start time : "
    document.getElementById("hfContent").innerHTML="End time : "
    document.getElementById("nameContent").innerHTML="Activity name : "

    //On supprime dans la base de donnée pour ajouter sa nouvelle version après modification
    //deleteTimeTableFromId(getCookie('id'),JSON.stringify(jsonTimetable));
    ajoutJSON();
}