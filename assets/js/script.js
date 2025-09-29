let ul = document.querySelector("#ListaTareas");
let input = document.querySelector("#InputIngresoTareas");
let boton = document.querySelector("#ButtonTarea");

let tareas = [
  { id: 16, descripcion: "Hacer mercado", completada: true },
  { id: 60, descripcion: "Estudiar para la prueba", completada: false },
  { id: 24, descripcion: "Sacar a pasear a Tobby", completada: false }
];

function renderizarTareas() {
  let template = "";
  for (let tarea of tareas) {
    template += `
      <div class="titulos">
        <div class="columna-id">${tarea.id}</div>
        <div class="columna-tarea">${tarea.descripcion}</div>
        <div class="columna-check">
          <input type="checkbox" onchange="cambiarEstado(${tarea.id})" ${tarea.completada ? 'checked' : ''}>
        </div>
        <div class="columna-completado">
          ${tarea.completada ? "<div>Completado</div>" : ""}
        </div>
        <div class="columna-borrar">
          <button class="btn-borrar" onclick="borrarTarea(${tarea.id})">❌</button>
        </div>
      </div>
    `;
  }
  ul.innerHTML = template;
  actualizarResumen();
}

function actualizarResumen() {
  document.getElementById("totalTareas").textContent = tareas.length;
  document.getElementById("tareasCompletadas").textContent = tareas.filter(t => t.completada).length;
}

boton.addEventListener("click", () => {
  let texto = input.value.trim();
  if (texto === "") {
    alert("Escribe una tarea.");
    return;
  }
  let nuevaTarea = { id: Date.now(), descripcion: texto, completada: false };
  tareas.unshift(nuevaTarea);
  input.value = "";
  renderizarTareas();
});

function borrarTarea(idAEliminar) {
  let indice = tareas.findIndex(t => t.id === idAEliminar);
  if (indice !== -1) {
    tareas.splice(indice, 1);
    renderizarTareas();
  }
}

function modificarCompletada(idAModificar) {
  let indice = tareas.findIndex(t => t.id === idAModificar);
  if (indice !== -1) {
    tareas[indice].completada = !tareas[indice].completada;
    renderizarTareas();
  }
}

function cambiarEstado(id) {
  modificarCompletada(id);
}

renderizarTareas();
