export const notFound = (req, res, next) => {
  res.type("application/json");
  res.status(404).send("404 - Not Found");
  next();
};
