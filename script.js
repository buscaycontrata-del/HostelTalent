document.getElementById("formCandidato").addEventListener("submit", e => {
  e.preventDefault();

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
  e.target.reset();
});
