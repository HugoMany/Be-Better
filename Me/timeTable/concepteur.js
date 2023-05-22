/*------------------------------------------------------------------------------------------------------
-----------------------------------------CLASS JS-------------------------------------------------------
------------------------------------------------------------------------------------------------------*/

class Tableau{
    constructor(tab,X,Y) {
        this.tab = tab;
        this.X= X;
        this.Y= Y;
    }  
}

class Case{
    constructor(posX,posY,type){
        this.posX = posX;
        this.posY = posY;
        this.type = type;
    }
}

class Voiture{
    // 2 case de largeur
    constructor(tabPosX,tabPosY,direction,id){
        this.tabPosX = [tabPosX];
        this.tabPosY = [tabPosY];
        this.direction = direction;
        this.id = id;
        this.type = "voiture"
    }
}

class Camion{
    // 3 case de largeur
    constructor(tabPosX,tabPosY,direction,id){
        this.tabPosX = [tabPosX];
        this.tabPosY = [tabPosY];
        this.direction = direction;
        this.id = id;
        this.type = "camion";
    }
}

class Player{
    // 2 case de largeur
    constructor(tabPosX,tabPosY,direction,id){
        this.tabPosX = [tabPosX];
        this.tabPosY = [tabPosY];
        this.direction = direction;
        this.id = 1;
        this.type = "player"
    }
}



/*------------------------------------------------------------------------------------------------------
-----------------------------------------VARIABLES GLOBALES---------------------------------------------
------------------------------------------------------------------------------------------------------*/

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let canvasSize=700;
let tailleCase = canvasSize/tailleTab;
let playerHeight = tailleCase;
let playerWidth = tailleCase;
const time = document.timeline.currentTime;
//Position du joueur au debut
let playerX = tailleCase;
let playerY = tailleCase*(Math.round(tailleTab/2)-1);
let X = 0;
let Y = (Math.round(tailleTab/2)-1);
let array=[];
let game = new Tableau(array,tailleTab,tailleTab)  
let id=0; 
let elemSelect;
let posClickX=0;
let posClickY=0;
let posClickTabX=0;
let posClcikTabY=0;
let pos=0;
let intPosClickX=0;
let intPosClickY=0;
let txt="";
let nombreV=1;
let txt3="";
let valueCurseur;

/*------------------------------------------------------------------------------------------------------
-----------------------------------------VARIABLES GLOBALES---------------------------------------------
------------------------------------------------------------------------------------------------------*/

