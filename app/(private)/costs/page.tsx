'use client'

import { useEffect, useState } from "react"
import CostsEntry from '@/components/CostsEntry'
import CostsTable from '@/components/CostsTable'

const Costs = () => {
  const [showModal, setShowModal] = useState(false)   
  const [loading, setLoading] = useState(true)
  const [costsData, setCostsData] = useState([])

  const fetchCosts = async () => {
    try {
      const response = await fetch('/api/costs')
      const data = await response.json()
      setCostsData(data.data)
      setLoading(false)

      if (!response.ok) throw new Error('Failed to fetch costs');
    } catch (error) {
      console.error("Error in useEffect:", error);
      
    }
  }

  useEffect(() => { 
    fetchCosts()
  }, [])


  const handleAddCosts = () => { 
    setShowModal(!showModal)
  }    
  
  const refreshButton = async () => {
      setLoading(true)
      fetchCosts()
  }

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl">Costos</h2>

      <div className="my-4">
        <button className='btn' onClick={() => handleAddCosts()}>Registrar costos</button>
        <button className='btn' onClick={() => refreshButton()}>Actualizar</button>

      </div>


      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-50'>
          <CostsEntry setShowModal={setShowModal} refreshButton={refreshButton}/>
        </div>
      )}

      <div className="flex justify-center items-center w-full">
        {loading 
          ? <span className="loading loading-spinner loading-xl"></span>
          : <CostsTable costsData={costsData} refreshButtonAction={refreshButton} />
        }
      </div>
    </div>
  )
}

export default Costs
