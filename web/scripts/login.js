async function checkLogin() {
  let logindata = document.getElementsByName("login");
  var response = await fetch("http://54.94.139.104:3000/professores/" + 
  logindata[1].value + '/' + 
  logindata[0].value, {
    method: "GET",
  });
  const data = await response.json();
  if(!response.ok){
    alert(data.erro);
    return(false);
  }
  else{
    //puxar as aulas
     response = await fetch("http://54.94.139.104:3000/aulas");
     let rd = await response.json();
     const listaulas = [];
     for (let i=0;i<rd.quantidade;i++){
       if(rd.aulas[i].fk_Professores_COD_PROF == data.cod){
         listaulas.push(rd.aulas[i]);
       }
    }
    console.log(listaulas[0]);
    window.location.href = "paginaChamada.html" + '?' + listaulas[0].COD_AULA + "," + listaulas[0].fk_Disciplina_COD_DISC + "," + data.cod;
    return(true);
  }

}