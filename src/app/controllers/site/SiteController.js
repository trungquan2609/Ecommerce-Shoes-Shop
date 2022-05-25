
class SiteController {

    // Get /index
    index(req, res, next) {
        res.render('site/index', {layout: 'layout_site.hbs'});
    }

}

module.exports = new SiteController;