window.addEventListener("mousedown",(e)=>{

    if(e.pageX>canvas.offsetLeft && e.pageX<(canvas.offsetLeft+canvasSize) 
        && e.pageY>canvas.offsetTop && e.pageY<(canvas.offsetTop+canvasSize)){

        //position du click dans le canvas
        posClickX=e.pageX-canvas.offsetLeft;
        posClickY=e.pageY-canvas.offsetTop;

        //position du click dans le tableau
        posClickTabX=(posClickX/tailleCase)-((posClickX/tailleCase)%1);
        posClickTabY=(posClickY/tailleCase)-((posClickY/tailleCase)%1);

        //selection de la case
        elemSelect=game.tab[posClickTabX][posClickTabY].type;
        if(elemSelect!=0 && elemSelect.type!="player"){
            for(let i=0;i<elemSelect.tabPosX[0].length;i++){
                if(posClickTabX==elemSelect.tabPosX[0][i] && posClickTabY==elemSelect.tabPosY[0][i]){
                    pos=i;
                }
            }
        }


        //evenement mouvement
        window.addEventListener("mousemove", handleMouseMove, false);
        window.addEventListener("mouseup", handleMouseUp, false); 
    }

    let elemCamion=[];
    let elemVoiture=[];
    let button=document.getElementById("button");
    txt2="";
    console.debug(e.target);
    if(e.target==button){
        txt += '{"nbVehicule": '+variableRecuperee['nbVehicule']+',"tailleTab": '+tailleTab+',"Vehicule": [{"Direction": 0,"Longueur": 2,"X": [0,1],"Y": ['+(tailleTab-1)/2+','+(tailleTab-1)/2+']},';
        for(let i=1;i<variableRecuperee['nbVehicule'];i++){

            if(variableRecuperee['Vehicule'][i]['Longueur']==2){
                if(variableRecuperee['Vehicule'][i]['Direction']==0){
                    let x=variableRecuperee['Vehicule'][i]['X'][0];
                    let y=variableRecuperee['Vehicule'][i]['Y'][0];
                    txt+='{"Direction": '+0+',"Longueur": 2,"X": ['+x+','+(x+1)+'],"Y": ['+y+','+y+']},';
                }
                if(variableRecuperee['Vehicule'][i]['Direction']==1){
                    let x=variableRecuperee['Vehicule'][i]['X'][0];
                    let y=variableRecuperee['Vehicule'][i]['Y'][0];
                    txt+='{"Direction": '+1+',"Longueur": 2,"X": ['+x+','+x+'],"Y": ['+y+','+(y+1)+']},';
                }
            }
            if(variableRecuperee['Vehicule'][i]['Longueur']==3){
                if(variableRecuperee['Vehicule'][i]['Direction']==0){
                    let x=variableRecuperee['Vehicule'][i]['X'][0];
                    let y=variableRecuperee['Vehicule'][i]['Y'][0];
                    txt+='{"Direction": '+0+',"Longueur": 3,"X": ['+x+','+(x+1)+','+(x+2)+'],"Y": ['+y+','+y+','+y+']},';
                }
                if(variableRecuperee['Vehicule'][i]['Direction']==1){
                    let x=variableRecuperee['Vehicule'][i]['X'][0];
                    let y=variableRecuperee['Vehicule'][i]['Y'][0];
                    txt+='{"Direction": '+1+',"Longueur": 3,"X": ['+x+','+x+','+x+'],"Y": ['+y+','+(y+1)+','+(y+2)+']},';
                }
            }

        }
        let txt2 = txt.slice(0, -1);
        txt2 +=']}';
        console.log(txt2);
        
        txt="";
        txt3=txt2;

        let date = new Date(Date.now() + 86400000); //86400000ms = 1 jour
        date = date.toUTCString();
        document.cookie = 'json='+txt3+'; path=/; expires=' + date;
        console.log(document.cookie)
    }


    let selectionTaille=document.getElementById("taille");
    if(e.target==selectionTaille){
        window.addEventListener("mouseup", handleMouseUp3, false); 
    }


    let clear=document.getElementById("refresh")
    if(e.target==clear){
        nombreV=1;
    }


});


/*Mouvements pour les deux canvas*/
function handleMouseMove(e) {
    if(elemSelect!=0 && elemSelect.type!="player"){

        for (let i = 0; i < elemSelect.tabPosX[0].length; i++) {
            game.tab[elemSelect.tabPosX[0][i]][elemSelect.tabPosY[0][i]].type=0;      
        }
    
        if(e.pageX>canvas.offsetLeft && e.pageX<(canvas.offsetLeft+canvasSize) 
            && e.pageY>canvas.offsetTop && e.pageY<(canvas.offsetTop+canvasSize)){

            intPosClickX=e.pageX-canvas.offsetLeft;
            intPosClickY=e.pageY-canvas.offsetTop;

            let VimgVoiture = document.getElementById("Vvoiture");
            let VimgCamion = document.getElementById("Vcamion");
            let HimgVoiture = document.getElementById("Hvoiture");
            let HimgCamion = document.getElementById("Hcamion");

            let posClickImageX=intPosClickX-(posClickX-elemSelect.tabPosX[0][0]*tailleCase)
            let posClickImageY=intPosClickY-(posClickY-elemSelect.tabPosY[0][0]*tailleCase)

            if(elemSelect.type=="voiture"){
                if(elemSelect.direction=="horizontal"){ 
                    ctx.drawImage(HimgVoiture,posClickImageX,posClickImageY,tailleCase*2,tailleCase)
                }
                if(elemSelect.direction=="vertical"){
                    ctx.drawImage(VimgVoiture,posClickImageX,posClickImageY,tailleCase,tailleCase*2)
                }
            }
            if(elemSelect.type=="camion"){
                if(elemSelect.direction=="horizontal"){
                    ctx.drawImage(HimgCamion,posClickImageX,posClickImageY,tailleCase*3,tailleCase)
                }
                if(elemSelect.direction=="vertical"){
                    ctx.drawImage(VimgCamion,posClickImageX,posClickImageY,tailleCase,tailleCase*3)
                }
            }
        }        
    }


}

