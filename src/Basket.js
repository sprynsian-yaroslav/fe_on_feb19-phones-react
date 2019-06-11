import React from 'react';

const Basket = (props) => {
  return (
    <section>
      <p>Shopping Cart</p>
      <ul>
          {   console.log(props.items)}
          {    props.items.map((item, index) => {return(
                  <li>{item}<button onClick={() => {
                      props.onDeleteFromBasket(index)
                  }}>x</button></li>
              )})
          }
      </ul>
    </section>
  );
};

export default Basket;
