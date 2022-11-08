import React, { Component } from 'react'

export default class PuntoDeVentas extends Component {
  render() {
    return (
      <div>
      <h3>Punto de Ventas</h3>
      <hr />
      <div className='row'>
        <div className='col'>
          <h5>Categorias</h5>
        </div>
        <div className='col'>
          <h5>Articulos</h5>
        </div>
        <div className='col'>
          <h5>Detalles</h5>
        </div>
      </div>
    </div>
    )
  }
}
