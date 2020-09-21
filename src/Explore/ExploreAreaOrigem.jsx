import React, { useEffect, useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import Header from '../Header/MainHeader';
import MenuInferior from '../Header/MenuInferior';
import { Select, Icon } from 'react-materialize';



const MEAL = '/comidas/area';

const item = {
  comidas: [],
  path: MEAL,
};

const RenderItems = () => {
  const { comidas } = item;
  const itemArray = comidas;

  return (
    <div className="card-container">
      {Array.isArray(itemArray) &&
        itemArray.slice(0, 12).map((data, i) => (
          <Link to={`/comidas/${data.idMeal || data.idDrink}`}>
            <Card
              key={data.idMeal || data.idDrink}
              imageSrc={data.strMealThumb || data.strDrinkThumb}
              title={data.strMeal || data.strDrink}
              index={i}
              testIdArray={['-recipe-card', '-card-img', '-card-name']}
            />
          </Link>
        ))}
    </div>
  );
};

const ExploreAreaOrigem = ({ location: { pathname } }) => {
  const { fetch, comidas12, comidasFiltradas } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [areaList, setAreaList] = useState([]);

  useEffect(() => {
    fetch.setFood(api.food.searchByName(''));
    api.food
      .getAreas()
      .then((areas) => setAreaList(areas.splice(0, 12)))
      .then(() => {
        setIsLoading(false);
      });
  }, [pathname]);

  useEffect(() => {
    item.comidas = Object.assign(comidas12);
  }, [comidas12]);

  useEffect(() => {
    if (Array.isArray(comidasFiltradas) && comidasFiltradas.length > 0) {
      item.comidas = comidasFiltradas;
    }
  }, [comidasFiltradas]);

  const RenderDropdown = () => {
    return (
      <div className="">
        <Select
        className="black-text"
        id="Select"
        multiple={false}
        icon={<Icon>location_city</Icon>}
        options={{
          className:"black-text",
          classes: 'black-text',
          dropdownOptions: {
            className:"black-text",
            alignment: 'left',
            autoTrigger: false,
            closeOnClick: true,
            constrainWidth: true,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            outDuration: 250,
          }
        }}
        onChange={(event) => handleChange(event)}
        >
          <option className="black-text">All</option>
          {areaList.map((area) => {
            return <option className="black-text" value={area.strArea}>{area.strArea}</option>;
          })}
        </ Select>
      </div>
    );
  };

  const handleChange = (event) => {
    if (event.target.value !== 'All')
      return fetch.setFood(api.food.searchByArea(event.target.value));
    return fetch.setFood(api.food.searchByName(''));
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Header titulo={'Explorar Origem'} />
      {RenderDropdown()}
      <RenderItems />
      <MenuInferior />
    </div>
  );
};

ExploreAreaOrigem.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(ExploreAreaOrigem);
