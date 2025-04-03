import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Table from "./componnets/uı/Table";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screenx">
        <Table />
      </div>
    </Provider>
  );
}

export default App;
