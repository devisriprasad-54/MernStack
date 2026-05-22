import { useState } from 'react';
import {useForm} from 'react-hook-form';

function Todo(){
    const [tasks,setTask] = useState([]);
    const [count,setCount] = useState(0);
    const addTask = (task) => {
        setTask([...tasks,task.taskName])
        setCount(count+1)
        reset();
    }
    const removeTask = (task) =>{
        console.log(task);
    }
    const {register,handleSubmit,reset} = useForm();
  
    return (
        <div className='Main' style={{display:'flex',backgroundColor:'white',width:'1000px',height:'600px',justifyContent:'space-around'}}>
                <div className='form'>
                    <h1 style={{color:'black'}}>Add Task</h1>
                    <form action={handleSubmit(addTask)} >
                        <input type="text" placeholder='addTask' {...register("taskName")} />

                    </form>
                    <button type='submit' style={{color:'white',backgroundColor:'blue'}}>addTask</button>
                </div>
                <div>
                        <h1 style={{color:'black'}}>All Tasks</h1>
                        
                    <table>
                        <thead>
                            <tr>
                                <th>tasks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task =>(
                                <tr key={task}>
                                    <td style={{color:'black'}}>{task}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1 style={{color:'black'}}>task counter</h1>
                    <h1 style={{color:'black'}}>{count}</h1>
                </div>

        </div>
    );
}

export default Todo;