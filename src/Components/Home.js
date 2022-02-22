import {useState, useEffect} from 'react';

function Home(props) {
    let [page, setPage] = useState(0);
    let [products, setProducts] = useState([]);

    useEffect(()=>{
        setProducts(props.data.slice(0, 10));
        setPage(0);
    },[props]);

    let handlePrevious = () => {
        let pageNo = page - 1;
        setPage(pageNo);
        setProducts(props.data.slice(pageNo*10, pageNo*10 + 10));
    }

    let handleNext = () => {
        let pageNo = page + 1;
        setPage(pageNo);
        setProducts(props.data.slice(pageNo*10, pageNo*10 + 10));
    }

    return (
        <div className='container my-4'>
            <h4 className='my-2'>{props.head}</h4>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'>
                {products.map((item) => {
                    return (
                        <div key={item._id} className='col my-2'>
                            <div className='card'>
                                <img src={item.image} className="card-img-top" style={{"height":"200px", "width":"auto"}} alt="..." />
                                    <div className='card-body'>
                                        <h6 className='card-title'>{item.title.substring(0, 45)}{item.title.length > 46 ? "..." : "" }</h6>
                                        <p className='my-0'>Rating: {item.rating}</p>
                                        <h5 className='font-weight-normal text-primary'>{item.finalPrice} <small className='text-muted'><del> {item.originalPrice}</del></small></h5>
                                    </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='row justify-content-center'>
                {page>0 ? <button className='btn btn-sm btn-primary' onClick={handlePrevious}>Previous</button> : ""}
                <button className='btn btn-default disabled'>Page {page+1}</button>
                {page<Math.ceil(props.data.length/10)-1 ? <button className='btn btn-sm btn-primary' onClick={handleNext}>Next</button> : ""}
            </div>
        </div>
    )
}

export default Home;