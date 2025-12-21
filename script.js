// ===============
// UTILIDADES
// ===============
function guardarEnStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

function cargarDeStorage(clave) {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : [];
}

// ===============
// TABLA DE DISTANCIAS ENTRE AYUNTAMIENTOS (en km)
// Generada a partir de tu cuadro.
// ===============
const distancias = {
  "Vigo": { "Vigo": 0, "Cangas": 29, "Moaña": 19, "Bueu": 29, "Nigrán": 15, "Oia": 50, "Redondela": 14, "Pontevedra": 28, "Soutomaior": 20 },
  "Cangas": { "Vigo": 29, "Cangas": 0, "Moaña": 12, "Bueu": 8, "Nigrán": 30, "Oia": 55, "Redondela": 30, "Pontevedra": 35, "Soutomaior": 32 },
  "Moaña": { "Vigo": 19, "Cangas": 12, "Moaña": 0, "Bueu": 15, "Nigrán": 25, "Oia": 50, "Redondela": 20, "Pontevedra": 29, "Soutomaior": 25 },
  "Bueu": { "Vigo": 29, "Cangas": 8, "Moaña": 15, "Bueu": 0, "Nigrán": 35, "Oia": 60, "Redondela": 31, "Pontevedra": 20, "Soutomaior": 28 },
  "Nigrán": { "Vigo": 15, "Cangas": 30, "Moaña": 25, "Bueu": 35, "Nigrán": 0, "Oia": 25, "Redondela": 28, "Pontevedra": 52, "Soutomaior": 30 },
  "Oia": { "Vigo": 50, "Cangas": 55, "Moaña": 50, "Bueu": 60, "Nigrán": 25, "Oia": 0, "Redondela": 50, "Pontevedra": 75, "Soutomaior": 55 },
  "Redondela": { "Vigo": 14, "Cangas": 30, "Moaña": 20, "Bueu": 31, "Nigrán": 28, "Oia": 50, "Redondela": 0, "Pontevedra": 15, "Soutomaior": 8 },
  "Pontevedra": { "Vigo": 28, "Cangas": 35, "Moaña": 24, "Bueu": 20, "Nigrán": 35, "Oia": 52, "Redondela": 15, "Pontevedra": 0, "Soutomaior": 11 },
  "Soutomaior": { "Vigo": 20, "Cangas": 32, "Moaña": 25, "Bueu": 28, "Nigrán": 30, "Oia": 55, "Redondela": 8, "Pontevedra": 11, "Soutomaior": 0 }
};

// Devuelve la distancia entre dos ayuntamientos (o Infinity si no se conoce)
function getDistancia(ay1, ay2) {
  if (!distancias[ay1] || !distancias[ay1][ay2]) {
    return Infinity;
  }
  return distancias[ay1][ay2];
}

// ===============
// CARGA INICIAL
// ===============
let candidatos = cargarDeStorage("candidatos");
let empresas = cargarDeStorage("empresas");

// ===============
// FORMULARIO CANDIDATO
// ===============
document.getElementById("formCandidato").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const provincia = document.getElementById("provincia").value.trim();
  const ayuntamiento = document.getElementById("ayuntamiento").value.trim();
  const distancia = document.getElementById("distancia").value.trim();

  const puestosSeleccionados = Array.from(
    document.querySelectorAll("#puestosContainer input[type='checkbox']:checked")
  ).map(cb => cb.value);

  if (puestosSeleccionados.length === 0) {
    alert("Selecciona al menos un puesto.");
    return;
  }

  const cvInput = document.getElementById("cv");
  const cvNombre = cvInput.files.length > 0 ? cvInput.files[0].name : "No subido";

  const nuevoCandidato = {
    nombre,
    email,
    telefono,
    provincia,
    ayuntamiento,
    distancia,
    puestos: puestosSeleccionados,
    cv: cvNombre
  };

  candidatos.push(nuevoCandidato);
  guardarEnStorage("candidatos", candidatos);

  alert("✅ Candidato registrado correctamente.");
  this.reset();
  document.getElementById("cv").value = "";
});

