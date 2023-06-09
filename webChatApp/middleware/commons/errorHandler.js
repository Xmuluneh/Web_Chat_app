import createError from 'http-errors';

// 404 page not found
function notFoundHandler(req, res, next) {
  next(createError(404, 'Page not found Aaron try again'));
}

//def middler error handler

function errorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === 'development' ? err : { message: err.message };
  res.status(err.status || 500);

  if (!res.locals.html) {
    res.render('error', {
      title: 'This page is HTML error page',
    });
  } else {
    res.json(res.locals.error);
  }
}
export { errorHandler, notFoundHandler };
