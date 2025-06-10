import { NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';



type GetHousePricePredictionFormProps = {
  toggle: () => void;
};

function GetHousePricePredictionForm(props: GetHousePricePredictionFormProps) {

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <NavLink
        component={Link}
        to="/"
        label="House price prediction"
        active={location.pathname === '/'}
        onClick={props.toggle}
      />
      {/* <NavLink
        component={Link}
        to="/house-price"
        label="Page 2"
        active={location.pathname === '/house-price'}
        onClick={props.toggle}
      /> */}
    </nav>
  );
}

export default GetHousePricePredictionForm;