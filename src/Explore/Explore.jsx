/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import { appPage } from '../Services/Utils';
import './Explore.css'

const Explore = ({ redirect }) => {
  const explore = 'Explorar';
  return (
    <div>
        <HeaderTwo titulo={explore} />
        <div className="explore-btns">
        <div className="btn1">
        <button 
          data-testid="explore-food" 
          onClick={() => redirect('/explorar/comidas')}
          className="btn waves-light btn-large white black-text"
        >
          <i class="left material-icons">restaurant_menu</i>
          Explorar Comidas
        </button>
        </div>
        <div className="btn1">
        <button 
        data-testid="explore-drinks" 
        onClick={() => redirect('/explorar/bebidas')}
        className="btn waves-light btn-large white black-text"
        >
          <i class="left material-icons">local_cafe</i>
          Explorar Bebidas
        </button>
        </div>
        </div>
      <MenuInferior />
    </div>
  );
};

Explore.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(Explore);
