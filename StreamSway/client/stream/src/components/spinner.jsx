
export const Spinner =({size,text="Loading..."})=>{
    return(
        <div className="w-[50%]  flex-center h-10">
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className="animate-spin">
      <div className="h-full w-full border-4 border-t-green-500
       border-b-green-700 rounded-[50%]">
        
      </div>
    </div>
  </div>
    )
}