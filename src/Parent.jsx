import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Parent = () => {
  const [data,setdata]=useState([]);
  const [postdata,setpostdata]=useState( {
    title: 'its my new one',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
});


  useEffect(()=>{
     axios.get("https://fakestoreapi.com/products/")
     .then(datas=>setdata(datas.data))
     .catch((error) => {
      console.error('Error fetching user details:', error);
    }
     )
  },[])

  const postdatas=()=>{
        axios.post("https://fakestoreapi.com/products/",{postdata})
        console.log(postdata);
        
  }
  const updateData = (id) => {
    axios
      .put(`https://fakestoreapi.com/products/${id}`, {
        ...postdata,
        title: 'Updated Title',
        price: 20.5,
        description:"updaded successfully"
      })
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        // Optionally fetch the updated data here
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const deletedatas=(id)=>{
    axios.delete(`https://fakestoreapi.com/products/${id}`)
    setdata(data.filter((item)=>(item.id !== id)))
  }

  return (
    <div style={{display:"flex",width:"300px",padding:"30px"}}>
      <h1>hlo</h1>
      {data.map((item,index)=>{
        return <div key={index}>
          <h3>{item.title}</h3>
          <h3 className='text-info h4'>{item.price}</h3>
          <button onClick={() => updateData(item.id)}>Update</button>
          <button onClick={() => deletedatas(item.id)}>delete</button>
          </div>

      })}
          <button onClick={postdatas}>postdatas</button>
          

    </div>
  )
}

export default Parent
