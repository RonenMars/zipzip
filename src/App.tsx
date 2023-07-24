import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Form} from '@components/molecules';
import {Input} from '@components/atoms';


function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Form>
          <Input name="firstName" placeholder="Type your first name" />
          <Input name="lastName" placeholder="Type your last name" />
        </Form>
    </>
  )
}

export default App
