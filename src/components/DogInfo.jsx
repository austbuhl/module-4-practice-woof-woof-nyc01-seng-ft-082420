import React from 'react'

export default function DogInfo({dog, updateHandler}) {

  return(
    <>
      <img src={dog.image} alt={dog.name}/>
      <h2>{dog.name}</h2>
      {
        dog === "" ? null :    
        <button onClick={updateHandler}>
          {dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}
        </button>
      }
    </>

  )

}