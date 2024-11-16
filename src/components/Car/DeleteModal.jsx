import React from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../services/operations/carAPI';


const DeleteModal = ({setIsDeleteModelShow,productId}
) => {
    console.log("Product Id:",productId);
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));
    async function handleDelete(){
        await deleteProduct(token,productId,navigate);
        setIsDeleteModelShow(false);
    }
  return (
    <>
        <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50' >
            <div className='w-[300px] px-5 py-3 bg-gray-700 rounded-md'>
                <div className='flex flex-col gap-10 text-white'>
                    <div>
                        <p className='text-2xl'>Do you want to delete this Product ?</p>
                    </div>
                    <div className='flex justify-around'>
                        <button className='px-8 py-2 bg-red-700 rounded-md' onClick={handleDelete}>Delete </button>
                        <button className='px-8 py-2 bg-neutral-800 rounded-md' onClick={()=>setIsDeleteModelShow(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DeleteModal
