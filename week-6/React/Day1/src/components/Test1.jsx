function Test1(props){
    let {message1,message2} = props.message || {};
    return(
        <div className='bg-green-500 p-1.5 text-center text-white m-2'>
            <h1>{message1 || 'N/A'}</h1>
            <h2>{message2 || 'N/A'}</h2>
        </div>
    )

}
export default Test1;