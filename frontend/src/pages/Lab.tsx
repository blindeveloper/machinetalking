import GlobalNavigation from '../components/GlobalNavigation'
import HousePricePrediction from '../pages/HousePricePrediction'
import Mnist from '../pages/mnist'
import LinearRegression from '../pages/LinearRegression'
import { AppShell, Container } from '@mantine/core';
import { Routes, Route} from 'react-router-dom';


export default function Lab(props: { toggle: () => void }) {  
  return (
    <div style={{ padding: 'md' }}>
      <AppShell.Navbar p="md">
        <GlobalNavigation toggle={props.toggle} />
      </AppShell.Navbar>
      <Container size="md" style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="house-price-prediction" element={<HousePricePrediction />} />
          <Route path="mnist" element={<Mnist />} />
          <Route path="linear-regression" element={<LinearRegression />} />
        </Routes>
      </Container>
    </div>
  );
}