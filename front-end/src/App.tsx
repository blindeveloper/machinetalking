// import './App.css'
// import { Input } from '@mantine/core'
import { Container } from '@mantine/core';
import GlobalNavigation from './components/GlobalNavigation'
import HousePricePrediction from './pages/HousePricePrediction'
import Page_2 from './pages/page_2'
import { AppShell, Burger, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <BrowserRouter basename="./">
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              style={{ marginRight: 12 }}
            />
            <Text size="lg" ta="center">
              Machine Talking
            </Text>
          </div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <GlobalNavigation toggle={toggle} />
        </AppShell.Navbar>

        <AppShell.Main>
            <Container>
              <Routes>
                <Route path="/" element={<HousePricePrediction />} />
                <Route path="/house-price" element={<Page_2 />} />
              </Routes>
            </Container>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  )
}

{/* <GetHousePricePredictionForm /> */}
export default App
