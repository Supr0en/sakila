const path = require('path');

const express = require('express');
const app = express();

const { port } = require('./config.json');

const Tietovarasto = require('./sqlvarasto/tietovarastokerros');
const varasto = new Tietovarasto();

app.set('view engine','ejs');
app.set('views', path.join ( __dirname,'sites'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/'));

app.get('/',( req, res ) =>{
    res.render('etusivu', {
        kieli: "fi",
        otsikko: "Kotisivu"
    });
})

app.get('/elokuvat', ( req, res )=>{
    res.render('elokuvat', {
            kieli: "fi",
            otsikko: "Elokuvat",
            toiminto:'/hae',
            tyyppi: 'search',
            category: '',
            kentat: [
                {
                    nimi: 'title',
                    name: 'title',
                    category: 'category',
                    release: 'release_year',
                    readonly: ''
                }
            ]
    });
});

app.get('/rent', async (req, res) => {
    try {
        const tulostaulu = await varasto.rental();

        res.render('rent', {
            kieli: 'fi',
            otsikko: 'varaukset',
            sarakeotsikot: ['title', 'rental_date', 'return_date'],
            tulostaulu
        });
    } catch(virhe){
        console.error(virhe);
    }
})

app.listen(port, (err) => {
    if(err){
        return console.error(err)
    }
    console.log(`kuuntelee porttia ${port}`)
});

app.post('/hae', async (req, res) => {
    try{ 
        const category = req.body.category;
        const kentat = await varasto.haeElokuvia(category);

        if (kentat.length > 0) {
            res.render('elokuvat', {
                kieli: "fi",
                otsikko: 'Etsi',
                aihe: 'Hae Categorya',
                toiminto: '/hae',
                tyyppi: 'search',
                category,
                kentat
            })   
        }
    }
    catch(virhe){
        console.log(virhe)
    }
});