//Contains single note

import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note, updateNote } = props;          //destructuring from props
    return (
        <>
        <div className='col-md-3'>
            <div className="card  my-3 mx-3">
                    <div className="card-body">
                        <div className='d-flex align-items-center'>
                        <h5 className="card-title mx-2"> {note.title}</h5>
                         <i className="fa-regular fa-trash-can mx-2" onClick={() => {deleteNote(note._id);  props.showAlert("deleted successfully", "success")}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => {updateNote(note)}}></i>
                    </div>
                        <p className="card-text">{note.description}</p>
                       
                    </div>
            </div>
            </div>
        </>
    );
}

export default Noteitem;
