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

        btn.onclick = function () {
            const Q1 = document.getElementById("Q1").value;
            const Q2 = document.getElementById("Q2").value;
            const Q3 = document.getElementById("Q3").value;

            // ecrit dans la case ce que l'utilisateur a entrer
            // console.log(Q1, Q2, Q3);
            id_ = parseInt(id);
            Q2_ = parseInt(Q2);

            for (i = 0; i < Q2_; i++) {
                i_ = i.toString();
                Id = id_ + i;
                // console.log(Id);
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
            data = json();
            //cell.textContent = Q1;
            document.getElementById("Q1").value = '';
            document.getElementById("Q2").value = '1h';

            // on ferme la fenêtre
            modal.style.display = "none";

            readjson(data);

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

function json() {
    data = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 1; j <= 7; j++) {
            id = j * 10 + i;
            data_ = document.getElementById(id).innerHTML;
            importance = document.getElementById(id).style.backgroundColor;
            data.push({ "case": id, "data": data_, "importance": importance });
        }
    }
    data = JSON.stringify(data);
    console.log(data);
    createTimeTable(getId(), data);
}

function readjson(J) {
    // J = '[{"case":10,"data":"s","importance":"green"},{"case":20,"data":"","importance":""},{"case":30,"data":"","importance":""},{"case":40,"data":"","importance":""},{"case":50,"data":"","importance":""},{"case":60,"data":"","importance":""},{"case":70,"data":"","importance":""},{"case":11,"data":"","importance":""},{"case":21,"data":"","importance":""},{"case":31,"data":"fgh","importance":"green"},{"case":41,"data":"","importance":""},{"case":51,"data":"","importance":""},{"case":61,"data":"","importance":""},{"case":71,"data":"","importance":""},{"case":12,"data":"","importance":""},{"case":22,"data":"","importance":""},{"case":32,"data":"fgh","importance":"green"},{"case":42,"data":"","importance":""},{"case":52,"data":"","importance":""},{"case":62,"data":"","importance":""},{"case":72,"data":"","importance":""},{"case":13,"data":"","importance":""},{"case":23,"data":"","importance":""},{"case":33,"data":"fgh","importance":"green"},{"case":43,"data":"","importance":""},{"case":53,"data":"","importance":""},{"case":63,"data":"","importance":""},{"case":73,"data":"","importance":""},{"case":14,"data":"","importance":""},{"case":24,"data":"","importance":""},{"case":34,"data":"","importance":""},{"case":44,"data":"","importance":""},{"case":54,"data":"","importance":""},{"case":64,"data":"","importance":""},{"case":74,"data":"","importance":""},{"case":15,"data":"","importance":""},{"case":25,"data":"","importance":""},{"case":35,"data":"","importance":""},{"case":45,"data":"","importance":""},{"case":55,"data":"","importance":""},{"case":65,"data":"","importance":""},{"case":75,"data":"","importance":""},{"case":16,"data":"","importance":""},{"case":26,"data":"","importance":""},{"case":36,"data":"","importance":""},{"case":46,"data":"","importance":""},{"case":56,"data":"","importance":""},{"case":66,"data":"","importance":""},{"case":76,"data":"","importance":""},{"case":17,"data":"","importance":""},{"case":27,"data":"","importance":""},{"case":37,"data":"","importance":""},{"case":47,"data":"","importance":""},{"case":57,"data":"","importance":""},{"case":67,"data":"","importance":""},{"case":77,"data":"","importance":""},{"case":18,"data":"","importance":""},{"case":28,"data":"","importance":""},{"case":38,"data":"","importance":""},{"case":48,"data":"","importance":""},{"case":58,"data":"","importance":""},{"case":68,"data":"","importance":""},{"case":78,"data":"","importance":""},{"case":19,"data":"","importance":""},{"case":29,"data":"","importance":""},{"case":39,"data":"","importance":""},{"case":49,"data":"","importance":""},{"case":59,"data":"","importance":""},{"case":69,"data":"","importance":""},{"case":79,"data":"","importance":""}]';
    var data = JSON.parse(J);
    for (i in data) {
        if (data[i].data != "") {
            document.getElementById(data[i].case).textContent = data[i].data
        }
        if (data[i].importance != "") {
            document.getElementById(data[i].case).style.backgroundColor = data[i].importance
        }
    }
}

