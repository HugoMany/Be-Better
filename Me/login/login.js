
async function login() {
    const email = document.getElementById("emailLogin").value;
    const passw = document.getElementById("passwordLogin").value;
    console.log("Email : " + email + " Pass :" + passw);
    const url = `http://localhost:3000/api/user/login`;

    let xhr = new XMLHttpRequest();
    let user = {
        email: email,
        passw: passw
    };

    // Définir l'URL de destination de la requête POST

    // Envoyer la requête POST avec fetch
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then( response => {
            if (response.ok) {
                // La réponse est un succès
                return  response.json();
            } else {
                // Gérer les erreurs de réponse
                throw new Error("Erreur de requête");
            }
        })
        .then(data => {
            // Traiter les données de réponse JSON
            if(data){
                alert("Connected") ;
                deleteCookie("id");
                setCookie("id",data["_id"],7);

            }
            else {
                alert("Retry")
                deleteCookie("id");

            }

        })
        .catch(error => {
            // Gérer les erreurs de réseau
            console.log(error)
        });

}