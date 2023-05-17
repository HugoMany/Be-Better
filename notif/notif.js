const id =isConnected();

// window.addEventListener('load', function () {
//     const button = document.getElementsByTagName('button')[0];
  
//     button.addEventListener('click', function () {
//       // Si l'utilisateur a permis les notifications
//       // essayons d'envoyer 10 notifications
//       if (window.Notification && Notification.permission === "granted") {
//         let i = 0;
//         // On utilise un intervalle, car certains navigateurs (dont Firefox)
//         // bloquent les notifications s'il y en a trop sur une période
//         // donnée
//         const interval = window.setInterval(function () {
//           // Avec la balise, on ne devrait voir que la notification "Coucou ! 9"
//           const n = new Notification("Salut c Ninho ! " + i, {tag: 'soManyNotification'});
//           if (i++ == 9) {
//             window.clearInterval(interval);
//           }
//         }, 200);
//       }
  
//       // Si l'utilisateur n'a pas encore autorisé ou non
//       // Note : À cause de Chrome, on ne peut pas s'assurer que la propriété permission
//       // est définie et il est donc dangereux de vérifier la valeur "default"
//       else if (window.Notification && Notification.permission !== "denied") {
//         Notification.requestPermission(function (status) {
//           // Si la permission a été accordée
//           if (status === "granted") {
//             var i = 0;
//             // On utilise un intervalle, car certains navigateurs (dont Firefox)
//             // bloquent les notifications s'il y en a trop sur une période
//             // donnée
//             var interval = window.setInterval(function () {
//               // Avec la balise, on ne devrait voir que la notification "Coucou ! 9"
//               const n = new Notification("Coucou ! " + i, {tag: 'soManyNotification'});
//               if (i++ == 9) {
//                 window.clearInterval(interval);
//               }
//             }, 200);
//           }
  
//           // Sinon, on peut utiliser une alerte modale classique
//           else {
//             alert("Coucou !");
//           }
//         });
//       }
  
//       // Si l'utilisateur a refusé les notifications
//       else {
//         // On utilise une alerte modale classique
//         alert("Coucou !");
//       }
//     });
//   });



function envoyerNotification(heuresDeSommeil) {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        function sendNotification() {
          const notification = new Notification("Temps de sommeil insuffisant", {
            body: "Vous avez dormi moins de 8 heures la nuit dernière. Vous devriez faire une sieste de 20 minutes",
          });
        }
        if (heuresDeSommeil < 8) {
          const dateActuelle = new Date();
          const heureActuelle = dateActuelle.getHours();
          if (heureActuelle === 13) {
            sendNotification();
          }
        }
      }
    });
  }
}

async function getSommeil() {
  const url = 'http://localhost:3000/api/user/sleep/'+id;
  const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  };

  try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      var json = JSON.parse(result);
      console.log(json);
      var size_ = json["sleeps"].length;
      var dodo = json["sleeps"][size_ - 1]["value"];
      envoyerNotification(dodo);

  } catch (error) {
      console.error(error);
  }
}
