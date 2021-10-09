import Home from "./components/Home";
import About from "./components/About";
import { Provider } from "react-redux";
import { configureStore } from "./redux";
import { Link, Route } from "react-router-dom";

import "./App.scss";

const store = configureStore();

function App() {
  return (
    <main cds-layout="vertical gap:xl container:lg container:center">
      <header cds-layout="horizontal p:md p@md:lg">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </header>
      <Provider store={store}>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
      </Provider>
    </main>
  );
}

export default App;
