// Constructor
class Productos {
    constructor(info) {
        this.codigo = info.codigo;
        this.nombre = info.nombre;
        this.descripcion = info.descripcion;
        this.precio = info.precio;
        this.categoria = info.categoria;
    }
}

// Función para cargar productos desde un archivo JSON local
function cargarProductosDesdeJSON() {
    return fetch('productos.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            return response.json();
        })
        .then((data) => {
            return data.map((productoInfo) => new Productos(productoInfo));
        });
}

// Defino array principal
let articulos = [];

// Cargar productos desde JSON y luego listarlos
cargarProductosDesdeJSON()
    .then((productos) => {
        articulos = productos;
        generarOpcionesDeCategoria();
        listarProductos();
    });

// Función para listar productos
function listarProductos() {
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
    articulos.forEach((articulo) => {
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

// Función para actualizar el precio de un producto
function precioActualizar(nombreProducto) {
    const actualizarTabla = document.getElementById(`nuevoPrecio-${nombreProducto}`);
    const nuevoPrecio = parseFloat(actualizarTabla.value);

    if (!isNaN(nuevoPrecio)) {
        const productoActualizado = articulos.find((articulo) => articulo.codigo == nombreProducto);

        if (productoActualizado) {
            productoActualizado.precio = nuevoPrecio;
            // Vuelve a mostrar la tabla actualizada
            Swal.fire({
                icon: 'success',
                title: 'Producto Actualizado',
                showConfirmButton: false,
                timer: 800
            });
            listarProductos();
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El precio ingresado no es válido',
        });
    }
}

// Obtén todas las categorias unicas de tu array de productos
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

// Funcion para filtrar productos por categoria
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

// Obtén el elemento de entrada de texto y el boton de búsqueda
const productoBusquedaInput = document.getElementById("productoBusqueda");
const buscarBtn = document.getElementById("buscarBtn");

// Agregar un evento input al campo de entrada de texto
productoBusquedaInput.addEventListener("input", () => {
    const terminoBusqueda = productoBusquedaInput.value.toLowerCase().trim();

    // Filtrar los productos que coinciden con el termino de busqueda
    const productosFiltrados = articulos.filter((producto) => {
        const nombreProducto = producto.nombre.toLowerCase();
        return nombreProducto.includes(terminoBusqueda);
    });

    // Mostrar los productos filtrados en la tabla en tiempo real
    mostrarProductosFiltrados(productosFiltrados);
})

// Funcion para mostrar los productos filtrados en la tabla
function mostrarProductosFiltrados(productos) {
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

    productos.forEach((articulo) => {
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

    // Agregar un evento de clic a los botones "Actualizar" de los productos filtrados
    const botonesActualizar = document.querySelectorAll(".actualizar-button");
    botonesActualizar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombreProducto = boton.getAttribute("data-codigo");
            precioActualizar(nombreProducto);
        });
    });
}

// Funcion para generar las opciones de categoria
function generarOpcionesDeCategoria() {
    const categoriasUnicas = [...new Set(articulos.map((producto) => producto.categoria))];
    const categoriaFiltro = document.getElementById("categoriaFiltro");

    // Elimina las opciones existentes (en caso de que las haya)
    categoriaFiltro.innerHTML = "";

    // Agregar la opción "todos" al principio
    const optionTodos = document.createElement("option");
    optionTodos.value = "todos";
    optionTodos.textContent = "Todos";
    categoriaFiltro.appendChild(optionTodos);

    // Crea y agrega las nuevas opciones de categoría
    categoriasUnicas.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        categoriaFiltro.appendChild(option);
    });
}

// Llama a la funcion para listar los productos al cargar la pagina
listarProductos();
