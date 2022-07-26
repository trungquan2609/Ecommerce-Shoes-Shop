const { response } = require("express");

class SiteController {

    // Get /site/index
    index(req, res, next) {
        res.render('site/index', {
            title: 'N&Q Shop',
            styles: ['productdetail'],
            scripts: [],
            layout: 'layout_site.hbs'
        })
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

    success(req, res, next) {
        res.render('site/success', {
            title: 'Đặt hàng thành công',
            styles: [],
            scripts: [],
            layout: 'layout_site.hbs'
        })
    }

    contact(req, res, next) {
        res.render('site/contact', {
            title: 'Liên hệ',
            styles: ['login'],
            scripts: [],
            layout: 'layout_site.hbs'
        })
    }
}

module.exports = new SiteController;
