document.addEventListener("DOMContentLoaded", () => {
  const tieneHijosRadios = document.getElementsByName("tieneHijos");
  const cantidadHijosContainer = document.getElementById("cantidadHijosContainer");
  const cantHijosInput = document.getElementById("cantHijos");
  const hijosContainer = document.getElementById("hijosContainer");
  const form = document.getElementById("mainForm");

  // Mostrar u ocultar la cantidad de hijos
  tieneHijosRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "si") {
        cantidadHijosContainer.style.display = "block";
      } else {
        cantidadHijosContainer.style.display = "none";
        hijosContainer.innerHTML = "";
      }
    });
  });

  // Crear formularios de hijos según cantidad
  cantHijosInput.addEventListener("input", () => {
    const cantidad = parseInt(cantHijosInput.value) || 0;
    hijosContainer.innerHTML = "";

    for (let i = 1; i <= cantidad; i++) {
      const hijoDiv = document.createElement("div");
      hijoDiv.classList.add("hijo-form");
      hijoDiv.innerHTML = `
        <h3>Hijo ${i}</h3>
        <label>Nombre y Apellido</label>
        <input type="text" name="hijoNombre${i}" required>

        <label>CUIL</label>
        <input type="text" name="hijoCuil${i}" required>

        <label>Fecha de Nacimiento</label>
        <input type="date" name="hijoFecha${i}" required>

        <label>Talle de Guardapolvo</label>
        <input type="text" name="hijoTalle${i}" required>

        <label>Grado a Cursar</label>
        <input type="text" name="hijoGrado${i}" required>
      `;
      hijosContainer.appendChild(hijoDiv);
    }
  });

  // Envío por WhatsApp
  form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const cuil = document.getElementById("cuil").value;
    const direccion = document.getElementById("direccion").value;
    const codigoPostal = document.getElementById("codigoPostal").value;
    const localidad = document.getElementById("localidad").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;

    let mensaje = `*Datos del titular:*\n`;
    mensaje += `Nombre y Apellido: ${nombre}\n`;
    mensaje += `CUIL: ${cuil}\n`;
    mensaje += `Dirección: ${direccion}\n`;
    mensaje += `Código Postal: ${codigoPostal}\n`;
    mensaje += `Localidad: ${localidad}\n`;
    mensaje += `Fecha de nacimiento: ${fechaNacimiento}\n`;

    if (document.querySelector('input[name="tieneHijos"]:checked').value === "si") {
      const cantidad = parseInt(cantHijosInput.value) || 0;
      mensaje += `\n*Hijos (${cantidad}):*\n`;

      for (let i = 1; i <= cantidad; i++) {
        const nombreHijo = form[`hijoNombre${i}`].value;
        const cuilHijo = form[`hijoCuil${i}`].value;
        const fechaHijo = form[`hijoFecha${i}`].value;
        const talle = form[`hijoTalle${i}`].value;
        const grado = form[`hijoGrado${i}`].value;

        mensaje += `\n👦 Hijo ${i}:\n`;
        mensaje += `Nombre y Apellido: ${nombreHijo}\n`;
        mensaje += `CUIL: ${cuilHijo}\n`;
        mensaje += `Fecha de nacimiento: ${fechaHijo}\n`;
        mensaje += `Talle: ${talle}\n`;
        mensaje += `Grado: ${grado}\n`;
      }
    }

    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  });
});
