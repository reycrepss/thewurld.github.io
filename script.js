let contadorClicksLogo = 0;

const archivosRandom = [
    'imagen1.png',
    'party_0.gif',
    'misterio.png',
    'misterio.jpg',
    '15.png',
    'logo.png',
    'student0000.gif'
];

function clickLogo() {
    contadorClicksLogo++;

    if (contadorClicksLogo === 5) {
        const logo = document.getElementById('logoWeb');
        
        const indiceAleatorio = Math.floor(Math.random() * archivosRandom.length);
        const archivoElegido = archivosRandom[indiceAleatorio];

        logo.src = `random/${archivoElegido}`;

        contadorClicksLogo = 0;
    }
}

let modoFondo = 0;

function aplicarFondo() {
    if (modoFondo === 1) {
        document.body.style.backgroundImage = "url('sky.png')";
        return;
    }

    if (modoFondo === 2) {
        document.body.style.backgroundImage = "url('sky_night.png')";
        return;
    }

    const hora = new Date().getHours();

    document.body.style.backgroundImage =
        (hora >= 18 || hora < 7)
        ? "url('sky_night.png')"
        : "url('sky.png')";
}

function cambiarModoFondo() {
    modoFondo = (modoFondo + 1) % 3;

    const boton = document.querySelector("#selectorFondo button");

    if (modoFondo === 0) {
        boton.textContent = "Fondo: Automático";
    }

    if (modoFondo === 1) {
        boton.textContent = "Fondo: Día";
    }

    if (modoFondo === 2) {
        boton.textContent = "Fondo: Noche";
    }

    aplicarFondo();
}

aplicarFondo();
setInterval(aplicarFondo, 60000);

const tiburon = document.getElementById('tiburon');

const velocidad = 1.8;
const velocidadGiro = 0.04;
const margenPantalla = 100;

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let targetX = posX;
let targetY = posY;
let anguloActual = 0;

const direcciones = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];

function buscarNuevoDestino() {
    targetX = margenPantalla + Math.random() * (window.innerWidth - margenPantalla * 2);
    targetY = margenPantalla + Math.random() * (window.innerHeight - margenPantalla * 2);
}

function actualizarTiburon() {
    let dx = targetX - posX;
    let dy = targetY - posY;
    let distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < 60) {
        buscarNuevoDestino();
    }

    let anguloDestino = Math.atan2(dy, dx) * 180 / Math.PI;

    let diferenciaAngulo = anguloDestino - anguloActual;
    while (diferenciaAngulo < -180) diferenciaAngulo += 360;
    while (diferenciaAngulo > 180) diferenciaAngulo -= 360;

    anguloActual += diferenciaAngulo * velocidadGiro;
    
    let anguloNormalizado = ((anguloActual % 360) + 360) % 360;

    posX += Math.cos(anguloNormalizado * Math.PI / 180) * velocidad;
    posY += Math.sin(anguloNormalizado * Math.PI / 180) * velocidad;

    posX = Math.max(margenPantalla / 2, Math.min(window.innerWidth - margenPantalla, posX));
    posY = Math.max(margenPantalla / 2, Math.min(window.innerHeight - margenPantalla, posY));

    let indiceDireccion = Math.round(anguloNormalizado / 45) % 8;
    
    let direccionFinal = direcciones[indiceDireccion] || 'e';

    tiburon.src = `tiburon_${direccionFinal}.png`;
    tiburon.style.transform = `translate(${posX}px, ${posY}px)`;

    requestAnimationFrame(actualizarTiburon);
}

buscarNuevoDestino();
actualizarTiburon();