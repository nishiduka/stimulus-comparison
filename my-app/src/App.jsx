import { useState } from 'react';
import './App.css';

const ITEMS = [
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

function App() {
  const [items] = useState(ITEMS);
  const [cartItems, setCartItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const appendCart = (data) => {
    const cart = [...cartItems]
    const containsItem = cart.find(el => el.id === data.id)

    if (!containsItem) {
      cart.push(data)
      setCartItems(cart)
    }
  }

  const removeItem = (data) => {
    const cart = cartItems
    const cartItem = cart.filter(el => el.id !== data.id)

    setCartItems(cartItem)
  }

  const toggleModal = () => {
    setModalOpen(value => !value)
  }

  const renderCartItem = (data, index) => {
    return (
      <div className="cart-item" key={index}>
        <div className="cart-content">
        <div>
          <img
            src={data.image}
          />
        </div>

        <div className="cart-price">
          <span>{data.name}</span>
          <p>{data.price}</p>
        </div>
      </div>

      <button className="button-close" onClick={() => removeItem(data)}></button>
      </div>
    )
  }

  const renderItem = (item, index) => {
    return (
      <div className="item" key={index}>
        <img src={item.image} />
        <div className="item-price">
          <div className="item-info">
            <span>{item.name}</span>
            <p>Vendidos: {item.qty}</p>
            <p>{item.price}</p>
          </div>

          <button onClick={() => appendCart(item)}>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header>
        <span>Gustho</span>

        <div className="cart">
          <button className="cart-button" onClick={() => toggleModal()}>
            Carrinho
          </button>

          <div className={`cart-list ${modalOpen ? "open" : ""}`}>
            {cartItems.map(renderCartItem)}
          </div>
        </div>
      </header>

      <article>{items.map(renderItem)}</article>
    </div>
  );
}

export default App;
