// === FORMULARIO DE CANDIDATOS ===
document.getElementById("formCandidato").addEventListener("submit", e => {
  e.preventDefault();

  const form = e.target;

  const puestosSeleccionados = Array.from(
    document.getElementById("puestos").selectedOptions
  ).map(o => o.value);

  window.candidatos = window.candidatos || [];

  window.candidatos.push({
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    provincia: document.getElementById("provincia").value,
    ayuntamiento: document.getElementById("ayuntamiento").value,
    distancia: document.getElementById("distancia").value,
    puestos: puestosSeleccionados
  });

  alert("Candidato guardado correctamente");
  form.reset();
});


// === FORMULARIO DE EMPRESAS ===
document.getElementById("formEmpresa").addEventListener("submit", e => {
  e.preventDefault();
  alert("Formulario de empresa enviado (demo)");
});


// === LOGIN EMPRESAS ===
document.getElementById("loginEmpresa").addEventListener("submit", e => {
  e.preventDefault();
  const pass = document.getElementById("loginPassword").value;

  if (pass === "1234") {
    document.getElementById("busquedaCandidatos").style.display = "block";
    alert("Acceso autorizado");
  } else {
    alert("Contraseña incorrecta");
  }
});


// === BUSCADOR DE CANDIDATOS ===
document.getElementById("buscarCandidatos").addEventListener("click", e => {
  e.preventDefault();

  const texto = document.getElementById("busquedaTexto").value.toLowerCase();
  const provincia = document.getElementById("filtroProvincia").value;
  const ayuntamiento = document.getElementById("filtroAyuntamiento").value;
  const distancia = document.getElementById("filtroDistancia").value;

  const puestosFiltro = Array.from(
    document.getElementById("filtroPuestos").selectedOptions
  ).map(o => o.value);

  const resultado = (window.candidatos || []).filter(c => {
    let match = true;

    if (texto) {
      match = match && (
        c.nombre.toLowerCase().includes(texto) ||
        c.ayuntamiento.toLowerCase().includes(texto) ||
        c.puestos.some(p => p.toLowerCase().includes(texto))
      );
    }

    if (provincia) match = match && c.provincia === provincia;
    if (ayuntamiento) match = match && c.ayuntamiento === ayuntamiento;

    if (distancia && c.distancia !== "Sin límite") {
      match = match && (c.distancia === distancia || c.distancia === "Sin límite");
    }

    if (puestosFiltro.length > 0) {
      match = match && puestosFiltro.some(p => c.puestos.includes(p));
    }

    return match;
  });

  const ul = document.getElementById("resultadoBusqueda");
  ul.innerHTML = "";

  if (resultado.length === 0) {
    ul.innerHTML = "<li>No se encontraron candidatos</li>";
  } else {
    resultado.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.nombre} – ${c.puestos.join(", ")} – ${c.provincia}, ${c.ayuntamiento} – ${c.distancia}`;
      ul.appendChild(li);
    });
  }
});
