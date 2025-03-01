export class NumerosDientes {

    primero = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
    segundo = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]
    tercero = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65]
    cuarto = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75]

    getIndice(num) {
        if(num < 29) return this.primero.indexOf(num);
        if(num < 49) return this.segundo.indexOf(num) +16;
        if(num < 66) return this.tercero.indexOf(num);
        return this.cuarto.indexOf(num)+16;
    }
}