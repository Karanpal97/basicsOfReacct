
import { useState,useCallback,useEffect ,useRef} from 'react';




function App() {

  const [Length,setLength]=useState(8);
  const [numberAllowed,setnumberAllowed]=useState(false);
  const [charAllowed,setcharAllowed]=useState(false);

  const [password,setpassword]=useState("");
  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="123456789";
    if(charAllowed)str+="!`~@#$%^&*(){}[]";
    for(let i=1;i<Length;i++) {
     let char=Math.floor(Math.random()*str.length+1)
     pass+=str.charAt(char)

    }
    setpassword(pass);

  },[Length,numberAllowed,charAllowed]);

  const copyThePassword= useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{passwordGenerator()},[Length,charAllowed,numberAllowed])
  return (
   
    <div className="w-full max-w-md mx-auto-shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
       <h1 className='text-center'>passwordGenerator</h1>
      <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
        <input
        
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        ref={passwordRef}
        readOnly
        
        /><button onClick={copyThePassword}
        className='text-center bg-blue-700  text-white outline-none px-1 py-1'>copy</button>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={6}
            max={100}
            value={Length}
            className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)}
            /> <label >Length:{Length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultValue={numberAllowed}
            onChange={()=>{
               setnumberAllowed((pre)=>!pre)
            }}
                       
            />
            <label htmlFor='numberInput '>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultValue={charAllowed}
            onChange={()=>{
               setcharAllowed((pre)=>!pre)
            }}
                       
            />
            <label htmlFor='charInput '>Charcters</label>
          </div>
        </div>
        
        </div>
   
    </div>
  );
}

export default App;
