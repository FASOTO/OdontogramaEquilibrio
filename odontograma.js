document.addEventListener('DOMContentLoaded', () => {
    const lienzo = document.querySelector('#canvas');
    const contextoEstructura = lienzo.getContext('2d');

    const lienzo2 = document.querySelector('#canvas2');
    const contextoSombrado = lienzo2.getContext('2d');

    const lienzo3 = document.querySelector('#canvas3');
    const contextoPinta = lienzo3.getContext('2d');

    const contenedorCanvas = document.querySelector('.contenedorCanvas');
    // contenedorCanvas.style.backgroundColor = 'aqua';

    let numerosDientes = {
        superior: ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'],
        inferior: ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38']
    }
    let numerosDientes2 = {
        superior: ['55', '54', '53', '52', '51', '61', '62', '63', '64', '65'],
        inferior: ['85', '84', '83', '82', '81', '71', '72', '73', '74', '75']
    }
    // array con posiciones de los numeros de los dientes. casi que se puede sacar
    let numeroDienteXOrdenDienteMostrar = new Array()
    numerosDientes.superior.forEach((numero, index) => numeroDienteXOrdenDienteMostrar[numero] = index)
    numerosDientes.inferior.forEach((numero, index) => numeroDienteXOrdenDienteMostrar[numero] = index + 16)
    
    let numeroDienteXOrdenDienteMostrar2 = new Array()
    numerosDientes2.superior.forEach((numero, index) => numeroDienteXOrdenDienteMostrar2[numero] = index)
    numerosDientes2.inferior.forEach((numero, index) => numeroDienteXOrdenDienteMostrar2[numero] = index + 16)

    let posicionEstandar = {
    }

    let anchoColumna
    let anchoDiente

    let dimensionesTrapecio = {        
    }

    class Procedimento {
        constructor(color, numeroDiente, caraDiente) {
            this.color = color;
            this.numeroDiente = numeroDiente;
            this.caraDiente = caraDiente;
        }
        limpiar() {
            this.color = null;
            this.numeroDiente = null;
            this.caraDiente = null;
        }
        guardar() {
            const p = procedimientos.find(p => p.color === this.color && p.numeroDiente === this.numeroDiente && p.caraDiente === this.caraDiente)

            if (p === undefined) {

                return procedimientos.push(new Procedimento(this.color, this.numeroDiente, this.caraDiente))
            }
            else {
                return !procedimientos.splice(procedimientos.indexOf(p), 1)
            }

        }
    }

    let procedimientos = [];
    let procedimento = new Procedimento()
    procedimento.indice = null;

    // DESDE ACA EMPIEZA A DIBUJAR- MOSTRAR ESTRUCTURA
    const dibujarEstructura = () => {
        // estableciendo medidas
        lienzo.width = lienzo2.width = lienzo3.width = contenedorCanvas.clientWidth
        lienzo.height = lienzo2.height = lienzo3.height = contenedorCanvas.clientHeight

        posicionEstandar.margenXEntreDientes = (lienzo.width * 8) / 1895
        posicionEstandar.posicionYDienteInicial = 10//(lienzo.width * 180) / 1895,
        posicionEstandar.margenYEntreDientes = (lienzo.width * 200) / 2100
        
        anchoColumna = lienzo.width / 16
        anchoDiente = anchoColumna - (2 * posicionEstandar.margenXEntreDientes)

        dimensionesTrapecio.baseMayor = anchoDiente
        dimensionesTrapecio.lateral = anchoDiente / 4
        dimensionesTrapecio.baseMenor = (anchoDiente / 4) * 3
        // hasta aca

        let posicionX;
        // dibuja primero part
        for (let index = 0; index < 16; index++) {
            if (index === 0) posicionX = posicionEstandar.margenXEntreDientes;
            else posicionX = (index * anchoDiente) + (2 * posicionEstandar.margenXEntreDientes * index) + posicionEstandar.margenXEntreDientes;
            dibujarDiente(posicionX, posicionEstandar.posicionYDienteInicial)
        }

        for (let index = 0; index < 16; index++) {
            if (index === 0) posicionX = posicionEstandar.margenXEntreDientes;
            else posicionX = (index * anchoDiente) + (2 * posicionEstandar.margenXEntreDientes * index) + posicionEstandar.margenXEntreDientes;
            dibujarDiente(posicionX, posicionEstandar.margenYEntreDientes + anchoDiente + posicionEstandar.posicionYDienteInicial)
        }

        // DIBUJA LOS NUMEROS DE LOS DIENTES
        let posX;
        numerosDientes.superior.forEach((numero, index) => {
            if (index === 0) posX = (index * anchoDiente) + posicionEstandar.margenXEntreDientes;
            else posX = (index * anchoDiente) + (2 * index * posicionEstandar.margenXEntreDientes);

            dibujarCuadradoNumDiente({
                posicion: {
                    x: posX,
                    y: (posicionEstandar.margenYEntreDientes / 5) + anchoDiente + posicionEstandar.posicionYDienteInicial
                },
                primeroOUltimoDiente: index === 0 || index === 15,
                numeroDiente: numero,
                alto: anchoDiente / 1.8,
                largo: index === 0 || index === 15 ? anchoDiente + posicionEstandar.margenXEntreDientes : anchoDiente + 2 * posicionEstandar.margenXEntreDientes
            })
        })

        numerosDientes.inferior.forEach((numero, index) => {
            if (index === 0) posX = (index * anchoDiente) + posicionEstandar.margenXEntreDientes;
            else posX = (index * anchoDiente) + (2 * index * posicionEstandar.margenXEntreDientes);

            dibujarCuadradoNumDiente({
                posicion: {
                    x: posX,
                    y: (posicionEstandar.margenYEntreDientes / 5) + (anchoDiente / 1.8) + anchoDiente + posicionEstandar.posicionYDienteInicial
                },
                primeroOUltimoDiente: index === 0 || index === 15,
                numeroDiente: numero,
                alto: anchoDiente / 1.8,
                largo: index === 0 || index === 15 ? anchoDiente + posicionEstandar.margenXEntreDientes : anchoDiente + 2 * posicionEstandar.margenXEntreDientes
            })
        })

    }

    // dubuja los cuadrados y numero de dientes
    const dibujarCuadradoNumDiente = (cuadrado) => {
        let tamanoFuente = (40 * (cuadrado.primeroOUltimoDiente ? cuadrado.largo + posicionEstandar.margenXEntreDientes : cuadrado.largo)) / 118.4375
        contextoEstructura.font = `${tamanoFuente}px arial`
        contextoEstructura.strokeRect(cuadrado.posicion.x, cuadrado.posicion.y, cuadrado.largo, cuadrado.alto)
        contextoEstructura.fillText(cuadrado.numeroDiente, cuadrado.posicion.x + anchoDiente / 2.8, cuadrado.posicion.y + (anchoDiente / 2.5));
    }

    const dibujarDiente = (posicionX, posicionY) => {
        contextoEstructura.fillStyle = 'black';
        contextoEstructura.strokeStyle = 'black';

        contextoEstructura.beginPath();
        contextoEstructura.moveTo(posicionX, posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.baseMenor + posicionX, dimensionesTrapecio.lateral + posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.lateral + posicionX, dimensionesTrapecio.lateral + posicionY);
        contextoEstructura.closePath();
        contextoEstructura.stroke();

        contextoEstructura.beginPath();
        contextoEstructura.moveTo(dimensionesTrapecio.baseMenor + posicionX, dimensionesTrapecio.lateral + posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.baseMayor + posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.baseMenor + posicionX, dimensionesTrapecio.baseMenor + posicionY);
        contextoEstructura.closePath();
        contextoEstructura.stroke();

        contextoEstructura.beginPath();
        contextoEstructura.moveTo(dimensionesTrapecio.lateral + posicionX, dimensionesTrapecio.baseMenor + posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.baseMenor + posicionX, dimensionesTrapecio.baseMenor + posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.baseMayor + posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contextoEstructura.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contextoEstructura.closePath();
        contextoEstructura.stroke();

        contextoEstructura.beginPath();
        contextoEstructura.moveTo(posicionX, posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.lateral + posicionX, dimensionesTrapecio.lateral + posicionY);
        contextoEstructura.lineTo(dimensionesTrapecio.lateral + posicionX, dimensionesTrapecio.baseMenor + posicionY);
        contextoEstructura.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contextoEstructura.closePath();
        contextoEstructura.stroke();
    }

    const dienteSeleccionado = (evento, x, y) => {

        procedimento.limpiar();
        procedimento.indice = null;

        getPosicionActualDiente(procedimento, evento.x - lienzo.offsetLeft, evento.y - lienzo.offsetTop)
    }
    // evento onMouse
    lienzo3.onmousemove = (event) => {

        dienteSeleccionado(event)

        if (numeroDienteXOrdenDienteMostrar[procedimento.numeroDiente] + 1 > 0) {
            if (procedimento.caraDiente) {
                contextoSombrado.clearRect(0, 0, lienzo.width, lienzo.height)
                sombrearSecccionDiente(numeroDienteXOrdenDienteMostrar[procedimento.numeroDiente] + 1);
            } else contextoSombrado.clearRect(0, 0, lienzo.width, lienzo.height)
        } else contextoSombrado.clearRect(0, 0, lienzo.width, lienzo.height)
    }
    // PINTO EL DIENTE
    lienzo3.onclick = (event) => {

        dienteSeleccionado(event)

        if (procedimento.guardar()) {
            pintarCaraDiente(procedimento, '#0B80CA')
        }
        else {
            pintarCaraDiente(procedimento, '#ffffff')
        }
    }

    const pintar = (contexto, posX, posY) => {
        contexto.beginPath();

        switch (procedimento.caraDiente) {
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

    // PINTA EL DIENTE
    const pintarCaraDiente = (procedimento, colorRelleno) => {
        let numeroDiente = numeroDienteXOrdenDienteMostrar[procedimento.numeroDiente]
        contextoPinta.fillStyle = colorRelleno

        let posicionY = 0

        if (numeroDiente < 16) posicionY = posicionEstandar.posicionYDienteInicial;
        else {
            numeroDiente -= 16;
            posicionY = dimensionesTrapecio.baseMayor + posicionEstandar.margenYEntreDientes + posicionEstandar.posicionYDienteInicial;
        }

        let posicionX
        if (numeroDiente === 0) posicionX = posicionEstandar.margenXEntreDientes;
        else posicionX = (numeroDiente * anchoDiente) + (2 * posicionEstandar.margenXEntreDientes * numeroDiente) + posicionEstandar.margenXEntreDientes;

        pintar(contextoPinta, posicionX, posicionY)
    }

    const sombrearSecccionDiente = (ordenVisualizacionDiente) => {
        contextoSombrado.lineWidth = 2
        contextoSombrado.fillStyle = '#fff'
        // COLOR DE SOMBREADO
        contextoSombrado.strokeStyle = '#0B80CA';
        let posicionY = 0

        if (ordenVisualizacionDiente < 17) posicionY = posicionEstandar.posicionYDienteInicial;
        else {
            ordenVisualizacionDiente -= 16;
            posicionY = dimensionesTrapecio.baseMayor + posicionEstandar.margenYEntreDientes + posicionEstandar.posicionYDienteInicial;
        }

        let posicionX

        if (ordenVisualizacionDiente - 1 === 0) posicionX = posicionEstandar.margenXEntreDientes;
        else posicionX = ((ordenVisualizacionDiente - 1) * anchoDiente) + (2 * posicionEstandar.margenXEntreDientes * (ordenVisualizacionDiente - 1)) + posicionEstandar.margenXEntreDientes;

        pintar(contextoSombrado, posicionX, posicionY)
    }

    const getPosicionActualDiente = (procedimento, x, y) => {
        // 1ER FILA 
        if (y >= posicionEstandar.posicionYDienteInicial && y <= posicionEstandar.posicionYDienteInicial + anchoDiente) {
            if (x >= posicionEstandar.margenXEntreDientes && x <= posicionEstandar.margenXEntreDientes + anchoDiente)
                procedimento.numeroDiente = numeroDienteXOrdenDienteMostrar.indexOf(0)
            // cambie por 2, estaba por 3
            else if (x >= (anchoDiente + posicionEstandar.margenXEntreDientes * 2) && x <= (30 * posicionEstandar.margenXEntreDientes + 16 * anchoDiente)) {
                procedimento.indice = parseInt(x / (anchoDiente + 2 * posicionEstandar.margenXEntreDientes), 10);
                ini = (procedimento.indice * anchoDiente) + (2 * posicionEstandar.margenXEntreDientes * procedimento.indice) + posicionEstandar.margenXEntreDientes;
                fin = ini + anchoDiente;
                if (x >= ini && x <= fin) {
                    procedimento.numeroDiente = numeroDienteXOrdenDienteMostrar.indexOf(procedimento.indice)
                }
            }
        }
        else if (y >= (anchoDiente + posicionEstandar.margenYEntreDientes + posicionEstandar.posicionYDienteInicial) && y <= (2 * anchoDiente + posicionEstandar.margenYEntreDientes + posicionEstandar.posicionYDienteInicial)) {
            if (x >= posicionEstandar.margenXEntreDientes && x <= posicionEstandar.margenXEntreDientes + anchoDiente) {
                procedimento.numeroDiente = numeroDienteXOrdenDienteMostrar.indexOf(16)
            } else if (x >= (anchoDiente + posicionEstandar.margenXEntreDientes * 3) && x <= (30 * posicionEstandar.margenXEntreDientes + 16 * anchoDiente)) {
                procedimento.indice = parseInt(x / (anchoDiente + 2 * posicionEstandar.margenXEntreDientes), 10);
                ini = (procedimento.indice * anchoDiente) + (2 * posicionEstandar.margenXEntreDientes * procedimento.indice) + posicionEstandar.margenXEntreDientes;
                fin = ini + anchoDiente;
                if (x >= ini && x <= fin) procedimento.numeroDiente = numeroDienteXOrdenDienteMostrar.indexOf(procedimento.indice + 16)
            }
        }

        let px = x - ((procedimento.indice * anchoDiente) + (2 * posicionEstandar.margenXEntreDientes * procedimento.indice) + posicionEstandar.margenXEntreDientes)
        let py = y - posicionEstandar.posicionYDienteInicial

        if (numeroDienteXOrdenDienteMostrar[procedimento.numeroDiente] + 1 > 16) py -= (posicionEstandar.margenYEntreDientes + anchoDiente)

        if (py > 0 && py < (anchoDiente / 4) && px > py && py < anchoDiente - px) {
            procedimento.caraDiente = 1;
        } else if (px > (anchoDiente / 4) * 3 && px < anchoDiente && py < px && anchoDiente - px < py) {
            procedimento.caraDiente = 2;
        } else if (py > (anchoDiente / 4) * 3 && py < anchoDiente && px < py && px > anchoDiente - py) {
            procedimento.caraDiente = 3;
        } else if (px > 0 && px < (anchoDiente / 4) && py > px && px < anchoDiente - py) {
            procedimento.caraDiente = 4;
        } else if (px > (anchoDiente / 4) && px < (anchoDiente / 4) * 3 && py > (anchoDiente / 4) && py < (anchoDiente / 4) * 3) {
            procedimento.caraDiente = 5;
        }
    }

    window.addEventListener("resize", () => {
        dibujarEstructura()
    })
    dibujarEstructura();
})