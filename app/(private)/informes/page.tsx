'use client'

// import Link from 'next/link'
// import InformesResults from '@/components/InformesResults'
import InformesCreation from '@/components/InformesCreation'
import { useState, useEffect } from 'react'
import { InformesTable } from '@/components/InformesTable'

const Informes = () => {
  const [showModal, setshowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [informesData, setInformesData] = useState([])


   const fetchInformes = async () => {
     try {
       const response = await fetch('/api/informes')
       const data = await response.json()
       setInformesData(data.data)
       setLoading(false)

       if (!response.ok) throw new Error('Failed to fetch costs');
     } catch (error) {
       console.error("Error in useEffect:", error);
     }
  } 

  useEffect(() => { 
    fetchInformes()
  }, [])

  const handleAddInformes = () => {
    setshowModal(prev => true)  
  }

  const refreshButton = async () => {
    setLoading(true)
    fetchInformes()
  }

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl mb-2">Informes</h2>

      <div className='my-4'>
        <button className='btn' onClick={() => handleAddInformes()}>Generar informes</button>
        <button className='btn' onClick={() => refreshButton()}>Actualizar</button>
      </div>


      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-50'>
          <InformesCreation setShowModal={setshowModal} />
        </div>
      )}

      <div className="flex justify-center items-center w-full">
        {loading 
          ? <span className="loading loading-spinner loading-xl"></span>
          : <InformesTable informesData={informesData} />
        }
      </div>
    </div>
  )
}

export default Informes
