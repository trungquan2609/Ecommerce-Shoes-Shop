Validator({
    form: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      // Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ'),
      Validator.isRequired('#email'),
      Validator.isEmail('#email'),
      Validator.minLength('#password', 6),
      Validator.isRequired('#checkPassword'),
      // Validator.isRequired('input[name="gender"]'),
      Validator.isConfirmed('#checkPassword', function () {
        return document.querySelector('#form-1 #password').value;
      }, 'Mật khẩu nhập lại không chính xác')
    ],
    // onSubmit: function (data) {
    //   // call api
    //   console.log(data);
    // }
  });
  const pass_field = document.querySelector('#password');
  const show_btn = document.querySelector('.fa-eye')
  show_btn.addEventListener("click", function () {
    if (pass_field.type === "password") {
      pass_field.type = "text";
      show_btn.classList.add("hide");
    } else {
      pass_field.type = "password";
      show_btn.classList.remove("hide");
    }
  });
  const pass_field2 = document.querySelector('#password_confirmation');
  const show_btn2 = document.querySelector('.fa-eye-2')
  show_btn2.addEventListener("click", function () {
    if (pass_field2.type === "password") {
      pass_field2.type = "text";
      show_btn2.classList.add("hide");
    } else {
      pass_field2.type = "password";
      show_btn2.classList.remove("hide");
    }
  });