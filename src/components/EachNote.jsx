import React, { forwardRef } from "react";

const EachNote=forwardRef(({content, ipos, onMouseDown, ...props}, ref)=>{
    return (
        <div ref={ref} onMouseDown={onMouseDown} className=" absolute   border-black border-2 select-none rounded-lg w-52 p-4 cursor-move bg-slate-200 shadow-lg text-center" style={{
            top :`${ipos?.y}px`,
            left:`${ipos?.x}px`
        }}>
            📌{content}
        </div>
    )
})

export default EachNote;