// Formulario de candidatos
document.getElementById("formCandidato").addEventListener("submit", e => {
  e.preventDefault();

  // Recoger todos los checkboxes marcados
  const puestosSeleccionados = Array.from(
    document.querySelectorAll("#puestosContainer input[type='checkbox']:checked")
  ).map(cb => cb.value);

  // Obtener nombre del CV (simulación)
  const cvInput = document.getElementById("cv");
  const cvNombre = cvInput.files.length > 0 ? cvInput.files[0].name : "No subido";

  window.candidatos = window.candidatos || [];

  window.candidatos.push({
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    provincia: document.getElementById("provincia").value,
    ayuntamiento: document.getElementById("ayuntamiento").value,
    distancia: document.getElementById("distancia").value,
    puestos: puestosSeleccionados,
    cv: cvNombre // Guardamos el nombre del archivo
  });

  alert("Candidato guardado correctamente");
  e.target.reset();
  // Reiniciar el campo de archivo (opcional)
  document.getElementById("cv").value = "";
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

  // Obtener puestos seleccionados en el filtro
  const puestosFiltro = Array.from(
    document.querySelectorAll("#filtroPuestos option:checked")
  ).map(o => o.value);

  const resultado = (window.candidatos || []).filter(c => {
    let match = true;

    // Búsqueda libre por nombre, ayuntamiento o puesto
    if (texto) {
      const coincideTexto = 
        c.nombre.toLowerCase().includes(texto) ||
        c.ayuntamiento.toLowerCase().includes(texto) ||
        c.puestos.some(p => p.toLowerCase().includes(texto));
      if (!coincideTexto) match = false;
    }

    // Filtro por provincia
    if (provincia && c.provincia !== provincia) match = false;

    // Filtro por ayuntamiento
    if (ayuntamiento && c.ayuntamiento !== ayuntamiento) match = false;

    // Filtro por distancia
    if (distancia && distancia !== "Cualquiera") {
      // Si el candidato acepta "Sin límite", siempre coincide
      if (c.distancia !== "Sin límite" && c.distancia !== distancia) {
        match = false;
      }
    }

    // Filtro por puestos
    if (puestosFiltro.length > 0) {
      const tienePuesto = puestosFiltro.some(p => c.puestos.includes(p));
      if (!tienePuesto) match = false;
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
      // Mostramos también el nombre del CV
      li.textContent = `${c.nombre} – ${c.puestos.join(", ")} – ${c.provincia}, ${c.ayuntamiento} – ${c.distancia} – CV: ${c.cv}`;
      ul.appendChild(li);
    });
  }
});
