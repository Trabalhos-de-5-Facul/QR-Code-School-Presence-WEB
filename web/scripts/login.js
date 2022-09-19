async function checkLogin() {
  console.log("oi");
  let logindata = document.getElementsByName("login");
  const response = await fetch("http://54.94.139.104:3000/professores/" + 
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
    window.location.href = "paginaChamada.html";
    return(true);
  }

}