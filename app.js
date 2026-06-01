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

// Definir habilidades con sus porcentajes
const habilidades = [
    { barra: 'UX/UI-barra', porcentaje: 'UX/UI-porcentaje', valor: 98 },
    { barra: 'FRONTEND-barra', porcentaje: 'FRONTEND-porcentaje', valor: 70 },
    { barra: 'RESPONSIVE-barra', porcentaje: 'RESPONSIVE-porcentaje', valor: 70 },
    { barra: 'LOGICA-barra', porcentaje: 'LOGICA-porcentaje', valor: 90 },
    { barra: 'TEAM-barra', porcentaje: 'TEAM-porcentaje', valor: 80 },
    { barra: 'versiones-barra', porcentaje: 'versiones-porcentaje', valor: 70 }
];

// Animar barra con número
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

// Ejecutar animaciones cuando la sección es visible
let animado = false;

function efectoHabilidades() {
    const seccionHabilidades = document.getElementById("habilidades");
    
    if (!seccionHabilidades) return;
    
    const posicion = seccionHabilidades.getBoundingClientRect();
    const distancia = window.innerHeight - posicion.top;

    if (distancia >= 300 && !animado) {
        animado = true;
        habilidades.forEach(hab => {
            animarBarraConNumero(hab.barra, hab.porcentaje, hab.valor);
        });
    }
}

window.addEventListener('scroll', efectoHabilidades);

// También ejecutar al cargar en caso de que ya esté visible
window.addEventListener('load', efectoHabilidades);