// ===============
// FORMULARIO EMPRESA
// ===============
document.getElementById("formEmpresa").addEventListener("submit", function(e) {
  e.preventDefault();

  const empresa = {
    nombreComercial: document.getElementById("nombreComercial").value.trim(),
    nombreFiscal: document.getElementById("nombreFiscal").value.trim(),
    cif: document.getElementById("cif").value.trim(),
    email: document.getElementById("emailEmpresa").value.trim(),
    telefono: document.getElementById("telefonoEmpresa").value.trim(),
    personaContacto: document.getElementById("personaContacto").value.trim(),
    provincia: document.getElementById("provinciaEmpresa").value.trim(),
    ayuntamiento: document.getElementById("ayuntamientoEmpresa").value.trim()
  };

  empresas.push(empresa);
  guardarEnStorage("empresas", empresas);

  alert("✅ Empresa registrada (guardada localmente).");
  this.reset();
});

// ===============
// LOGIN EMPRESA (por EMAIL)
// ===============
document.getElementById("loginEmpresa").addEventListener("submit", function(e) {
  e.preventDefault();

  const emailLogin = document.getElementById("emailLogin").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (password !== "1234") {
    alert("❌ Contraseña incorrecta.");
    return;
  }

  const empresaExiste = empresas.some(emp => emp.email === emailLogin);

  if (empresaExiste) {
    document.getElementById("busquedaCandidatos").style.display = "block";
    alert("🔓 Acceso concedido.");
  } else {
    alert("❌ Empresa no registrada. Usa el email que registraste.");
  }
});

// ===============
// BÚSQUEDA DE CANDIDATOS (con cálculo real de distancia)
// ===============
document.getElementById("buscarCandidatos").addEventListener("click", function(e) {
  e.preventDefault();

  const provinciaFiltro = (document.getElementById("filtroProvincia")?.value || "").trim();
  const ayuntamientoFiltro = (document.getElementById("filtroAyuntamiento")?.value || "").trim();
  const distanciaFiltro = (document.getElementById("filtroDistancia")?.value || "").trim();

  const puestosFiltro = Array.from(
    document.querySelectorAll("#filtroPuestos option:checked")
  ).map(opt => opt.value);

  // Convertir la distancia seleccionada a km (número)
  let kmMax = Infinity;
  if (distanciaFiltro === "Local") kmMax = 0;
  else if (distanciaFiltro === "10 km") kmMax = 10;
  else if (distanciaFiltro === "20 km") kmMax = 20;
  else if (distanciaFiltro === "30 km") kmMax = 30;
  else if (distanciaFiltro === "50 km") kmMax = 50;
  // "Sin límite" o vacío → kmMax = Infinity (ya está)

  const resultados = candidatos.filter(c => {
    // Filtro por provincia
    if (provinciaFiltro && c.provincia !== provinciaFiltro) return false;

    // Filtro por puesto
    if (puestosFiltro.length > 0) {
      if (!puestosFiltro.some(p => c.puestos.includes(p))) return false;
    }

    // Si NO se ha seleccionado un ayuntamiento de búsqueda, no filtramos por ubicación
    if (!ayuntamientoFiltro) return true;

    // Calcular distancia entre el ayuntamiento de la empresa y el del candidato
    const d = getDistancia(ayuntamientoFiltro, c.ayuntamiento);

    // Si el candidato acepta "Sin límite", pasa siempre
    if (c.distancia === "Sin límite") return true;

    // Si el candidato acepta "Local", solo si es el mismo ayuntamiento
    if (c.distancia === "Local") {
      return d === 0;
    }

    // Convertir la distancia del candidato a km
    let kmCandidato = Infinity;
    if (c.distancia === "10 km") kmCandidato = 10;
    else if (c.distancia === "20 km") kmCandidato = 20;
    else if (c.distancia === "30 km") kmCandidato = 30;
    else if (c.distancia === "50 km") kmCandidato = 50;

    // El candidato aparece si:
    // - Su radio (kmCandidato) >= distancia real (d)
    // - Y la empresa busca al menos esa distancia (kmMax >= d)
    return d <= kmCandidato && d <= kmMax;
  });

  const ul = document.getElementById("resultadoBusqueda");
  ul.innerHTML = "";

  if (resultados.length === 0) {
    ul.innerHTML = "<li>📭 No se encontraron candidatos.</li>";
  } else {
    resultados.forEach(c => {
      const li = document.createElement("li");
      const cvTexto = c.cv || "No subido";
      li.textContent = `${c.nombre} | ${c.puestos.join(", ")} | ${c.provincia}, ${c.ayuntamiento} | ${c.distancia} | CV: ${cvTexto}`;
      ul.appendChild(li);
    });
  }
});
