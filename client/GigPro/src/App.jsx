import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home';
import AddFreelancer from './Pages/AddFreelancer';
import MyFreeLancers from './Pages/MyFreelancers'
import Stream from './Pages/Stream'
import Manage from './Pages/Manage'
import Account from './Pages/Account';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { celo } from 'wagmi/chains'
import { CreateFlow } from './Pages/Create'


const chains = [celo]
const projectId = '7fc612a85a16989568e15f7c57429531'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <WagmiConfig config={wagmiConfig}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='add' element={<AddFreelancer/>}/>
        <Route path='manage' element={<Manage/>}/>
        <Route path='stream' element={<Stream/>}/>
        <Route path='myFreelancer' element={<MyFreeLancers/>}/>
        <Route path='create' element={<CreateFlow/>}/>
        <Route path='celo-celox' element={<Account/>}/>
      </Routes>
      </BrowserRouter>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default App
