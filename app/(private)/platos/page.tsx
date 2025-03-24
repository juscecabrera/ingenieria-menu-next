'use client'

import { useState, useEffect } from 'react'

import PlatesEntry from '@/components/PlatesEntry'
import PlatesTable from '@/components/PlatesTable'
import Link from 'next/link'

const Platos = () => {
    const [showModal, setshowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [platesData, setPlatesData] = useState([])

    const fetchPlates = async () => {
      try {
        const response = await fetch('/api/plates')
        const data = await response.json()
        setPlatesData(data.data)
        setLoading(false)
  
        if (!response.ok) throw new Error('Failed to fetch costs');
      } catch (error) {
        console.error("Error in useEffect:", error);
        
      }
    }

    useEffect(() => { 
      fetchPlates()
    }, [])

    const handleAddPlates = () => { 
      setshowModal(prev => true)  
    }

    const refreshButton = () => {
      setLoading(true)
      fetchPlates()
    }


  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl">Platos</h2>

      <div className='my-4'>
        <button className='btn' onClick={() => handleAddPlates()}>Registrar platos</button>
        <button className='btn' onClick={() => refreshButton()}>Actualizar</button>
      </div>



      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-50'>
          <PlatesEntry setShowModal={setshowModal} refreshButton={refreshButton}/>  
        </div>
      )}

      <div className="flex justify-center items-center w-full">
        {loading 
          ? <span className="loading loading-spinner loading-xl"></span>
          : <PlatesTable platesData={platesData}/>
        }
      </div>
    </div>
  )
}

export default Platos