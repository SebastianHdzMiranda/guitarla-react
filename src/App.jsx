import { useEffect, useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from './data/db'

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('carrito');
    // Si no es nullo returname localStorage en formato json y si es nullo returname un array
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data, setData] = useState([]);
  const [carrito, setCarrito] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    setData(db);
  }, [])

  useEffect(() => {
      localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);
  

  const addToCart = (item) => {
    // Me verifica la posicion exacta donde el id es igual a item.id
    const itemExist = carrito.findIndex( guitar => guitar.id  === item.id );

    if (itemExist >= 0) {
      if (item.quantify < MAX_ITEMS) {
        const updateCarrito = [...carrito];
        updateCarrito[itemExist].quantify++;
        setCarrito(updateCarrito);
      }
      return;
    }

    item.quantify = 1;
    setCarrito( prevCarrito => [...prevCarrito, item] )
  }

  const deleteItem = (id)=> {
    const updateCarrito = carrito.filter( guitar => guitar.id !== id );
    setCarrito(updateCarrito);
  }

  const incrementarCantidad = (id)=> {
    const updateCarrito = carrito.map( item => {
      if (item.id === id && item.quantify < MAX_ITEMS) {
        item.quantify++;
      }
      return item;
    });

    setCarrito(updateCarrito);
  }

  const decrementarCantidad = (id)=>{
    const updateCarrito = carrito.map( item => {
      if (item.id === id && item.quantify > MIN_ITEMS) {
        item.quantify--;
      }
      return item;
    });
    setCarrito(updateCarrito);
  }

  const vaciarCarrito = ()=> {
    setCarrito([]);
  }
  
  return (
    <>
      <Header 
        carrito={carrito}
        deleteItem={deleteItem}
        incrementarCantidad={incrementarCantidad}
        decrementarCantidad={decrementarCantidad}
        vaciarCarrito={vaciarCarrito}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {data.map( (guitar) => 
                <Guitar 
                  guitar={guitar} 
                  key={guitar.id}
                  setCarrito={setCarrito}
                  addToCart={addToCart}
                />
              )}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>

    </>
  )
}

export default App
