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

            // ecrit dans la case ce que l'utilisateur a entrer
            console.log(Q1, Q2);
            id_ = parseInt(id);
            Q2_ = parseInt(Q2);

            for (i = 0; i < Q2_; i++) {
                i_ = i.toString();
                Id = id_ + i;
                console.log(Id);
                document.getElementById(Id).textContent = Q1;
            }

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