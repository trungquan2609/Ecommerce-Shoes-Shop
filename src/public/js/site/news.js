var page =1;
var apiNews = [
  {
    id: 1,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/addidas1.jpg',
    page: 1
  },
  {
    id: 2,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/stansmithgolf1.jpg',
    page: 1
  },
  {
    id: 3,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/stansmithgolf2.jpg',
    page: 1
  },
  {
    id: 4,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/stansmithgolf3.jpg',
    page: 1
  },
  {
    id: 5,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/stansmithgolf4.jpg',
    page: 1
  },
  {
    id: 6,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/superfly1.jpg',
    page: 1
  },
  {
    id: 7,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/superfly2.png',
    page: 1
  },
  {
    id: 8,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/superfly3.png',
    page: 1
  },
  {
    id: 9,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/superfly4.png',
    page: 2
  },
  {
    id: 10,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/nikeairforce11.jpg',
    page: 2
  },
  {
    id: 11,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/nikeairforce11.jpg',
    page: 2
  },
  {
    id: 12,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/nikeairforce11.jpg',
    page: 2
  },
  {
    id: 13,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/nikeairforce11.jpg',
    page: 2
  },
  {
    id: 14,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/nikeairforce11.jpg',
    page: 2
  },
  {
    id: 15,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/niketiempo2.png',
    page: 2
  },
  {
    id: 16,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/niketiempo2.png',
    page: 2
  },
  {
    id: 17,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/niketiempo2.png',
    page: 3
  },
  {
    id: 18,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/nikesbzoom1.jpg',
    page: 3
  },
  {
    id: 19,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/nikesbzoom1.jpg',
    page: 3
  },
  {
    id:20,
    name: 'Nike Mercurial Vapor 14 theo phong cách của Nike Jordan 1 sẽ trông như nào?',
    description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
    img: './assets/img/product/nikesbzoom1.jpg',
    page: 3
  },
]
var listItem = document.querySelector('#news');
console.log(listItem);
function initRender() {
  var listNews = apiNews.map(function(apiNew) {
    if(apiNew.page == page) {
      return `<div class="col-lg-3 col-md-6 col-sm-12 mb-20" style="margin-bottom: 20px">
                <a href="./newDetail.html" class="product__new-item">
                  <div class="card" style="width: 100%">
                    <img class="card-img-top" src="${apiNew.img}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title custom__name-product title-news">
                        ${apiNew.name}
                      </h5>
                      <p class="card-text custom__name-product" style="font-weight: 400;">${apiNew.description}</p>
                    </div>
                </div>
                </a>
              </div>`
    }
  })
  var renderList = listNews.join('');
  listItem.innerHTML = renderList;
}
initRender();
var btnLoadMore = document.querySelector('.loadmore-btn');
function render() {
  var listNews = apiNews.map(function(apiNew) {
    if(apiNew.page == page) {
      return `<div class="col-lg-3 col-md-6 col-sm-12 mb-20" style="margin-bottom: 20px">
                <a href="./newDetail.html" class="product__new-item">
                  <div class="card" style="width: 100%">
                    <img class="card-img-top" src="${apiNew.img}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title custom__name-product title-news">
                        ${apiNew.name}
                      </h5>
                      <p class="card-text custom__name-product" style="font-weight: 400;">${apiNew.description}</p>
                    </div>
                </div>
                </a>
              </div>`
    }
  })
  var renderList = listNews.join('');
  $('#news').append(listNews);
}

$(btnLoadMore).click(function() {
  page++;
  render();
  if(page > 3)
  {
    $(btnLoadMore).fadeOut();
  }
  
})