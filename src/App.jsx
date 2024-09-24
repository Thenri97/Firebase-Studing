import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Auth } from './components/auth';
import { auth, db, storage } from "./database/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovie, setNewMovie] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [hasOscar, setHasOscar] = useState(false);

  const [deletedMovie, setDeletedMovie] = useState(0);

  const [fileUpload, setFileUpload] = useState(null);



  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    //READ THE DATA
    //SET THE MOVIE LIST
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      }))
      setMovieList(filteredData)
      // console.log(movieList);

    } catch (err) {
      console.error(err);

    }
  };

  const deleteMovie = async (id) => {

    const indiceParaRemover = movieList.findIndex(item => item.id === id);

    if (indiceParaRemover != -1) {
      // Remova o objeto do array
      movieList.splice(indiceParaRemover, 1);
      console.log('Objeto removido com sucesso!');
    } else {
      console.log('ID não encontrado no array.');
    }

    // Agora o array ficará assim:
    console.log(movieList);

    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
      setDeletedMovie(id)

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])

  useEffect(() => {
    console.log(movieList);

  }, [movieList])


  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovie,
        releaseDate: newReleaseDate,
        Oscar: hasOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList()
    } catch (err) {
      console.error(err)
    }
  };


  const uploadFile = async () => {

    if (!fileUpload) return; // Caso o fileUpload for null encerra a função.

    try{

      const fileSfolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      await uploadBytes(fileSfolderRef, fileUpload);
    }catch(err){
      console.error(err);
    }


  }

  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <h1>Vite + React</h1>

      <Auth />

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3>Add Movie</h3>
        <input
          type="text"
          placeholder="Movie title"
          onChange={(e) => setNewMovie(e.target.value)}

        />
        <input
          type="number"
          placeholder="Release date"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <label htmlFor="checkbox"> Has oscar?</label>
        <input
          type="checkbox"
          name='checkbox'
          checked={hasOscar}
          onChange={(e) => setHasOscar(e.target.checked)} />
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </section>
      <ul style={{ display: "flex", flexDirection: "column", overflow: "scroll" }}>
        {
          movieList.map((movie) =>
            <li key={movie.id} style={{ display: "flex", flexDirection: "column" }}>
              <h1>{movie.title}</h1>
              <h3 style={{ color: movie.Oscar ? "green" : "red" }}>{movie.Oscar ? "Yes" : "No"}</h3>
              <span>{`Release Date: ${movie.releaseDate}`}</span>
              <button onClick={() => { deleteMovie(movie.id) }

              }>Delete Movie</button>
            </li>)
        }
      </ul>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onChange={uploadFile}>Upload File</button>
      </div>
    </main>


  )
}

export default App
