const successHandler = (res, msg, data) => {
    return res.status(200).send({ status: true, msg, data })
}

const errorHandler = (res, error) => {
    const msg = error.message || "error something went wrong";
    return res.status(400).send({ status: false, msg })
}

module.exports = { successHandler, errorHandler }