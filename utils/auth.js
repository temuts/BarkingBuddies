const withAuth = (req, res, next) => {
  //if the user is not logged in, redirect to request to the login route
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

async function withProfile(req, res, next) {
  //if the user has not register a profile, redirect to request to the registration page
  const fulllUrl = `${req.protocol}://${req.get("host")}/registration-complete`;
  console.log(fulllUrl);
  const response = await fetch(fulllUrl, {
    method: "GET",
  });
  console.log("Response status:", response.status);
  if (response.ok) {
    const profileExists = await response.json();
    console.log("profiel does exists: " + profileExists);
    next();
  } else {
    res.redirect("/register");
  }
}

module.exports = { withAuth, withProfile };
