document.addEventListener('DOMContentLoaded', () => {
    const lienzo = document.getElementById('canvas');
    const contextoEstructura = lienzo.getContext('2d');

    const lienzo2 = document.querySelector('#canvas2');
    const contextoSombrado = lienzo2.getContext('2d');

    const lienzo3 = document.querySelector('#canvas3');
    const contextoPinta = lienzo3.getContext('2d');

    const contenedorCanvas = document.querySelector('.contenedorCanvas');

    // 2da parte
    const lienzo4 = document.getElementById('canvas4');
    const contextoEstructura2 = lienzo4.getContext('2d');

    const lienzo5 = document.querySelector('#canvas5');
    const contextoSombrado2 = lienzo5.getContext('2d');

    const lienzo6 = document.querySelector('#canvas6');
    const contextoPinta2 = lienzo6.getContext('2d');

    let numerosDientes = {
        superior: ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'],
        inferior: ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38']
    }
    let numerosDientes2 = {
        superior: ['55', '54', '53', '52', '51', '61', '62', '63', '64', '65'],
        inferior: ['85', '84', '83', '82', '81', '71', '72', '73', '74', '75']
    }
    // array con posiciones de los numeros de los dientes. casi que se puede sacar
    let dienteXIndice = new Array()
    numerosDientes.superior.forEach((numero, index) => dienteXIndice[numero] = index)
    numerosDientes.inferior.forEach((numero, index) => dienteXIndice[numero] = index + 16)

    let dienteXIndice2 = new Array()
    numerosDientes2.superior.forEach((numero, index) => dienteXIndice2[numero] = index)
    numerosDientes2.inferior.forEach((numero, index) => dienteXIndice2[numero] = index + 16)

    let posEstandar = {
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
        lienzo.width = lienzo2.width = lienzo3.width = contenedorCanvas.parentElement.clientWidth
        // 2da fila
        lienzo6.width = lienzo5.width= lienzo4.width = contenedorCanvas.parentElement.clientWidth
        // establecer ancho y alto del contenedor
        // contenedorCanvas.style.border=' solid 2px #9f3230'
        // contenedorCanvas.parentElement.style.border=' solid 2px #000'

        // contenedorCanvas.style.border=' solid 2px #000'

        // aca poner el alto del contenedor 
        contenedorCanvas.style.height = contenedorCanvas.parentElement.clientHeight.toString() + 'px'
        lienzo.height = lienzo2.height = lienzo3.height = contenedorCanvas.parentElement.clientHeight

        // 2da fila
        lienzo6.height = lienzo5.height = lienzo4.height = contenedorCanvas.parentElement.clientHeight

        posEstandar.margenXEntreDientes = (lienzo.width * 8) / 1895
        posEstandar.posicionYDienteInicial = 10//(lienzo.width * 180) / 1895,
        posEstandar.margenYEntreDientes = (lienzo.width * 200) / 2100

        anchoColumna = lienzo.width / 16
        anchoDiente = anchoColumna - (2 * posEstandar.margenXEntreDientes)

        dimensionesTrapecio.baseMayor = anchoDiente
        dimensionesTrapecio.lateral = anchoDiente / 4
        dimensionesTrapecio.baseMenor = (anchoDiente / 4) * 3
        // hasta aca

        let posicionX;
        // dibuja estructura dientes 1ra parte
        for (let index = 0; index < 16; index++) {
            if (index === 0) posicionX = posEstandar.margenXEntreDientes;
            else posicionX = (index * anchoDiente) + (2 * posEstandar.margenXEntreDientes * index) + posEstandar.margenXEntreDientes;
            dibujarDiente(contextoEstructura, posicionX, posEstandar.posicionYDienteInicial)
            dibujarDiente(contextoEstructura, posicionX, posEstandar.margenYEntreDientes + anchoDiente + posEstandar.posicionYDienteInicial)
        }

        // dibuja estructura dientes 2da parte
        for (let index = 0; index < 10; index++) {
            if (index === 0) posicionX = posEstandar.margenXEntreDientes;
            else posicionX = (index * anchoDiente) + (2 * posEstandar.margenXEntreDientes * index) + posEstandar.margenXEntreDientes;
            dibujarDiente(contextoEstructura2, posicionX, posEstandar.posicionYDienteInicial)
            dibujarDiente(contextoEstructura2, posicionX, posEstandar.margenYEntreDientes + anchoDiente + posEstandar.posicionYDienteInicial)
        }

        let posicionYPrimeraParte = (posEstandar.margenYEntreDientes / 5) + anchoDiente + posEstandar.posicionYDienteInicial
        let posicionYSegundaParte = posicionYPrimeraParte + (anchoDiente / 1.8)

        dibujarNumeros(contextoEstructura, numerosDientes.superior, posicionYPrimeraParte)
        dibujarNumeros(contextoEstructura, numerosDientes.inferior, posicionYSegundaParte)

        dibujarNumeros(contextoEstructura2, numerosDientes2.superior, posicionYPrimeraParte) 
        dibujarNumeros(contextoEstructura2, numerosDientes2.inferior, posicionYSegundaParte)
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
                primeroOUltimoDiente: index === 0 || index === numeros.length - 1 ,
                numeroDiente: numero,
                alto: anchoDiente / 1.8,
                largo: index === 0 || index === numeros.length - 1 ? anchoDiente + posEstandar.margenXEntreDientes : anchoDiente + 2 * posEstandar.margenXEntreDientes
            }, contexto)
        })
    }
    // dubuja los cuadrados y numero de dientes
    const dibujarCuadradoNumDiente = (cuadrado, contexto) => {
        let tamanoFuente = (40 * (cuadrado.primeroOUltimoDiente ? cuadrado.largo + posEstandar.margenXEntreDientes : cuadrado.largo)) / 118.4375
        contexto.font = `${tamanoFuente}px arial`
        contexto.strokeRect(cuadrado.posicion.x, cuadrado.posicion.y, cuadrado.largo, cuadrado.alto)
        contexto.fillText(cuadrado.numeroDiente, cuadrado.posicion.x + anchoDiente / 2.8, cuadrado.posicion.y + (anchoDiente / 2.5));
    }

    const dibujarDiente = (contexto, posicionX, posicionY) => {
        contexto.fillStyle = 'black';
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

    const dienteSeleccionado = (evento, dientePorOden, lienzo) => {

        procedimento.limpiar();
        procedimento.indice = null;

        getPosicionActualDiente(dientePorOden,evento.x - lienzo.offsetLeft, evento.y - lienzo.offsetTop)
    }
    // evento onMouse
    lienzo3.onmousemove = (event) => {

        dienteSeleccionado(event, dienteXIndice, lienzo3)

        if (dienteXIndice[procedimento.numeroDiente] + 1 > 0) {
            if (procedimento.caraDiente) {
                contextoSombrado.clearRect(0, 0, lienzo.width, lienzo.height)
                sombrearSecccionDiente(contextoSombrado, dienteXIndice[procedimento.numeroDiente] + 1);
            } else contextoSombrado.clearRect(0, 0, lienzo.width, lienzo.height)
        } else contextoSombrado.clearRect(0, 0, lienzo.width, lienzo.height)
    }
    // 2da fila
    lienzo6.onmousemove = (event) => {
        
        dienteSeleccionado(event, dienteXIndice2, lienzo6)

        if (dienteXIndice2[procedimento.numeroDiente] + 1 > 0) {
            if (procedimento.caraDiente) {
                contextoSombrado2.clearRect(0, 0, lienzo5.width, lienzo5.height)
                sombrearSecccionDiente(contextoSombrado2, dienteXIndice2[procedimento.numeroDiente] + 1);
            } else contextoSombrado2.clearRect(0, 0, lienzo5.width, lienzo5.height)
        } else contextoSombrado2.clearRect(0, 0, lienzo5.width, lienzo5.height)
    }
    // PINTO EL DIENTE
    lienzo3.onclick = (event) => {
        dienteSeleccionado(event, dienteXIndice, lienzo3)

        if (procedimento.guardar()) pintarCaraDiente('#0B80CA', contextoPinta, dienteXIndice[procedimento.numeroDiente])
        else pintarCaraDiente('#ffffff',contextoPinta, dienteXIndice[procedimento.numeroDiente])   
    }

    lienzo6.onclick = (event) => {
        dienteSeleccionado(event, dienteXIndice2, lienzo6)

        if (procedimento.guardar()) pintarCaraDiente('#0B80CA',contextoPinta2, dienteXIndice2[procedimento.numeroDiente])
        else pintarCaraDiente('#ffffff',contextoPinta2, dienteXIndice2[procedimento.numeroDiente])
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
    const pintarCaraDiente = (colorRelleno, contextoParaPintar, indiceDiente) => {
        contextoParaPintar.fillStyle = colorRelleno

        let posY = 0

        if (indiceDiente < 16) posY = posEstandar.posicionYDienteInicial;
        else {
            indiceDiente -= 16;
            posY = dimensionesTrapecio.baseMayor + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial;
        }

        let posX
        if (indiceDiente === 0) posX = posEstandar.margenXEntreDientes;
        else posX = (indiceDiente * anchoDiente) + (2 * posEstandar.margenXEntreDientes * indiceDiente) + posEstandar.margenXEntreDientes;

        pintar(contextoParaPintar, posX, posY)
    }

    const sombrearSecccionDiente = (contexto, ordenVisualizacionDiente) => {
        contexto.lineWidth = 2
        contexto.fillStyle = '#fff'
        // COLOR DE SOMBREADO
        contexto.strokeStyle = '#0B80CA';
        let posicionY = 0

        if (ordenVisualizacionDiente < 17) posicionY = posEstandar.posicionYDienteInicial;
        else {
            ordenVisualizacionDiente -= 16;
            posicionY = dimensionesTrapecio.baseMayor + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial;
        }

        let posicionX

        if (ordenVisualizacionDiente - 1 === 0) posicionX = posEstandar.margenXEntreDientes;
        else posicionX = ((ordenVisualizacionDiente - 1) * anchoDiente) + (2 * posEstandar.margenXEntreDientes * (ordenVisualizacionDiente - 1)) + posEstandar.margenXEntreDientes;

        pintar(contexto, posicionX, posicionY)
    }

    const getPosicionActualDiente = (dientePorOrden, x, y) => {
        // 1ER FILA 
        if (y >= posEstandar.posicionYDienteInicial && y <= posEstandar.posicionYDienteInicial + anchoDiente) {
            if (x >= posEstandar.margenXEntreDientes && x <= posEstandar.margenXEntreDientes + anchoDiente)
                procedimento.numeroDiente = dientePorOrden.indexOf(0)
            // cambie por 2, estaba por 3
            else if (x >= (anchoDiente + posEstandar.margenXEntreDientes * 2) && x <= (30 * posEstandar.margenXEntreDientes + 16 * anchoDiente)) {
                procedimento.indice = parseInt(x / (anchoDiente + 2 * posEstandar.margenXEntreDientes), 10);
                ini = (procedimento.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimento.indice) + posEstandar.margenXEntreDientes;
                fin = ini + anchoDiente;
                if (x >= ini && x <= fin) {
                    procedimento.numeroDiente = dientePorOrden.indexOf(procedimento.indice)
                }
            }
        }
        else if (y >= (anchoDiente + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial) && y <= (2 * anchoDiente + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial)) {
            if (x >= posEstandar.margenXEntreDientes && x <= posEstandar.margenXEntreDientes + anchoDiente) {
                procedimento.numeroDiente = dientePorOrden.indexOf(16)
            } else if (x >= (anchoDiente + posEstandar.margenXEntreDientes * 3) && x <= (30 * posEstandar.margenXEntreDientes + 16 * anchoDiente)) {
                procedimento.indice = parseInt(x / (anchoDiente + 2 * posEstandar.margenXEntreDientes), 10);
                ini = (procedimento.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimento.indice) + posEstandar.margenXEntreDientes;
                fin = ini + anchoDiente;
                if (x >= ini && x <= fin) procedimento.numeroDiente = dientePorOrden.indexOf(procedimento.indice + 16)
            }
        }

        let px = x - ((procedimento.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimento.indice) + posEstandar.margenXEntreDientes)
        let py = y - posEstandar.posicionYDienteInicial

        if (dientePorOrden[procedimento.numeroDiente] + 1 > 16) py -= (posEstandar.margenYEntreDientes + anchoDiente)

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