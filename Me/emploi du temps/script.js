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
    saveTimeTable(data);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function readjson(J) {

    // console.log(J);
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


function weather(latitude,longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timeformat=unixtime&past_days=7&forecast_days=7`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      });
  }

function actuWeather(json){

}


weather()
.then((response) => {
    console.log(response);
    actuWeather(response)
  // Utilisez la réponse ici
})
.catch((error) => {
  console.log(error);
  console.log("Weather Error");
  // Gérez les erreurs ici
});
