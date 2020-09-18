import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { appPage } from '../Services/Utils';
import storage from '../Services/LocalStorage';

import cookhat from '../images/cookhat.svg';
import './style.css';


const handleClick = (e1mail, la) => {
  console.log('entrou no handleclick');
  //  storage.initStorage();
  /* localStorage.setItem('user', JSON.stringify({ email: e1mail }))
  localStorage.setItem('mealsToken', JSON.stringify(1))
  localStorage.setItem('cocktailsToken', JSON.stringify(1)) */
  storage.setValueByKey('user', { email: e1mail });
  storage.setValueByKey('mealsToken', 1);
  storage.setValueByKey('cocktailsToken', 1);
  la('/comidas');
};

const LogIn = ({ redirect }) => {
  const [validEmail, setValidEmail] = useState('');
  const [password, setPassord] = useState('');
  const [email1, setEmail] = useState('');

  // referencia: a string de RegEx eu copiei do stackOverflow
  // (https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    setValidEmail(re.test(email));
    setEmail(email);
  }

  useEffect(
    () => {
      //    localStorage.clear();
      const button = document.getElementById('submit-btn');
      if (validEmail && password.length > 6) {
        button.disabled = false;
        button.addEventListener('click', () => handleClick(email1, redirect));
      } else {
        button.disabled = true;
      }
    } /* [email1, password] */,
  );

  return (
    <div className="login-container">
      <div className="brand-container">
        <img src={cookhat} className="brand-logo" alt="" />
      </div>
      <div className="container">
        <h4>Login</h4>
        <input
          type="email"
          placeholder="email"
          onChange={(event) => validateEmail(event.target.value)}
          data-testid="email-input"
          required
        />
        <input
          type="password"
          placeholder="senha"
          data-testid="password-input"
          onChange={(event) => setPassord(event.target.value)}
          required
        />
        <button
          className="btn btn-large"
          id="submit-btn"
          data-testid="login-submit-btn"
          disabled
        >
          <i class="material-icons left">restaurant_menu</i>
          Entrar
        </button>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  fetchToken: PropTypes.func,
}.isRequired;

export default appPage(LogIn);
