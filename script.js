
//creo una clase producto con sus atributos
class Producto 
{
    constructor(nombre,precio,talle,color,imagen,cantidad,id)
    {
        this.nombre = nombre
        this.precio = precio
        this.talle = talle
        this.color = color
        this.imagen = imagen
        this.cantidad = cantidad
        this.id = id
    }
}

//creo una funcion para al hacer click en aniadir al carrito, se creo un objeto producto con los atributos del producto seleccionado
function ObtenerProducto() 
{
        let productos = JSON.parse(localStorage.getItem('productos'))

        const nombre = document.getElementById("NombreProducto").textContent
        const precioantesde$ = document.getElementById("PrecioProducto").textContent
        const precio = parseFloat(precioantesde$.replace('$','').trim())
        const talle = document.querySelector('input[name="option"]:checked')?.value
        const color = document.querySelector('input[name="optioncolor"]:checked')?.value
        const imagen = document.getElementById("imagencompracarrito").src
        const cantidad = 1
        let id = 0
        if(productos !== null)
        {
            id = (productos.length)
        }
        else
        {
            id = 0
        }
        

        if(talle == null || color == null)
        {
            alert("Complete todos los campos")
            return null
        }   
        return new Producto(nombre,precio,talle,color,imagen,cantidad,id);
  

}

function Productorepetido()
{
    alert("Producto Repetido")
}
//guardo los objetos productos con sus atributos en localstorage
function GuardarProductoEnLocalStorage(producto)
{
    // ve si hay un array ya con productos previos sino crea uno
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    

    const esRepetido = productos.some((productoforeach) => {
        return (
            productoforeach.nombre === producto.nombre &&
            productoforeach.talle === producto.talle &&
            productoforeach.color === producto.color
        );
    });

    if (esRepetido) {
        Productorepetido();
    } else {
        
        productos.push(producto);   
        
        localStorage.setItem('productos', JSON.stringify(productos));
        alert("Producto agregado con éxito");
    }

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

       }
    }

)
}


function CambiarResolucionAuto()
{
    const CarritoHeight = document.getElementById("carritocontenedor")
    CarritoHeight.style.height = "auto";    
}
function CambiarResolucionDefault()
{
    const CarritoHeight = document.getElementById("carritocontenedor")
    CarritoHeight.style.height = "700px";    
}



