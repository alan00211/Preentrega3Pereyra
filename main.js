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


//Eventos para botones
   // Boton "Enviar"
    const enviarBtn = document.getElementById("opcionBtn");
    enviarBtn.addEventListener("click", () =>{
        opcion();
    });
    // Boton "Enviar" en la seccion Actualizar
    const actualizarBtn = document.getElementById("actualizarBtn");
    actualizarBtn.addEventListener("click", () =>{
        actualizarPrecio();
    });
    // Boton "Historial de Actualizar"
    const historialActualizarBtn = document.getElementById("historialActualizarBtn");
    historialActualizarBtn.addEventListener("click", () =>{
        mostrarHistorial('actualizar');
    });
    // Boton "Enviar" en la seccion Filtrar
    const filtrarBtn = document.getElementById("filtrarBtn");
    filtrarBtn.addEventListener("click", () =>{
        filtrarPorCategoria();
 });
    // Boton "Historial de Filtrar"
    const historialFiltrarBtn = document.getElementById("historialFiltrarBtn");
    historialFiltrarBtn.addEventListener("click", () =>{
    mostrarHistorial('filtrar');
});

//Codigo para historales

// Variables para el historial
let historialActualizar = {
    tipo: 'actualizar',
    productos: [],
};

let historialFiltrar = {
    tipo: 'filtrar',
    productos: [],
};

// Funcion para cargar el historial desde localStorage
function cargarHistorial(tipo) {
    const historialJSON = localStorage.getItem(`historial${tipo}`);
    if (historialJSON) {
        return JSON.parse(historialJSON);
    } else {
        return { tipo, productos: [] }; // Si no hay historial en localstorage, crea uno vacio
    }
}

// Funcion para guardar el historial en localstroage
function guardarHistorial(tipo, historial) {
    localStorage.setItem(`historial${tipo}`, JSON.stringify(historial));
}

// Cargar historiales al inicio
historialActualizar = cargarHistorial('actualizar');
historialFiltrar = cargarHistorial('filtrar');

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

function opcion() {
    let opcionSeleccionada = parseInt(document.getElementById("opcion").value);// Convierte a numero entero
    // Oculta todos los elementos
    document.getElementById("resultadoDeOpciones").style.display = "none";
    document.getElementById("actualizar").style.display = "none";
    document.getElementById("filtrar").style.display = "none";
    document.getElementById("historial").style.display = "none";
    // Muestra el resultado de la opcion seleccionada
    if (opcionSeleccionada === 1) {
        document.getElementById("resultadoDeOpciones").style.display = "block";
        listarProductos();
    } else if (opcionSeleccionada === 2) {
        document.getElementById("actualizar").style.display = "block";

    } else if (opcionSeleccionada === 3) {
        document.getElementById("filtrar").style.display = "block";
    }
}

//Defino array princiapl
let articulos = [];

//Carga de Array
articulos.push(new Productos({codigo:1, nombre:"teclado", descripcion:"K90", precio:20000, categoria:"perifericos"}));
articulos.push(new Productos({codigo:2, nombre:"mouse", descripcion:"M90", precio:10000, categoria:"perifericos"}));
articulos.push(new Productos({codigo:3, nombre:"monitor", descripcion:"S90", precio:120000, categoria:"hardware"}));





//Funcion para listar prodcutos

function listarProductos() {
    const contenedor = document.getElementById("resultadoDeOpciones");
    contenedor.innerHTML = ""; // Limpia el contendor actual

    // if (articulos.length === 0) {
    //     contenedor.innerHTML = "No hay articulos disponibles.";
    // } else {
    let detalles = "<h2>Detalles de todos los articulos:</h2><ul>";
    articulos.forEach((articulo, item) => 
    {
        detalles += `<li><strong>Articulo ${item + 1}:</strong><br>
                Codigo: ${articulo.codigo}<br>
                Nombre: ${articulo.nombre}<br>
                Descripcion: ${articulo.descripcion}<br>
                Precio: ${articulo.precio}<br>
                Categoria: ${articulo.categoria}<br><br></li>`;
    });
        detalles += "</ul>";
        contenedor.innerHTML = detalles;
    }
// }

function actualizarPrecio() {
    document.getElementById("resultadoDeOpciones").style.display = "block";    //Muestra el contenedor
    let nombreProducto = document.getElementById("actualizarTxt").value.toLowerCase();
    let nuevoPrecio = document.getElementById("nuevoPrecio").value;
    nuevoPrecio = parseFloat(nuevoPrecio);
    let productoActualizado = articulos.find((item) => item.nombre === nombreProducto);

    if (productoActualizado) 
    {
        if (!isNaN(nuevoPrecio)) {
            productoActualizado.precio = nuevoPrecio;
            // Mostrar el resultado de la actualizacion en el elemento HTML
            document.getElementById("resultadoDeOpciones").innerHTML = `
                Codigo: ${productoActualizado.codigo}<br>
                Nombre: ${productoActualizado.nombre}<br>
                Descripcion: ${productoActualizado.descripcion}<br>
                Precio: ${productoActualizado.precio}<br>
                Categoria: ${productoActualizado.categoria}<br>
            `;
            // Agregar el producto actual al historial de actualizar
            historialActualizar.productos.push(productoActualizado);
            // Guardar el historial en localStorage
            guardarHistorial('actualizar', historialActualizar);
        } else {
            document.getElementById("resultadoDeOpciones").innerHTML = "Precio ingresado no valido.";
        }
    } else {
        document.getElementById("resultadoDeOpciones").innerHTML = "Producto no encontrado.";
    }
}

function filtrarPorCategoria() {
    document.getElementById("resultadoDeOpciones").style.display = "block"; //Muestra el contenedor
    let nombreCategoria = document.getElementById("filtrarTxt").value.toLowerCase();
    if (nombreCategoria.trim() === "") {
        document.getElementById("resultadoDeOpciones").innerHTML = "Por favor, ingrese un nombre de categoria.";
        return; // Salir de la funcion si no se ingreso a una categoria
    }
    let categoriaListada = articulos.filter((item) => item.categoria === nombreCategoria);
    if (categoriaListada.length > 0) {
        let resultadoHTML = "";
        categoriaListada.forEach((item) => {
            resultadoHTML += `
                Codigo: ${item.codigo}<br>
                Nombre: ${item.nombre}<br>
                Descripcion: ${item.descripcion}<br>
                Precio: ${item.precio}<br><br><br>`;
        });
        // Agregar los productos filtrados al historial de filtrar
        historialFiltrar.productos = categoriaListada;
        // Guardar el historial en localStorage
        guardarHistorial('filtrar', historialFiltrar);
        document.getElementById("resultadoDeOpciones").innerHTML = resultadoHTML;
    } else {
        document.getElementById("resultadoDeOpciones").innerHTML = "No se encontraron productos en esta categoria.";
    }
}

listarProductos();