function getUsers(req, res, next) {
  res.render('users', {
    title: 'User Page',
  });
}

export default getUsers;
