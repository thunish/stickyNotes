import React, { createRef, useRef, useState } from "react";
import EachNote from "./EachNote";
import { useEffect } from "react";

export default function Notes({notes, setNotes}){
    const [dragNote, setDragNote]=useState(null);
    const [offset, setOffset]=useState({})
    const [initialpos, setInitialpos]=useState({});
    
    useEffect(()=>{
        //local storage logic
        // setNotes(JSON.parse(localStorage.getItem("todos")));
        const savedNotes=JSON.parse(localStorage.getItem("notes")) || []
        const updatedNotes=notes.map((each)=>{
            const presentOrNot=savedNotes.find((note)=>note.id===each.id)
            if(presentOrNot){
                return {...each, position:presentOrNot.position}
            }
            else{
                const position=newPostion()
                return {...each, position}
            }
        })
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    },[notes.length])
    
    function newPostion(){
        const maxX=window.innerWidth-250;
        const maxY=window.innerHeight-100;
        return {
          x:Math.floor(Math.random()*maxX),
          y:(Math.floor(Math.random()*maxY))
        }
    }

    const notesRef=useRef([]);
    const handleMouseDown=(each, e)=>{
        const { id }=each;
        const eachRef=notesRef.current[id].current;
        const rect=eachRef.getBoundingClientRect();
        setDragNote(id);
        setOffset({
            x:(e.clientX-rect.left),
            y:(e.clientY-rect.top)
        });
        setInitialpos({x:rect.left, y:rect.top})
    }
    const handleMouseMove=(e)=>{
        let x=e.clientX-offset.x;
        let y=e.clientY-offset.y;
        const newPostion={
            x,y
        }
        if(checkForOverlap(newPostion)){
            const updatedNotes=notes.map((every)=> every.id===dragNote ? {...every, position:initialpos}:every)
            setNotes(updatedNotes);
        }
        else{
            const updatedNotes=notes.map((every)=> every.id===dragNote ? {...every, position:newPostion}:every)
            setNotes(updatedNotes);
        }
    }
    const handleMouseUp=(e)=>{
        if(dragNote===null) return;
        localStorage.setItem("notes", JSON.stringify(notes));
        setDragNote(null);
    }
    useEffect(()=>{
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return()=>{
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
    },[dragNote, offset, notes])

    const checkForOverlap=(newPostion)=>{
        const eachRef=notesRef.current[dragNote].current;
        const rect=eachRef.getBoundingClientRect();
        const overLap=notes.some((each)=>{
            if(each.id===dragNote){
                return false;
            }
            
            else{
                const eachNote=notesRef.current[each.id].current;
                const newOne=eachNote.getBoundingClientRect();
                return !(
                    (newPostion.y>=newOne.bottom)||
                    (newPostion.x>=newOne.right)||
                    (newPostion.y+rect.height<=newOne.top)||
                    (newPostion.x+rect.width<=newOne.left)
                )
            }
        })
        return overLap
    }

    return(
        
        <div>
            
            <div>
            {
                notes.map((each)=>{
                    return <EachNote ref={
                        notesRef.current[each.id]?notesRef.current[each.id]:(notesRef.current[each.id]=createRef())
                    } key={each.id} content={each.text} ipos={each.position} onMouseDown={(e)=>{
                        handleMouseDown(each, e);
                    }}></EachNote>
                })
            }
            </div>
        </div>
    )
}   