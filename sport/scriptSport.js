function generateMeteo(){
    var divMeteo=document.getElementById("wantMeteo")
    var ville = document.createElement('p');
    var villeContent = document.createTextNode("Enter the city in which you are going to play sports");
    ville.appendChild(villeContent);
    divMeteo.appendChild(ville);
    var villeInput = document.createElement('input');
    villeInput.setAttribute("type","text");
    villeInput.setAttribute("id","villeARecuperer");
    divMeteo.appendChild(villeInput);
    var generate = document.createElement('input');
    generate.setAttribute("type","button");
    generate.setAttribute("value","View weather");
    generate.setAttribute("onclick","viewMeteo()");
    divMeteo.appendChild(generate);
}

function viewMeteo(){
    var body=document.getElementById("body")
    var afficheMeteo=document.getElementById("afficheMeteo")
    afficheMeteo.remove();
    afficheMeteo = document.createElement('div');
    afficheMeteo.setAttribute("id","afficheMeteo");
    body.appendChild(afficheMeteo);

    let ville=document.getElementById("villeARecuperer").value;
    let appid = '5dd4a3cfb9e347e4e1b4e7fd61fe21dd';

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville +'&appid='+ appid + '&lang=fr&units=metric';
    
    let requete = new XMLHttpRequest();
    
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();
    
    requete.onload = function() {
            if (requete.readyState == XMLHttpRequest.DONE) {    
                if (requete.status === 200) {
                    var temp = document.createElement('p');
                    var tempContent = document.createTextNode(requete.response.main.temp);
                    temp.appendChild(tempContent);
                    afficheMeteo.appendChild(temp);
                    var description = document.createElement('p');
                    let descriptionText=requete.response.weather[0].icon;
                    switch (descriptionText) {
                        case '10d':
                            var descriptionContent = document.createTextNode("Light or moderate rain");
                            break;
                        case '04d':
                            var descriptionContent = document.createTextNode("Cloudy");
                            break;
                        case '03d':
                            var descriptionContent = document.createTextNode("Partly cloudy");
                            break;
                        case '01d':
                            var descriptionContent = document.createTextNode("Clear sky");
                            break;
                        default:
                            var descriptionContent = document.createTextNode("");
                            console.log("PAS OK",descriptionText)
                            break;
                    }
                    description.appendChild(descriptionContent);
                    afficheMeteo.appendChild(description);
                    var photo = document.createElement('img');
                    photo.setAttribute("src",'https://openweathermap.org/img/wn/'+requete.response.weather[0].icon+'@2x.png');
                    afficheMeteo.appendChild(photo);
                }    
                else {
                    alert('Un problème est intervenu, merci de ressaisir une nouvelle ville ou revenir plus tard.');
                }    
            }    
            
        }    
}
