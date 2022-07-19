
class AdminController {

    // Get /admin/index
    index(req, res, next) {
        res.render('admin/index', {
            style: [],
            script: ['dashboard'],
            layout: 'layout_admin.hbs'
        });
    }

}

module.exports = new AdminController;
