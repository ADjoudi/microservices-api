exports.request_header_parser_get = function (req, res, next) {
  const ipaddress = req.ip;
  const language = req.get("accept-language");
  const software = req.get("user-agent");

  res.json({ ipaddress, language, software });
};
