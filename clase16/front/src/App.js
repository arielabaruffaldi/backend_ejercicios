import "./App.css";

import Form from "./components/Form/Form";
import ProductList from "./components/ProductList/ProductList";
import Chat from "./components/Chat/Chat";

import React from "react";
import { DataProvider } from "./Context/Context";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <header className="App-header">
          <Form></Form>
          <ProductList></ProductList>
          <Chat></Chat>
        </header>
      </div>
    </DataProvider>
  );
}

export default App;
