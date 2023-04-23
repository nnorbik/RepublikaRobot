/**
* Custom blocks for educating robotic arm
* Norbert Navratil
* Dobsice 2023
* 
*/

enum Celisti {
    //% block="uplne"
    Uplne,
    //% block="do 3/4"
    Trictvrte,
    //% block="do 1/2"
    Polovina,
    //% block="do 1/4"
    Ctvrtina,
    //% block="otevrene"
    Otevrene
}
let chksm_out = 0;
let chksm_in = 0;
let radiokanal = 0;

/**
 * Republika robot blocks
 */

//% weight=200 color=#130471 icon="\uf22c"
namespace Robot {
    //% block="Inicializace robota $radiokanal"
    //% radiokanal.min=0 radiokanal.max=255

    export function InicializaceRobota(radiokanal: number): void {
        chksm_out = 0
        chksm_in = -1
        radio.setGroup(radiokanal)
        basic.showLeds(`
     . . . . .
     . # # # .
     # . # . #
     . # # # .
     . . . . .
     `)
        while (!(input.logoIsPressed())) {
        }
        basic.showString("I")
        radio.sendValue("init", chksm_out)

        chksm_out += 1
        
        while (chksm_out != chksm_in) {
            chksm_in = radio.receiveNumber()
            basic.showNumber(chksm_in)
            basic.showNumber(chksm_out)
        }
        basic.showString("W")
    }

    //% block="Vzdalenost ramene $vzdalenost| Vyska ramene $vyska"
    //% vzdalenost.defl=7
    //% vzdalenost.min=7 vzdalenost.max=16
    //% vyska.min=0 vyska.max=10
    export function NastavitRameno(vzdalenost: number, vyska: number): void {
        // Add code here        
        if (vzdalenost > 16) {
            vzdalenost = 16
        }        
        if (vzdalenost < 7) {
            vzdalenost = 7
        }
        if (vyska > 10) {
            vyska = 10
        }
        if (vyska < 0) {
            vyska = 0
        }

        radio.sendValue("rameno", (vzdalenost + 10) * 100 + (vyska + 10))
        
        while (chksm_out != chksm_in) {
            chksm_in = radio.receiveNumber()
            basic.showNumber(chksm_in)
            basic.showNumber(chksm_out)
        }

        chksm_out += 1

        while (chksm_out != chksm_in) {
            chksm_in = radio.receiveNumber()
            basic.showNumber(chksm_in)
            basic.showNumber(chksm_out)
        }
    }

    //% block="Otoceni ramene $otoceni \\°"
    //% otoceni.min=-60 otoceni.max=60
    export function UhelRamene(otoceni: number): void {
        if (otoceni > 60) {
            otoceni = 60
        }
        if (otoceni < -60) {
            otoceni = -60
        }

        radio.sendValue("uhel", otoceni)
        
        while (chksm_out != chksm_in) {
            chksm_in = radio.receiveNumber()
        }

        chksm_out += 1

        while (chksm_out != chksm_in) {
            chksm_in = radio.receiveNumber()
        }
    }

    //% block="Sevreni celisti $choice"
    export function SevreniCelisti(choice: Celisti): void {
        radio.sendValue("end", 0)
        chksm_out += 1

        while (chksm_out != chksm_in) {
            chksm_in = radio.receiveNumber()
        }

        chksm_out += 1

        while (chksm_out != chksm_in) {
            chksm_in = radio.receiveNumber()
        }
    }

    //% block="Ukonceni programu robota"
    export function UkonceniProgramuRobota(): void {
        radio.sendValue("end", 0)
        basic.showString("Hotovo")
        chksm_out = 0
        chksm_in = 0
    }

}