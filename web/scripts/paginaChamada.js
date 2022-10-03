//declaração de variaveis
var showing = false;
var interval;
var v = [];
var aula;
function removeElement(id) {
  var elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}
function generateQRCode() {
  if (!showing) {
    console.log(aula);
    let D = new Date();
    new QRCode(
      document.getElementById("qrcode"),
      JSON.stringify({
        COD_AULA: aula.COD_AULA,
        inicio_aula: aula.inicio_aula,
        fim_aula: aula.fim_aula,
        codprof: aula.fk_Professores_COD_PROF,
        COD_DISC: aula.fk_Disciplina_COD_DISC,
        timestamp_atual: D.getTime(),
      })
    );
    
    showing = true;
    // Atualiza o qrcode a cada 10 segundos
    interval = setInterval(RefreshQRCode, 10000);
  } else {
    //para de atualizar
    clearInterval(interval);
    var filhos = document.getElementById("qrcode").childNodes;
    for (let i = 0; i < 2; i++) {
      document.getElementById("qrcode").removeChild(filhos[0]);
    }
    showing = false;
    return;
  }
}

function RefreshQRCode() {
  var filhos = document.getElementById("qrcode").childNodes;
  for (let i = 0; i < 2; i++) {
    document.getElementById("qrcode").removeChild(filhos[0]);
  }
  showing = false;
  let D = new Date();
  let t = D.getTime();

  new QRCode(
    document.getElementById("qrcode"),
    JSON.stringify({
      COD_AULA: aula.COD_AULA,
      inicio_aula: aula.inicio_aula,
      fim_aula: aula.fim_aula,
      codprof: aula.fk_Professores_COD_PROF,
      COD_DISC: aula.fk_Disciplina_COD_DISC,
      timestamp_atual: D.getTime(),
    })
  );
  generatetime = t;
  showing = true;
}

async function LoadClass() {
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  v[0] = ca[1].substring(9);
  v[1] = ca[2].substring(9);
  v[2] = ca[3].substring(9);
  LoadHeader(v[2]);
  //puxar as matriculas da disciplina
  response = await fetch(url.matricula);
  let rd = await response.json();
  const listmatr = [];
  for (let i = 0; i < rd.quantidade; i++) {
    if (rd.matricula[i].fk_Disciplina_COD_DISC == v[1]) {
      listmatr.push(rd.matricula[i]);
    }
  }
  //puxar alunos e separar os que estão matriculados na disciplina
  response = await fetch(url.alunos);
  rd = await response.json();
  const listalunos = [];
  for (let j = 0; j < listmatr.length; j++) {
    for (let i = 0; i < rd.quantidade; i++) {
      if (rd.alunos[i].RA == listmatr[j].fk_Alunos_RA) {
        listalunos.push(rd.alunos[i]);
      }
    }
  }
  listalunos[1] = {
    RA: 10,
    email_aluno: "jao@gmail.com",
    nome_aluno: "joao",
    senha_aluno: "1234",
  };
  listalunos[2] = {
    RA: 10,
    email_aluno: "jao@gmail.com",
    nome_aluno: "joao",
    senha_aluno: "1234",
  };
  GenerateStudentList(listalunos);
  GenerateMensagem(v[1],v[0],v[2]);
}


function GenerateStudentList(listalunos) {
  let elementosalunos = [];
  let listas = document.getElementsByClassName("list");
  for (let i = 0; i < listalunos.length; i++) {
    elementosalunos.push(document.createElement("div"));
    elementosalunos[i].className = "list-item";
    elementosalunos[i].setAttribute("name", listalunos[i].RA);
    elementosalunos[i].innerHTML = listalunos[i].nome_aluno;
    listas[i % 2].appendChild(elementosalunos[i]);
  }
}

async function GenerateMensagem(coddisc,codaula,codprof){
  let response = await fetch(url.professores);
  let professorlist = await response.json();
  let professornome;
  for (let i=0; i<professorlist.quantidade;i++){
    if(professorlist.professores[i].COD_PROF == codprof){
      professornome = professorlist.professores[i].nome_prof;

      break;
    }
  }
  //colocando o nome do professor no bem vindo
  let mensagembv = document.getElementsByName("Welcome");
  mensagembv[0].innerHTML = "Bem Vindo(a), " + professornome;
  //colocando o nome da disciplina no bem vindo
  response = await fetch(url.disciplinas);
  let disclist = await response.json();
  let discnome;
  for(let i = 0; i < disclist.quantidade;i++){
    if(disclist.disciplinas[i].COD_DISC == coddisc){
      discnome = disclist.disciplinas[i].nome_disc;
      break;
    }
  }
  let mensagemdisc = document.getElementsByName("CurrentClass");
  mensagemdisc[0].innerHTML = discnome;

  //buscando as informações da aula
  response = await fetch(url.aulas + coddisc);
  let aulalist = await response.json();
  for(let i=0; i<aulalist.quantidade; i++){
    if(aulalist.aulas[i].COD_AULA == codaula){
      aula = aulalist.aulas[i];
      break;
    }
  }
  let diaini = new Date(aula.inicio_aula);
  let mes = diaini.getUTCMonth() + 1;
  let diaaula = document.getElementsByName("ClassDate");
  diaaula[0].innerHTML = ("0" + diaini.getUTCDate()).slice(-2) + " / " + ("0" + mes).slice(-2);
  let diafim = new Date(aula.fim_aula);
  let horaaula = document.getElementsByName("ClassTime");
  horaaula[0].innerHTML = ("0" + diaini.getUTCHours()).slice(-2) + ":" + ("0" + diaini.getUTCMinutes()).slice(-2) + 
                    " a "+("0" + diafim.getUTCHours()).slice(-2) + ":" + ("0" + diafim.getUTCMinutes()).slice(-2) ;
}