Validator({
    form: '#form-2',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#hoten', 'Vui lòng nhập tên đầy đủ'),
        Validator.isRequired('#sdt'),
        Validator.isRequired('#diachi'),
        Validator.isEmail('#email'),
        Validator.isRequired('#password'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#password_confirmation'),
        // Validator.isRequired('input[name="gender"]'),
        // Validator.isConfirmed('#password_confirmation', function(){
        //   return document.querySelector('#form-1 #password').value;
        // }, 'Mật khẩu nhập lại không chính xác')
    ],
    onSubmit: function (data) {
        // call api
        console.log(data);
    }
});