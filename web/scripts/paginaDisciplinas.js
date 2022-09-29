const div_disciplina = document.createElement("div");
div_disciplina.className = "div-disciplina";
div_disciplina.id = "div-disciplina";
listadisc = [];
var v;
async function LoadPage(){
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
     if(ca[0].substring(6) == "true"){
    let variable =  location.search.substring(1);
    v = variable.split(",");
    /* v[0] é cod professor
    */
   //puxa as relações de ministra das quais o professor participa
    let response = await fetch(url.ministra + v[0],{
        method: "GET"});
    let ministra = await response.json();
    //puxa as disciplinas e separa as que o professor ministra
    response = await fetch(url.disciplinas);
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
        discbuttons[i].setAttribute("onclick","LoadDiasDisciplina(" + i + ")");
        discbuttons[i].setAttribute("class","disciplina-button");
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = listadisc[i].nome_disc;
        discbuttons[i].appendChild(a);
        sidemenu.appendChild(discbuttons[i]);
    }
    LoadHeader(v[0]);
    }
    return;
}


async function LoadDiasDisciplina(discnum){
    div_disciplina.innerHTML = listadisc[discnum].nome_disc; //Colocar o HTML de como tem que ficar o container da matéria
    //Gerando lista de aulas da disciplina
    let response = await fetch(url.aulas + listadisc[discnum].COD_DISC,{
        method: "GET"});
    var listaaulas = [];
    let todasaulasdisc = await response.json();
    //Separando as aulas do professor logado
    for(let i=0;i<todasaulasdisc.quantidade;i++){
        if(v[0] == todasaulasdisc.aulas[i].fk_Professores_COD_PROF){
            listaaulas.push(todasaulasdisc.aulas[i]);
        }
    }
    //Gerando os botões
    var buttons =[];
    for(let i=0;i<listaaulas.length;i++){
        buttons[i] = document.createElement('button');
        buttons[i].type = 'button';
        buttons[i].setAttribute("onclick","ChangePage(" + listaaulas[i].COD_AULA + "," +  listaaulas[i].fk_Disciplina_COD_DISC + "," + listaaulas[i].fk_Professores_COD_PROF+")");
        let dia = new Date(listaaulas[i].inicio_aula);
        let mes = dia.getUTCMonth() +1
        buttons[i].innerHTML = dia.getUTCDate() +"/"+ mes;
        buttons[i].className = 'btn-styled';
    }
    divs = document.getElementsByClassName("conteudo_materia");
    //limpando e colocando os botões na tela
    divs[0].replaceChildren(div_disciplina,);
    for(let i=0; i<listaaulas.length; i++){
        divs[0].appendChild(buttons[i]);
    }
    return;
}

//função de mudar página para a página de chamada
function ChangePage(COD_AULA, COD_DISC, cod){
    window.location.href = "paginaChamada.html" + "?" + COD_AULA + "," + COD_DISC + "," + cod;
    return;
}
