//Validacion

function validaCiclo(ciclo) 
{
    while (ciclo<=0 || ciclo>2) 
    {
        alert ("Opcion incorrecta");
        ciclo=parseInt(prompt ("Ingrese una opcion valida (1 o 2)"));
    }
    return ciclo;
}

function validaOpcion(opcion) 
{
    while (opcion<=0 || opcion>3) 
    {
        alert ("Opcion incorrecta");
        opcion=parseInt(prompt ("Ingrese una opcion valida (1 o 3)"));
    }
    return opcion;
}
//Contructor de objetos

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

// Aplicacion
let ciclo=0;

//Defino array
let articulos = [];
alert ("Ingrese los datos de los siguientes productos");

//Carga de objetos
articulos.push (new Productos ({codigo:parseInt(prompt("Ingrese el codigo")),nombre:prompt("Ingrese el Nombre"),descripcion:prompt("Ingrese la descripcion"),
precio:parseInt(prompt("Ingrese el precio $:")),categoria:prompt("Ingrese la categoria")}));

articulos.push (new Productos ({codigo:parseInt(prompt("Ingrese el codigo")),nombre:prompt("Ingrese el Nombre"),descripcion:prompt("Ingrese la descripcion"),
precio:parseInt(prompt("Ingrese el precio$:")),categoria:prompt("Ingrese la categoria")}));

articulos.push (new Productos ({codigo:parseInt(prompt("Ingrese el codigo")),nombre:prompt("Ingrese el Nombre"),descripcion:prompt("Ingrese la descripcion"),
precio:parseInt(prompt("Ingrese el precio$:")),categoria:prompt("Ingrese la categoria")}));
//Inicio del ciclo de las operaciones de la aplicacion (se excluye la carga de articulos del ciclo para evitar cargarlos nuevamente cada vez que se prueba una funcionalidad)
while (ciclo!=2) 
{   
    let listar = parseInt (prompt (`Ingrese opcion:
     1- Listar los precios de un producto 
     2- Actualizar el precio de un producto
     3- Filtrar por categoria`));
    listar=validaOpcion(listar);

    if (listar===1) 
    {
        let nombreProducto = prompt ("Ingrese le nombre del producto que quiere listar");
        let productoListado = articulos.find ((item)=> item.nombre === nombreProducto);
        alert (`Codigo: ${productoListado.codigo}
        Nombre: ${productoListado.nombre}
        Descripcion: ${productoListado.descripcion}
        Precio: ${productoListado.precio}
        Categoria: ${productoListado.categoria}`);
    }
    else 
    {
        if (listar===2) 
        {
        let nombreProducto = prompt ("Ingrese le nombre del producto que quiere actualizar su precio");
        let productoActualizado = articulos.find ((item)=> item.nombre === nombreProducto);
        productoActualizado.precio= prompt (`El precio actual del producto ${productoActualizado.nombre} es: $${productoActualizado.precio} ingrese el nuevo precio:`)
        alert (`El nuevo precio de producto ${productoActualizado.nombre} es: $${productoActualizado.precio}`);  
            
        }
        else
        {
            let nombreCategoria = prompt ("Ingrese le nombre de la categoria que quiere filtrar");
            let categoriaListada = articulos.filter ((item)=> item.categoria == nombreCategoria);
            categoriaListada.forEach((item) => {
                alert(`Codigo: ${item.codigo}
            Nombre: ${item.nombre}
            Descripcion: ${item.descripcion}
            Precio: ${item.precio}`);
            });
        } 
    }

    ciclo=parseInt (prompt ("Ingrese opcion 1 para volver a ejecutar la aplicacion u opcion 2 para finalizar"));
    ciclo= validaCiclo (ciclo);
    
}

alert (`Aplicacion Finalizada`);