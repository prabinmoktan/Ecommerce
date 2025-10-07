import { Skeleton } from '../../../admin/AdminUi/Skeleton/Skeleton'

const CardSkeleton = () => {
  return (
   <>
    <div className='max-w-[300px] min-w-[120px] overflow-hidden shadow-lg flex flex-col'>
       <div  className='flex-1 relative overflow-hidden '>
              
                <Skeleton
                 variant="rect"
                 width="w-72"
                 height="h-[300px]"
                 animation="pulse"/>
                 
           </div>
           <div className='flex justify-between items-center w-full px-2 my-5'>
               <div className=' flex flex-col gap-3'>
              
               <Skeleton variant='text' width='w-24' height='h-6' animation='pulse'/>
               <Skeleton variant='text' width='w-12' height='h-6' animation='pulse'/>
               </div>
              
           </div>
          </div>
   </>
  )
}

export default CardSkeleton