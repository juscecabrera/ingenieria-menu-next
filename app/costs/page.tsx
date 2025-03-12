'use client'

import { useState } from "react"
import CostsEntry from '@/components/CostsEntry'

const Costs = () => {
  const [showModal, setShowModal] = useState(false)   
  const [costsData, setCostsData] = useState([])
  const [loading, setLoading] = useState(true)


  const refreshButton = () => {
    setLoading(true)
    //aqui hace el fetch de nuevo
    // fetchCosts(urlServer, setCostsData, setLoading)
  }

  const handleAddCosts = () => { 
    setShowModal(!showModal)
  }    
  

  return (
    <div>
      <h2>Costos</h2>

      <button className='btn' onClick={() => handleAddCosts()}>Registrar costos</button>
      <button className='btn' onClick={() => refreshButton()}>Actualizar</button>


      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center bg-opacity-50'>
          <CostsEntry setShowModal={setShowModal} refreshButton={refreshButton}/>
        </div>
      )}
    </div>
  )
}

export default Costs