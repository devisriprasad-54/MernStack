import {useState} from 'react'
function ObjectProperties(){
    const [users,setusers]=useState({
        name:'charan',
        age:21
    })
    let updateUser=()=>{
        setusers({
            ...users,
            city:"hyderabad"
        })
    }
    return (
        <div>
            <h1>users</h1>
            {
                Object.values(users).map((m,i)=><p key={i}>{m}</p>)
            }
            <button onClick={updateUser}>add property</button>
        </div>
    )
}
export default ObjectProperties