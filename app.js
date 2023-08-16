//Elementos HTML
let $contenedor = document.getElementById('container');
let $mujer = document.getElementById('mujer');
let $hombre = document.getElementById('hombre');
let $todos = document.getElementById('todos');
let $genderless = document.getElementById('genderless');
let $unknown = document.getElementById('unknown');
let $siguiente = document.getElementById('siguiente');
let $ultimaPagina = document.getElementById('ultima-pagina');
let $primeraPagina = document.getElementById('primera-pagina');
let $anterior = document.getElementById('anterior');
let $totalPaginas = document.getElementById('total-paginas');
let $paginaActual = document.getElementById('pagina-actual');
let $cantidadDePersonajes = document.getElementById('cantidad-personajes');

const apiURL = "https://rickandmortyapi.com/api/character/";
let todosLosPersonajes = [];
let pagina = 1;


//Mostrar los personajes en HTML
function mostrar(array) {
    $contenedor.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        $contenedor.innerHTML += `<div id= "card">
                <div class= "caja-imagen">
                    <img class="card-imagen" src="${array[i].image}">
                </div>
                <h3>Nombre: ${array[i].name}</h3>
                <p>Género: ${array[i].gender}</p>
                <p>Especies: ${array[i].species}</p>
                <p>Estado: ${array[i].status}</p>
                <p>Origen: ${array[i].origin.name}</p>
                <p>Locación: ${array[i].location.name}</p>
                <div id="mas-info">
                    <a href="ver-mas">Ver más...</a>
                </div>
                </div>    
                
            </div>
            `;
    }
}

//Fetch
function usarFetch(numeroPagina) {
    fetch(apiURL + "?page=" + numeroPagina)
        .then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data);
            todosLosPersonajes = data.results;
            console.log(todosLosPersonajes);
            mostrar(todosLosPersonajes);
            paginacion = data.info;
            $paginaActual.innerHTML = `<p>Página actual: ${numeroPagina}</p>`
            $totalPaginas.innerHTML = `<p id="totalP">Total de páginas: ${paginacion.pages}</p>`;
        })
        .catch((error) => {
            console.log(error)
        });
}
$anterior.disabled = true;
$primeraPagina.disabled = true;
usarFetch(pagina);
$siguiente.classList.replace('deshabilitar', 'btn');
$ultimaPagina.classList.replace('deshabilitar', 'btn');


//filtros
function mostrarTodos() {
    mostrar(todosLosPersonajes);
}

function mostrarMujeres() {
    let resultado = todosLosPersonajes.filter((personaje) => {
        return personaje.gender === 'Female';
    })
    mostrar(resultado);
}

function mostrarHombres() {
    let resultado = todosLosPersonajes.filter((personaje) => {
        return personaje.gender === 'Male';
    })
    mostrar(resultado);
}

function mostrarGenderless() {
    let resultado = todosLosPersonajes.filter((personaje) => {
        return personaje.gender === 'Genderless';
    })
    mostrar(resultado);
}

function mostrarUnknown() {
    let resultado = todosLosPersonajes.filter((personaje) => {
        return personaje.gender === 'unknown';
    })
    mostrar(resultado);
}

//paginado
function primera_pagina() {
    pagina = 1;
    paginacion.pages;
    usarFetch(pagina);
    $primeraPagina.disabled = true;
    $anterior.disabled = true;
    $siguiente.classList.replace('deshabilitar', 'btn');
    $ultimaPagina.classList.replace('deshabilitar', 'btn');
    $primeraPagina.classList.replace('btn', 'deshabilitar');
    $anterior.classList.replace('btn', 'deshabilitar');
}

function siguientePagina() {
    pagina++;
    usarFetch(pagina); //le pasamos a fetch pagina para que la muestre
    if (pagina <= 1) {
        $anterior.disabled = true;
        $primeraPagina.disabled = true;
        $siguiente.classList.replace('deshabilitar', 'btn');
        $ultimaPagina.classList.replace('deshabilitar', 'btn');
    } else {
        $anterior.disabled = false;
        $primeraPagina.disabled = false;
        $anterior.classList.replace('deshabilitar', 'btn');
        $primeraPagina.classList.replace('deshabilitar', 'btn');
    }
    if (pagina === 42) {
        $siguiente.disabled = true;
        $ultimaPagina.disabled = true;
        $siguiente.classList.replace('btn', 'deshabilitado');
        $ultimaPagina.classList.replace('btn', 'deshabilitado');
    } else {
        $siguiente.disabled = false;
        $ultimaPagina.disabled = false;
        $siguiente.classList.replace('deshabilitar', 'btn');
        $ultimaPagina.classList.replace('deshabilitar', 'btn');

    }
};

function anteriorPagina() {
    if (pagina > 1) {
        pagina--;
        usarFetch(pagina);
    }

    if (pagina <= 1) {
        $anterior.disabled = true;
        $primeraPagina.disabled = true;
        $anterior.classList.replace('btn', 'deshabilitar');
        $primeraPagina.classList.replace('btn', 'deshabilitar');
    } else {
        $anterior.disabled = false;
        $primeraPagina.disabled = false;
        $anterior.classList.replace('deshabilitar', 'btn');
        $primeraPagina.classList.replace('deshabilitar', 'btn');
    }
    if (pagina === 42) {
        $siguiente.disabled = true;
        $ultimaPagina.disabled = true;
        $siguiente.classList.replace('btn', 'deshabilitar');
        $ultimaPagina.classList.replace('btn', 'deshabilitar');
    } else {
        $siguiente.disabled = false;
        $ultimaPagina.disabled = false;
        $siguiente.classList.replace('deshabilitar', 'btn');
        $ultimaPagina.classList.replace('deshabilitar', 'btn');
    }
}

function ultima_Pagina() {
    pagina = 42;
    usarFetch(42);
    $siguiente.disabled = true;
    $ultimaPagina.disabled = true;
    $siguiente.classList.replace('btn', 'deshabilitar');
    $ultimaPagina.classList.replace('btn', 'deshabilitar');
    $anterior.classList.replace('deshabilitar', 'btn');
    $primeraPagina.classList.replace('deshabilitar', 'btn');
}


//Eventos
$mujer.addEventListener('click', mostrarMujeres);

$hombre.addEventListener('click', mostrarHombres);

$todos.addEventListener('click', mostrarTodos);

$genderless.addEventListener('click', mostrarGenderless);

$unknown.addEventListener('click', mostrarUnknown);

$primeraPagina.addEventListener('click', primera_pagina);

$siguiente.addEventListener('click', siguientePagina);

$anterior.addEventListener('click', anteriorPagina);

$ultimaPagina.addEventListener('click', ultima_Pagina);


