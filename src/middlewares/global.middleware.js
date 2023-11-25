const setGlobalVariable = (req, res, next) => {
    console.log(req.user);
    res.locals.user = req.user !== undefined ? req.user : null;
    next();
}

export default setGlobalVariable;