import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Notes from './components/Notes'

function App() {
  const [newNote, setNewNote]=useState("");

  //Take the todos from the backend
  const [notes, setNotes] = useState([
    {
      id:1,
      text:"Check out the projects list"
    },
    {
      id:2,
      text:"You have to do more like 30 projects"
    }
  ])
  useEffect(()=>{
    setNotes(JSON.parse(localStorage.getItem("notes")));
  }, [])
  
  

  return (
    <>
      <div className=" text-center flex space-x-3 justify-center p-3 items-center">
                <div className=" text-lg ">Add todo :-</div>
                <input type="text" className=" rounded-full border border-slate-300 p-2 focus:outline-none" onChange={(e)=>{
                    setNewNote(e.target.value);
                }}/>
                <button className=" bg-slate-600 hover:bg-slate-900 p-2 rounded-lg text-white w-16" onClick={()=>{
                    if(newNote.length>=1){
                        setNotes([...notes, {text:newNote, id:notes.length+1}]);
                        setNewNote("");     
                    }
                }}>ADD</button>
      </div>
      <Notes notes={notes} setNotes={setNotes}></Notes>
    </>
  )
}

export default App
