
const listaPublicaciones = [
    'publicacion1.txt',
    'publicacion2.txt'
];

const contenedor = document.getElementById('contenedor-publicaciones');

function parsearPublicacion(textoCompleto) {
    const lineas = textoCompleto.trim().split('\n').map(l => l.trim());
    
    const lineasConContenido = lineas.filter(l => l.length > 0);
    
    if (lineasConContenido.length < 2) return ''; // Archivo inválido o vacío

    const fecha = lineasConContenido[0];
    const titulo = lineasConContenido[1];
    
    let lineasCuerpo = lineasConContenido.slice(2);
    let htmlImagen = '';

    if (lineasCuerpo.length > 0) {
        const ultimaLinea = lineasCuerpo[lineasCuerpo.length - 1];
        if (ultimaLinea.startsWith('(') && ultimaLinea.endsWith(')')) {
            const nombreImagen = ultimaLinea.slice(1, -1);
            htmlImagen = `
                <div style="text-align: center; margin-top: 15px;">
                    <img src="publicaciones/${nombreImagen}" alt="Imagen del anuncio" style="max-width: 100%; height: auto; box-shadow: 2px 2px 0px #808080; border: 1px solid #404040;">
                </div>
            `;
            lineasCuerpo.pop();
        }
    }
    const cuerpoTexto = lineasCuerpo.join('<br><br>');

    return `
        <div class="apartado" style="border-bottom: 1px dashed #808080; padding-bottom: 30px; margin-bottom: 30px; display: block;">
            <div class="bloque-contenido">
                <h2 style="margin-bottom: 5px;">${titulo}</h2>
                <p style="font-size: 12px; color: #666; margin-top: 0; margin-bottom: 15px;">Publicado: ${fecha}</p>
                <p style="margin: 0; line-height: 1.6;">${cuerpoTexto}</p>
                ${htmlImagen}
            </div>
        </div>
    `;
}

async function cargarTablon() {
    contenedor.innerHTML = ""; // Limpiamos el texto de carga
    
    const publicacionesInvertidas = [...listaPublicaciones].reverse();

    for (const nombreArchivo of publicacionesInvertidas) {
        try {
            const respuesta = await fetch(`publicaciones/${nombreArchivo}`);
            if (!respuesta.ok) throw new Error();
            
            const textoArchivo = await respuesta.text();
            contenedor.innerHTML += parsearPublicacion(textoArchivo);
        } catch (error) {
            console.error(`Error al cargar el archivo: ${nombreArchivo}`);
        }
    }

    if (publicacionesInvertidas.length === 0) {
        contenedor.innerHTML = '<p style="text-align: center; color: #666;">No hay anuncios por el momento.</p>';
    }
}

cargarTablon();