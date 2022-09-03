//Função de Teste de Requisição para a API
async function getJogos() {
  const response = await fetch("http://54.94.139.104:3000/jogos", {
    method: "GET",
  });

  const data = await response.json();
  console.log(data);
}
