function ok(res, data, status = 200) {
  res.status(status).json({ success: true, data });
}

function badRequest(res, error) {
  res.status(400).json({ success: false, error });
}

function notFound(res, error) {
  res.status(404).json({ success: false, error });
}

module.exports = { ok, badRequest, notFound };
