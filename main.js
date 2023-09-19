//Constructor

class Productos
{
    constructor (info)
    {
        this.codigo=info.codigo;
        this.nombre=info.nombre;
        this.descripcion=info.descripcion;
        this.precio=info.precio;
        this.categoria=info.categoria;
    }
}

// //Eventos para botones
//     // Boton "Historial de Actualizar"
//     const historialActualizarBtn = document.getElementById("historialActualizarBtn");
//     historialActualizarBtn.addEventListener("click", () =>{
//         mostrarHistorial('actualizar');
//     });
//     // Boton "Historial de Filtrar"
//     const historialFiltrarBtn = document.getElementById("historialFiltrarBtn");
//     historialFiltrarBtn.addEventListener("click", () =>{
//     mostrarHistorial('filtrar');
// });

// //Codigo para historales

// // Variables para el historial
// let historialActualizar = {
//     tipo: 'actualizar',
//     productos: [],
// };

// let historialFiltrar = {
//     tipo: 'filtrar',
//     productos: [],
// };

// // Funcion para cargar el historial desde localStorage
// function cargarHistorial(tipo) {
//     const historialJSON = localStorage.getItem(`historial${tipo}`);
//     if (historialJSON) {
//         return JSON.parse(historialJSON);
//     } else {
//         return { tipo, productos: [] }; // Si no hay historial en localstorage, crea uno vacio
//     }
// }

// // Funcion para guardar el historial en localstroage
// function guardarHistorial(tipo, historial) {
//     localStorage.setItem(`historial${tipo}`, JSON.stringify(historial));
// }

// // Cargar historiales al inicio
// historialActualizar = cargarHistorial('actualizar');
// historialFiltrar = cargarHistorial('filtrar');

// Funcion para agregar productos al historial de actualizar
function actualizarPrecio() {
    // Agregar el producto actual al historial de actualizar
    historialActualizar.productos.push(productoActualizado);
    // Guardar el historial en localStorage
    guardarHistorial('actualizar', historialActualizar);
}
// Funcion para agregar productos al historial de filtrar
function filtrarPorCategoria() {
    // Agregar los productos actuales al historial de filtrar
    historialFiltrar.productos = categoriaListada;
    // Guardar el historial en localStorage
    guardarHistorial('filtrar', historialFiltrar);
}

// Funcion para mostrar historial
function mostrarHistorial(tipo) {
    document.getElementById("historial").style.display = "block";
    const historial = cargarHistorial(tipo);
    let historialHTML = `<h2>Historial de ${tipo}</h2>`;
    if (historial.productos.length > 0) {
        historialHTML += "<ul>";
        historial.productos.forEach((producto) => {
            historialHTML += `
                <li>
                    Codigo: ${producto.codigo}<br>
                    Nombre: ${producto.nombre}<br>
                    Descripcion: ${producto.descripcion}<br>
                    Precio: ${producto.precio}<br>
                    Categoria: ${producto.categoria}<br><br>
                </li>
            `;
        });
        historialHTML += "</ul>";
    } else {
        historialHTML += "No hay productos en el historial.";
    }

    // Mostrar el historial en un elemento HTML
    document.getElementById("historial").innerHTML = historialHTML;
}
//Defino array princiapl
let articulos = [];

//Carga de Array
articulos.push(new Productos({codigo:1, nombre:"teclado", descripcion:"K90", precio:20000, categoria:"perifericos"}));
articulos.push(new Productos({codigo:2, nombre:"mouse", descripcion:"M90", precio:10000, categoria:"perifericos"}));
articulos.push(new Productos({codigo:3, nombre:"monitor", descripcion:"S90", precio:120000, categoria:"hardware"}));
articulos.push(new Productos({codigo:4, nombre:"monitor", descripcion:"S90", precio:120000, categoria:"gaming"}));



//Funcion para listar prodcutos

