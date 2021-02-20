import React from "react"
import ReactDOM from 'react-dom'
import Header from "./src/components/Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/style/style.css'
import Home from "./src/components/Home";
import GMap from "./src/components/GMap";

class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Home />
            </>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'))