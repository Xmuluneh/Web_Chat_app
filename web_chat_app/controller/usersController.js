function getUsers(req, res, next) {
  res.render('users', {
    title: 'Users- chat application ',
  });
}

export default getUsers;