function verificarProductosEnLocalStorage() {

    

    const productos = JSON.parse(localStorage.getItem("productos"));
    const titulo = document.getElementById("productoscarrito");

    const precioFinal = document.getElementById("preciofinal");
    const divElement = document.querySelector(".productosjsoncontenedor");

    const labelsproducto = document.querySelector(".contenedorlabelscarrito")


    if (productos != null) {
   
        var contadorprecio = 0;

        
        if(productos.length > 2)
        {
            CambiarResolucionAuto()
        }
        
        labelsproducto.innerHTML=  ` 
                        <span class="labelscarrito" id="labelproducto">Producto</span>
                        <span class="labelscarrito" id="labelcantidad">Cantidad</span>
                        <span class="labelscarrito" id="labelsubtotal">Subtotal</span> `

        divElement.innerHTML = ""
        productos.forEach((producto, id) => {
           


            

            divElement.insertAdjacentHTML("beforeend", 
                `
                
                    <div class="productomostradoencarrito" id="producto${producto.id}">
            
                            <div class="contenedorimagenproductos"><img src=${producto.imagen} alt="${producto.nombre}" style="width: 200px; height: 200px; object-fit: cover;"></div>
            
                            <div class="contenedortextoproductos">
                            <p class="productonombrecarritop"> ${producto.nombre} </p>
                            <p> $${producto.precio}</p>
                            <p> Talle: ${producto.talle} </p>
                            <p> Color: ${producto.color} </p>
                            </div>
                            <div class="contenedorbotoncontador"> 
                                <div class="botonficticio"> 
                                    <input type="button" class="botoncantidadrestar" id="${producto.id}" value="-" >
                                    <input type="number" value="${producto.cantidad}" class="numerocantidad" id="ContadorInput${producto.id}" min = "1" >
                                    <input type="button" class="botoncantidadsumar" id="${producto.id}" value="+" >
                                </div>

                                <button class="botonesborrarstyle" id="trash${producto.id}"><img src="trash_bin_icon-icons.com_67981.svg" alt="Borrar"></button>
                            </div>
        
                            <div class="contenedortotalaislado">
                                <p id="PrecioCantidades${producto.id}">$${(producto.precio * producto.cantidad).toFixed(2)} </p>
                            </div>
                                
                    </div>
                
                 `)
            
           

            
           
            contadorprecio += parseFloat(producto.precio * producto.cantidad);
        });

        precioFinal.textContent = "Subtotal (sin envio): $"+ contadorprecio.toFixed(2);

        let preciofinalfinal = document.getElementById("preciofinalfinal")
        preciofinalfinal.innerHTML = `Precio Total: $${(contadorprecio).toFixed(2)}`


            if(productos.length === 0)
            {
                checkoutderecha = document.querySelector(".preciofinalclase")
                labelsproducto.innerHTML = ""
                divElement.innerHTML = "<h2>No hay productos para mostrar</h2>"

                checkoutderecha.innerHTML = ""
    
            }
        
    } 

    
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", function (event) {
        if (event.target && event.target.classList && event.target.classList.contains("botoncantidadsumar")) {
            const botonId = event.target.id;
            
            console.log("funca")
    
   
        const productos = JSON.parse(localStorage.getItem("productos"));

        const preciofinal = document.getElementById("preciofinal")
        let cantidadcontador =0
        let contadorprecio = 0

            productos.forEach((producto, indice) => {


                if(botonId == producto.id)
                {
                    producto.cantidad += 1
                    cantidadcontador = producto.cantidad

                    document.getElementById(`ContadorInput${producto.id}`).value = cantidadcontador

                    let precioactualizado = (producto.precio * cantidadcontador).toFixed(2);
                    document.getElementById(`PrecioCantidades${producto.id}`).textContent = `$${precioactualizado}`;

                    
                }
                contadorprecio += parseFloat(producto.precio * producto.cantidad);
            });
        
            localStorage.setItem('productos',JSON.stringify(productos))

            preciofinal.textContent = "Subtotal (sin envio): $"+ contadorprecio.toFixed(2);


            
            let preciofinalfinal = document.getElementById("preciofinalfinal")

            preciofinalfinal.innerHTML = `Precio Total: $${(contadorprecio).toFixed(2)}`

            
                const checkboxenviocasa = document.getElementById("envioadomicilioinput")
                const checkboxenviosucursal = document.getElementById("envioasucursalinput") 
        
                if (checkboxenviocasa && checkboxenviosucursal != null)
                {
                    checkboxenviocasa.checked = false
                    checkboxenviosucursal.checked = false
        
                    console.log("input detectado")
                }
                else
                {
                    console.log("no detectado")
                }
            
             
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", function (event) {
        if (event.target && event.target.classList && event.target.classList.contains("botoncantidadrestar")) {


                const botonId = event.target.id;
                    
                console.log("funca")


            const productos = JSON.parse(localStorage.getItem("productos"));

            const preciofinal = document.getElementById("preciofinal")
            let cantidadcontador =0
            let contadorprecio = 0

                productos.forEach((producto, indice) => {


                    if(botonId == producto.id)
                    {
                        if (producto.cantidad <= 1)
                        {
                            console.log("no se puede menos de 1")
                        }
                        else
                        {
                            producto.cantidad -= 1
                            cantidadcontador = producto.cantidad
    
                            document.getElementById(`ContadorInput${producto.id}`).value = cantidadcontador
    
                            let precioactualizado = (producto.precio * cantidadcontador).toFixed(2);
                            document.getElementById(`PrecioCantidades${producto.id}`).textContent = `$${precioactualizado}`;

                            console.log(producto.cantidad)
                        }


                        
                    }
                    contadorprecio += parseFloat(producto.precio * producto.cantidad);
                });
            
                localStorage.setItem('productos',JSON.stringify(productos))

                preciofinal.textContent = "Subtotal (sin envio): $"+ contadorprecio.toFixed(2);

                let preciofinalfinal = document.getElementById("preciofinalfinal")

                preciofinalfinal.innerHTML = `Precio Total: $${(contadorprecio).toFixed(2)}`


                const checkboxenviocasa = document.getElementById("envioadomicilioinput")
                const checkboxenviosucursal = document.getElementById("envioasucursalinput") 
        
                if (checkboxenviocasa && checkboxenviosucursal != null)
                {
                    checkboxenviocasa.checked = false
                    checkboxenviosucursal.checked = false
        
                    console.log("input detectado")
                }
                else
                {
                    console.log("no detectado")
                }



        } 
       
    });
});

