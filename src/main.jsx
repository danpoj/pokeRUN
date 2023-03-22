import { KeyboardControls } from '@react-three/drei'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Interface from './components/Interface.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='w-full max-w-[900px] h-full mx-auto relative'>
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
      ]}
    >
      <App />
    </KeyboardControls>
    <Interface />
  </div>
)
