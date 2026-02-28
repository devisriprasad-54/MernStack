import { use, useState } from 'react';
function stateDemo() {
   // let [counter,setCounter]=useState(10) //returns an array of 2 elements, 1st is the state variable and 2nd is the function to update the state variable
   let [marks,setMarks]=useState([10,20,30]) //state can be of any type, it can be a number, string, array, object etc.
//    const increment=()=>{
//         setCounter(counter+1)
//         //setCounter(counter+1) state updates are asynchronous, so this will not work as expected. To update the state based on the previous state, we can use a callback function.
//         setCounter(prev=>prev+1) //this will work as expected, as it will update the state based on the previous state. 
//     }
//     const decrement=()=>{
//         setCounter(counter-1)
//     }
//     const reset=()=>{
//         setCounter(0)
//     }

//update marks state at begininng ,ending and in between index
    
    const updateMarksAtBeginning=()=>{
        setMarks([5,...marks])
    }
    const updateMarksAtEnd=()=>{
        setMarks([...marks,50])
    }
    const updateMarksAtIndex=(index,value)=>{
        setMarks(marks.map((mark,idx)=>idx===index?value:mark))
    }
    
    //delete marks at the end, beginning and in between index
    const deleteMarksAtEnd=()=>{
        setMarks(marks.slice(0,-1))
    }
    const deleteMarksAtBeginning=()=>{
        setMarks(marks.slice(1))
    }
    const deleteMarksAtIndex=(index)=>{
        setMarks(marks.filter((mark,idx)=>idx!==index))
    }
    return (
    <div className='container mx-auto'>
        {/* <p className='text-2xl font-bold m-3' >{counter}</p>
        <button  className="bg-blue-500 text-white p-2 rounded m-1" onClick={increment}>+</button>
        <button className="bg-red-500 text-white p-2 rounded m-1" onClick={decrement}>-</button>
        <button className="bg-gray-500 text-white p-2 rounded m-1" onClick={reset}>Reset</button> */}
        
        {
            marks.map((mark,idx)=><h2 key={idx}>{mark}</h2>)

        }
        <button onClick={updateMarksAtBeginning} className='bg-green-500'>add marks at beginning</button>
       <br /> <button onClick={updateMarksAtEnd}>add marks at end</button>
        <br /><button onClick={()=>updateMarksAtIndex(1,100)}>update marks at index 1</button>
        <br /><button onClick={deleteMarksAtEnd}>delete marks at end</button>
        <br /><button onClick={deleteMarksAtBeginning}>delete marks at beginning</button>
        <br /><button onClick={()=>deleteMarksAtIndex(1)}>delete marks at index 1</button>
    </div>
    )
}
export default stateDemo;