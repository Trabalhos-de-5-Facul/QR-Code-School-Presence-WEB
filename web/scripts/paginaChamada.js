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

async function LoadClass(){
  let variable =  location.search.substring(1);
  let v = variable.split(",")
  console.log(v);
  /* v[0] é cod aula;
     v[1] é cod disc 
     v[2] é cod professor
     */
  linkdisciplinas = document.getElementsByName("linkdisciplinas");
  linkdisciplinas[0].href = linkdisciplinas[0].href + "?" + v[2];
  //puxar as matriculas da disciplina
  response = await fetch("http://54.94.139.104:3000/matricula");
  let rd = await response.json();
  const listmatr = [];
  for (let i=0;i<rd.quantidade;i++){
    if(rd.matricula[i].fk_Disciplina_COD_DISC == v[1]){
      listmatr.push(rd.matricula[i]);
    }
 }
 //puxar alunos e separar os que estão matriculados na disciplina
 response = await fetch("http://54.94.139.104:3000/alunos");
  rd = await response.json();
  const listalunos = [];
  for(let j = 0; j < listmatr.length; j++){
    for (let i=0;i<rd.quantidade;i++){
      if(rd.alunos[i].RA == listmatr[j].fk_Alunos_RA){
        listalunos.push(rd.alunos[i]);
      }
    }
  }
  console.log(listalunos);
  listalunos[1] = {
    RA:10,
    email_aluno
    : 
    "jao@gmail.com",
    nome_aluno
    : 
    "joao",
    senha_aluno
    : 
    "1234"}
    listalunos[2] = {
      RA:10,
      email_aluno
      : 
      "jao@gmail.com",
      nome_aluno
      : 
      "joao",
      senha_aluno
      : 
      "1234"}
  GenerateStudentList(listalunos)
}

function GenerateStudentList(listalunos){
  let elementosalunos = []
  let listas = document.getElementsByClassName("list");
  for(let i=0; i<listalunos.length; i++){
    elementosalunos.push(document.createElement("div"));
    elementosalunos[i].className = "list-item";
    elementosalunos[i].setAttribute("name",listalunos[i].RA);
    elementosalunos[i].innerHTML = listalunos[i].nome_aluno;
    listas[i%2].appendChild(elementosalunos[i])
  }
}