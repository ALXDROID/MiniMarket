const productos = [
  {id:1, nombre:"Coca Cola 1.5L", precio:1900, img:"../coca.jpg"},
  {id:2, nombre:"Pan Molde", precio:1300, img:"../pan.jpg"},
  {id:3, nombre:"Arroz 1kg", precio:1200, img:"../arroz.jpg"},
];

function mostrarProductos() {
  const div = document.getElementById("productos");
  if (!div) return;

  productos.forEach(p => {
    div.innerHTML += `
      <div class="col-6">
        <div class="product-card">
          <img src="${p.img}">
          
          <h6 class="mt-2 fw-bold">${p.nombre}</h6>

          <div class="d-flex justify-content-between align-items-center">
            <span class="price-tag">$${p.precio}</span>
            <button class="btn-add" onclick="agregar(${p.id})">+</button>
          </div>
        </div>
      </div>
    `;
  });
}

function obtenerCarrito(){
  return JSON.parse(localStorage.getItem("carrito") || "[]");
}

function guardarCarrito(c){
  localStorage.setItem("carrito", JSON.stringify(c));
}

function agregar(id){
  let carrito = obtenerCarrito();
  let item = carrito.find(x => x.id === id);

  if (item) item.cantidad++;
  else carrito.push({id, cantidad:1});

  guardarCarrito(carrito);
  alert("Agregado al carrito");
}

function mostrarCarrito(){
  const div = document.getElementById("listaCarrito");
  if (!div) return;

  let carrito = obtenerCarrito();
  div.innerHTML = "";

  carrito.forEach(item => {
    let p = productos.find(x => x.id === item.id);

    div.innerHTML += `
      <div class="cart-card mb-2">
        <div class="d-flex justify-content-between">
          <div>
            <strong>${p.nombre}</strong><br>
            Cantidad: ${item.cantidad}
          </div>
          <div class="text-success fw-bold">
            $${p.precio * item.cantidad}
          </div>
        </div>
      </div>
    `;
  });
}
function filtrarProductos(texto) {
  const div = document.getElementById("productos");
  div.innerHTML = "";

  productos
    .filter(p => p.nombre.toLowerCase().includes(texto.toLowerCase()))
    .forEach(p => {
      div.innerHTML += `
      <div class="col-6">
        <div class="product-card">
          <img src="${p.img}">
          <h6 class="mt-2 fw-bold">${p.nombre}</h6>
          <div class="d-flex justify-content-between align-items-center">
            <span class="price-tag">$${p.precio}</span>
            <button class="btn-add" onclick="agregar(${p.id})">+</button>
          </div>
        </div>
      </div>`;
    });
}
window.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();

  const buscador = document.getElementById("buscar");
  if (buscador) {
    buscador.addEventListener("input", e => {
      filtrarProductos(e.target.value);
    });
  }
});
