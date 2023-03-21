// pemet d'avoir toutes les cases du tableau 
const cells = document.querySelectorAll('#timetable td');
var modal = document.getElementById("myModal");
// on met un EventListener sur chacune des cases du tableau
cells.forEach(cell => {

    cell.addEventListener('click', () => {

        // on récupère l'id du td de la cellule
        var id = cell.id;
        console.log(id);


        modal.style.display = "block";
        var btn = document.getElementById("btn");

        btn.onclick = function () {
            const Q1 = document.getElementById("Q1").value;
            const Q2 = document.getElementById("Q2").value;
            const Q3 = document.getElementById("Q3").value;

            // ecrit dans la case ce que l'utilisateur a entrer
            console.log(Q1, Q2, Q3);
            id_ = parseInt(id);
            Q2_ = parseInt(Q2);

            for (i = 0; i < Q2_; i++) {
                i_ = i.toString();
                Id = id_ + i;
                console.log(Id);
                document.getElementById(Id).textContent = Q1;
                if (Q3 == 1) {
                    document.getElementById(Id).style.backgroundColor = "green"
                }
                if (Q3 == 2) {
                    document.getElementById(Id).style.backgroundColor = "orange"
                }
                if (Q3 == 3) {
                    document.getElementById(Id).style.backgroundColor = "crimson"
                }
            }
            json();
            //cell.textContent = Q1;
            document.getElementById("Q1").value = '';
            document.getElementById("Q2").value = '1h';

            // on ferme la fenêtre
            modal.style.display = "none";

        }
    });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// creeune connection avec une base de donnee MySQL
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'test'
// }); 


function json(){
    data = [];
    for(let i = 0;i<10;i++){
        for (let j = 1;j<7;j++){
            id=j*10+i;
            data_ = document.getElementById(id).innerHTML;
            data.push({"case":id, "data": data_});
        }
    }
    data=JSON.stringify(data);
    console.log(data);
}

