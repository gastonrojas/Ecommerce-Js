const modalAbrir = document.getElementById('abrir-modal')
const modalCerrar = document.getElementById('cerrar-modal')
const modalContainer = document.getElementById('modal-container')
const modalCarrito = document.getElementById("modal")
const contadorCarrito = document.getElementById('contador-carrito')
const contenedorCarrito = document.getElementById('carrito')
const precioTotal = document.getElementById('precio-total')
const container = document.getElementById('main')
const vaciarCarrito = document.getElementById('vaciar-carrito')

let carrito = []

const actualizarCarrito = () => {
  
    contenedorCarrito.innerHTML = ""

    carrito.forEach( (product) => {
        $('#carrito').append(
            `
            <div class="productoCarrito">
                <div class="producto-carrito">
                    <div class="descripcion__producto-arrito">
                        <h5>${product.name}</h5>
                        <p>${product.desc}</p>
                    </div>
                    <div>
                        <p>Cantidad: ${product.cantidad}</p>
                        <p> Precio: $${product.price * product.cantidad}</p>
                    </div>
                    <button onclick="eliminarDelCarrito(${product.id})" class="boton-eliminar"><img src="./assets/images/eliminar.svg"></button>
                </div> 
            </div>    
            `
        )

    })
    
    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + (prod.price * prod.cantidad), 0)
    
    
}


function setCache() {
        localStorage.setItem('carrito', JSON.stringify(carrito))

}
function getCache() {
    let r = localStorage.getItem('carrito')
    return JSON.parse(r)

}
const inicializarCarrito = () => {
        carrito = getCache() || []
        contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
        actualizarCarrito()
}


const Products = [
    {id: 1, name: 'Mermelada', desc: 'Sabor: Frutilla', price: 400, img: './assets/images/dFrutilla.jpg'},
    {id: 2, name: 'Mermelada', desc: 'Sabor: Durazno', price: 400, img: './assets/images/dDurazno.jpg'},
    {id: 3, name: 'Mermelada', desc: 'Sabor: Cereza', price: 400, img: './assets/images/dCereza.jpg'},
    {id: 4, name: 'Mermelada', desc: 'Sabor: Ciruela', price: 400, img: './assets/images/dCiruela.jpg'},
    {id: 5, name: 'Mermelada', desc: 'Sabor: Damasco', price: 400, img: './assets/images/dDamasco.jpg'},
    {id: 6, name: 'Mermelada', desc: 'Sabor: Alcayota', price: 400, img: './assets/images/dAlcayota.jpg'},
    {id: 7, name: 'Aceitunas', desc: 'Verdes', price: 450, img: './assets/images/verdes.jpg'},
    {id: 8, name: 'Aceitunas', desc: 'Negras', price: 450, img: './assets/images/negras.jpg'},
    {id: 9, name: 'Aceitunas', desc: 'Rellenas', price: 450, img: './assets/images/rellenas.jpg'},
    {id: 10, name: 'Aceitunas', desc: 'descarozadas', price: 450, img: './assets/images/descarozadas.jpg'},
    {id: 11, name: 'Aceite de Oliva', desc: 'Chico', price: 550, img: './assets/images/aChico.jpg'},
    {id: 12, name: 'Aceite de Oliva', desc: 'Grande', price: 3000, img: './assets/images/aGrande.jpg'},
    {id: 13, name: 'Tomates', desc: 'Pelados al Natural', price: 400, img: './assets/images/tomates.jpg'},
    {id: 14, name: 'Duraznos', desc: 'Al Natural', price: 400, img: './assets/images/duraznos.jpg'},
    {id: 15, name: 'Panqueques', desc: 'De Tigo Sarraceno', price: 400, img: './assets/images/panqueque.jpg'},
    {id: 16, name: 'Pate', desc: 'De Girasol', price: 400, img: './assets/images/pate.jpg'},  
]

inicializarCarrito()

const activarModal = () => {modalContainer.classList.toggle('modal-active')}

modalAbrir.onclick = activarModal
modalCerrar.onclick = activarModal
modalContainer.onclick = activarModal
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
} )

/* <div class="card m-4" style="width: 18rem;"> */
//  img card class="card-img-top" 
Products.forEach((product) =>{
    $('#main').append(`
    
    <article>
        <div class="card m-4" style="width: 18rem;">
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h4 class="card-title>">${product.name}</h4>
                <p class="card-text">${product.desc}</p>
                <p class="card-text">$${product.price}</p>
                <button id="producto${product.id}" class="btn btn-primary">Agregar al carrito</button>
            </div>
        </div>
    </article>    
    `)


    const boton = document.getElementById(`producto${product.id}`)

    boton.addEventListener('click', () => {
    agregarAlCarrito(product.id)
    })

})

const agregarAlCarrito = (prodId) => {

    // const item = Products.find( (prod) => prod.id === prodId)
    // carrito.push(item)
    let prodEnCarrito = carrito.find(prod => prod.id == prodId)
    console.log(prodEnCarrito)
    if (prodEnCarrito) {
        prodEnCarrito.cantidad += 1
    } else {
        let {id, name, price, desc} =  Products.find( prod => prod.id == prodId )
        carrito.push({id: id, name: name, price: price, desc: desc, cantidad: 1})
    }

    actualizarCarrito()
    setCache()
}

const eliminarDelCarrito = (prodId) => {
    let productoAEliminar = carrito.find( prod => prod.id == prodId )

    productoAEliminar.cantidad--

    if (productoAEliminar.cantidad == 0) {
        let indice = carrito.indexOf(productoAEliminar)
        carrito.splice(indice, 1)
    }

    console.log(carrito)



    // const item = carrito.find( (prod) => prod.id === prodId)
    // const indice = carrito.indexOf(item)

    // carrito.splice(indice, 1)

    actualizarCarrito()
    setCache()
}


vaciarCarrito.addEventListener ('click', () => {

    carrito.length = 0
    actualizarCarrito()
    setCache()
})



