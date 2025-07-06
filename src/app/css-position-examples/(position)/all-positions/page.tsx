import React from 'react'

const page = () => {
  return (
    <div style={{display: "flex" , justifyContent: "center" , alignItems: "center" , backgroundColor: "grey" ,position: "relative" }}>
<div style={{ top: 0 , left: 0 , backgroundColor: "blue" }}>page</div>
<div style={{top: 0 , left: 0 , backgroundColor: "green" }}>page</div>
<div style={{position: "fixed" , top: 10 , left: 0 , backgroundColor: "yellow" }}>page</div>

    </div>
  )
}

export default page