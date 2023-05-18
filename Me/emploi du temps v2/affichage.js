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
var planning = document.getElementById("planning");
planning.style.height=planningSize+"px";
planning.style.width=planningSize+"px";
planning.style.display="block"

function drawPlanning(){
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
            console.log(jour['jour'])
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
}