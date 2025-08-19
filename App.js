import { useState } from "react";
function App() {
   const[formdata,setformdata]=useState({name:"",
    email:"",
    tel:""
   })
   const handlechange=(e)=>{
    setformdata({...formdata,
      [e.target.name]:e.target.value
    }
    )
   }
   const handlesubmit=(e)=>{
    e.preventDefault();
    fetch("http://localhost:4021/route",{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify(formdata)
    })
    .then((response)=>{
       return response.text()
    })
    .then((data)=>{
      console.log(data)
    })

    
    
   }

  return (
    <form onSubmit={handlesubmit}>
      <input type='Text' name ='name' onChange={handlechange}/>
      <input type='email' name ='email' pattern="[a-zA-Z0-9._%+-]+@gmail\.com$" onChange={handlechange}/>
      <input type='tel' name ='tel' pattern="[0-9]{10}" onChange={handlechange}/>
      <input type="submit" value="submit"/>
     </form>
  )
}
export default App;

