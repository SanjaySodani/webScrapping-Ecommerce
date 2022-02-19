import axios from 'axios';
import {useState, useEffect} from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';

function App() {
  let [products, setProducts] = useState([]);
  let [productsData, setProductsData] = useState([]);
  let [heading, setHeading] = useState("Electronics");
  let url = 'https://webscrapping-ecommerce.herokuapp.com/';

  let [noData, setNoData ]= useState(<div className='container mt-4'><h4>Loading...</h4></div>);

  useEffect(()=>{
    axios.get(url).then((response)=>{
      setProducts(response.data);
      setProductsData(response.data);
    });
  }, []);

  let handleSearch = (searchText) => {
    let data = [];
    for (let i of products){
      if (i.title.toLowerCase().includes(searchText.toLowerCase())){
        data.push(i)
      }
    }
    if (data.length === 0) {
      setNoData(<div className='container mt-4 text-muted'><h5 className='font-weight-normal'>No products to display with search text '{searchText}'</h5></div>);
    }
    setProductsData(data);
    setHeading(`Search Result for '${searchText}'`);
  }

  let handleAll = () => {
    setProductsData(products);
    setHeading("Electronics");
  }

  return (
    <>
      <Navigation search={handleSearch} All={handleAll} />
      {productsData.length === 0 ? noData : <Home data={productsData} head={heading} />}
    </>
  );
}

export default App;