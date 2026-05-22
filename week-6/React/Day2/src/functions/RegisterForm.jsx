import { useState } from 'react';
import {useForm} from 'react-hook-form';
function Register(){
    const [users,setUsers] = useState([]);

    const onSubmit = (data) =>{
        setUsers([...users,data])
    }
    const {register,handleSubmit,formState:{errors}} = useForm();
    return (
        <div className='Main'>

            <div className='RegisterForm'>
                <form action={handleSubmit(onSubmit)}>
                    <div>
                        <input type="text" placeholder='FirstName' {...register("firstName") } required="True" minLength={3}/>
                    </div>
                    <div>
                        <input type="text" placeholder='LastName' {...register("LastName")}/>
                    </div>
                    <div>
                        <input type="text" placeholder='email' {...register("email")}/>
                    </div>
                    <div>
                        <input type="text" placeholder='DOB' {...register("DOB")}/>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div className='TableDetails'>
                <table>
                    <thead>
                        <tr>
                            <th>FirstName </th>
                            <th>LastName </th>
                            <th>email </th>
                            <th>DOB </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.email}>
                                <td>{user.firstName}</td>
                                <td>{user.LastName}</td>
                                <td>{user.email}</td>
                                <td>{user.DOB}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </div>
        );
};

export default Register;