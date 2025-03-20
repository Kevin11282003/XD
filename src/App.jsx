// App.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Importa la instancia de Firestore
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './App.css'; // Importa los estilos CSS

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Función para crear un nuevo documento
  const createData = async () => {
    try {
      const docRef = await addDoc(collection(db, 'items'), {
        name: input,
      });
      console.log("Documento creado con ID: ", docRef.id);
      setInput(""); // Limpiar el input
      fetchData(); // Actualizar la lista
    } catch (e) {
      console.error("Error añadiendo documento: ", e);
    }
  };

  // Función para obtener los documentos
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
    } catch (e) {
      console.error("Error obteniendo los documentos: ", e);
    }
  };

  // Función para actualizar un documento
  const updateData = async () => {
    if (editId) {
      const docRef = doc(db, 'items', editId);
      await updateDoc(docRef, {
        name: input,
      });
      console.log("Documento actualizado");
      setInput(""); // Limpiar el input
      setEditId(null); // Limpiar el id de edición
      fetchData(); // Actualizar la lista
    }
  };

  // Función para eliminar un documento
  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
      console.log("Documento eliminado");
      fetchData(); // Actualizar la lista
    } catch (e) {
      console.error("Error eliminando documento: ", e);
    }
  };

  // Función para editar un documento
  const editData = (id, name) => {
    setInput(name);
    setEditId(id);
  };

  // Efecto para cargar los datos al inicio
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Firebase Firestore CRUD</h1>

      {/* Formulario para crear o editar */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nombre"
      />
      {editId ? (
        <button onClick={updateData}>Actualizar</button>
      ) : (
        <button onClick={createData}>Crear</button>
      )}

      <h2>Lista de Items</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}
            <div>
              <button onClick={() => editData(item.id, item.name)}>Editar</button>
              <button onClick={() => deleteData(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
