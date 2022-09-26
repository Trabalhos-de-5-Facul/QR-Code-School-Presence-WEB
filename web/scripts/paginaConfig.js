const inputElement = document.getElementById("fImage");
if (inputElement) {
  inputElement.addEventListener("change", loadFile, false);
}

var loadFile = function (event) {
  var fileList = document.getElementById("fImage").files;
  document.getElementById("imgPhoto").src = URL.createObjectURL(
    event.target.files[0]
  );
  //TODO do something with fileList.
};
