async function checkLogin() {
  console.log("oi");
  let logindata = document.getElementsByName("login");
  var response = await fetch("http://54.94.139.104:3000/professores/" + 
  logindata[1].value + '/' + 
  logindata[0].value, {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);
  if(!response.ok){
    alert(data.erro);
    return(false);
  }
  else{
    // response = await fetch("http://54.94.139.104:3000/aulas");
    // let rd = await response.json();
    // console.log(rd);
    // const listaulas = [];
    // console.log(rd[0]);
    // for (let i=0;i<rd.quantidade;i++){
    //   console.log(rd.aulas[i].fk_Professores_COD_PROF);
    //   if(rd.aulas[i].fk_Professores_COD_PROF == data.cod){
    //     listaulas.push(rd.aulas[i]);
    //   }
    // }
    // console.log(listaulas);
    // response = await fetch("http://54.94.139.104:3000/matricula");
    // let dados = await response.json();
    // console.log(dados);
    // const listdisciplinas = [];
    
    

    window.location.href = "paginaChamada.html";
    return(true);
  }

}