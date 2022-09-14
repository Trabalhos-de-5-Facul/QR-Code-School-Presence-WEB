const div_disciplina = document.createElement("div");
div_disciplina.className = "div-disciplina";
div_disciplina.id = "div-disciplina";
function loadDiasDisciplina(disciplina){
    div_disciplina.innerHTML = disciplina; //Colocar o HTML de como tem que ficar o container da matéria
    divs = document.getElementsByClassName("conteudo_materia");
    divs[0].appendChild(div_disciplina);
}