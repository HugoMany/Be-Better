function strongForNumber(){
    // Sélectionnez l'élément HTML contenant le texte
    var element = document.getElementById("resultats");
    var texte = element.innerHTML;

    // Utilisez une expression régulière pour trouver tous les chiffres dans le texte
    var chiffres = texte.match(/\d+/g);

    // Parcourez tous les chiffres trouvés et ajoutez des balises <strong> autour d'eux
    for (var i = 0; i < chiffres.length; i++) {
        texte = texte.replace(chiffres[i], '<strong>' + chiffres[i] + '</strong>');
    }

    // Remplacez le contenu de l'élément HTML par le texte modifié
    element.innerHTML = texte;
}