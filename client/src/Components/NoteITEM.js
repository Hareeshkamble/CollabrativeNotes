// import React,{useContext} from 'react'
// import notecontext from "../Context/Notes/NoteContext"
// import toast from 'react-hot-toast'


// export default function NoteITEM(props) {
//   let context=useContext(notecontext)
//   let {DeleteNote}=context
//   const{note,updateNote}=props
//   const Delete=()=>{
//   DeleteNote(note._id)
//   toast.success("Note has been deleted Successfully")

//   }

//   return (
//     <div className="col-md-3 my-2" >
//         <div className="card">
//   <div className="card-body">
//     <h5 key={note.title} className="card-title">{note.title}</h5>
// <div className="d-flex align-itmes-center justify-content-center flex-column">
// <p key={note.description}   className="card-text">{note.description}
//  </p>
//  <div className='d-flex align-items-start'>
//  <span key={note.tag}  className="badge h-25 m-2 text-bg-success  w-50">{note.tag}</span>
//  </div>
// </div>  

//     <div className="d-flex justify-content-between align-items-center">
//     <i className={`fa-solid fa-pen-to-square fa-edit h-25`} style={{color:"#1c67e9"}} onClick={()=>{updateNote(note)}}></i>
//     <i className={`fa-solid h-25 fa-trash fa-pen-to-square `}  style={{color:"red"}} onClick={Delete}></i>
//     </div>
//   </div>
// </div>
//     </div>
//   )
// }


import React, { useContext } from 'react';
import notecontext from "../Context/Notes/NoteContext";
import toast from 'react-hot-toast';
 import moment from "moment"
export default function NoteITEM(props) {
  const context = useContext(notecontext);
  const { DeleteNote } = context;
  const { note, updateNote } = props;


  const handleDelete = () => {
    DeleteNote(note._id);
    
    toast.success("Note has been deleted Successfully");
  };

  let shareNoteId = () => {
    navigator.clipboard.writeText(note._id);
    toast.success("Note_Id Copied Successfully");
  }

  return (
    <div className="col-md-3 my-3">
      <div className="card position-relative shadow-lg" style={{ borderRadius: '10px', overflow: 'hidden' }}>


        <span
          key={note.tag}
          className="badge bg-success position-absolute top-0 end-0 m-2 p-2"
          style={{ zIndex: 1, borderRadius: '8px' }}
        >
          {note.tag}
        </span>

        <div className="card-body">
          <h5 className="card-title" style={{ fontWeight: 'bold' }}>{note.title}</h5>
          <p className="card-text text-secondary" style={{ minHeight: '50px', fontSize: '0.9rem' }}>
            {note.description}
          </p>

          <div className="d-flex justify-content-between justify-content-between align-items-center">

            <i
              className="fa-solid fa-pen-to-square fa-lg"
              style={{ color: "#1c67e9", cursor: 'pointer' }}
              onClick={() => { updateNote(note); }}
            ></i>

            <div className='d-flex badge rounded-pill text-bg-warning gap-1 align-items-center pointer ' role='button'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
              </svg>
              <span className="" onClick={shareNoteId}>Copy Note Id</span>
            </div>

           <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16"
              style={{ color: "red", cursor: 'pointer', transition: 'transform 0.3s ease' }}
              onClick={handleDelete}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>


          </div>
        </div>
        <div className="lastUpdated d-flex align-items-center justify-content-start gap-1 m-1">
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
  </svg> 
  <p className="card-text" style={{ fontSize: '12px' }}>Last Updated: {moment(note.updatedAt).fromNow()}</p>
</div>

      </div>

    </div>
  );
}
