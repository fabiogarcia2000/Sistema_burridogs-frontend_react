import React from 'react'
import imagen from "../assets/img/img-backup.png";
import "./styles.css";

function index() {
  return (
    <div className='container principal'>
      <div className='secundario'>
        <div className='row'>
          <img src={imagen} className="img-backup" alt="Img"/>
        </div>
        <br /><br />
        <div className='row'>
          <button className='btn btn-primary mb-3 me-2' >Crear Copia de Seguridad</button>
        </div>
      </div>
    </div>
  )
}

export default index