/*Mouvements dans le canvas*/



function handleMouseUp(e) {

    //position finale en fonction des pixels
    let newPosClickX=e.pageX-canvas.offsetLeft;
    let newPosClickY=e.pageY-canvas.offsetTop;

    //position finale dans le tableau
    // let newPosClickTabX=(newPosClickX/tailleCase)-((newPosClickX/tailleCase)%1);
    // let newPosClickTabY=(newPosClickY/tailleCase)-((newPosClickY/tailleCase)%1);
    let newPosClickTabX=Math.round(newPosClickX/tailleCase);
    let newPosClickTabY=Math.round(newPosClickY/tailleCase);

    let nbValide=0;

    let arrayX=[];
    let arrayY=[];

    if(elemSelect != 0 && elemSelect.type!="player"){
        arrayX[pos]=newPosClickTabX;
        arrayY[pos]=newPosClickTabY;
        for(let i=0;i<elemSelect.tabPosX[0].length;i++){
            if(elemSelect.direction=="horizontal"){
                arrayY[i]=arrayY[pos];
               if(i>pos){
                    arrayX[i]=newPosClickTabX+(i-pos);
                }
                if(i<pos){
                    arrayX[i]=newPosClickTabX+(i-pos);
                }
            }
            if(elemSelect.direction=="vertical"){
                arrayX[i]=arrayX[pos];
               if(i>pos){
                    arrayY[i]=newPosClickTabY+(i-pos);
                }
                if(i<pos){
                    arrayY[i]=newPosClickTabY+(i-pos);
                }
            }

            } 

        //Conditions limites
        if(elemSelect.direction=="horizontal"){
            if(arrayX[0]<0){
                for(let i=0;i<elemSelect.tabPosX[0].length;i++){
                    arrayX[i]=i
                }
            }
            if(arrayX[elemSelect.tabPosX[0].length-1]>tailleTab-1){
                for(let i=0;i<elemSelect.tabPosX[0].length;i++){
                    arrayX[i]=tailleTab-3+i;
                }
            }
            if(arrayY[0]<0){
                for(let i=0;i<elemSelect.tabPosY[0].length;i++){
                    arrayY[i]=0;
                }            
            }
            if(arrayY[elemSelect.tabPosY[0].length-1]>tailleTab-1){
                for(let i=0;i<elemSelect.tabPosY[0].length;i++){
                    arrayY[i]=tailleTab-1;
                }            
            }
        }

        if(elemSelect.direction=="vertical"){
            if(arrayY[0]<0){
                for(let i=0;i<elemSelect.tabPosY[0].length;i++){
                    arrayY[i]=i
                }
            }
            if(arrayY[elemSelect.tabPosY[0].length-1]>tailleTab-1){
                for(let i=0;i<elemSelect.tabPosY[0].length;i++){
                    arrayY[i]=tailleTab-3+i;
                }
            }
            if(arrayX[0]<0){
                for(let i=0;i<elemSelect.tabPosX[0].length;i++){
                    arrayX[i]=0;
                }            
            }
            if(arrayX[elemSelect.tabPosX[0].length-1]>tailleTab-1){
                for(let i=0;i<elemSelect.tabPosX[0].length;i++){
                    arrayX[i]=tailleTab-1;
                }            
            }
        }


        for(let i=0;i<elemSelect.tabPosX[0].length;i++){
            if(game.tab[arrayX[i]][arrayY[i]].type==0){
                nbValide+=1;
            }
        }

        if(elemSelect.direction=="horizontal" && arrayY[0]==(tailleTab-1)/2){
            nbValide=0;
        }

        if(nbValide==elemSelect.tabPosX[0].length){
            placeObstacle(arrayX[0],arrayY[0],elemSelect.type,elemSelect.direction,elemSelect.id);
            for(let i=1;i<variableRecuperee['nbVehicule'];i++){
                if(variableRecuperee['Vehicule'][i]['X'][0]==elemSelect.tabPosX[0][0] && variableRecuperee['Vehicule'][i]['Y'][0]==elemSelect.tabPosY[0][0]){
                    for(let j=0;j<elemSelect.tabPosX[0].length;j++){
                        variableRecuperee['Vehicule'][i]['X'][j]=arrayX[j];
                        variableRecuperee['Vehicule'][i]['Y'][j]=arrayY[j];                         
                    }
                }
            }     
        }
        if(nbValide>=0 && nbValide<elemSelect.tabPosX[0].length){
            placeObstacle(elemSelect.tabPosX[0][0],elemSelect.tabPosY[0][0],elemSelect.type,elemSelect.direction,elemSelect.id);
        }
    } 
    window.removeEventListener("mousemove", handleMouseMove, false);
    window.removeEventListener("mouseup", handleMouseUp, false);    

}


