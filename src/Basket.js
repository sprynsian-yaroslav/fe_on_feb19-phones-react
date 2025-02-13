import React from 'react';

const Basket = (props) => {
  return (
    <section>
      <p>Shopping Cart</p>
      <ul>
          {    props.items.map((item, index) => {return(
                  <li key={index}>{item}<button onClick={() => {
                      props.onDeleteFromBasket(index)
                  }}>x</button></li>
              )})
          }
      </ul>
    </section>
  );
};

export default Basket;
