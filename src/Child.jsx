import React from 'react'

const Child = ({data,fun}) => {
  return (
    <div>
      <p>this is my parent color {data} </p>
      <button onClick={fun}>click</button>
    </div>
  )
}

export default Child;
