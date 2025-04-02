
interface ConfirmDeleteProps {
    informId: string;
    deleteInform: (informId: string) => void;
    setShowModal: (showModal: boolean) => void;
}


export const ConfirmDelete:React.FC<ConfirmDeleteProps> = ({ informId, deleteInform, setShowModal }) => {
  


  return (
    <div className='bg-white p-4 rounded-lg border border-black shadow-xl flex flex-col gap-y-5'>
      <h1 className="col-span-2 text-xl font-bold">¿Estás seguro que desea eliminar este informe?</h1>
      <h2>Esta acción es irreversible</h2>
      
      <div className="row-start-4 col-span-2 flex justify-center items-center bg-white gap-x-5">
        <button onClick={() => deleteInform(informId)} className="btn">Eliminar</button>
        <button onClick={() => setShowModal(false)} className="btn btn-soft">Cancelar</button>
      </div>

    </div>
  )
}
