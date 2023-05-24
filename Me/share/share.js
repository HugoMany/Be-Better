// Get the div element and the result container
const div = document.querySelector(".html");
const result = document.querySelector(".result");


UserInfo()
async function UserInfo() {
    url="http://localhost:3000/api/user/oneuser/" + isConnected();
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();

        })
        .then(data => {
            dataToShare(data)
        })
        .catch(error => {
            console.error(error);
            
        });


}
 function dataToShare(json){
    var age = json["age"];
        var name = json["firstName"];
        document.getElementById('age').innerHTML = document.getElementById('age').innerHTML+age
        document.getElementById('name').innerHTML = document.getElementById('name').innerHTML+name
 }

//  document.getElementById("hiddenOnclick").addEventListener(
//     "click",
//     () => {
        
//     },
//     false
//   );
// Function that converts the div to an image
function convert() {
    
    html2canvas(div).then(function (canvas) {
        // Add the canvas element to the result container
        result.appendChild(canvas);
        document.getElementsByTagName("canvas")[1].id="canvasToShare";

        // Get the canvas element and convert it to a data URI
        let cvs = document.querySelector("#canvasToShare");
        let dataURI = cvs.toDataURL("image/jpeg");
        
        // Créez un nouveau fichier Blob à partir du data URI
        let blob = dataURItoBlob(dataURI);

        // Créez un nouvel objet de fichier à partir du Blob
        let file = new File([blob], "progress.jpg", { type: "image/jpeg" });

        // Mettez à jour la variable shareData avec le nouveau fichier
        const shareData = {
            files: [file],
        };
        
        // Log the data URI to the console
        const btn = document.querySelector("#share");
        const resultPara=document.querySelector('#hiddenOnclick')
        resultPara.style.display="none";
        btn.style.visibility="visible";
        // Share must be triggered by "user activation"

         navigator.share(shareData);
        // btn.addEventListener("click", async () => {
        //     try {
                

        //         await navigator.share(shareData);
                
        //         resultPara.textContent = "shared successfully";
        //     } catch (err) {
        //         resultPara.textContent = `Error: ${err}`;
        //     }
        // });
    });

    // Show the result container
    result.style.display = "block";
}

function dataURItoBlob(dataURI) {
    // Supprimez le préfixe "data:image/jpeg;base64," du data URI
    let base64Data = dataURI.replace(/^data:image\/jpeg;base64,/, "");

    // Convertissez le base64 en un tableau d'octets
    let byteCharacters = atob(base64Data);

    // Créez un tableau d'octets
    let byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    // Créez un Blob à partir du tableau d'octets
    let blob = new Blob([new Uint8Array(byteArrays)], { type: "image/jpeg" });

    return blob;
}