/*------------------------------------------------------------------------------------------------------
----------------------------FONCTIONS D'AFFICHAGE PREMIER CANVAS-----------------------------------------------
------------------------------------------------------------------------------------------------------*/

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function transpose(){
    let direction;
    let type;
    for (let i=1;i<variableRecuperee['nbVehicule'];i++){
        if(variableRecuperee['Vehicule'][i]['Direction']==0){
            direction="horizontal";
        }
        if(variableRecuperee['Vehicule'][i]['Direction']==1){
            direction="vertical";
        }
        if(variableRecuperee['Vehicule'][i]['Longueur']==2){
            type="voiture";
        }
        if(variableRecuperee['Vehicule'][i]['Longueur']==3){
            type="camion";
        }
        placeObstacle(variableRecuperee['Vehicule'][i]['X'][0],
            variableRecuperee['Vehicule'][i]['Y'][0],type,direction,id);
    }
}

function initGame(){
    for (let x = 0; x < tailleTab; x++) {
        array[x]=[];
        for (let y =0;y<tailleTab;y++){
            array[x][y] = new Case(x,y,0);
        }
    }
    game = new Tableau(array,tailleTab,tailleTab);   
 
}

function drawTab(){

    let VimgPlayer = document.getElementById("Vplayer");
    let VimgVoiture = document.getElementById("Vvoiture");
    let VimgCamion = document.getElementById("Vcamion");
    let HimgPlayer = document.getElementById("Hplayer");
    let HimgVoiture = document.getElementById("Hvoiture");
    let HimgCamion = document.getElementById("Hcamion");

    for (let i = 0; i < tailleTab; i++) {
        for (let y = 0; y < tailleTab; y++){
            if(game.tab[i][y].type.type=="camion"){
                if(game.tab[i][y].type.direction==="horizontal"){
                    ctx.drawImage(HimgCamion,tailleCase*game.tab[i][y].type.tabPosX[0][0],tailleCase*game.tab[i][y].type.tabPosY[0][0],tailleCase*3,tailleCase);
                }
                else if(game.tab[i][y].type.direction==="vertical"){
                    ctx.drawImage(VimgCamion,tailleCase*game.tab[i][y].type.tabPosX[0][0],tailleCase*game.tab[i][y].type.tabPosY[0][0],tailleCase,tailleCase*3);
                }
            }
            if(game.tab[i][y].type.type=="voiture"){
                if(game.tab[i][y].type.direction==="horizontal"){
                    ctx.drawImage(HimgVoiture,tailleCase*game.tab[i][y].type.tabPosX[0][0],tailleCase*game.tab[i][y].type.tabPosY[0][0],tailleCase*2,tailleCase);
                }
                else if(game.tab[i][y].type.direction==="vertical"){
                    ctx.drawImage(VimgVoiture,tailleCase*game.tab[i][y].type.tabPosX[0][0],tailleCase*game.tab[i][y].type.tabPosY[0][0],tailleCase,tailleCase*2);
                }
            }   
            if (game.tab[i][y].type.type =="player"){
                if(game.tab[i][y].type.direction==="horizontal"){
                    ctx.drawImage(HimgPlayer,tailleCase*game.tab[i][y].type.tabPosX[0][0],tailleCase*game.tab[i][y].type.tabPosY[0][0],tailleCase*2,tailleCase);
                }
            }
        }
    }
}  

