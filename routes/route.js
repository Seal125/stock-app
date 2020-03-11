router.get('/', function(req, res, next) {
  res.render('route', {
    page: 'register.ejs',
    menuId: 'home'
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    page: 'About Us',
    menuId: 'about'
  });
});