var page = 1;
  
  var apiProducts = [
      {
        id: 1,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/jordanjumpman1.jpg',
        page: 1,
        idsort: 'sort3',
        idkg: 'kg1',
        idth: 'th1',
        idsize: 'size1'
      },
      {
        id: 2,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/stansmithgolf1.jpg',
        page: 1,
        idsort: 'sort3',
        idkg: 'kg1',
        idth: 'th1',
        idsize: 'size1'
      },
      {
        id: 3,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/stansmithgolf2.jpg',
        page: 1,
        idsort: 'sort3',
        idkg: 'kg2',
        idth: 'th2',
        idsize: 'size2'
      },
      {
        id: 4,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/stansmithgolf3.jpg',
        page: 1,
        idsort: 'sort2',
        idkg: 'kg2',
        idth: 'th2',
        idsize: 'size2'
      },
      {
        id: 5,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/stansmithgolf4.jpg',
        page: 1,
        idsort: 'sort2',
        idkg: 'kg3',
        idth: 'th3',
        idsize: 'size3'
      },
      {
        id: 6,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/superfly1.jpg',
        page: 1,
        idsort: 'sort3',
        idkg: 'kg4',
        idth: 'th4',
        idsize: 'size4'
      },
      {
        id: 7,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/superfly2.png',
        page: 1,
        idsort: 'sort3',
        idkg: 'kg1',
        idth: 'th1',
        idsize: 'size1'
      },
      {
        id: 8,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/superfly3.png',
        page: 1,
        idsort: 'sort4',
        idkg: 'kg2',
        idth: 'th2',
        idsize: 'size2'
      },
      {
        id: 9,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/superfly4.png',
        page: 1,
        idsort: 'sort3',
        idkg: 'kg3',
        idth: 'th3',
        idsize: 'size3'
      },
      {
        id: 10,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/jordanjumpman1.jpg',
        page: 2,
        idsort: 'sort2',
        idkg: 'kg4',
        idth: 'th4',
        idsize: 'size4'
      },
      {
        id: 11,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/jordanjumpman1.jpg',
        page: 2,
        idsort: 'sort3',
        idkg: 'kg1',
        idth: 'th1',
        idsize: 'size1'
      },
      {
        id: 12,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/nikesbzoom1.jpg',
        page: 2,
        idsort: 'sort3',
        idkg: 'kg2',
        idth: 'th2',
        idsize: 'size2'
      },
      {
        id: 13,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/nikesbzoom1.jpg',
        page: 2,
        idsort: 'sort4',
        idkg: 'kg2',
        idth: 'th2',
        idsize: 'size2'
      },
      {
        id: 14,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/nikesbzoom1.jpg',
        page: 2,
        idsort: 'sort5',
        idkg: 'kg3',
        idth: 'th3',
        idsize: 'size3'
      },
      {
        id: 15,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/nikesbzoom2.png',
        page: 2,
        idsort: 'sort2',
        idkg: 'kg3',
        idth: 'th3',
        idsize: 'size3'
      },
      {
        id: 16,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/nikesbzoom3.png',
        page: 2,
        idsort: 'sort4',
        idkg: 'kg1',
        dthh: 'kg1',
      },
      {
        id: 17,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/nikesbzoom2.png',
        page: 2,
        idsort: 'sort5',
        idkg: 'kg4',
        idth: 'th4',
        idsize: 'size4'
      },
      {
        id: 18,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/ult1.jpg',
        page: 2,
        idsort: 'sort2',
        idkg: 'kg2',
        idth: 'th2',
        idsize: 'size2'
      },
      {
        id: 19,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/ult2.jpg',
        page: 3,
        idsort: 'sort3',
        idkg: 'kg1',
        idth: 'th1',
        idsize: 'size1'
      },
      {
        id:20,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/ult3.jpg',
        page: 3,
        idsort: 'sort2',
        idkg: 'kg3',
        idth: 'th3',
        idsize: 'size3'
      },
      {
        id:21,
        name: 'Nike Mercurial',
        description: 'Mới đây Footpack và Soub đã hợp tác với nhau để tạo ra một phiên bản Nike Mercurial Vapor 14 được tùy chỉnh đặc biệt',
        img: './assets/img/product/ult3.jpg',
        page: 3,
        idsort: 'sort2',
        idkg: 'kg3',
        idth: 'th3',
        idsize: 'size3'
      },
  ]
  var listItems = document.querySelector('#products');
  function initRender() {
      var listProducts = apiProducts.map(function(apiProduct) {
        if(apiProduct.page == page) {
          return `<div class="col-lg-4 col-md-6 col-12 mb-20" style="margin-bottom: 20px">
              <a href="./ProductDetail.html" class="product__new-item">
                <div class="card" style="width: 100%">
                  <div>
                    <img class="card-img-top" src="${apiProduct.img}" alt="Card image cap">
                    <form action="" class="hover-icon hidden-sm hidden-xs hidden-sm hidden-xs">
                      <input type="hidden">
                      <a href="" class="btn-add-to-cart" title="Mua ngay">
                        <i class="fas fa-cart-plus"></i>
                      </a>
                      <a data-toggle="modal" data-target="#myModal" class="quickview" title="Xem nhanh">
                        <i class="fas fa-search"></i>
                      </a>
                    </form>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title custom__name-product">
                      ${apiProduct.name}
                    </h5>
                    <div class="product__price">
                      <p class="card-text price-color product__price-old">1,000,000 đ</p>
                      <p class="card-text price-color product__price-new">1,000,000 đ</p>
                    </div>
                    <div class="home-product-item__action">
                      <span class="home-product-item__like home-product-item__like--liked">
                          <i class="home-product-item__like-icon-empty far fa-heart"></i>
                          <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                      </span>
                      <div class="home-product-item__rating">
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="fas fa-star"></i>
                      </div>
                      <span class="home-product-item__sold">79 đã bán</span>
                    </div>
                    <div class="sale-off">
                      <span class="sale-off-percent">20%</span>
                      <span class="sale-off-label">GIẢM</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>`
        }
      })
      var renderList = listProducts.join('');
      listItems.innerHTML = renderList;
  }
  initRender();
  
  function render() {
      var listProducts = apiProducts.map(function(apiProduct) {
        if(apiProduct.page == page) {
          return `<div class="col-lg-4 col-md-6 col-12 mb-20" style="margin-bottom: 20px">
              <a href="./ProductDetail.html" class="product__new-item">
                <div class="card" style="width: 100%">
                  <div>
                    <img class="card-img-top" src="${apiProduct.img}" alt="Card image cap">
                    <form action="" class="hover-icon hidden-sm hidden-xs hidden-sm hidden-xs">
                      <input type="hidden">
                      <a href="" class="btn-add-to-cart" title="Mua ngay">
                        <i class="fas fa-cart-plus"></i>
                      </a>
                      <a data-toggle="modal" data-target="#myModal" class="quickview" title="Xem nhanh">
                        <i class="fas fa-search"></i>
                      </a>
                    </form>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title custom__name-product">
                      ${apiProduct.name}
                    </h5>
                    <div class="product__price">
                      <p class="card-text price-color product__price-old">1,000,000 đ</p>
                      <p class="card-text price-color product__price-new">1,000,000 đ</p>
                    </div>
                    <div class="home-product-item__action">
                      <span class="home-product-item__like home-product-item__like--liked">
                          <i class="home-product-item__like-icon-empty far fa-heart"></i>
                          <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                      </span>
                      <div class="home-product-item__rating">
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="fas fa-star"></i>
                      </div>
                      <span class="home-product-item__sold">79 đã bán</span>
                    </div>
                    <div class="sale-off">
                      <span class="sale-off-percent">20%</span>
                      <span class="sale-off-label">GIẢM</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>`
        }
      })
      var renderList = listProducts.join('');
      $('#products').append(listProducts);
  }
  var btnLoadMore = document.querySelector('.loadmore-btn');
  $(btnLoadMore).click(function() {
      page++;
      render();
      if(page > 3)
      {
        $(btnLoadMore).fadeOut();
      }
      
    })