document.addEventListener("DOMContentLoaded", () => {
    addEventListener("keydown", (event) => {
        if(event.target && event.target.classList && event.target.classList.contains("numerocantidad"))
        {
            if (event.key === "-") {
                event.preventDefault(); 
            }
        }

    });
})

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("input", function(event) {
        if(event.target && event.target.classList && event.target.classList.contains("numerocantidad"))
        {
            
            const inputElement = event.target;
            const InputId = event.target.id;
            const InputIntId = parseInt(InputId.match(/\d+/g)); 
            let contadorprecio = 0
            let precioactualizado = 0

            const productos = JSON.parse(localStorage.getItem("productos"))

            if(inputElement.value == "")
                {
                    const uno = 1
                    
                    inputElement.setAttribute("value", uno);
                }
            else
            {
                inputElement.setAttribute("value", inputElement.value);

                productos.forEach((producto,indice) => {
                    if(InputIntId == producto.id)
                    {
                        producto.cantidad = parseInt(inputElement.getAttribute("value"))
                        console.log("input number funca")

                        precioactualizado = (producto.precio * producto.cantidad).toFixed(2);
                        
                    }

                    contadorprecio += parseFloat(producto.precio * producto.cantidad);
                    subototalproductos = (producto.cantidad * producto.precio).toFixed(2)

                    let preciofinalfinal = document.getElementById("preciofinalfinal")

                    preciofinalfinal.innerHTML = `Precio Total: $${(contadorprecio).toFixed(2)}`

                });

                localStorage.setItem('productos',JSON.stringify(productos))

                document.getElementById(`PrecioCantidades${InputIntId}`).textContent = `$${subototalproductos}`

                let preciofinal = document.getElementById("preciofinal")
                preciofinal.textContent = "Subtotal (sin envio): $"+ contadorprecio.toFixed(2);

                document.getElementById(`PrecioCantidades${InputIntId}`).textContent = `$${precioactualizado}`;

                
            }

            const checkboxenviocasa = document.getElementById("envioadomicilioinput")
            const checkboxenviosucursal = document.getElementById("envioasucursalinput") 
    
            if (checkboxenviocasa && checkboxenviosucursal != null)
            {
                checkboxenviocasa.checked = false
                checkboxenviosucursal.checked = false
    
                console.log("input detectado")
            }
            else
            {
                console.log("no detectado")
            }
        }

    })


}) 



document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click",  function(event)
{
    if(event.target && event.target.classList &&  event.target.classList.contains("botonesborrarstyle"))
    {
        const borrarId = event.target.id
        const borrarIdInt = parseInt(borrarId.match(/\d+/g)); 
        console.log(borrarIdInt)
        
        const productos = JSON.parse(localStorage.getItem("productos"))

        let contadorprecio = 0

        productos.forEach((producto, indice) => {
            if(producto.id == borrarIdInt)
            {
                productos.splice(indice, 1)
                document.querySelector(`#producto${producto.id}.productomostradoencarrito`).remove()
            }
            
        });
        productos.forEach((producto) => {
            contadorprecio += parseFloat(producto.precio * producto.cantidad);
        });

        localStorage.setItem("productos",JSON.stringify(productos))

        
        let preciofinal = document.getElementById("preciofinal")
        preciofinal.textContent = "Subtotal (sin envio): $"+ contadorprecio.toFixed(2);
        
        let preciofinalfinal = document.getElementById("preciofinalfinal")
        preciofinalfinal.innerHTML = `Precio Total: $${(contadorprecio).toFixed(2)}`
        
        if(productos.length <= 2)
            {
                CambiarResolucionDefault()
            }
            
            const checkboxenviocasa = document.getElementById("envioadomicilioinput")
            const checkboxenviosucursal = document.getElementById("envioasucursalinput") 
    
            if (checkboxenviocasa && checkboxenviosucursal != null)
            {
                checkboxenviocasa.checked = false
                checkboxenviosucursal.checked = false
    
                console.log("input detectado")
            }
            else
            {
                console.log("no detectado")
            }
        
            

            verificarProductosEnLocalStorage()

            
    }
})
})






//API





