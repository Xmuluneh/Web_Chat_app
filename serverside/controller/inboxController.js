function getInbox(req, res, next) {
  res.render('inbox', {
    title: 'Inbox- chat application ',
  });
}

export default getInbox;
