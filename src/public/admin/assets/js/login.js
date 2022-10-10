// async function login() {
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;
//     var csrf = document.querySelector('input[name="_csrf"]').value;
//     fetch(`/admin/login?_csrf=${csrf}`, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             email: email,
//             password: password
//         }),
//     })
//     // console.log(csrf)
// }
