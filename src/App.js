import "./App.css";
import Pages from "./Pages";
import { Provider } from "react-redux";
import { store } from "./Store/index";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Pages />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
