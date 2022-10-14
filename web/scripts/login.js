
function LoadPage(){
  document.cookie = "token=false";
}

async function checkLogin() {
  let logindata = document.getElementsByName("login");
  var response = await fetch(
    url.professores + logindata[1].value + "/" + logindata[0].value,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    alert(data.erro);
    return false;
  } else {
    
    //puxar as aulas
    response = await fetch(url.aulas);
    let rd = await response.json();
    const listaulas = [];
    for (let i = 0; i < rd.quantidade; i++) {
      if (rd.aulas[i].fk_Professores_COD_PROF == data.cod) {
        listaulas.push(rd.aulas[i]);
      }
    }
    let aulaselect = null;
    let d = new Date();
    listaulas.forEach(element => {
      if (element.inicio_aula < d.getTime() && d.getTime() < element.fim_aula){
        aulaselect = element;
      }
      
    });
    if(aulaselect != null){
    console.log(listaulas[0]);
    document.cookie ="token="+"";
    document.cookie = "codaula=" + ""; 
    document.cookie = "coddisc=" + "";
    document.cookie = "codprof=" + "";
    document.cookie = "token=true";
    document.cookie = "codaula=" + aulaselect.COD_AULA; 
    document.cookie = "coddisc=" + aulaselect.fk_Disciplina_COD_DISC ;
    document.cookie = "codprof=" +data.cod;
    window.location.href ="paginaChamada.html";
    return true;
  }
  else{
    document.cookie ="token="+"";
    document.cookie = "codaula=" + ""; 
    document.cookie = "coddisc=" + "";
    document.cookie = "codprof=" + "";
    document.cookie = "token=true";
    document.cookie = "codaula=" + "null"; 
    document.cookie = "coddisc=" + "null" ;
    document.cookie = "codprof=" +data.cod;
    window.location.href = "paginaDisciplinas.html";
    return true;
  }
  }
}
