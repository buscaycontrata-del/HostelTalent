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
// TABLA DE DISTANCIAS
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

function getDistancia(ay1, ay2) {
  if (!distancias[ay1] || !distancias[ay1][ay2]) return Infinity;
  return distancias[ay1][ay2];
}

// ===============
// CARGA INICIAL
// ===============
let candidatos = cargarDeStorage("candidatos");
let empresas = cargarDeStorage("empresas");

// Si no hay empresas, crea la de prueba
if (empresas.length === 0) {
  empresas = [{
    nombreComercial: "HostelTalent",
    nombreFiscal: "HostelTalent SL",
    cif: "B12345678",
    email: "test@gmail.com",
    telefono: "600000000",
    personaContacto: "Admin",
    provincia: "Pontevedra",
    ayuntamiento: "Vigo"
  }];
  guardarEnStorage("empresas", empresas);
}

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
// LOGIN EMPRESA
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
// BÚSQUEDA DE CANDIDATOS (CORREGIDA Y COMPLETA)
// ===============
document.getElementById("buscarCandidatos").addEventListener("click", function(e) {
  e.preventDefault();

  const provinciaFiltro = (document.getElementById("filtroProvincia")?.value || "").trim();
  const ayuntamientoFiltro = (document.getElementById("filtroAyuntamiento")?.value || "").trim();
  const distanciaFiltro = (document.getElementById("filtroDistancia")?.value || "").trim();

  const puestosFiltro = Array.from(
    document.querySelectorAll("#filtroPuestos option:checked")
  ).map(opt => opt.value);

  const parseKm = (dist) => {
    if (!dist) return Infinity;
    dist = dist.trim();
    if (dist === "Sin límite") return Infinity;
    if (dist === "Local") return 0;
    if (dist === "10 km") return 10;
    if (dist === "20 km") return 20;
    if (dist === "30 km") return 30;
    if (dist === "50 km") return 50;
    return Infinity;
  };

  const resultados = candidatos.filter(c => {
    // 1. Provincia
    if (provinciaFiltro && c.provincia !== provinciaFiltro) return false;

    // 2. Puesto: si NO se seleccionó ninguno, se ignora
    if (puestosFiltro.length > 0 && !puestosFiltro.some(p => c.puestos.includes(p))) return false;

    // 3. Si no hay ayuntamiento, pasar
    if (!ayuntamientoFiltro) return true;

    // 4. Distancia real
    const d = getDistancia(ayuntamientoFiltro, c.ayuntamiento);
    if (d === Infinity) return false;

    // 5. Si candidato puso "Sin límite", pasa
    if (c.distancia === "Sin límite") return true;

    // 6. Si búsqueda es "Local"
    if (distanciaFiltro === "Local") {
      return d === 0 || d <= parseKm(c.distancia);
    }

    // 7. Para otras distancias
    const kmCandidato = parseKm(c.distancia);
    const kmBusqueda = parseKm(distanciaFiltro);
    return d <= kmCandidato && d <= kmBusqueda;
  });

  const ul = document.getElementById("resultadoBusqueda");
  ul.innerHTML = "";

  if (resultados.length === 0) {
    ul.innerHTML = "<li>📭 No se encontraron candidatos.</li>";
  } else {
    resultados.forEach(c => {
      const cvTexto = c.cv || "No subido";
      const li = document.createElement("li");
      li.textContent = `${c.nombre} | ${c.puestos.join(", ")} | ${c.provincia}, ${c.ayuntamiento} | ${c.distancia} | CV: ${cvTexto}`;
      ul.appendChild(li);
    });
  }
});