// ENVIOS
                        function DevolverFechaCasa()
                        {


                            const hoy = new Date();
                            const fecha3dias = new Date()

                            fecha3dias.setDate(hoy.getDate() + 3);
                            const opciones = { weekday: "long" }; // "long" devuelve el nombre completo del día
                            let DiaLlegadaCasa = fecha3dias.toLocaleDateString("es-ES", opciones);

                            if (DiaLlegadaCasa === "domingo")
                            {
                                fecha3dias.setDate(hoy.getDate() + 4);
                                DiaLlegadaCasa = fecha3dias.toLocaleDateString("es-ES", opciones);
                                console.log(DiaLlegadaCasa)
                            }
                            else
                            {
                                console.log(DiaLlegadaCasa)
                            }

                            return DiaLlegadaCasa
                        }
                        const DiaLlegadaCasa = DevolverFechaCasa()
                        function DevolverFechaSucursal()
                        {


                            const hoy = new Date();
                            const fecha3dias = new Date()

                            fecha3dias.setDate(hoy.getDate() + 2);
                            const opciones = { weekday: "long" }; // "long" devuelve el nombre completo del día
                            let DiaLlegadaSucursal = fecha3dias.toLocaleDateString("es-ES", opciones);

                            if (DiaLlegadaSucursal === "domingo")
                            {
                                fecha3dias.setDate(hoy.getDate() + 3);
                                DiaLlegadaSucursal = fecha3dias.toLocaleDateString("es-ES", opciones);
                                console.log(DiaLlegadaSucursal)
                            }
                            else
                            {
                                console.log(DiaLlegadaSucursal)
                            }

                            return DiaLlegadaSucursal
                        }
                        const DiaLlegadaSucursal = DevolverFechaSucursal()

function Fecha3diasnumber ()
{
    const date = new Date();
date.setDate(date.getDate() + 3); // Suma 3 días a la fecha actual

const verificarDomingo = date.getDay()
if (verificarDomingo === 0)
{
    date.setDate(date.getDate() + 1);
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    
    const formattedDate = `${day}/${month}`;
    console.log(formattedDate); // Esto te dará la fecha de hoy + 3 días en formato "dd/MM"
        return formattedDate
}
else
{
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    
    const formattedDate = `${day}/${month}`;
    console.log(formattedDate); // Esto te dará la fecha de hoy + 3 días en formato "dd/MM"
        return formattedDate
}

}
const fecha3diasnumero = Fecha3diasnumber()
function Fecha2diasnumber ()
{
    const date = new Date();
date.setDate(date.getDate() + 2); // Suma 2 días a la fecha actual

const verificarDomingo = date.getDay()

if(verificarDomingo === 0)
{
    date.setDate(date.getDate() + 1);

    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);

    const formattedDate = `${day}/${month}`;
    console.log(formattedDate); // Esto te dará la fecha de hoy + 3 días en formato "dd/MM"
        return formattedDate
}
else
{
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    
    const formattedDate = `${day}/${month}`;
    console.log(formattedDate); // Esto te dará la fecha de hoy + 3 días en formato "dd/MM"
        return formattedDate
}

}
const fecha2diasnumero = Fecha2diasnumber()


document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("input", function(event) {
        if(event.target.id === "inputcodigopostal")
        {
            
            let inputElement = event.target;

            inputElement.setAttribute("value", inputElement.value)
            

           
        }

    })


}) 



