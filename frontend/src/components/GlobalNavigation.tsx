import { NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';



type GlobalNavigationProps = {
  toggle: () => void;
};

function GlobalNavigation(props: GlobalNavigationProps) {

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <NavLink
        component={Link}
        to="/lab/house-price-prediction"
        label="House price prediction"
        active={location.pathname === '/house-price-prediction'}
        onClick={props.toggle}
      />
      <NavLink
        component={Link}
        to="/lab/mnist"
        label="MNIST"
        active={location.pathname === '/mnist'}
        onClick={props.toggle}
      />
      <NavLink
        component={Link}
        to="/lab/linear-regression"
        label="Linear Regression"
        active={location.pathname === '/linear-regression'}
        onClick={props.toggle}
      />
    </nav>
  );
}

export default GlobalNavigation;