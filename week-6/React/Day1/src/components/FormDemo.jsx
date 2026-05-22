import {useForm} from 'react-hook-form'
function FormDemo(){
    const {register,handleSubmit}=useForm()
//Form Submission
const submitForm=(obj)=>{
console.log(obj)
}
return (
    <div>
        <h1>Form</h1>
        <form action="" onSubmit={handleSubmit(submitForm)}>
            <div>
                <input type="text" {...register("userName",{required:true})} id="" placeholder='Username' className='m-3 border-2'/>
            </div>
             <div>
                <input type="email" {...register("Email",{required:true})} id="" placeholder='Email' className='m-2 border-2'/>
            </div>
            <button type="submit" className='bg-blue-500  text-fuchsia-400 p-3 m-3 '>submit</button>
        </form>
    </div>
)
}
export default FormDemo