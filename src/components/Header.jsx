import React, { useMemo } from 'react'

function Header({carrito, deleteItem, incrementarCantidad, decrementarCantidad, vaciarCarrito}) {

    // state Derivado (depende del estado)
    /* Use Memo 
        Hook enficado en performance de la app, evita que el codigo se ejecute (1er parametro) hasta cambie alguna de las dependencias definidas (2do parametro)
    */
    const carritoVacio = useMemo( ()=> carrito.length === 0, [carrito]);

    const carritoTotal = ()=> carrito.reduce( (total, item) => total + (item.quantify * item.price) , 0);

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="./img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div 
                            className="carrito"
                        >
                            <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {carritoVacio ?
                                    <p className="text-center">El carrito esta vacio</p> : 

                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carrito.map( item => {
                                                    const {id, name, image, price, quantify} = item;
                                                    return(
                                                        <tr key={id}>
                                                            <td>
                                                                <img className="img-fluid" src={`./img/${image}.jpg`} alt="imagen guitarra" />
                                                            </td>
                                                            <td>{name}</td>
                                                            <td className="fw-bold">
                                                                    ${price}
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={()=> decrementarCantidad(id)}
                                                                >
                                                                    -
                                                                </button>
                                                                    {quantify}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={()=> incrementarCantidad(id)}
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={()=> deleteItem(id)}
                                                                >
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                } 
                                                )}
                                            </tbody>
                                        </table>
                                        <p className="text-end">Total pagar: <span className="fw-bold">${carritoTotal()}</span></p>
                                    </>
                                }
                                <button className="btn btn-dark w-100 mt-3 p-2" onClick={vaciarCarrito}>Vaciar Carrito</button>

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header