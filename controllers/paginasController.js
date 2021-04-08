import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/Testimoniales.js';

const paginaInicio = async (request, resolve) => {
    //consultar 3 viajes del modelo Viaje
    
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));
    try {
        const resultado = await Promise.all(promiseDB);

        resolve.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error)
    }

};

const paginaNosotros = (request, resolve) => {
    resolve.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (request, resolve) => {
    //consultar base de datos
    const viajes = await Viaje.findAll();
    resolve.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    });
}

const paginaTestimoniales = async (request, resolve) => {

    try {
        const testimoniales = await Testimonial.findAll();

        resolve.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }

}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) =>{
    const {slug} = req.params;
    try {
        const viaje = await Viaje.findOne({where : {slug}});
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}