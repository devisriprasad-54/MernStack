import './App.css';
import Test2 from './components/Test2';
import Test1 from './components/Test1'; 
import StateDemo from './components/stateDemo';
import ObjectProperties from './components/objectProperties';
import FormDemo from './components/FormDemo';
function App(){
//state(optional)

//return a  react element
return(
  <div className='text-center p-1.5 bg-gray-200'>
    {/* <StateDemo /> */}
    {/* <ObjectProperties/> */}
    <FormDemo />
  </div>
)
}
export default App;