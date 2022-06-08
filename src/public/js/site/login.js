Validator({
    form: '#form-2',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      // Validator.isRequired('#fullname','Vui lòng nhập tên đầy đủ'),
      Validator.isRequired('#email'),
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
  const pass_field = document.querySelector('#password');
  const show_btn = document.querySelector('.fa-eye')
  function myFunction() {
    if (pass_field.type === "password") {
      pass_field.type = "text";
      show_btn.classList.add("hide");
    } else {
      pass_field.type = "password";
      show_btn.classList.remove("hide");
    }
  }