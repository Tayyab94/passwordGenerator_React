/* eslint-disable no-unused-vars */

import React,{ useCallback, useEffect, useRef, useState } from 'react'


function App() {

  const [length, setLength]= useState(8);
  const [numberAllowed, setNumberAllowed]= useState(false);
  const [charectorAllowed, setCharactorAllowed]= useState(false);
  const [password, setPassword]= useState()

  const passwordRef= useRef();
  const PasswordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmonopqrstuvwxyz";
    
    if(numberAllowed) str +="0123456789"

    if(charectorAllowed) str +="{}()*&!@#$%^&><:"

    for (let index = 1; index <=length; index++) {
      let char= Math.floor(Math.random()  * str.length +1);

      pass += str.charAt(char);
    }
  setPassword(pass);
  },[length, numberAllowed, charectorAllowed, setPassword])

  useEffect(()=>{
    PasswordGenerator();
  },[length, numberAllowed, charectorAllowed, PasswordGenerator])

  const PasswordCopy=useCallback(()=>{
    if(passwordRef.current)
    {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,13);   
      window.navigator.clipboard.writeText(password);
    }
   

  },[password])

  return (
    <>
      {/* <h1 className='text-white text-center text-5xl'>Password Generator</h1> */}

      <div className='w-full max-w-screen-md mx-auto shadow-md rounded-lg py-4 px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-center text-white mt-1 mb-2'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input type="text" 
              className='outline-none w-full py-1 px-3' 
              value={password}  placeholder='Passowrd' readOnly  ref={passwordRef}/>
              <button onClick={PasswordCopy} className='outline-none bg-blue-500 text-white px-4 py-.5 shrink-0'>Copy</button>
          </div>

          <div className='flex text-sm gap-x-1'>
              <div className='flex items-center gap-x-1'>
                    <input type="range" min={6} 
                    max={100} className='cursor-pointer ' 
                    onChange={(e)=> setLength(e.target.value)}/>
                    <label>Lenght: {length}</label>
              </div>

              <div className='flex items-center gap-x-1'>
                    <input type="checkbox" 
                    defaultChecked={numberAllowed}
                    id='numberInput' 
                    onChange={()=>{
                      setNumberAllowed((prev)=> !prev)
                    }}/>
                    <label>Number Allow</label>
              </div>

              <div className='flex items-center gap-x-1'>
                    <input type="checkbox" 
                    defaultChecked={charectorAllowed}
                    id='charecterInput' 
                    onChange={()=>{
                      setCharactorAllowed((prev)=> !prev)
                    }}/>
                    <label>Character Allow</label>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
