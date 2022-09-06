const Tietokanta = require('../tietokanta');
const optiot = require('./yhteysoptiot.json');
const sql = require('./sqllauseet.json');

const rental = sql.rental.join(' ');
const haeElokuvia = sql.haeCategorya.join(' ');

const { insertParametrit } = require('./parametrisetfunktiot');

const PERUSAVAIN = sql.perusavain;

module.exports = class Tietovarasto {
    constructor() {
        this.db = new Tietokanta(optiot);
    }

    haeElokuvia(category) {
        return new Promise(async (resolve, reject) => {
            if (!category) {
                reject('-- tyhjä --');
            } else {
                try {
                    const tulos = await this.db.suoritaKysely(haeElokuvia, [category]);
                    resolve(tulos.kyselynTulos);
                } catch (virhe) {
                    reject('error');
                }
            }
        });
    }
    rental(){
        return new Promise( async (resolve,reject)=>{

            try{
                const tulos = await this.db.suoritaKysely(rental);
                resolve(tulos.kyselynTulos);
            }
            catch(virhe){
                console.log(virhe);
            }
        })
    }
};
