document.addEventListener("DOMContentLoaded", async () => {

  const textoSpan = document.getElementById("texto");
  const numeroSpan = document.getElementById("numero");
  const input = document.getElementById("numeroInput");
  const boton = document.getElementById("comprobar");

  try {
    const response = await fetch("/asignar-texto");
    const data = await response.json();

    if (data.error) {
      textoSpan.textContent = data.error;
      return;
    }

    textoSpan.textContent = data.texto.contenido;
    numeroSpan.textContent = data.numero;

    boton.addEventListener("click", async (e) => {
      e.preventDefault();

      const numeroPareja = Number(input.value);

      if (!numeroPareja) {
        alert("Ingresa el número de tu pareja");
        return;
      }

      const res = await fetch("/comprobar-pareja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero1: data.numero,
          numero2: numeroPareja
        })
      });

      const resultado = await res.json();
      alert(resultado.mensaje);
    });

  } catch (error) {
    console.error(error);
    alert("Error conectando con el servidor");
  }

});
