const inputElement = document.getElementById("fImage");
if (inputElement) {
  inputElement.addEventListener("change", loadFile, false);
}

var loadFile = function (event) {
  var fileList = document.getElementById("fImage").files;
  document.getElementById("imgPhoto").src = URL.createObjectURL(
    event.target.files[0]
  );
};

async function LoadPage(){
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  if(ca[0].substring(6) == "true"){
  let variable =  location.search.substring(1);
  v = variable.split(",");
  LoadHeader(v[0]);
  let response = await fetch(url.professores + v[0]);
  let professordata = await response.json();
  console.log(professordata);
  document.getElementById("firstname").placeholder = professordata.professor[0].nome_prof;
  document.getElementById("email").placeholder = professordata.professor[0].email_prof;
  }
}