
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


if (document.getElementById("botonaniadircarrito") != null)
{
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
}


function CambiarResolucion()
{
    const CarritoHeight = document.getElementById("carritocontenedor")
    CarritoHeight.style.height = "auto";    
}


// Función para verificar y mostrar productos en el carrito lo ejecuto en onclick en el archivo html porque por eventlistener nose porque no me dejo
function verificarProductosEnLocalStorage() {

    

    const productos = JSON.parse(localStorage.getItem("productos"));
    const titulo = document.getElementById("productoscarrito");
  /*  const listaProductos = document.getElementById("listaproductos"); */
    const precioFinal = document.getElementById("preciofinal");
    const divElement = document.querySelector(".productosjsoncontenedor");
    if (productos != null) {
   
        var contadorprecio = 0;
        var contadorproductos = productos.length;

        titulo.textContent = "Tienes " + contadorproductos + " productos en el carrito!";

        
        if(productos.length > 2)
        {
            CambiarResolucion()
        }

        productos.forEach((producto) => {
            
            /*const DivProductoContenedor = document.createElement("div")
            DivProductoContenedor.classList.add("productomostradoencarrito");
            divElement.appendChild(DivProductoContenedor)

            const DivContenedorImagen = document.createElement("div")
            DivContenedorImagen.classList.add("contenedorimagenproductos")

            const DivTextoProductos = document.createElement("div")
            DivTextoProductos.classList.add("contenedortextoproductos")

            const DivTotalAislado = document.createElement("div")
            DivTotalAislado.classList.add("contenedortotalaislado")
            
            DivProductoContenedor.appendChild(DivTotalAislado)
            DivProductoContenedor.appendChild(DivTextoProductos)
            DivProductoContenedor.appendChild(DivContenedorImagen) */
            


            
           /* const img = document.createElement("img")
            img.src = producto.imagen
            img.alt = "Producto Imagen"
            img.style.width = "200px"
            img.style.height = "200px"
            DivContenedorImagen.appendChild(img) */

            /*const nombreprod = document.createElement("p");
            const precioprod = document.createElement("p");
            const talleprod = document.createElement("p");
            const colorprod = document.createElement("p");

            

            nombreprod.textContent = `${producto.nombre}`;
            precioprod.textContent = `$${producto.precio} `;
            talleprod.textContent = `Talle: ${producto.talle}`;
            colorprod.textContent = `Color: ${producto.color} `;
            
            DivTextoProductos.appendChild(nombreprod);
            DivTextoProductos.appendChild(precioprod);
            DivTextoProductos.appendChild(talleprod);
            DivTextoProductos.appendChild(colorprod); */

           /* DivContenedorImagen.insertAdjacentHTML("beforeend", 
                `<img src="${producto.imagen}" alt="${producto.nombre}" style="width: 200px; height: 200px; object-fit: cover;">`)
            

            DivTextoProductos.insertAdjacentHTML("beforeend", 
                `<p> ${producto.nombre} </p>
                <p> ${producto.precio} </p>
                <p> ${producto.talle} </p>
                <p> ${producto.color} </p>`) 



            
            DivTotalAislado.insertAdjacentHTML ("beforeend", 
                `<p>$${producto.precio} </p>`)  */  
           divElement.insertAdjacentHTML("afterend", 
            `
            <div class="productomostradoencarrito">

                    <div class="contenedortotalaislado">
                    <p>$${producto.precio} </p>
                    </div>

                    <div class="contenedortextoproductos">
                    <p> ${producto.nombre} </p>
                    <p> $${producto.precio}</p>
                    <p> Talle: ${producto.talle} </p>
                    <p> Color: ${producto.color} </p>
                    </div>

                    <div class="contenedorimagenproductos"><img src=${producto.imagen} alt="${producto.nombre}" style="width: 200px; height: 200px; object-fit: cover;"></div>
            </div>
            `)


            

            contadorprecio += parseFloat(producto.precio);
        });

        precioFinal.textContent = "El precio final es de: $"+ contadorprecio.toFixed(2);

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




if (window.location.pathname.endsWith("carrito.html")) 

    {
        document.addEventListener("DOMContentLoaded", () => {
            
            verificarProductosEnLocalStorage();
            console.log("Hola")

        });
    }