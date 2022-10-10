
class ProfileController {
    login(req, res, next) {
        var messages = req.flash('error');
        res.render('admin/profile/login', {
            layout: '',
            messages,
            hasErrors: messages.length > 0,
        })
    }
}

module.exports = new ProfileController;