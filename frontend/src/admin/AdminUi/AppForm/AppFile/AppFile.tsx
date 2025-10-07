
interface FileTypes{
    title: string;

}

const AppFile:React.FC<FileTypes> = ({title}) => {
  return (
    <>
            <label>{title}</label>
        <div className='flex flex-col border-2 border-dashed border-gray-400 p-2 rounded'>
            <input type="file" className=''/>
            
        </div>
    </>
  )
}

export default AppFile