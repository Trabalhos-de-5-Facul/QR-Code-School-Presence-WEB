//carrega as informações da disciplinas pressionada, onde discnum é o número dela na listadisc

async function LoadHeader(cod){
    let response = await fetch(url.professores + cod);
    let professordata = await response.json();
    let headerinfo = document.getElementsByClassName("info");
    headerinfo[0].innerHTML = professordata.professor[0].nome_prof;
    headerinfo[1].innerHTML = professordata.professor[0].COD_PROF;
    
    return;
}