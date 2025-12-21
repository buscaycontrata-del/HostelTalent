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
