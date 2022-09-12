//Função de Teste de Requisição para a API
var showing = false;
async function getJogos() {
  const response = await fetch("http://54.94.139.104:3000/jogos", {
    method: "GET",
  });

  const data = await response.json();
  console.log(data);
}

function removeElement(id) {
  var elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}
var interval;
const qrcode = document.createElement("div");
qrcode.className = "qrcode";
qrcode.id = "qrcode";
function generateQRCode(){
  if(!showing){
    let D = new Date();
    let t = D.getTime();
    console.log(t);
   
    new QRCode(document.getElementById("qrcode"), "{COD_AULA: 312451,inicio_aula: 314145, fim_aula: 2153413, timestamp_atual:" + t + "}");
    generatetime = t;
    showing = true;
  // Atualiza o qrcode a cada 10 segundos  
  interval = setInterval(RefreshQRCode,10000);

  }
  else{
    //para de atualizar
    clearInterval(interval);
    var filhos = document.getElementById("qrcode").childNodes;
    for(let i = 0;i<2;i++){
      document.getElementById("qrcode").removeChild(filhos[0]);
    }
    showing = false;
    return;
  }
}

function RefreshQRCode(){
  var filhos = document.getElementById("qrcode").childNodes;
    for(let i = 0;i<2;i++){
      document.getElementById("qrcode").removeChild(filhos[0]);
    }
    showing = false;
    let D = new Date();
    let t = D.getTime();
    console.log(t);
   
    new QRCode(document.getElementById("qrcode"), "{COD_AULA: 312451,inicio_aula: 314145, fim_aula: 2153413, timestamp_atual:" + t + "}");
    generatetime = t;
    showing = true;
    
}