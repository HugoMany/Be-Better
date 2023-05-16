class Tableau{
    constructor(tab,X,Y) {
        this.tab = tab;
        this.X= X;
        this.Y= Y;
    }  
}

class CaseJour{
    constructor(posX,posY,jour,meteo){
        this.posX = posX;
        this.posY = posY;
        this.jour = jour;
        this.meteo = meteo;
    }
}

class CaseHeure{
    constructor(posX,posY,heure){
        this.posX = posX;
        this.posY = posY;
        this.heure = heure;
    }
}

class CaseMinute{
    constructor(posX,posY,minute,activite){
        this.posX = posX;
        this.posY = posY;
        this.minute = minute;
        this.activite=activite;
    }
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const tailleTabHauteur=13;
const tailleTabLargeur=8;
const tailleTabHauteur2=12;
const tailleTabLargeur2=1;
const canvasSize=700;
var array=[];
var array2=[];
const tailleCaseHauteur = canvasSize/tailleTabHauteur;
const tailleCaseLargeur = canvasSize/tailleTabLargeur;
const tailleCaseHauteur2 = tailleCaseHauteur/tailleTabHauteur2;
const tailleCaseLargeur2 = tailleCaseLargeur/tailleTabLargeur2;
var tableauPlanning = new Tableau(array,tailleTabLargeur,tailleTabHauteur)   

for (let x = 0; x < tailleTabLargeur; x++) {
    array[x]=[];
    for (let y = 0; y < tailleTabHauteur; y++) {
        if (x == 0 || y == 0) {
            if(x==0 && y!=0){
                array[x][y] = new CaseHeure(x, y, 0);  
            }
            if(x!=0 && y==0){
                array[x][y] = new CaseJour(x, y);                
            }
        }
        else {
            array[x][y]=new Tableau(array2,tailleTabLargeur2,tailleTabHauteur2);

            for(let x2=0;x2<tailleTabLargeur2;x2++){
                array2[x2]=[];
                for(let y2=0;y2<tailleTabHauteur2;y2++){
                    array2[x2][y2]=new CaseMinute(x2,y2);
                }
            }
        }
    }
}


