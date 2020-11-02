import React from 'react'

export default function Dog(props) {

  const clickHandler = () => {
    props.selectDog(props.dog)
  }

  return (
    <span onClick={clickHandler}>{props.dog.name}</span>
  )
}