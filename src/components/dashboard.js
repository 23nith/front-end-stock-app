import React from 'react'
import Contentarea from './dashboard/contentarea'
import Menu from './dashboard/menu'

function Wireframe() {
  return (
    <div className='flex border-black border-2 h-screen'>
      {/* <div className='basis-2/12 border-slate-800 border-2'>Menu</div> */}
      {/* <div className='basis-10/12 border-slate-800 border-2'>Content Area</div> */}
      <Menu/>
      <Contentarea/>
    </div>
  )
}

export default Wireframe