
//creo una clase producto con sus atributos
class Producto 
{
    constructor(nombre,precio,talle,color,imagen)
    {
        this.nombre = nombre
        this.precio = precio
        this.talle = talle
        this.color = color
        this.imagen = imagen
    }
}

//creo una funcion para al hacer click en aniadir al carrito, se creo un objeto producto con los atributos del producto seleccionado
function ObtenerProducto() 
{
  
        const nombre = document.getElementById("NombreProducto").textContent
        const precioantesde$ = document.getElementById("PrecioProducto").textContent
        const precio = parseFloat(precioantesde$.replace('$','').trim())
        const talle = document.querySelector('input[name="option"]:checked')?.value
        const color = document.querySelector('input[name="optioncolor"]:checked')?.value
        const imagen = document.getElementById("imagencompracarrito").src

        if(talle == null || color == null)
        {
            alert("Complete todos los campos")
            return null
        }
        return new Producto(nombre,precio,talle,color,imagen);
  

}
//guardo los objetos productos con sus atributos en localstorage
function GuardarProductoEnLocalStorage(producto)
{
    // ve si hay un array ya con productos previos sino crea uno
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    
    productos.push(producto); // agrega el nuevo producto al array

    // guarda el array actuazlisado en localstorage
    localStorage.setItem('productos', JSON.stringify(productos));
}

const BotonAniadirCarrito = document.getElementById("botonaniadircarrito")

BotonAniadirCarrito.addEventListener("click",function()

{
       const NuevoProducto = ObtenerProducto();
       if(NuevoProducto)
       {
        GuardarProductoEnLocalStorage(NuevoProducto)
        console.log("Nuevo producto añadido:", NuevoProducto)
        alert('Producto Añadido al Carrito')
       }
}

)



// Función para verificar y mostrar productos en el carrito lo ejecuto en onclick en el archivo html porque por eventlistener nose porque no me dejo
function verificarProductosEnLocalStorage() {

    
    const productos = JSON.parse(localStorage.getItem("productos"));
    const titulo = document.getElementById("productoscarrito");
    const listaProductos = document.getElementById("listaproductos");
    const precioFinal = document.getElementById("preciofinal");
    if (productos != null) {
   
        var contadorprecio = 0;
        var contadorproductos = productos.length;

        titulo.textContent = "Tienes " + contadorproductos + " productos en el carrito!";

        listaProductos.innerHTML = "";
        productos.forEach((producto, index) => {
            const li = document.createElement("li");
            const img = document.createElement("img")
            img.src = producto.imagen
            img.style.width = "200px"
            img.style.height = "200px"
            li.textContent = `Producto ${index + 1}: Nombre: ${producto.nombre}, Precio: $${producto.precio}, Talle: ${producto.talle}, Color: ${producto.color} `;
            listaProductos.appendChild(li);

            contadorprecio += parseFloat(producto.precio);
        });

        precioFinal.textContent = "El precio final es de: $"+ contadorprecio;

    } else {
        titulo.textContent = "Nada seleccionado para comprar";
    }
}



// Borrar arts del carrito

document.getElementById("borrarcarrito")

function VaciarCarrito()
{
    localStorage.removeItem("productos")
    verificarProductosEnLocalStorage()
    const precioFinal = document.getElementById("preciofinal");
    precioFinal.textContent = "";
    const lista = document.getElementById("listaproductos"); 
    const primerLi = lista.querySelector("li"); 
    if (primerLi) {
    lista.removeChild(primerLi); 
}
}

//API pokemon random

// URL base de pokeapi
const urlpokeapi = "https://pokeapi.co/api/v2/pokemon/";

// creo una funcion en donde se busca en la api, los atributos del pokemon que quiera usando una funcion que genera numeros randoms de id
function obtenerPokemonRandom() {
    
    const randomId = Math.floor(Math.random() * 898) + 1;

    
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`)
        .then((response) => {
            // verifica si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then((pokemon) => {
            // Mostrar los pokemones
            document.getElementById("nombrePokemon").textContent = `Nombre: ${pokemon.name}`;
            document.getElementById("imagenPokemon").src = pokemon.sprites.front_default;
            document.getElementById("atributosPokemon").textContent = `Altura: ${pokemon.height}cm | Peso: ${pokemon.weight}kg`;
        })
        // uso catch por si hay un error
        .catch((error) => {
            console.error("Error al obtener el Pokémon:", error);
            document.getElementById("nombrePokemon").textContent = "Error al obtener el Pokémon. Intenta de nuevo.";
        });
}


