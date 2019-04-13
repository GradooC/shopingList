import React from "react";
import AppNavBar from "./components/AppNavBar";
import ShopingList from "./components/ShopingList";
import ItemModal from "./components/ItemModal";

import { Provider } from "react-redux";
import { Container } from "reactstrap";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container className='btn-container'>
          <ItemModal />
          <ShopingList />
        </Container>
      </div>
    </Provider>
  );
};

export default App;
