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
  const pass_field2 = document.querySelector('#password-new');
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
  const pass_field3 = document.querySelector('#password-confirm');
  const show_btn3 = document.querySelector('.fa-eye-3')
  show_btn3.addEventListener("click", function () {
    if (pass_field3.type === "password") {
      pass_field3.type = "text";
      show_btn3.classList.add("hide");
    } else {
      pass_field3.type = "password";
      show_btn3.classList.remove("hide");
    }
  });

function getOrder(id) {
  fetch(`/api/order?orderId=${id}`)
  .then((response) => response.json())
  .then(rs => {
    $('#order-detail').html('')
    for (var i in rs) {
      renderOrder(rs[i])
      console.log(rs)
    }
  })
}

function renderOrder(element) {
  var item = `
        <tr>
          <td>
            <img src="/img/product/${element.item.productImage}" alt="" width="150px">
          </td>
          <td>${element.item.productName}</td>
          <td>${element.item.size}</td>
          <td>${priceFormat(element.item.currentPrice)}</td>
          <td>${element.qty}</td>
          <td>${priceFormat(element.price)}</td>
        </tr>`
    $('#order-detail').append(item)
}

function priceFormat(price) {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function cancelOrder(id) {
  document.getElementById('btn-cancel-order').value = id
}

function confirmCancelOrder() {
  var orderId = document.getElementById('btn-cancel-order').value
  window.location = `/api/order/cancelorder?id=${orderId}`
}