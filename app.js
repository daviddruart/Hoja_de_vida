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
    { barra: 'UX/UI-barra', porcentaje: 'UX/UI-porcentaje', valor: 80 },
    { barra: 'FRONTEND-barra', porcentaje: 'FRONTEND-porcentaje', valor: 90 },
    { barra: 'RESPONSIVE-barra', porcentaje: 'RESPONSIVE-porcentaje', valor: 90 },
    { barra: 'LOGICA-barra', porcentaje: 'LOGICA-porcentaje', valor: 80 },
    { barra: 'TEAM-barra', porcentaje: 'TEAM-porcentaje', valor: 90 },
    { barra: 'versiones-barra', porcentaje: 'versiones-porcentaje', valor: 70 }
];

// Crear una barra con 16 divisiones
function crearBarra(id_barra) {
    const contenedor = document.getElementById(id_barra);
    for (let i = 0; i < 16; i++) {
        const div = document.createElement("div");
        div.className = "e";
        contenedor.appendChild(div);
    }
}

// Inicializar todas las barras
habilidades.forEach(hab => {
    crearBarra(hab.barra.replace('-barra', ''));
});

// Animar barra con divisiones
function animarBarraConNumero(idBarra, idNumero, porcentajeFinal) {
    const numero = document.getElementById(idNumero);
    const barraId = idBarra.replace('-barra', '');
    const barraDiv = document.getElementById(barraId);
    const bloques = barraDiv.getElementsByClassName('e');
    
    // Calcular cuántos bloques se deben pintar
    const totalBloques = bloques.length;
    const bloquesPintar = Math.round((porcentajeFinal / 100) * totalBloques);
    
    // Calcular frames para la animación (2 segundos)
    const tiempoTotal = 2000;
    const frames = tiempoTotal / 15;
    const incrementoBloque = bloquesPintar / frames;
    let bloqueActual = 0;

    const intervalo = setInterval(() => {
        if (bloqueActual >= bloquesPintar) {
            clearInterval(intervalo);
            numero.textContent = porcentajeFinal + '%';
        } else {
            bloqueActual += incrementoBloque;
            const bloquesPintados = Math.floor(bloqueActual);
            
            // Pintar bloques hasta el número actual
            for (let i = 0; i < totalBloques; i++) {
                if (i < bloquesPintados) {
                    bloques[i].style.backgroundColor = '#940253';
                } else {
                    bloques[i].style.backgroundColor = '#363636';
                }
            }
            
            numero.textContent = Math.floor((bloquesPintados / totalBloques) * 100) + '%';
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
