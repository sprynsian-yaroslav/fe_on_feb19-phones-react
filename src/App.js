import React from 'react';

import { getAll, getById } from './api/phone'
import Basket from './Basket'
import Filter from './Filter'
import Catalog from './Catalog'

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phones: getAll(),
      selectedPhone: null,
      basketItems: [],
    };

  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Filter />
              <Basket
                items={this.state.basketItems}

                onDeleteFromBasket = {(deleteItems) => {
                    const newState = this.state.basketItems.filter((item, index) => index !== deleteItems);
                    this.setState({
                            basketItems: newState,
                        }
                    )
                }}
              />
            </div>

            <div className="col-md-10">
              { this.state.selectedPhone ? (
                <Viewer
                  phone={this.state.selectedPhone}

                  onBack={() => {
                    this.setState({
                      selectedPhone: null,
                    });
                  }}

                  addToBasket = {(newItems) => {


                      this.setState({
                         basketItems: [...this.state.basketItems, newItems],
                      }
                      )
                  }}



                />
              ) : (
                <Catalog
                  phones={this.state.phones}

                  addToBasket = {(newItems) => {
                      this.setState({
                              basketItems: [...this.state.basketItems, newItems],
                          }
                      )


                  }}

                  onPhoneSelected={(phoneId) => {
                    this.setState({
                      selectedPhone: getById(phoneId),
                    });
                  }}
                />
              ) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}




class Viewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImg: this.props.phone.images[0],
        };
    }

    render() {
        return (
        <div>
            <img className="phone" src={this.state.currentImg}/>
            <button onClick={this.props.onBack}>Back</button>
            <button
                onClick={() => {
                    this.props.addToBasket(this.props.phone.name);
                }}
            >
                Add to basket
            </button>

            <h1>{this.props.phone.name}</h1>
            <p>{this.props.phone.description}</p>

            <ul className="phone-thumbs">
                {this.props.phone.images.map(imageUrl => (
                    <li key={imageUrl}>
                        <img src={imageUrl} onClick={() => {
                            this.setState({
                                currentImg: imageUrl,
                            })
                        }}
                        />
                    </li>
                ))}
            </ul>
        </div>
        );
    }

}


export default App;
