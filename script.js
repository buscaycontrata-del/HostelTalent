// Formulario de candidatos
document.getElementById("formCandidato").addEventListener("submit", e => {
  e.preventDefault();

  // Recoger todos los checkboxes marcados
  const puestosSeleccionados = Array.from(
    document.querySelectorAll("#puestosContainer input[type='checkbox']:checked")
  ).map(cb => cb.value);

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
  e.target.reset();
});

// Formulario de empresas
document.getElementById("formEmpresa")?.addEventListener("submit", e => {
  e.preventDefault();
  alert("Formulario de empresa enviado (demo)");
});

// Login de empresas autorizadas
document.getElementById("loginEmpresa")?.addEventListener("submit", e => {
  e.preventDefault();
  const pass = document.getElementById("loginPassword")?.value;
  if(pass === "1234"){
    document.getElementById("busquedaCandidatos").style.display = "block";
    alert("Acceso autorizado");
  } else {
    alert("Contraseña incorrecta");
  }
});

// Buscador de candidatos
document.getElementById("buscarCandidatos")?.addEventListener("click", e => {
  e.preventDefault();

  const texto = (document.getElementById("busquedaTexto")?.value || "").toLowerCase();
  const provincia = document.getElementById("filtroProvincia")?.value;
  const ayuntamiento = document.getElementById("filtroAyuntamiento")?.value;
  const distancia = document.getElementById("filtroDistancia")?.value;

  // Cambio mínimo: filtramos los candidatos usando sus puestos reales guardados en memoria
  const puestosFiltro = Array.from(
    document.querySelectorAll("#filtroPuestos option:checked")
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

    // Filtrado de puestos
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
