//Esperar que cargue el DOM
document.addEventListener('DOMContentLoaded', async () => {
  //Conectar con el json
  const response = await fetch("banco.json");
  console.log("response: ",response);
  //Designar una cnstante que aloje el arreglo del json
  const textos = await response.json();
  console.log("textos: ",textos, textos.length);
  // Designar una constante para el elemento texto del DOM, elemento al que
  // se dirige el texto del json
  const textoElement = document.getElementById("texto");
  
  // Arreglo para almecenar el nnumero del indice de aquellos textos ya seleccionados
  const elegidos = [];
  console.log("elegidos: ",elegidos,elegidos.length);
  // ciclo while para evitar repeticiones
  // i = Math.round(Math.random()*(textos.length-1));
  // textoElement.textContent = textos[i];
  // console.log("i inicial: ",i);
  // console.log(textos[i]);
  let i = -1;
  while (!elegidos.includes(i)) {
    // Generar un nuevo índice aleatorio
    i = Math.round(Math.random()*(textos.length-1));
    console.log("i: ",i);
    // Verificar si el indice ya fue elegido
    if (!elegidos.includes(i)) {
      // Si no fue elegido, agregarlo al arreglo de elegidos
      elegidos.push(i);
      // Asignar el texto correspondiente al indice al elemento del DOM
      textoElement.textContent = textos[i];
    }
  }
console.log("elegidos final: ",elegidos,elegidos.length);
if (elegidos.length === textos.length)
  textoElement.textContent = "Se han mostrado todos los textos disponibles. Busca una pareja o un grupo 🥳";
});