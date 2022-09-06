'use strict';

const { resolveInclude } = require('ejs');
const mariadb = require('mariadb');

module.exports = class Tietokanta{
    constructor(optiot){
        this.optiot = optiot;
    }

    suoritaKysely (sql, parametrit){
        return new Promise(async (resolve, reject) => {
            let yhteys;
        try{
            yhteys = await mariadb.createConnection(this.optiot);
            let kyselynTulos = await yhteys.query(sql, parametrit);

            if(typeof kyselynTulos === 'undefined'){
                reject('kyselynTulos');
            }
            else if(typeof kyselynTulos.affectedRows === 'undefined'){
                delete kyselynTulos.determinePacket;
                resolve({kyselynTulos, tulosjoukko:true});
            }
            else {
                resolve({
                    kyselynTulos:{
                        muutetutRivitLkm: kyselynTulos.affectedRows,
                        insertId: kyselynTulos.insertId,
                        status: kyselynTulos.warningStatus
                    },
                    tulosjoukko:false
                });
            }
        }
        catch(virhe){
            reject('SQL-virhe'+virhe);
        }
        finally{
            if(yhteys) yhteys.end();
        }
        
        })
    }
}