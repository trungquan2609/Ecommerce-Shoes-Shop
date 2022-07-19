
class SiteController {

    // Get /site/index
    index(req, res, next) {
        res.render('site/index', {
            title: 'N&Q Shop',
            styles: ['productdetail'],
            scripts: [],
            layout: 'layout_site.hbs'
        });
    }

    // Get /site/intro
    intro(req, res, next) {
        res.render('site/intro', {
            title: 'Giới thiệu',
            styles: [],
            scripts: [],
            layout: 'layout_site.hbs'
        });
    }
}

module.exports = new SiteController;
