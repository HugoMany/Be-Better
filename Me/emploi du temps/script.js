// pemet d'avoir toutes les cases du tableau 
const cells = document.querySelectorAll('#timetable td');

// on met un EventListener sur chacune des cases du tableau
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        // demande à l'utilisateur ce qu'il veut mettre des la case sur laquelle il a cliqué
        const value = prompt('what do you want to do :');

        // ecrit dans la case ce que l'utilisateur a entrer
        cell.textContent = value;
    });
});
