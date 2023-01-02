import React from 'react'

function Alert(props){

  // const capitalize = (word) => {
  //   const lower = word.toLowerCase();
  //   return lower.charAt(0).toUpperCase() + lower.slice(1);
  // }
      return (
        <div style={{height: '30px', maxWidth: "50hh"}}>
          {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role = 'alert'>
            <strong>{(props.alert.type)}</strong>
            <p>{props.alert.msg}</p>
          </div>}
        </div>
        )
}

export default Alert