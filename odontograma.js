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
        constructor(color, numeroDiente, caraDiente, tipoProcedimiento) {
            this.numeroDiente = numeroDiente;
            this.caraDiente = caraDiente;
            this.color = color;
            this.tipoProcedimiento = tipoProcedimiento;
        }
        limpiar() {
            this.numeroDiente = null;
            this.caraDiente = null;
            this.color = null;
            this.tipoProcedimiento = null;
        }
        valido() {
            if (this.numeroDiente === null || this.numeroDiente < 0 || this.numeroDiente === undefined) return false
            return true
        }
        guardar() {
            if (this.valido()) {
                const p = procedimientos.find(p => p.numeroDiente === this.numeroDiente && p.caraDiente === this.caraDiente && p.tipoProcedimiento === this.tipoProcedimiento)

                if (p === undefined) return procedimientos.push(new Procedimento(this.color, this.numeroDiente, this.caraDiente, this.tipoProcedimiento))
                else return !procedimientos.splice(procedimientos.indexOf(p), 1)
            }
        }
    }

    let procedimientos = [];
    let procedimento = new Procedimento()
    procedimento.indice = null;

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

        dibujarNumeros(contextoEstructura, numerosDientes.superior, posYLetras1)
        dibujarNumeros(contextoEstructura, numerosDientes.inferior, posYLetras2)

        dibujarNumeros(contextoEstructura2, numerosDientes2.superior, posYLetras1)
        dibujarNumeros(contextoEstructura2, numerosDientes2.inferior, posYLetras2)
        dibujarProcedimientosExistentes()
    }

    const dibujarProcedimientosExistentes = () => {
        procedimientos.forEach(elemento => {
            procedimento.caraDiente = elemento.caraDiente
            procedimento.numeroDiente = elemento.numeroDiente
            procedimento.tipoProcedimiento = elemento.tipoProcedimiento
            procedimento.color = elemento.color
            if (elemento.numeroDiente < 50) dibujar(contextoPinta, dienteXIndice[elemento.numeroDiente])
            else dibujar(contextoPinta2, dienteXIndice2[elemento.numeroDiente])
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

    const dienteSeleccionado = (evento, dientePorOden, lienzo) => {

        procedimento.limpiar();
        procedimento.indice = null;
        if (radioColorRojo.checked == true) procedimento.color = colorRojo
        else procedimento.color = colorAzul

        procedimento.numeroDiente = getNumeroDiente(dientePorOden, evento.x - lienzo.offsetLeft, evento.y - lienzo.offsetTop)
        procedimento.tipoProcedimiento = getTipoProcedimiento()
        if (procedimento.tipoProcedimiento == 'opcionPintarRelleno') procedimento.caraDiente = getCaraDiente(dientePorOden, evento.x - lienzo.offsetLeft, evento.y - lienzo.offsetTop)
        else procedimento.caraDiente = 6

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

        if (procedimento.indice != null){
            if (procedimento.guardar()) {
                dibujar(contextoPinta, dienteXIndice[procedimento.numeroDiente])
            } else {
                contextoPinta.clearRect(0, 0, lienzo.width, lienzo.height)
                dibujarProcedimientosExistentes();
            }
        }
    }

    lienzo6.onclick = (event) => {
        dienteSeleccionado(event, dienteXIndice2, lienzo6)

        if (procedimento.guardar()) {
            dibujar(contextoPinta2, dienteXIndice2[procedimento.numeroDiente])
        } else {
            contextoPinta2.clearRect(0, 0, lienzo.width, lienzo.height)
            dibujarProcedimientosExistentes();
        }

    }

    const dibujar = (contexto, indiceDienteParam) => {
        let posY = 0
        let indiceDiente = indiceDienteParam
        if (indiceDiente < 16) posY = posEstandar.posicionYDienteInicial;
        else {
            indiceDiente -= 16;
            posY = anchoDiente + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial;
        }
        let posX
        if (indiceDiente === 0) posX = posEstandar.margenXEntreDientes;
        else posX = (indiceDiente * anchoDiente) + (2 * posEstandar.margenXEntreDientes * indiceDiente) + posEstandar.margenXEntreDientes;

        contexto.strokeStyle = procedimento.color
        contexto.fillStyle = procedimento.color
        switch (procedimento.tipoProcedimiento) {
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
                if (indiceDienteParam < 16) pintandoLetra(contexto, posX, posY + anchoDiente + anchoDiente / 2.7, 'E', 'end')
                else pintandoLetra(contexto, posX, posY - posEstandar.margenXEntreDientes, 'E', 'end')
                break;
            case 'opcionPintarY':
                if (indiceDienteParam < 16) pintandoLetra(contexto, posX, posY + anchoDiente + anchoDiente / 2.7, ' Y', 'start')
                else pintandoLetra(contexto, posX, posY - posEstandar.margenXEntreDientes, ' Y', 'start')
                break;
            case 'opcionPintarRelleno':
                contexto.lineWidth = 1
                contexto.strokeStyle = 'black'
                pintar(contexto, posX, posY)
                break;
            case 'opcionPintarDiente':
                if (indiceDienteParam < 16) pintandoImagen(contexto, posX + anchoDiente / 2.3, posY - anchoDiente / 1.5)
                else pintandoImagen(contexto, posX + anchoDiente / 2.3, posY + anchoDiente)
                break
                ;
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

    const sombrearSecccionDiente = (contexto, ordenVisualizacionDiente) => {
        contexto.lineWidth = 2
        contexto.fillStyle = '#fff'//relleno blanco
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

    function getTipoProcedimiento() {
        let tipo = document.getElementsByName('opcionPintar')
        for (let index = 0; index < tipo.length; index++) {
            if (tipo[index].checked) {
                return tipo[index].value
            }
        }
    }
    function getNumeroDiente(dientePorOrden, x, y) {
        if (y >= posEstandar.posicionYDienteInicial && y <= posEstandar.posicionYDienteInicial + anchoDiente) {
            if (x >= posEstandar.margenXEntreDientes && x <= posEstandar.margenXEntreDientes + anchoDiente)
                return dientePorOrden.indexOf(0)
            // cambie por 2, estaba por 3
            else if (x >= (anchoDiente + posEstandar.margenXEntreDientes * 2) && x <= (30 * posEstandar.margenXEntreDientes + 16 * anchoDiente)) {
                procedimento.indice = parseInt(x / (anchoDiente + 2 * posEstandar.margenXEntreDientes), 10);
                ini = (procedimento.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimento.indice) + posEstandar.margenXEntreDientes;
                fin = ini + anchoDiente;
                if (x >= ini && x <= fin) {
                    return dientePorOrden.indexOf(procedimento.indice)
                }
            }
        }
        else if (y >= (anchoDiente + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial) && y <= (2 * anchoDiente + posEstandar.margenYEntreDientes + posEstandar.posicionYDienteInicial)) {
            if (x >= posEstandar.margenXEntreDientes && x <= posEstandar.margenXEntreDientes + anchoDiente) {
                return dientePorOrden.indexOf(16)
            } else if (x >= (anchoDiente + posEstandar.margenXEntreDientes * 3) && x <= (30 * posEstandar.margenXEntreDientes + 16 * anchoDiente)) {
                procedimento.indice = parseInt(x / (anchoDiente + 2 * posEstandar.margenXEntreDientes), 10);
                ini = (procedimento.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimento.indice) + posEstandar.margenXEntreDientes;
                fin = ini + anchoDiente;
                if (x >= ini && x <= fin) return dientePorOrden.indexOf(procedimento.indice + 16)
            }
        }
    }
    function getCaraDiente(dientePorOrden, x, y) {
        let px = x - ((procedimento.indice * anchoDiente) + (2 * posEstandar.margenXEntreDientes * procedimento.indice) + posEstandar.margenXEntreDientes)
        let py = y - posEstandar.posicionYDienteInicial

        if (dientePorOrden[procedimento.numeroDiente] + 1 > 16) py -= (posEstandar.margenYEntreDientes + anchoDiente)

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