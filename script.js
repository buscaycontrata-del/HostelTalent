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
// LOGIN EMPRESA
// ===============
document.getElementById("loginEmpresa").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombreEmpresa = document.getElementById("nombreEmpresaLogin").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (password !== "1234") {
    alert("❌ Contraseña incorrecta.");
    return;
  }

  const empresaExiste = empresas.some(emp => 
    emp.nombreComercial.trim().toLowerCase() === nombreEmpresa.toLowerCase()
  );

  if (empresaExiste) {
    document.getElementById("busquedaCandidatos").style.display = "block";
    alert("🔓 Acceso concedido.");
  } else {
    alert("❌ Empresa no registrada. Verifica el nombre comercial exacto.");
  }
});

// ===============
// BÚSQUEDA DE CANDIDATOS
// ===============
document.getElementById("buscarCandidatos").addEventListener("click", function(e) {
  e.preventDefault();

  const texto = (document.getElementById("busquedaTexto")?.value || "").toLowerCase().trim();
  const provincia = (document.getElementById("filtroProvincia")?.value || "").trim();
  const ayuntamiento = (document.getElementById("filtroAyuntamiento")?.value || "").trim();
  const distanciaFiltro = (document.getElementById("filtroDistancia")?.value || "").trim();

  const puestosFiltro = Array.from(
    document.querySelectorAll("#filtroPuestos option:checked")
  ).map(opt => opt.value);

  const resultados = candidatos.filter(c => {
    if (texto) {
      const coincide = 
        c.nombre.toLowerCase().includes(texto) ||
        c.ayuntamiento.toLowerCase().includes(texto) ||
        c.puestos.some(p => p.toLowerCase().includes(texto));
      if (!coincide) return false;
    }

    if (provincia && c.provincia !== provincia) return false;
    if (ayuntamiento && c.ayuntamiento !== ayuntamiento) return false;

    if (distanciaFiltro) {
      if (c.distancia !== "Sin límite" && c.distancia !== distanciaFiltro) {
        return false;
      }
    }

    if (puestosFiltro.length > 0) {
      return puestosFiltro.some(p => c.puestos.includes(p));
    }

    return true;
  });

  const ul = document.getElementById("resultadoBusqueda");
  ul.innerHTML = "";

  if (resultados.length === 0) {
    ul.innerHTML = "<li>📭 No se encontraron candidatos.</li>";
  } else {
    resultados.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.nombre} | ${c.puestos.join(", ")} | ${c.provincia}, ${c.ayuntamiento} | ${c.distancia}`;
      ul.appendChild(li);
    });
  }
});
