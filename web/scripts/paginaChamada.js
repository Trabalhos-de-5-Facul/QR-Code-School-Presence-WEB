//declaração de variaveis
var showing = false;
var interval;

//Função de Teste de Requisição para a API
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
function generateQRCode(){
  if(!showing){
    let D = new Date();
    new QRCode(document.getElementById("qrcode"), JSON.stringify({
      COD_AULA: 312415,
      inicio_aula: 1687513,
      fim_aula:124151251,
      timestamp_atual: D.getTime()
    }));
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