// logic này random 
    

    
    function getSapXep(idSort) {
      var listProducts = apiProducts.map(function(apiProduct) {
        if(apiProduct.idsort == idSort) {
          return `<div class="col-lg-4 col-md-6 col-12 mb-20" style="margin-bottom: 20px">
              <a href="./ProductDetail.html" class="product__new-item">
                <div class="card" style="width: 100%">
                  <div>
                    <img class="card-img-top" src="${apiProduct.img}" alt="Card image cap">
                    <form action="" class="hover-icon hidden-sm hidden-xs hidden-sm hidden-xs">
                      <input type="hidden">
                      <a href="" class="btn-add-to-cart" title="Mua ngay">
                        <i class="fas fa-cart-plus"></i>
                      </a>
                      <a data-toggle="modal" data-target="#myModal" class="quickview" title="Xem nhanh">
                        <i class="fas fa-search"></i>
                      </a>
                    </form>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title custom__name-product">
                      ${apiProduct.name}
                    </h5>
                    <div class="product__price">
                      <p class="card-text price-color product__price-old">1,000,000 đ</p>
                      <p class="card-text price-color product__price-new">1,000,000 đ</p>
                    </div>
                    <div class="home-product-item__action">
                      <span class="home-product-item__like home-product-item__like--liked">
                          <i class="home-product-item__like-icon-empty far fa-heart"></i>
                          <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                      </span>
                      <div class="home-product-item__rating">
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="fas fa-star"></i>
                      </div>
                      <span class="home-product-item__sold">79 đã bán</span>
                    </div>
                    <div class="sale-off">
                      <span class="sale-off-percent">20%</span>
                      <span class="sale-off-label">GIẢM</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>`
        }
      })
      var renderList = listProducts.join('');
      listItems.innerHTML = renderList;
  }
    $('.dropdown-item').click(function () {
      var dataSort = $(this).attr('value');
      var idSort = $(this).attr('id');
      console.log(idSort)
      getSapXep(idSort);
    })

    function getKhoangGia(idkg) {
      var listProducts = apiProducts.map(function(apiProduct) {
        if(apiProduct.idkg == idkg) {
          return `<div class="col-lg-4 col-md-6 col-12 mb-20" style="margin-bottom: 20px">
              <a href="./ProductDetail.html" class="product__new-item">
                <div class="card" style="width: 100%">
                  <div>
                    <img class="card-img-top" src="${apiProduct.img}" alt="Card image cap">
                    <form action="" class="hover-icon hidden-sm hidden-xs hidden-sm hidden-xs">
                      <input type="hidden">
                      <a href="" class="btn-add-to-cart" title="Mua ngay">
                        <i class="fas fa-cart-plus"></i>
                      </a>
                      <a data-toggle="modal" data-target="#myModal" class="quickview" title="Xem nhanh">
                        <i class="fas fa-search"></i>
                      </a>
                    </form>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title custom__name-product">
                      ${apiProduct.name}
                    </h5>
                    <div class="product__price">
                      <p class="card-text price-color product__price-old">1,000,000 đ</p>
                      <p class="card-text price-color product__price-new">1,000,000 đ</p>
                    </div>
                    <div class="home-product-item__action">
                      <span class="home-product-item__like home-product-item__like--liked">
                          <i class="home-product-item__like-icon-empty far fa-heart"></i>
                          <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                      </span>
                      <div class="home-product-item__rating">
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="fas fa-star"></i>
                      </div>
                      <span class="home-product-item__sold">79 đã bán</span>
                    </div>
                    <div class="sale-off">
                      <span class="sale-off-percent">20%</span>
                      <span class="sale-off-label">GIẢM</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>`
        }
      })
      var renderList = listProducts.join('');
      listItems.innerHTML = renderList;
  }
  //  // lấy dữ liệu của khoảng giá
    $('.checkGia').click(function () {
        var idkg = $(this).attr('id');
        getKhoangGia(idkg);
    })
    function getThuongHieu(idth) {
      var listProducts = apiProducts.map(function(apiProduct) {
        if(apiProduct.idth == idth) {
          return `<div class="col-lg-4 col-md-6 col-12 mb-20" style="margin-bottom: 20px">
              <a href="./ProductDetail.html" class="product__new-item">
                <div class="card" style="width: 100%">
                  <div>
                    <img class="card-img-top" src="${apiProduct.img}" alt="Card image cap">
                    <form action="" class="hover-icon hidden-sm hidden-xs hidden-sm hidden-xs">
                      <input type="hidden">
                      <a href="" class="btn-add-to-cart" title="Mua ngay">
                        <i class="fas fa-cart-plus"></i>
                      </a>
                      <a data-toggle="modal" data-target="#myModal" class="quickview" title="Xem nhanh">
                        <i class="fas fa-search"></i>
                      </a>
                    </form>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title custom__name-product">
                      ${apiProduct.name}
                    </h5>
                    <div class="product__price">
                      <p class="card-text price-color product__price-old">1,000,000 đ</p>
                      <p class="card-text price-color product__price-new">1,000,000 đ</p>
                    </div>
                    <div class="home-product-item__action">
                      <span class="home-product-item__like home-product-item__like--liked">
                          <i class="home-product-item__like-icon-empty far fa-heart"></i>
                          <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                      </span>
                      <div class="home-product-item__rating">
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="fas fa-star"></i>
                      </div>
                      <span class="home-product-item__sold">79 đã bán</span>
                    </div>
                    <div class="sale-off">
                      <span class="sale-off-percent">20%</span>
                      <span class="sale-off-label">GIẢM</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>`
        }
      })
      var renderList = listProducts.join('');
      listItems.innerHTML = renderList;
  }
    $('.checkthuonghieu').click(function () {
        var idth = $(this).attr('id');
        getThuongHieu(idth);
    })
    function getSize(idsize) {
      var listProducts = apiProducts.map(function(apiProduct) {
        if(apiProduct.idsize == idsize) {
          return `<div class="col-lg-4 col-md-6 col-12 mb-20" style="margin-bottom: 20px">
              <a href="./ProductDetail.html" class="product__new-item">
                <div class="card" style="width: 100%">
                  <div>
                    <img class="card-img-top" src="${apiProduct.img}" alt="Card image cap">
                    <form action="" class="hover-icon hidden-sm hidden-xs hidden-sm hidden-xs">
                      <input type="hidden">
                      <a href="" class="btn-add-to-cart" title="Mua ngay">
                        <i class="fas fa-cart-plus"></i>
                      </a>
                      <a data-toggle="modal" data-target="#myModal" class="quickview" title="Xem nhanh">
                        <i class="fas fa-search"></i>
                      </a>
                    </form>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title custom__name-product">
                      ${apiProduct.name}
                    </h5>
                    <div class="product__price">
                      <p class="card-text price-color product__price-old">1,000,000 đ</p>
                      <p class="card-text price-color product__price-new">1,000,000 đ</p>
                    </div>
                    <div class="home-product-item__action">
                      <span class="home-product-item__like home-product-item__like--liked">
                          <i class="home-product-item__like-icon-empty far fa-heart"></i>
                          <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                      </span>
                      <div class="home-product-item__rating">
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="home-product-item__star--gold fas fa-star"></i>
                          <i class="fas fa-star"></i>
                      </div>
                      <span class="home-product-item__sold">79 đã bán</span>
                    </div>
                    <div class="sale-off">
                      <span class="sale-off-percent">20%</span>
                      <span class="sale-off-label">GIẢM</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>`
        }
      })
      var renderList = listProducts.join('');
      listItems.innerHTML = renderList;
  }
    $('.checksize').click(function () {
        var idsize = $(this).attr('id');
        getSize(idsize);
    })