document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", function(event) {
        if(event.target.id === "botonverificarcp")
        {

            
            inputElementValue = document.getElementById("inputcodigopostal").value
            console.log(inputElementValue)

            const productos = JSON.parse(localStorage.getItem("productos"))

            let productosarraylength = productos.length
            let contadorproductospeso = (0.2 * productosarraylength).toFixed(2)
            
            console.log(contadorproductospeso)
            console.log(productosarraylength)

            
            
            async function fetchPrecio() {
                const url = 'https://correo-argentino1.p.rapidapi.com/calcularPrecio';
            
                const options = {
                    method: 'POST',
                    headers: {
                        'x-rapidapi-key': '48f65ad67cmsh36a549cd4143a87p1cf07fjsne2ed6e9fa9a5',
                        'x-rapidapi-host': 'correo-argentino1.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({      
                        cpOrigen: `1881`,
                        cpDestino: inputElementValue,
                        provinciaOrigen: 'AR-B',
                        provinciaDestino: 'AR-S',
                        peso: contadorproductospeso
                    })
                };
            
                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
            
                    
                    const EnvioADomicilio = result.paqarClasico.aDomicilio;
            
                    const EnvioASucursal = result.paqarClasico.aSucursal;
            
                        const enviosparacpcont = document.querySelector(".envios-inner-cp")

                        enviosparacpcont.innerHTML = ""
                        enviosparacpcont.insertAdjacentHTML("beforeend", `
                            <div class="contenedortextoenviocp">
                                        <span id="entregasspan">Entregas para el CP:</span>
                                        <span id="strongcp"> ${inputElementValue}</span>
                                    </div>
                                    <div class="contenedoropcionesdeenvio">
                                        <div class="enviodomicilio">
                                            <input type="checkbox" name="enviodomicilio" id="envioadomicilioinput" class="checkbox-envio">
                                            <div class="contenedor-label-input-select">
                                                <label for="envioadomicilioinput">Correo Argentino - Envio a domicilio:<strong id="getpreciodomicilio">$${EnvioADomicilio}</strong></label>
                                                <label for="envioadomicilioinput" class="labelfechaenvio">Llega el ${DiaLlegadaCasa} ${fecha3diasnumero}</label>
                                            </div>
                                        </div>
                                        <div class="envioasucursal">
                                            <input type="checkbox" name="envioasucursal" id="envioasucursalinput" class="checkbox-envio">
                                                <div class="contenedor-label-input-select">
                                                    <label for="envioasucursalinput">Correo Argentino - Retiro por sucursal:<strong id="getpreciosucursal">$${EnvioASucursal}</strong></label>
                                                    <label for="envioasucursalinput" class="labelfechaenvio">Llega el ${DiaLlegadaSucursal} ${fecha2diasnumero}</label>
                                                </div>
                                        </div>
                                    </div>

                                    
        
                            `)
                        DevolverFechaCasa()
                        DevolverFechaSucursal()
            
                            
            
                } catch (error) {
                    console.error("Error en la petición:", error);
                }
            }
            
            fetchPrecio();

            let preciofinalfinal = document.getElementById("preciofinalfinal")
            let contadorpreciofinal = 0
            productos.forEach((producto) => {
                contadorpreciofinal += (producto.cantidad * producto.precio)
            });

            preciofinalfinal.innerHTML = `Precio Total: $${(contadorpreciofinal).toFixed(2)}`
            document.getElementById("inputcodigopostal").setAttribute("value","")
           
        }

    })


}) 
document.addEventListener("DOMContentLoaded", () =>{
    document.addEventListener("change", function(event){
        const checkboxenviocasa = document.getElementById("envioadomicilioinput")
        const checkboxenviosucursal = document.getElementById("envioasucursalinput")
        if(event.target && event.target.classList && event.target.classList.contains("contenedoropcionesdeenvio"))
        {

        }
        if(event.target.id === "envioadomicilioinput")
        {
            

            checkboxenviosucursal.checked = false
            let precioenviodomicilio = document.getElementById("getpreciodomicilio")
            let precioenviodomicilioparseado = parseInt(precioenviodomicilio.textContent.replace("$",""))
            console.log(precioenviodomicilioparseado)
            
            const productos = JSON.parse(localStorage.getItem("productos"))
            let contadorprecio = 0
    
                productos.forEach((producto, indice) => {
    
                    contadorprecio += parseFloat(producto.precio * producto.cantidad);
                });

                
                contadorprecio += precioenviodomicilioparseado

                localStorage.setItem('productos',JSON.stringify(productos))
                
                const preciofinalfinal = document.getElementById("preciofinalfinal")

                preciofinalfinal.innerHTML = `Precio Total: $${(contadorprecio).toFixed(2)}`

               
        }
        if(event.target.id === "envioasucursalinput")
            {
                checkboxenviocasa.checked = false
                let precioenviosucursal = document.getElementById("getpreciosucursal")
                let precioenviosucursalparseado = parseInt(precioenviosucursal.textContent.replace("$",""))
                console.log(precioenviosucursalparseado)
                
                const productos = JSON.parse(localStorage.getItem("productos"))
                let contadorprecio = 0
        
                    productos.forEach((producto, indice) => {
        
                        contadorprecio += parseFloat(producto.precio * producto.cantidad);
                    });
    
                    
                    contadorprecio += precioenviosucursalparseado
    
                    localStorage.setItem('productos',JSON.stringify(productos))
                    
                    const preciofinalfinal = document.getElementById("preciofinalfinal")
    
                    preciofinalfinal.innerHTML = `Precio Total: $${(contadorprecio).toFixed(2)}`
    
    
            }

        
    })

})



if (window.location.pathname.endsWith("carrito.html")) 

    {
        document.addEventListener("DOMContentLoaded", () => {
            
            verificarProductosEnLocalStorage();





        });
    }


    const productos = JSON.parse(localStorage.getItem("productos"))
