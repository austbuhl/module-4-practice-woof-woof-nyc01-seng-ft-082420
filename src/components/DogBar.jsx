import React from 'react'
import Dog from './Dog'

export default function DogBar({dogs, selectDog}) {

  const renderDogs = () => {
    return dogs.map(dog => <Dog key={dog.id} dog={dog} selectDog={selectDog} />)
  }

  return (
    <>
      {renderDogs()}
    </>
  )
}