function listarProductos() {
    const contenedor = document.getElementById("resultadoDeOpciones");
    contenedor.innerHTML = ""; // Limpia el contendor actual
    let detalles = `<h2>Articulos</h2><table>
    <tr>
        <th><b>Codigo<b></th>
        <th><b>Nombre<b></th>
        <th><b>Descripcion<b></th>
        <th><b>Precio<b></th>
        <th><b>Categoria<b></th>
        <th><b>Nuevo Precio<b></th>
        <th><b>Actualizar Precio<b></th>
    </tr>`;
    articulos.forEach((articulo) => 
    {
        detalles += `
        <tr>
            <td>${articulo.codigo}</td>
            <td>${articulo.nombre}</td>
            <td>${articulo.descripcion}</td>
            <td>${articulo.precio}$</td>
            <td>${articulo.categoria}</td>
            <td><input type="number" id="nuevoPrecio-${articulo.codigo}" placeholder="${articulo.precio}$"></td>
            <td><button type="button" class="actualizar-button" data-codigo="${articulo.codigo}">Actualizar</button></td>
        </tr>
        `;
    });
    detalles += `</table>`;
    contenedor.innerHTML = detalles;

    // Agregar un evento de clic a los botones "Actualizar"
    const botonesActualizar = document.querySelectorAll(".actualizar-button");
    botonesActualizar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombreProducto = boton.getAttribute("data-codigo");
            precioActualizar (nombreProducto);
        });
    });
}
function precioActualizar (nombreProducto) {
  actualizarTabla = document.getElementById (`nuevoPrecio-${nombreProducto}`);
 articulos.forEach(articulos => {

    if (actualizarTabla == articulos.codigo) {
        articulos.codigo = actualizarTabla;
        
    }
 });

}

function precioActualizar(nombreProducto) {
    const actualizarTabla = document.getElementById(`nuevoPrecio-${nombreProducto}`);
    const nuevoPrecio = parseFloat(actualizarTabla.value);

    if (!isNaN(nuevoPrecio)) {
        const productoActualizado = articulos.find((articulo) => articulo.codigo == nombreProducto);
        
        
        if (productoActualizado) {
            const errorPrecio = document.getElementById ('historial');
            errorPrecio.innerHTML ='';
            productoActualizado.precio = nuevoPrecio;
            // Vuelve a mostrar la tabla actualizada
            listarProductos();
        }
    } else {
    const errorPrecio = document.getElementById ('historial');
    errorPrecio.innerHTML ='';
    errorPrecio.innerHTML = '<p>Precio ingresado no válido.</p>';
    }
}



// Obtén todas las categorías únicas de tu array de productos
const categoriasUnicas = [...new Set(articulos.map((producto) => producto.categoria))];

// Crea el elemento select (dropdown) y agrega las opciones dinamicamente
const categoriaFiltro = document.getElementById("categoriaFiltro");

categoriasUnicas.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    categoriaFiltro.appendChild(option);
});

// Agrega un evento al botón "Filtrar"
const filtrarBtn = document.getElementById("filtrarBtn");
filtrarBtn.addEventListener("click", () => {
    filtrarPorCategoria();
});

// Función para filtrar productos por categoría
function filtrarPorCategoria() {
    const categoriaSeleccionada = categoriaFiltro.value;
    const contenedor = document.getElementById("resultadoDeOpciones");
    contenedor.innerHTML = ""; // Limpia el contenedor actual
    

    let detalles = `<h2>Articulos</h2><table>
        <tr>
            <th><b>Codigo</b></th>
            <th><b>Nombre</b></th>
            <th><b>Descripcion</b></th>
            <th><b>Precio</b></th>
            <th><b>Categoria</b></th>
            <th><b>Nuevo Precio</b></th>
            <th><b>Actualizar Precio</b></th>
        </tr>`;

    let productosFiltrados = articulos;

    if (categoriaSeleccionada !== "todos") {
        productosFiltrados = articulos.filter((producto) => producto.categoria === categoriaSeleccionada);
    }

    productosFiltrados.forEach((articulo) => {
        detalles += `
            <tr>
                <td>${articulo.codigo}</td>
                <td>${articulo.nombre}</td>
                <td>${articulo.descripcion}</td>
                <td>${articulo.precio}$</td>
                <td>${articulo.categoria}</td>
                <td><input type="number" id="nuevoPrecio-${articulo.codigo}" placeholder="${articulo.precio}$"></td>
                <td><button type="button" class="actualizar-button" data-codigo="${articulo.codigo}">Actualizar</button></td>
            </tr>
        `;
    });

    detalles += `</table>`;
    contenedor.innerHTML = detalles;

    // Agregar un evento de clic a los botones "Actualizar"
    const botonesActualizar = document.querySelectorAll(".actualizar-button");
    botonesActualizar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombreProducto = boton.getAttribute("data-codigo");
            precioActualizar(nombreProducto);
        });
    });
}




listarProductos();

