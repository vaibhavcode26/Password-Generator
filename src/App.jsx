import { useState , useEffect, useCallback, useRef} from 'react'
import './App.css'
function App() {
    let tempcolor = 'bg-blue-700'
    let tempcolor2 = 'bg-green-500'
const [length , setLength] = useState(8);
const [numberAllowed , setnumberAllowed] = useState(false);
const [characterAllowed , setcharacterAllowed] = useState(false);
const [ Password , setPassword] = useState("");
const [copy , setcopy] = useState('Copy')
const [color , setcolor] = useState(tempcolor)

const PasswordGenerator = useCallback( () => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(numberAllowed){
            str += "0123456789";
        }
        if(characterAllowed){
            str += "!@#$%^&*()_-+={[]}"
        }
        for (let i = 0 ; i<length ; i++) {
            const char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char);
        }
        setPassword(pass)
        }, [length , numberAllowed , characterAllowed , setPassword])
        useEffect(() => {
            PasswordGenerator();
        },[length , numberAllowed , characterAllowed , PasswordGenerator])
        const passwordRef = useRef(null);
        const copytoclipboard = useCallback( () => {
            passwordRef.current?.select()
            // passwordRef.current?.setSelectionRange(0,8)   // not necessary
            window.navigator.clipboard.writeText(Password)
            setcopy("Copied")
            setcolor(tempcolor2)
        } , [Password])
  return (
      <>
      <h1 className="text-4xl font-bold mt-[230px] text-orange-400 text-center ">Password Generator</h1>
        <div
        className=" w-auto bg-black border-2 py-7 max-w-fit mx-auto shadow-md rounded-lg px-4 my-8  ">
            <div
            className= " flex rounded-lg mb-4 gap-3">
            <input 
            ref={passwordRef}
            type="text" 
            value={Password}
            placeholder='Password'
            readOnly
            className="py-1 px-3 w-full rounded-lg outline-none "
            />


            <button
            onClick={copytoclipboard}
            className= {`px-3 py-0.5 outline-none text-white shrink-0  rounded-lg ${color}`}
            >{copy}</button>


            </div>
            <div className="flex text-sm gap-x-2">
                <div className="flex items-center gap-x-1">
                <input 
                type="range" 
                min={8}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {setLength(e.target.value)}}
                />
                <label className=" text-white text-xl ">length : {length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input 
                    type="checkbox" 
                    defaultChecked = {numberAllowed}
                    onChange={()=> {setnumberAllowed((prev) => !prev)    
                    }}
                    />
                    <label className=" text-white text-xl ">Numbers</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input 
                    type="checkbox" 
                    defaultChecked = {characterAllowed}
                    onChange={()=> {setcharacterAllowed((prev) => !prev)    
                    }}
                    />
                    <label className=" text-white text-xl ">Characters</label>
                </div>
            </div>
        </div>
      </>
  );
}

export default App
