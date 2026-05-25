
function Product(props){
    let {name,price,brand,description,image} = props.product
    return (
        <div className="bg-pink-50 p-5 text-center w-65">
            <img src={image} alt="" />
            <h3>{name}</h3>
            <h5>{brand}</h5>
            <p>{description}</p>
            <p>{price}</p>
        </div>
    )
}

export default Product;