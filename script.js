// Formulario de candidatos
document.getElementById("formCandidato").addEventListener("submit", e => {
  e.preventDefault();

  const puestosSeleccionados = Array.from(
    document.querySelectorAll("#puestosContainer input[type='checkbox']:checked")
  ).map(cb => cb.value);

  if (puestosSeleccionados.length === 0) {
    alert("Por favor, selecciona al menos un puesto.");
    return;
  }

  const cvInput = document.getElementById("cv");
  const cvNombre = cvInput.files.length > 0 ? cvInput.files[0].name : "No subido";

  window.candidatos = window.candidatos || [];

  window.candidatos.push({
    nombre: document.getElementById("nombre").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    provincia: document.getElementById("provincia").value.trim(),
    ayuntamiento: document.getElementById("ayuntamiento").value.trim(),
    distancia: document.getElementById("distancia").value.trim(), // ¡siempre tiene valor por 'required'!
    puestos: puestosSeleccionados,
    cv: cvNombre
  });

  alert("Candidato guardado correctamente");
  e.target.reset();
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
  if (pass === "1234") {
    document.getElementById("busquedaCandidatos").style.display = "block";
    alert("Acceso autorizado");
  } else {
    alert("Contraseña incorrecta");
  }
});

// Buscador de candidatos
document.getElementById("buscarCandidatos")?.addEventListener("click", e => {
  e.preventDefault();

  const texto = (document.getElementById("busquedaTexto")?.value || "").trim().toLowerCase();
  const provincia = (document.getElementById("filtroProvincia")?.value || "").trim();
  const ayuntamiento = (document.getElementById("filtroAyuntamiento")?.value || "").trim();
  const distanciaFiltro = (document.getElementById("filtroDistancia")?.value || "").trim();

  const puestosFiltro = Array.from(
    document.querySelectorAll("#filtroPuestos option:checked")
  ).map(o => o.value);

  const candidatos = window.candidatos || [];
  const resultado = candidatos.filter(c => {
    // Búsqueda libre
    if (texto) {
      const coincide = 
        c.nombre.toLowerCase().includes(texto) ||
        c.ayuntamiento.toLowerCase().includes(texto) ||
        c.puestos.some(p => p.toLowerCase().includes(texto));
      if (!coincide) return false;
    }

    // Provincia
    if (provincia && c.provincia !== provincia) return false;

    // Ayuntamiento
    if (ayuntamiento && c.ayuntamiento !== ayuntamiento) return false;

    // Distancia
    if (distanciaFiltro) {
      // Si el candidato acepta "Sin límite", siempre pasa
      if (c.distancia === "Sin límite") {
        // OK
      } else if (c.distancia !== distanciaFiltro) {
        return false;
      }
    }

    // Puestos
    if (puestosFiltro.length > 0) {
      const coincidePuesto = puestosFiltro.some(p => c.puestos.includes(p));
      if (!coincidePuesto) return false;
    }

    return true;
  });

  const ul = document.getElementById("resultadoBusqueda");
  ul.innerHTML = "";

  if (resultado.length === 0) {
    ul.innerHTML = "<li>No se encontraron candidatos</li>";
  } else {
    resultado.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.nombre} – ${c.puestos.join(", ")} – ${c.provincia}, ${c.ayuntamiento} – ${c.distancia} – CV: ${c.cv}`;
      ul.appendChild(li);
    });
  }
});