function startPlayer(){
    game.tab[X][Y].type = new Player([X,X+1],[Y,Y],"est",1);
    game.tab[X+1][Y].type = new Player([X,X+1],[Y,Y],"est",1);
}

// Xobs et Yobs coordonnées de l'obstacle
// Type : chaie de caract
// Orient N,S,E,W
function placeObstacle(X,Y,type,orient,id){
    let Xobs=[];
    let Yobs=[];
    switch (orient) {
        case "horizontal":
            Xobs=[X,X+1,X+2];
            Yobs=[Y,Y,Y];
            break;
        case "vertical":
            Xobs=[X,X,X];
            Yobs=[Y,Y+1,Y+2];
            break;
        default:
            console.debug("Erreur Orient")
            break;
    }
    switch (type) {
        case "player":
            game.tab[Xobs[0]][Yobs[0]].type = new Player([Xobs[0],Xobs[1]],[Yobs[0],Yobs[1]],orient,1);
            game.tab[Xobs[1]][Yobs[1]].type = new Player([Xobs[0],Xobs[1]],[Yobs[0],Yobs[1]],orient,1);
            break;
        case "voiture":
            game.tab[Xobs[0]][Yobs[0]].type = new Voiture([Xobs[0],Xobs[1]],[Yobs[0],Yobs[1]],orient,id);
            game.tab[Xobs[1]][Yobs[1]].type = new Voiture([Xobs[0],Xobs[1]],[Yobs[0],Yobs[1]],orient,id);
            break;
        case "camion":
            game.tab[Xobs[0]][Yobs[0]].type = new Camion([Xobs[0],Xobs[1],Xobs[2]],[Yobs[0],Yobs[1],Yobs[2]],orient,id);
            game.tab[Xobs[1]][Yobs[1]].type = new Camion([Xobs[0],Xobs[1],Xobs[2]],[Yobs[0],Yobs[1],Yobs[2]],orient,id);
            game.tab[Xobs[2]][Yobs[2]].type = new Camion([Xobs[0],Xobs[1],Xobs[2]],[Yobs[0],Yobs[1],Yobs[2]],orient,id);
            break;
        default:
            break;
    }
}


function drawposition() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff";
    let postabx=(playerX/tailleCase);
    let postaby=(playerY/tailleCase);
    return{
        postabx,
        postaby
    }
}

function draw() {
    ctx.clearRect(0,0,canvasSize,canvasSize)
    drawTab();
}


initGame();
if(tailleTab==7){
    placeObstacle(0,3,"player","horizontal",1);
}
if(tailleTab==9){
    placeObstacle(0,4,"player","horizontal",1);
}
if(tailleTab==11){
    placeObstacle(0,5,"player","horizontal",1);
}

transpose();
setInterval(draw, 10);

