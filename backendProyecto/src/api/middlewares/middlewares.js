/* Muestra en consola cada petición y luego continua con next*/
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

/* Valida que el id en la url sea un numero valido antes de continuar */
const validateId = (req, res, next) => {
    let {id} = req.params;

    if(!id || isNaN(Number(id))) {
        return res.status(400).json({
            message: "El id del producto debe ser un número"
        })
    }

    req.id = parseInt(id, 10);

    next();
}

/*Permite proteger las rutas de tu aplicacion para que solo
los usuarios logueados puedan acceder*/
const requireLogin = (req, res, next) => {
    if(!req.session.user){
        return res.redirect("/login");
    }
    next();
}

export{
    loggerUrl,
    validateId,
    requireLogin
}