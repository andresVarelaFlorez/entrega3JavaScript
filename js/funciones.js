const productos = [
    {id:1, nombre:"Arroz diana 12500g", imagen:"https://exitocol.vtexassets.com/arquivos/ids/21030006/Arroz-Blanco-Arroba-12500-gr-256676_a.jpg?v=638410372337570000", descripcion:"Arroz blanco para la canasta familiar", precio:53300, categoria:"granos"},
    {id:2, nombre:"Arroz diana 10000g", imagen:"https://exitocol.vtexassets.com/arquivos/ids/21412638/Arroz-Diana-10-Kilos-X-1000-gr-490777_a.jpg?v=638427351940370000", descripcion:"Arroz blanco para la canasta familiar", precio:47900, categoria:"granos"},
    {id:3, nombre:"Arroz diana 5000g", imagen:"https://exitocol.vtexassets.com/arquivos/ids/21412653/Arroz-Diana-5000-gr-814670_a.jpg?v=638427351953670000", descripcion:"Arroz blanco para la canasta familiar", precio:23950, categoria:"granos"},
    {id:4, nombre:"Arroz diana 3000g", imagen:"https://exitocol.vtexassets.com/arquivos/ids/21412654/Arroz-Blanco-Bolsa-X-3000g-130407_a.jpg?v=638427351966970000", descripcion:"Arroz blanco para la canasta familiar", precio:15550, categoria:"granos"},
    {id:5, nombre:"Arroz diana 1000g", imagen:"https://exitocol.vtexassets.com/arquivos/ids/21412734/Arroz-Diana-1000-gr-552155_a.jpg?v=638427352316300000", descripcion:"Arroz blanco para la canasta familiar", precio:4600, categoria:"granos"},
    {id:6, nombre:"Arroz diana 500g", imagen:"https://exitocol.vtexassets.com/arquivos/ids/21412653/Arroz-Diana-5000-gr-814670_a.jpg?v=638427351953670000", descripcion:"Arroz blanco para la canasta familiar", precio:2150, categoria:"granos"},
    {id:7, nombre:"Aceite diana 3000 ml", imagen:"https://www.exito.com/_next/image?url=https%3A%2F%2Fexitocol.vtexassets.com%2Farquivos%2Fids%2F13175751%2FAceite-Diana-Vitaminas-X3000ml-1278720_a.jpg%3Fundefined%26width%3D150%26height%3D150%26aspect%3Dtrue%3Fv%3D637899519415570000&w=256&q=75", descripcion:"Aceite con vitaminas", precio:32400, categoria:"aceites"},
    {id:8, nombre:"Aceite diana 2000 ml", imagen:"https://www.supercompras.com.co/wp-content/uploads/2021/03/Aceite-Diana-2000-ml.jpg", descripcion:"Aceite con vitaminas", precio:19300, categoria:"aceites"},
    {id:9, nombre:"Aceite diana 900 ml", imagen:"https://exitocol.vtexassets.com/arquivos/ids/13178971/Aceite-diana-x-900-ml-1309700_a.jpg?v=637899867241730000", descripcion:"Aceite con vitaminas", precio:10500, categoria:"aceites"}
];

const guardarProductosLS = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const obtenerProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const guardarCarritoLS = (productos) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

const obtenerCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const obtenerIdProductoLS = () => {
    return JSON.parse(localStorage.getItem("producto")) || 0;
}

const obtenerIdCategoriaLS = () => {
    return JSON.parse(localStorage.getItem("categoria")) || "todos";
}

const cantTotalProductos = () => {
    const carrito = obtenerCarritoLS();

    return carrito.length;
}

const sumaTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    
    return carrito.reduce((acumulador, item) => acumulador += item.precio, 0);
}

const eliminarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
    notificacion("Carrito Eliminado!");
}

const verProducto = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const verProductosPorCategoria = (id) => {
    localStorage.setItem("categoria", JSON.stringify(id));
}

const buscarProducto = () => {
    const productos = obtenerProductosLS();
    const id = obtenerIdProductoLS();
    const producto = productos.find(item => item.id === id);

    return producto;
}

const agregarProductoCarrito = () => {
    const producto = buscarProducto();
    const carrito = obtenerCarritoLS();
    carrito.push(producto);
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    notificacion("Producto Agregado!");
}

const eliminarProductoCarrito = (id) => {
    const carrito = obtenerCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    notificacion("Producto Eliminado!");
}

const renderBotonCarrito = () => {
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

const finalizarCompra = () => {
    Swal.fire({
        title: "Gracias por la Compra!",
        text: "El total a pagar es $" + sumaTotalProductos() + " COP.",
        imageUrl: "https://www.themarkethink.com/wp-content/uploads/2020/08/mi-tienda-online-belcorp.jpg",
        imageWidth: 160,
        /*imageAlt: "Burger King",*/
        showCancelButton: true,
        /*confirmButtonColor: "#3085d6",*/
        confirmButtonColor: "#85C1E9 ",
        /*cancelButtonColor: "#d33",*/
        cancelButtonColor: "#E59866 ",
        confirmButtonText: "Aceptar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCarrito();
            }
        });
}

const notificacion = (texto) => {
    Swal.fire({
        position: "top-end",
        title: texto,
        showConfirmButton: false,
        timer: 1000
    });
}

guardarProductosLS(productos);