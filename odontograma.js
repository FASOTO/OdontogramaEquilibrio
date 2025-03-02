import { NumerosDientes } from "./NumerosDientes.js";
import { Procedimiento } from "./Procedimiento.js";

document.addEventListener('DOMContentLoaded', () => {
    const lienzo = document.getElementById('canvas1');
    const contextoEstructura = lienzo.getContext('2d');

    const lienzo2 = document.querySelector('#canvas2');
    const contextoSombrado = lienzo2.getContext('2d');

    const lienzo3 = document.querySelector('#canvas3');
    const contextoPinta = lienzo3.getContext('2d');

    // 2da parte
    const lienzo4 = document.getElementById('canvas4');
    const contextoEstructura2 = lienzo4.getContext('2d');

    const lienzo5 = document.querySelector('#canvas5');
    const contextoSombrado2 = lienzo5.getContext('2d');

    const lienzo6 = document.querySelector('#canvas6');
    const contextoPinta2 = lienzo6.getContext('2d');

    const grupo2 = document.getElementById('grupo2');
    const grupo1 = document.getElementById('grupo1');

    // opcion de color
    const colorRojo = '#F50B0B'
    const colorAzul = '#0073BB'
    const radioColorRojo = document.getElementById('inputColorRojo')

    const numerosDientes = new NumerosDientes()

    let posEstandar = {
    }

    let anchoColumna
    let anchoDiente

    let dimensionesTrapecio = {
    }
    let procedimientos = []
    let procedimentoSeleccionado = new Procedimiento
    procedimentoSeleccionado.indice = null;
    procedimentoSeleccionado.cuadroSeleccionado = null;

    function limpiarDienteSeleccionado() {
        procedimentoSeleccionado.numeroDiente = null;
        procedimentoSeleccionado.caraDiente = null;
        procedimentoSeleccionado.color = null;
        procedimentoSeleccionado.tipoProcedimiento = null;
    }

    function guardarDienteSeleccionado() {
        if (!(procedimentoSeleccionado.numeroDiente === null || procedimentoSeleccionado.numeroDiente < 0 || procedimentoSeleccionado.numeroDiente === undefined)) {
            const p = procedimientos.find(p => p.numeroDiente === procedimentoSeleccionado.numeroDiente && p.caraDiente === procedimentoSeleccionado.caraDiente
                && p.tipoProcedimiento === procedimentoSeleccionado.tipoProcedimiento)
            if (p === undefined) {
                return procedimientos.push(new Procedimiento(procedimentoSeleccionado.numeroDiente, procedimentoSeleccionado.caraDiente, procedimentoSeleccionado.tipoProcedimiento, procedimentoSeleccionado.color))
            }
            else return !procedimientos.splice(procedimientos.indexOf(p), 1)
        }
    }

    // DESDE ACA EMPIEZA A DIBUJAR- MOSTRAR ESTRUCTURA
    const dibujarEstructura = () => {
        lienzo.width = lienzo2.width = lienzo3.width = grupo1.clientWidth
        lienzo6.width = lienzo5.width = lienzo4.width = grupo2.clientWidth

        const altura = parseInt((lienzo.width * 872) / 1895 / 1.6)

        grupo1.style.height = altura.toString() + 'px'
        grupo2.style.height = altura.toString() + 'px'

        lienzo.height = lienzo2.height = lienzo3.height = altura
        lienzo6.height = lienzo5.height = lienzo4.height = altura

        posEstandar.margenXEntreDientes = (lienzo.width * 8) / 1895
        posEstandar.posicionYDienteInicial = altura / 8
        posEstandar.margenYEntreDientes = (lienzo.width * 200) / 1900

        anchoColumna = lienzo.width / 16
        anchoDiente = anchoColumna - (2 * posEstandar.margenXEntreDientes)

        dimensionesTrapecio.baseMayor = anchoDiente
        dimensionesTrapecio.lateral = anchoDiente / 4
        dimensionesTrapecio.baseMenor = (anchoDiente / 4) * 3
        // hasta aca

        let posX;
        // dibuja estructura dientes 1ra parte
        for (let index = 0; index < 16; index++) {
            if (index === 0) posX = posEstandar.margenXEntreDientes;
            else posX = (index * anchoDiente) + (2 * posEstandar.margenXEntreDientes * index) + posEstandar.margenXEntreDientes;
            dibujarDiente(contextoEstructura, posX, posEstandar.posicionYDienteInicial)

            dibujarDiente(contextoEstructura, posX, posEstandar.posicionYDienteInicial + posEstandar.margenYEntreDientes + anchoDiente)
        }

        // dibuja estructura dientes 2da parte
        for (let index = 0; index < 10; index++) {
            if (index === 0) posX = posEstandar.margenXEntreDientes;
            else posX = (index * anchoDiente) + (2 * posEstandar.margenXEntreDientes * index) + posEstandar.margenXEntreDientes;
            posX = (index * anchoDiente) + (2 * posEstandar.margenXEntreDientes * index) + posEstandar.margenXEntreDientes;
            dibujarDiente(contextoEstructura2, posX, posEstandar.posicionYDienteInicial)
            dibujarDiente(contextoEstructura2, posX, posEstandar.margenYEntreDientes + anchoDiente + posEstandar.posicionYDienteInicial)
        }

        let posYLetras1 = (posEstandar.margenYEntreDientes / 4) + anchoDiente + posEstandar.posicionYDienteInicial
        let posYLetras2 = posYLetras1 + (anchoDiente / 2)

        dibujarNumeros(contextoEstructura, numerosDientes.primero, posYLetras1)
        dibujarNumeros(contextoEstructura, numerosDientes.segundo, posYLetras2)

        dibujarNumeros(contextoEstructura2, numerosDientes.tercero, posYLetras1)
        dibujarNumeros(contextoEstructura2, numerosDientes.cuarto, posYLetras2)
        dibujarProcedimientosExistentes()
    }

    const dibujarProcedimientosExistentes = () => {
        procedimientos.forEach(elemento => {
            procedimentoSeleccionado.caraDiente = elemento.caraDiente
            procedimentoSeleccionado.numeroDiente = elemento.numeroDiente
            procedimentoSeleccionado.tipoProcedimiento = elemento.tipoProcedimiento
            procedimentoSeleccionado.color = elemento.color
            procedimentoSeleccionado.indice = numerosDientes.getIndice(elemento.numeroDiente)
            if (elemento.numeroDiente < 50) dibujar(contextoPinta)
            else dibujar(contextoPinta2)
        });
    }

    const dibujarNumeros = (contexto, numeros, y) => {
        let posX;

        numeros.forEach((numero, index) => {
            if (index === 0) posX = (index * anchoDiente) + posEstandar.margenXEntreDientes;
            else posX = (index * anchoDiente) + (2 * index * posEstandar.margenXEntreDientes);

            dibujarCuadradoNumDiente({
                posicion: {
                    x: posX,
                    y: y
                },
                primeroOUltimoDiente: index === 0 || index === numeros.length - 1,
                numeroDiente: numero,
                alto: anchoDiente / 2,
                largo: index === 0 || index === numeros.length - 1 ? anchoDiente + posEstandar.margenXEntreDientes : anchoDiente + 2 * posEstandar.margenXEntreDientes
            }, contexto)
        })
    }

    // dubuja los cuadrados y numero de dientes
    const dibujarCuadradoNumDiente = (cuadrado, contexto) => {
        let tamanoFuente = cuadrado.largo / 3
        contexto.font = `${tamanoFuente}px arial`
        contexto.strokeRect(cuadrado.posicion.x, cuadrado.posicion.y, cuadrado.largo, cuadrado.alto)
        contexto.fillText(cuadrado.numeroDiente, cuadrado.posicion.x + anchoDiente / 2.8, cuadrado.posicion.y + (anchoDiente / 2.5));
    }

    const dibujarDiente = (contexto, posicionX, posicionY) => {
        // contexto.fillStyle = 'black';
        contexto.strokeStyle = 'black';

        contexto.beginPath();
        contexto.moveTo(posicionX, posicionY);
        contexto.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
        contexto.lineTo(dimensionesTrapecio.baseMenor + posicionX, dimensionesTrapecio.lateral + posicionY);
        contexto.lineTo(dimensionesTrapecio.lateral + posicionX, dimensionesTrapecio.lateral + posicionY);
        contexto.closePath();
        contexto.stroke();

        contexto.beginPath();
        contexto.moveTo(dimensionesTrapecio.baseMenor + posicionX, dimensionesTrapecio.lateral + posicionY);
        contexto.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
        contexto.lineTo(dimensionesTrapecio.baseMayor + posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contexto.lineTo(dimensionesTrapecio.baseMenor + posicionX, dimensionesTrapecio.baseMenor + posicionY);
        contexto.closePath();
        contexto.stroke();

        contexto.beginPath();
        contexto.moveTo(dimensionesTrapecio.lateral + posicionX, dimensionesTrapecio.baseMenor + posicionY);
        contexto.lineTo(dimensionesTrapecio.baseMenor + posicionX, dimensionesTrapecio.baseMenor + posicionY);
        contexto.lineTo(dimensionesTrapecio.baseMayor + posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contexto.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contexto.closePath();
        contexto.stroke();

        contexto.beginPath();
        contexto.moveTo(posicionX, posicionY);
        contexto.lineTo(dimensionesTrapecio.lateral + posicionX, dimensionesTrapecio.lateral + posicionY);
        contexto.lineTo(dimensionesTrapecio.lateral + posicionX, dimensionesTrapecio.baseMenor + posicionY);
        contexto.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contexto.closePath();
        contexto.stroke();
    }

    const dienteSeleccionado = (evento, lienzo) => {

        limpiarDienteSeleccionado();

        if (radioColorRojo.checked == true ? procedimentoSeleccionado.color = colorRojo : procedimentoSeleccionado.color = colorAzul);

        establecerDienteSeleccionado(evento.x - lienzo.offsetLeft, evento.y - lienzo.offsetTop)
        procedimentoSeleccionado.tipoProcedimiento = getTipoProcedimiento()
        if (procedimentoSeleccionado.tipoProcedimiento == 'opcionPintarRelleno') procedimentoSeleccionado.caraDiente = getCaraDiente(evento.x - lienzo.offsetLeft, evento.y - lienzo.offsetTop)
        else procedimentoSeleccionado.caraDiente = 6

    }
    // evento onMouse
    lienzo3.onmousemove = (event) => {
        procedimentoSeleccionado.cuadroSeleccionado = 1

        dienteSeleccionado(event, lienzo3)

        if (numerosDientes.getIndice(procedimentoSeleccionado.numeroDiente) >= 0) {
            if (procedimentoSeleccionado.caraDiente) {
                contextoSombrado.clearRect(0, 0, lienzo.width, lienzo.height)
                sombrearSecccionDiente(contextoSombrado);
            } else contextoSombrado.clearRect(0, 0, lienzo.width, lienzo.height)
        } else contextoSombrado.clearRect(0, 0, lienzo.width, lienzo.height)
    }
    // 2da fila
    lienzo6.onmousemove = (event) => {
        procedimentoSeleccionado.cuadroSeleccionado = 2

        dienteSeleccionado(event, lienzo6)

        if (numerosDientes.getIndice(procedimentoSeleccionado.numeroDiente) >= 0) {
            if (procedimentoSeleccionado.caraDiente) {
                contextoSombrado2.clearRect(0, 0, lienzo5.width, lienzo5.height)
                sombrearSecccionDiente(contextoSombrado2);
            } else contextoSombrado2.clearRect(0, 0, lienzo5.width, lienzo5.height)
        } else contextoSombrado2.clearRect(0, 0, lienzo5.width, lienzo5.height)
    }
    // PINTO EL DIENTE
    lienzo3.onclick = (event) => {
        procedimentoSeleccionado.cuadroSeleccionado = 1
        dienteSeleccionado(event, lienzo3)

        if (procedimentoSeleccionado.indice != null) {
            if (guardarDienteSeleccionado()) {
                dibujar(contextoPinta)
            } else {
                contextoPinta.clearRect(0, 0, lienzo.width, lienzo.height)
                dibujarProcedimientosExistentes();
            }
        }
    }

    lienzo6.onclick = (event) => {
        procedimentoSeleccionado.cuadroSeleccionado = 2
        dienteSeleccionado(event, lienzo6)

        if (guardarDienteSeleccionado()) {
            dibujar(contextoPinta2)
        } else {
            contextoPinta2.clearRect(0, 0, lienzo.width, lienzo.height)
            dibujarProcedimientosExistentes();
        }
    }

    const dibujar = (contexto) => {
        let posY = posEstandar.posicionYDienteInicial

        if (!numerosDientes.esPrimeraFila(procedimentoSeleccionado.numeroDiente)) {
            posY = anchoDiente + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial;
        }

        let posX
        if (procedimentoSeleccionado.indice === 0) posX = posEstandar.margenXEntreDientes
        else posX = (procedimentoSeleccionado.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimentoSeleccionado.indice) + posEstandar.margenXEntreDientes;

        contexto.strokeStyle = procedimentoSeleccionado.color
        contexto.fillStyle = procedimentoSeleccionado.color
        switch (procedimentoSeleccionado.tipoProcedimiento) {
            case 'opcionPintarX':
                pintandoX(contexto, posX, posY)
                break;
            case 'opcionPintarCirculo':
                pintandoCirculo(contexto, posX, posY)
                break;
            case 'opcionPintarMedio':
                pintandoMedio(contexto, posX, posY)
                break;
            case 'opcionPintarE':
                if (numerosDientes.esPrimeraFila(procedimentoSeleccionado.numeroDiente)) pintandoLetra(contexto, posX, posY + anchoDiente + anchoDiente / 2.7, 'E', 'end')
                else pintandoLetra(contexto, posX, posY - posEstandar.margenXEntreDientes, 'E', 'end')
                break;
            case 'opcionPintarY':
                if (numerosDientes.esPrimeraFila(procedimentoSeleccionado.numeroDiente)) pintandoLetra(contexto, posX, posY + anchoDiente + anchoDiente / 2.7, ' Y', 'start')
                else pintandoLetra(contexto, posX, posY - posEstandar.margenXEntreDientes, ' Y', 'start')
                break;
            case 'opcionPintarRelleno':
                contexto.lineWidth = 1
                contexto.strokeStyle = 'black'
                pintar(contexto, posX, posY)
                break;
            case 'opcionPintarDiente':
                if (numerosDientes.esPrimeraFila(procedimentoSeleccionado.numeroDiente)) pintandoImagen(contexto, posX + anchoDiente / 2.3, posY - anchoDiente / 1.5)
                else pintandoImagen(contexto, posX + anchoDiente / 2.3, posY + anchoDiente)
                break;
        }
    }
    const pintandoImagen = (contexto, posX, posY) => {
        let imagen = new Image();
        imagen.src = '18.png'
        contexto.drawImage(imagen, posX, posY, anchoDiente / 3, anchoDiente / 1.5)


    }
    const pintandoLetra = (contexto, posX, posY, letra, alinear) => {
        let tamanoFuente = anchoDiente / 2.5
        contexto.font = `${tamanoFuente}px arial`
        contexto.textAlign = alinear
        contexto.strokeStyle = 'black'
        contexto.fillText(letra, posX + anchoDiente / 2.5, posY);
    }
    const pintandoMedio = (contexto, posX, posY) => {
        contexto.lineWidth = 4;
        contexto.beginPath();
        contexto.moveTo(posX + dimensionesTrapecio.lateral, posY + anchoDiente / 2);
        contexto.lineTo(anchoDiente + posX - dimensionesTrapecio.lateral, posY + anchoDiente / 2);
        contexto.closePath();
        contexto.stroke();
    }

    const pintandoCirculo = (contexto, posX, posY) => {
        contexto.lineWidth = 4;
        contexto.beginPath();
        contexto.arc(posX + anchoDiente / 2, posY + anchoDiente / 2, anchoDiente / 2, 0, Math.PI * 2)
        contexto.closePath();
        contexto.stroke();
    }

    const pintandoX = (contexto, posX, posY) => {
        contexto.lineWidth = 4;
        contexto.beginPath();
        contexto.moveTo(posX, posY);
        contexto.lineTo(dimensionesTrapecio.baseMayor + posX, dimensionesTrapecio.baseMayor + posY);
        contexto.closePath();
        contexto.stroke();

        contexto.beginPath();
        contexto.moveTo(dimensionesTrapecio.baseMayor + posX, posY);
        contexto.lineTo(posX, dimensionesTrapecio.baseMayor + posY);
        contexto.closePath();
        contexto.stroke();
    }

    const pintar = (contexto, posX, posY) => {
        contexto.beginPath();

        switch (procedimentoSeleccionado.caraDiente) {
            case 1:
                contexto.moveTo(posX, posY);
                contexto.lineTo(dimensionesTrapecio.baseMayor + posX, posY);
                contexto.lineTo(dimensionesTrapecio.baseMenor + posX, dimensionesTrapecio.lateral + posY);
                contexto.lineTo(dimensionesTrapecio.lateral + posX, dimensionesTrapecio.lateral + posY);
                break;
            case 2:
                contexto.moveTo(dimensionesTrapecio.baseMenor + posX, dimensionesTrapecio.lateral + posY);
                contexto.lineTo(dimensionesTrapecio.baseMayor + posX, posY);
                contexto.lineTo(dimensionesTrapecio.baseMayor + posX, dimensionesTrapecio.baseMayor + posY);
                contexto.lineTo(dimensionesTrapecio.baseMenor + posX, dimensionesTrapecio.baseMenor + posY);
                break;
            case 3:
                contexto.moveTo(dimensionesTrapecio.lateral + posX, dimensionesTrapecio.baseMenor + posY);
                contexto.lineTo(dimensionesTrapecio.baseMenor + posX, dimensionesTrapecio.baseMenor + posY);
                contexto.lineTo(dimensionesTrapecio.baseMayor + posX, dimensionesTrapecio.baseMayor + posY);
                contexto.lineTo(posX, dimensionesTrapecio.baseMayor + posY);
                break;
            case 4:
                contexto.moveTo(posX, posY);
                contexto.lineTo(dimensionesTrapecio.lateral + posX, dimensionesTrapecio.lateral + posY);
                contexto.lineTo(dimensionesTrapecio.lateral + posX, dimensionesTrapecio.baseMenor + posY);
                contexto.lineTo(posX, dimensionesTrapecio.baseMayor + posY);
                break;
            case 5:
                contexto.moveTo(dimensionesTrapecio.lateral + posX, dimensionesTrapecio.lateral + posY);
                contexto.lineTo(dimensionesTrapecio.baseMenor + posX, dimensionesTrapecio.lateral + posY);
                contexto.lineTo(dimensionesTrapecio.baseMenor + posX, dimensionesTrapecio.baseMenor + posY);
                contexto.lineTo(dimensionesTrapecio.lateral + posX, dimensionesTrapecio.baseMenor + posY);
                break;
        }
        contexto.closePath();
        contexto.fill();
        contexto.stroke();
    }

    const sombrearSecccionDiente = (contexto) => {
        contexto.lineWidth = 2
        contexto.fillStyle = '#fff'//relleno blanco
        // COLOR DE SOMBREADO
        contexto.strokeStyle = '#0B80CA';
        let posicionY = posEstandar.posicionYDienteInicial;

        if (!numerosDientes.esPrimeraFila(procedimentoSeleccionado.numeroDiente)) {
            posicionY = dimensionesTrapecio.baseMayor + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial;
        }

        let posicionX = posEstandar.margenXEntreDientes
        if (procedimentoSeleccionado.indice != 0)
            posicionX = (procedimentoSeleccionado.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimentoSeleccionado.indice) + posEstandar.margenXEntreDientes;

        pintar(contexto, posicionX, posicionY)
    }

    function getTipoProcedimiento() {
        let tipo = document.getElementsByName('opcionPintar')
        for (let index = 0; index < tipo.length; index++) {
            if (tipo[index].checked) {
                return tipo[index].value
            }
        }
    }
    const establecerDienteSeleccionado = (x, y) => {
        let ini, fin
        if (y >= posEstandar.posicionYDienteInicial && y <= posEstandar.posicionYDienteInicial + anchoDiente) {
            if (x >= posEstandar.margenXEntreDientes && x <= posEstandar.margenXEntreDientes + anchoDiente) {
                procedimentoSeleccionado.indice = 0;
                if (procedimentoSeleccionado.cuadroSeleccionado == 1 ? procedimentoSeleccionado.numeroDiente = numerosDientes.primero.at(0) : procedimentoSeleccionado.numeroDiente = numerosDientes.tercero.at(0));
            }
            // cambie por 2, estaba por 3
            else if (x >= (anchoDiente + posEstandar.margenXEntreDientes * 2) && x <= (30 * posEstandar.margenXEntreDientes + 16 * anchoDiente)) {
                procedimentoSeleccionado.indice = parseInt(x / (anchoDiente + 2 * posEstandar.margenXEntreDientes), 10);
                ini = (procedimentoSeleccionado.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimentoSeleccionado.indice) + posEstandar.margenXEntreDientes;
                fin = ini + anchoDiente;
                if (x >= ini && x <= fin) {
                    if (procedimentoSeleccionado.cuadroSeleccionado == 1 ? procedimentoSeleccionado.numeroDiente = numerosDientes.primero.at(procedimentoSeleccionado.indice) :
                        procedimentoSeleccionado.numeroDiente = numerosDientes.tercero.at(procedimentoSeleccionado.indice));
                }
            }
        }
        else if (y >= (anchoDiente + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial) && y <= (2 * anchoDiente + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial)) {
            if (x >= posEstandar.margenXEntreDientes && x <= posEstandar.margenXEntreDientes + anchoDiente) {
                procedimentoSeleccionado.indice = 0;
                if (procedimentoSeleccionado.cuadroSeleccionado == 1 ? procedimentoSeleccionado.numeroDiente = numerosDientes.segundo.at(0) : procedimentoSeleccionado.numeroDiente = numerosDientes.cuarto.at(0));
            } else if (x >= (anchoDiente + posEstandar.margenXEntreDientes * 3) && x <= (30 * posEstandar.margenXEntreDientes + 16 * anchoDiente)) {
                procedimentoSeleccionado.indice = parseInt(x / (anchoDiente + 2 * posEstandar.margenXEntreDientes), 10);
                ini = (procedimentoSeleccionado.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimentoSeleccionado.indice) + posEstandar.margenXEntreDientes;
                fin = ini + anchoDiente;
                if (x >= ini && x <= fin) {
                    if (procedimentoSeleccionado.cuadroSeleccionado == 1 ? procedimentoSeleccionado.numeroDiente = numerosDientes.segundo.at(procedimentoSeleccionado.indice) :
                        procedimentoSeleccionado.numeroDiente = numerosDientes.cuarto.at(procedimentoSeleccionado.indice));
                }
            }
        }
    }

    function getCaraDiente(x, y) {
        let px = x - ((procedimentoSeleccionado.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimentoSeleccionado.indice) + posEstandar.margenXEntreDientes)
        let py = y - posEstandar.posicionYDienteInicial

        if (!numerosDientes.esPrimeraFila(procedimentoSeleccionado.numeroDiente))
            py -= (posEstandar.margenYEntreDientes + anchoDiente)

        if (py > 0 && py < (anchoDiente / 4) && px > py && py < anchoDiente - px) {
            return 1;
        } else if (px > (anchoDiente / 4) * 3 && px < anchoDiente && py < px && anchoDiente - px < py) {
            return 2;
        } else if (py > (anchoDiente / 4) * 3 && py < anchoDiente && px < py && px > anchoDiente - py) {
            return 3;
        } else if (px > 0 && px < (anchoDiente / 4) && py > px && px < anchoDiente - py) {
            return 4;
        } else if (px > (anchoDiente / 4) && px < (anchoDiente / 4) * 3 && py > (anchoDiente / 4) && py < (anchoDiente / 4) * 3) {
            return 5;
        }
    }

    window.addEventListener("resize", () => {
        dibujarEstructura()
    })

    dibujarEstructura();
})