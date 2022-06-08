import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['listCart', 'listItem', 'cartButton'];
  items = [
    {
      id: 1,
      name: 'Xbox',
      image:
        'https://http2.mlstatic.com/D_NQ_NP_618854-MLA44492746403_012021-O.webp',
      price: 'R$ 2.278',
      qty: 10,
    },
    {
      id: 2,
      name: 'Nintendo Switch',
      image:
        'https://http2.mlstatic.com/D_NQ_NP_847299-MLA40692342173_022020-O.webp',
      price: 'R$ 2.298',
      qty: 30,
    },
    {
      id: 3,
      name: 'SSD',
      image:
        'https://http2.mlstatic.com/D_NQ_NP_751939-MLA46221843872_052021-O.webp',
      price: 'R$ 326',
      qty: 30,
    },
    {
      id: 4,
      name: 'Macbook',
      image:
        'https://http2.mlstatic.com/D_NQ_NP_840786-MLA46516504421_062021-O.webp',
      price: 'R$ 7.161',
      qty: 30,
    },
  ];

  cart = [];

  modalOpen = false;

  openModal() {
    if (this.modalOpen) {
      this.listCartTarget.classList.remove('open');
    } else {
      this.listCartTarget.classList.add('open');
    }

    this.modalOpen = !this.modalOpen;
  }

  removeItem(event) {
    const id = event.params.id;

    const node = document.querySelector(`[data-id="${id}"]`);

    this.listCartTarget.removeChild(node);
  }

  createItemList(data) {
    const id = data.id;
    const element = `
      <div class="cart-content">
        <div>
          <img
            src="${data.image}"
          />
        </div>

        <div class="cart-price">
          <span>${data.name}</span>
          <p>${data.price}</p>
        </div>
      </div>

      <button class="button-close" data-action="click->cart#removeItem" data-cart-id-param="${id}"></button>
    `;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.setAttribute('data-id', id);

    div.innerHTML = element;

    return div;
  }

  addOnCart(event) {
    this.cart.push(event);

    const data = event.params.data;

    this.listCartTarget.append(this.createItemList(data));
  }

  connect() {
    const cartList = this.items
      .map(
        (el) => `
              <div class="item">
                <img src="${el.image}"/>
                <div class="item-price">
                  <div class="item-info">
                    <span>${el.name}</span>
                    <p>Vendidos: ${el.qty}</p>
                    <p>${el.price}</p>
                  </div>

                  <button 
                    data-cart-data-param='${JSON.stringify(el)}' 
                    data-action="cart#addOnCart"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            `
      )
      .join('');

    this.listItemTarget.innerHTML = cartList;
  }
}
