class Response {
    respondOnSuccess = (status, message, data, res) => res.status(status).send({
      status,
      message,
      data,
    })

    respondOnError = (status, error, res) => res.status(status).send({
      status,
      error,
    });
}

export default new Response();
