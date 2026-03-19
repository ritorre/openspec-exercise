const store = {
  tasks: [
    { id: 1, title: 'Aprender OpenSpec', completed: false },
    { id: 2, title: 'Completar el ejercicio', completed: false },
    { id: 3, title: 'Probar la API', completed: true }
  ],
  nextId: 4
};

function findTask(id) {
  return store.tasks.find(task => task.id === id);
}

module.exports = { store, findTask };
