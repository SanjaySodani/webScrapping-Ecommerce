import axios from 'axios';
import {useState, useEffect} from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';

function App() {
  let [products, setProducts] = useState([]);
  let [heading, setHeading] = useState("Electronics");
  let url = 'https://webscrapping-ecommerce.herokuapp.com/';

  useEffect(()=>{
    axios.get(url).then((response)=>{
      setProducts(response.data);
    });
  }, []);

  let handleSearch = (searchText) => {
    let data = products;
    setProducts(data.filter(function (obj){
      return obj.title.includes(searchText);
    }));
    setHeading(`Search Result for '${searchText}'`);
  }

  let handleAll = () => {
    axios.get(url).then((response)=>{
      setProducts(response.data);
    });
    setHeading("Electronics");
  }

  if (products.length === 0) return null;

  return (
    <>
      <Navigation search={handleSearch} All={handleAll} />
      <Home data={products} head={heading} />
    </>
  );
}

export default App;