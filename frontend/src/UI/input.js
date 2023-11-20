import React from "react";

export default function Input({type, name, classes, placeHold}) {
  return (
    <input type={type} name={name} className={classes} placeholder={placeHold} required/>
  )
}