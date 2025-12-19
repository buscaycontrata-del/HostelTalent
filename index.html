// Formulario de candidatos
document.getElementById("candidato").addEventListener("submit", e => {
  e.preventDefault();
  alert("Formulario de candidato enviado correctamente (esto es una prueba)");

  // Guardar datos de prueba en memoria para buscar después
  const form = e.target;
  window.candidatos = window.candidatos || [];
  window.candidatos.push({
    nombre: form[0].value,
    email: form[1].value,
    telefono: form[2].value,
    provincia: form[3].value,
    ayuntamiento: form[4].value,
    distancia: form[5].value,
    puesto: Array.from(form[6].selectedOptions).map(o => o.value)
  });
});

// Formulario de empresas
document.getElementById("empresa").addEventListener("submit", e => {
  e.preventDefault();
  alert("Formulario de empresa enviado correctamente (esto es una prueba)");
});

// Login de empresas autorizadas (simulación)
document.getElementById("loginEmpresa").addEventListener("submit", e => {
  e.preventDefault();
  const pass = e.target[1].value;
  if(pass === "1234"){ // contraseña de prueba
    document.getElementById("busquedaCandidatos").style.display = "block";
    alert("Acceso autorizado");
  } else {
    alert("Contraseña incorrecta");
  }
});

// Buscador de candidatos (filtrado simple)
document.getElementById("buscarCandidatos").addEventListener("click", e => {
  e.preventDefault();
  const provincia = document.getElementById("filtroProvincia").value;
  const ayuntamiento = document.getElementById("filtroAyuntamiento").value;
  const distancia = document.getElementById("filtroDistancia").value;
  const puesto = document.getElementById("filtroPuesto").value;

  const resultado = (window.candidatos || []).filter(c => {
    let match = true;
    if(provincia) match = match && c.provincia === provincia;
    if(ayuntamiento) match = match && c.ayuntamiento === ayuntamiento;
    if(distancia && c.distancia !== "Sin límite") match = match && (c.distancia === distancia || c.distancia === "Sin límite");
    if(puesto) match = match && c.puesto.includes(puesto);
    return match;
  });

  const ul = document.getElementById("resultadoBusqueda");
  ul.innerHTML = "";
  if(resultado.length === 0) ul.innerHTML = "<li>No se encontraron candidatos</li>";
  else resultado.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.nombre} - ${c.puesto.join(", ")} - ${c.provincia}, ${c.ayuntamiento} - ${c.distancia}`;
    ul.appendChild(li);
  });
});
