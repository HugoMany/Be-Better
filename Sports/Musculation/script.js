function generateProgram(){
    const muscularGroup=document.getElementById("muscularGroupSelect").value
    const difficulty=document.getElementById("difficultySelect").value
    const time=document.getElementById("timeSelect").value

    console.log(muscularGroup,difficulty,time)
    window.open('generateProgram.html');
}