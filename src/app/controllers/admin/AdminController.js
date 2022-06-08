
class AdminController {

    // Get /admin/index
    index(req, res, next) {
        res.render('admin/index', {
            style: [],
            layout: 'layout_admin.hbs'
        });
    }

}

module.exports = new AdminController;
