import React from "react";
import Input from "../../UI/input";

export default function Items({type, name, classes, labalName}) {
  return(
    <div className="field">
      <div className="control">
        <label>{labalName}: </label>
        <Input type={type} name={name} classes={classes}/>
      </div>
  </div>
  )
}