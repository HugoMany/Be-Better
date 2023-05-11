 // pemet d'avoir toutes les cases du tableau 
const cells = document.querySelectorAll('#timetable td');
var modal = document.getElementById("myModal");
// on met un EventListener sur chacune des cases du tableau
cells.forEach(cell => {

    cell.addEventListener('click', () => {

        // on récupère l'id du td de la cellule
        var id = cell.id;
        // console.log(id);


        modal.style.display = "block";
        var btn = document.getElementById("btn");
        var supr = document.getElementById("btnDelete");
        var close=document.getElementById("close");

        close.onclick=function(){
            modal.style.display="none"
        }
        // supr.onclick = function(){
        //     document.getElementById(id).textContent = "";
        //     document.getElementById(id).style.backgroundColor = "";
        //     data = json();
        //     modal.style.display = "none";
        // }
        btn.onclick = function () {
            const Q1 = document.getElementById("Q1").value;
            const Q2 = document.getElementById("Q2").value;
            const Q3 = document.getElementById("Q3").value;

            console.log(Q1,Q2,Q3)

            // ecrit dans la case ce que l'utilisateur a entrer
            // console.log(Q1, Q2, Q3);
            id_ = parseInt(id);
            Q2_ = parseInt(Q2);


            for (i = 0; i < Q2_; i++) {
                i_ = i.toString();
                Id = id_ + i_;
                // console.log(Id);
                // document.getElementById(Id).textContent = Q1;
                // if (Q3 == 1) {
                //     document.getElementById(Id).style.backgroundColor = "green"
                // }
                // if (Q3 == 2) {
                //     document.getElementById(Id).style.backgroundColor = "orange"
                // }
                // if (Q3 == 3) {
                //     document.getElementById(Id).style.backgroundColor = "crimson"
                // }
            }
            // data = json();
            // //cell.textContent = Q1;
            // document.getElementById("Q1").value = '';
            // document.getElementById("Q2").value = '1h';

            // // on ferme la fenêtre
            // modal.style.display = "none";

            // readjson(data);

        }
    });
});

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// function json() {
//     data = [];
//     for (let i = 0; i < 10; i++) {
//         for (let j = 1; j <= 7; j++) {
//             id = j * 10 + i;
//             data_ = document.getElementById(id).innerHTML;
//             importance = document.getElementById(id).style.backgroundColor;
//             data.push({ "case": id, "data": data_, "importance": importance });
//         }
//     }
//     data = JSON.stringify(data);
//     console.log(data);
//     saveTimeTable(data);
// }

// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//       currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
//   }

// function readjson(J) {

//     // console.log(J);
//     var data = JSON.parse(J);
//     for (i in data) {
//         if (data[i].data != "") {
//             document.getElementById(data[i].case).textContent = data[i].data
//         }
//         if (data[i].importance != "") {
//             document.getElementById(data[i].case).style.backgroundColor = data[i].importance
//         }
//     }
// }


