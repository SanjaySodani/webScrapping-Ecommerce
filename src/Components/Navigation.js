import {useState} from 'react';

function Navigation(props) {

    let [text, setText] = useState("");
    let handleInput = (event) => {
        setText(event.target.value);
    }
    let handleSubmit = () => {
        props.search(text);
    }
    let handleAll = () => {
        props.All();
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <button type='button' className="navbar-brand btn btn-default" onClick={handleAll}>Web Scrapper</button>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <button className="btn btn-default nav-link" onClick={handleAll}>All Products</button>
                    </li>
                </ul>
                <div className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={handleInput} value={text} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={handleSubmit}>Search</button>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;