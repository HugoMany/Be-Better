window.addEventListener('load', function () {
    const button = document.getElementsByTagName('button')[0];
  
    button.addEventListener('click', function () {
      // Si l'utilisateur a permis les notifications
      // essayons d'envoyer 10 notifications
      if (window.Notification && Notification.permission === "granted") {
        let i = 0;
        // On utilise un intervalle, car certains navigateurs (dont Firefox)
        // bloquent les notifications s'il y en a trop sur une période
        // donnée
        const interval = window.setInterval(function () {
          // Avec la balise, on ne devrait voir que la notification "Coucou ! 9"
          const n = new Notification("Salut c Ninho ! " + i, {tag: 'soManyNotification'});
          if (i++ == 9) {
            window.clearInterval(interval);
          }
        }, 200);
      }
  
      // Si l'utilisateur n'a pas encore autorisé ou non
      // Note : À cause de Chrome, on ne peut pas s'assurer que la propriété permission
      // est définie et il est donc dangereux de vérifier la valeur "default"
      else if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
          // Si la permission a été accordée
          if (status === "granted") {
            var i = 0;
            // On utilise un intervalle, car certains navigateurs (dont Firefox)
            // bloquent les notifications s'il y en a trop sur une période
            // donnée
            var interval = window.setInterval(function () {
              // Avec la balise, on ne devrait voir que la notification "Coucou ! 9"
              const n = new Notification("Coucou ! " + i, {tag: 'soManyNotification'});
              if (i++ == 9) {
                window.clearInterval(interval);
              }
            }, 200);
          }
  
          // Sinon, on peut utiliser une alerte modale classique
          else {
            alert("Coucou !");
          }
        });
      }
  
      // Si l'utilisateur a refusé les notifications
      else {
        // On utilise une alerte modale classique
        alert("Coucou !");
      }
    });
  });
  