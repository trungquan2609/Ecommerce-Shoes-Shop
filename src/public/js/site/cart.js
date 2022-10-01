var api = '/api/cart'

function start(e) {
    e.preventDefault()
    fetch(api)
    .then((rs) => rs.json())
    .then(data => {
        var cart = Object.keys(data).map((key)=>[data[key]])
        var arrQuantity = []
        var query = ''
        $('.text-input').each(function() {
            arrQuantity.push(parseInt($(this).val()))
        })
        
        console.log(arrQuantity)
        for (var i = 0; i < cart.length; i++) {
            if (arrQuantity[i] > cart[i][0].item.quantity + cart[i][0].qty) {
                return alert('Tồn kho không đủ')
            }
            query = `id=${cart[i][0].item._id}&quantity=${arrQuantity[i]}&` + query
        }
        query = query.slice(0, query.length - 1)
        console.log(query)
        window.location = `/cart/updatecart?${query}`
    })
}
$('.chekout').click(start)