const div_disciplina = document.createElement("div");
div_disciplina.className = "div-disciplina";
div_disciplina.id = "div-disciplina";
listadisc = [];
//carrega as informações da disciplinas pressionada, onde discnum é o número dela na listadisc
async function loadDiasDisciplina(discnum){
    div_disciplina.innerHTML = listadisc[discnum].nome_disc; //Colocar o HTML de como tem que ficar o container da matéria
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Press me';
    button.id = 'btn-styled';
    divs = document.getElementsByClassName("conteudo_materia");
    divs[0].replaceChildren(div_disciplina,button);
    //Gerando lista de aulas da disciplina
    let response = await fetch("http://54.94.139.104:3000/aulas/" + listadisc[discnum].COD_DISC,{
        method: "GET"});
    let listaaulas = await response.json();
    console.log(listaaulas);
    //window.location.href = "paginaChamada.html" + '?' + listaulas[0].COD_AULA + "," + listaulas[0].fk_Disciplina_COD_DISC + "," + data.cod;
    return;
}


async function LoadPage(){
    let variable =  location.search.substring(1);
    let v = variable.split(",");
    /* v[0] é cod professor
    */
   //puxa as relações de ministra das quais o professor participa
    let response = await fetch("http://54.94.139.104:3000/ministra/" + v[0],{
        method: "GET"});
    let ministra = await response.json();
    //puxa as disciplinas e separa as que o professor ministra
    response = await fetch("http://54.94.139.104:3000/disciplinas");
    let disciplinas = await response.json();
    for(let i=0; i< ministra.quantidade; i++){
        for ( j = 0 ; j < disciplinas.quantidade; j++){
            if( disciplinas.disciplinas[j].COD_DISC == ministra.ministra[i].fk_Disciplina_COD_DISC){
                listadisc.push(disciplinas.disciplinas[j]);
                break;
            }
        } 
    }
    //gera os elementos de botão das disciplinas
    let discbuttons = [];
    let sidemenu = document.getElementById("listadisc");
    for (let i=0;i<listadisc.length;i++){
        discbuttons.push(document.createElement("li"));
        discbuttons[i].setAttribute("onclick","loadDiasDisciplina(" + i + ")");
        discbuttons[i].setAttribute("class","disciplina-button");
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = listadisc[i].nome_disc;
        discbuttons[i].appendChild(a);
        sidemenu.appendChild(discbuttons[i]);
    }
    return;
}
/*document.addEventListener('DOMContentLoaded', function() {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Press me';
    button.className = 'btn-styled';
 
    button.onclick = function() {
        // …
    };
 
    var container = document.getElementById('container');
    container.appendChild(button);
}, false);*/