// Check if the user is registered
// If not: redirect to login
const loginRedirect = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    res.redirect("/api/users/login");
  } else {
    next();
  }
};

module.exports = loginRedirect;
