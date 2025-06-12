// import './App.css'
// import { Input } from '@mantine/core'
import GlobalNavigation from './components/GlobalNavigation'
import HousePricePrediction from './pages/HousePricePrediction'
import Mnist from './pages/mnist'
import { AppShell, Burger, Text, Container, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <BrowserRouter basename="/">
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', height: '100%', paddingLeft: 16 }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              style={{ marginRight: 12 }}
            />
            <Text style={{fontSize: 35}} ta="center">
               <Image
                style={{border: '2px solid black'}} 
                radius="md"
                h={50}
                src="./src/assets/logo.png"
              />
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
                <Route path="/mnist" element={<Mnist />} />
              </Routes>
            </Container>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  )
}

export default App
