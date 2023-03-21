function getLogin(req, res, next) {
  res.render('index', {
    title: 'Login- chat application ',
  });
}

export default getLogin;
