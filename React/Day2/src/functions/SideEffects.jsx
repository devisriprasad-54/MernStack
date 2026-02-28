import {useEffect,useState} from 'react';

function SideEffects(){
    const [count,setCount] = useState(10);
    useEffect(()=>{
        console.log("useEffect is executed");
    },[])
    return (
        <div>
            {

            console.log("console rendered sucessfully")
            }
        </div>
    );
}

export default SideEffects;