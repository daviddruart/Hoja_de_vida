// Menú lateral
let menu_visible = false;
const menu = document.getElementById("nav");

function MostrarOcultarMenu() {
    menu.style.display = menu_visible ? "none" : "block";
    menu_visible = !menu_visible;
}

// Ocultar menú al hacer clic en un enlace
const links = document.querySelectorAll("nav a");
links.forEach(link => {
    link.onclick = () => {
        menu.style.display = "none";
        menu_visible = false;
    };
});

// Crear una barra con 17 divisiones
function crearBarra(id_barra) {
    for (let i = 0; i <= 16; i++) {
        const div = document.createElement("div");
        div.className = "e";
        id_barra.appendChild(div);
    }
}

// Lista de habilidades con su ID y cantidad de barras a pintar
const habilidades = [
    { id: "logica", cantidad: 16 },
    { id: "comprension", cantidad: 11 },
    { id: "lenguaje", cantidad: 11 },
    { id: "equipo", cantidad: 15 },
    { id: "aprendizaje", cantidad: 16 },
    { id: "versiones", cantidad: 11 }
];

// Inicializar barras y contadores
const contadores = [];
habilidades.forEach((hab, index) => {
    const elemento = document.getElementById(hab.id);
    crearBarra(elemento);
    contadores[index] = -1;
});

// Pintar barras animadas
function pintarBarra(elemento, cantidad, indice, interval) {
    contadores[indice]++;
    const x = contadores[indice];
    if (x < cantidad) {
        const elementos = elemento.getElementsByClassName("e");
        elementos[x].style.backgroundColor = "#940253";
    } else {
        clearInterval(interval);
    }
}

// Función principal para ejecutar todas las animaciones
function animarBarras() {
    habilidades.forEach((hab, index) => {
        const elemento = document.getElementById(hab.id);
        const intervalo = setInterval(() => {
            pintarBarra(elemento, hab.cantidad, index, intervalo);
        }, 100);
    });
}

// Observer para detectar cuando la sección entra en pantalla
let entro = false;
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entro) {
            entro = true;
            animarBarras();
            obs.disconnect();
        }
    });
}, { threshold: 0.5 });

observer.observe(document.getElementById("habilidades"));

//


function animarBarraConNumero(idBarra, idNumero, porcentajeFinal) {
  const barraLlena = document.getElementById(idBarra);
  const numero = document.getElementById(idNumero);
  let anchoActual = 0;

  const intervalo = setInterval(() => {
    if (anchoActual >= porcentajeFinal) {
      clearInterval(intervalo);
      numero.textContent = porcentajeFinal + '%';
    } else {
      anchoActual++;
      barraLlena.style.width = anchoActual + '%';
      numero.textContent = anchoActual + '%';
    }
  }, 15);
}

let animado = false;

function efectoHabilidades() {
  const habilidades = document.getElementById("habilidades");
  const distancia_skills = window.innerHeight - habilidades.getBoundingClientRect().top;

  if (distancia_skills >= 300 && !animado) {
    animado = true;
    animarBarraConNumero('logica-barra', 'logica-porcentaje', 98);
    animarBarraConNumero('comprension-barra', 'comprension-porcentaje', 70);
    animarBarraConNumero('lenguaje-barra', 'lenguaje-porcentaje', 70);
    animarBarraConNumero('equipo-barra', 'equipo-porcentaje', 90);
    animarBarraConNumero('aprendizaje-barra', 'aprendizaje-porcentaje', 80);
    animarBarraConNumero('versiones-barra', 'versiones-porcentaje', 70);
  }
}

window.addEventListener('scroll', efectoHabilidades);
