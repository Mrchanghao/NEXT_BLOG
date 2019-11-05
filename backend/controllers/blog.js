exports.time = (req, res) => {
  res.json({time: Date.now().toString()})
};

