import './App.css';
import Lab from './pages/Lab'
import Home from './pages/Home'
import { AppShell, Burger } from '@mantine/core';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <BrowserRouter basename="/">
      <AppShell 
        header={{ height: 60 }} 
        // padding="md"
        navbar={{
        width: '',
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      >
        <AppShell.Header>
          <div className='header-container'>
            <Burger
              color='white'
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              style={{ marginRight: 12, color: 'white' }}
            />
            <NavLink component={Link} to="/" label="Home" />
            <NavLink component={Link} to="/lab" label="Lab" />
          </div>
        </AppShell.Header>

        <AppShell.Main style={{ padding: '0' }}>
          <Routes>
            <Route path="/lab/*" element={<Lab toggle={toggle} />} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  )
}

export default App
