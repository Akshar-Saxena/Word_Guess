import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

function Welcome() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        level: "noob",
        randomId: Math.floor(Math.random() * 200)
    })
    function redirect() {
        if (data.name == "") {
            toast.error("Please enter your name")
            return
        }
        navigate("/start", { state: { data } })
    }
    return (
        <div className='w-[500px] mt-8 max-[500px]:w-[80%] m-auto flex flex-col justify-center items-center'>
            <Toaster />
            <h1 className='font-bold text-center text-4xl'>Welcome to Word Guess</h1>
            <input className="outline outline-2 outline-blue-500 rounded-md text-lg text-center mt-5 mb-4 py-2" onChange={e => setData({
                ...data, name: e.target.value
            })} type="text" placeholder='Enter your name' onKeyDown={(e) => {
                if (e.key == "Enter") {
                    redirect();
                }
            }} />
            <select onChange={e => setData({
                ...data, level: e.target.value
            })} className="outline outline-2 w-[140px] outline-blue-500 rounded-md font-semibold text-lg text-center mt-1 mb-4 py-2" name="" id="">
                <option value="noob">Noob</option>
                <option value="pro">Pro</option>
            </select>
            <button className="bg-blue-950 mb-3 py-2 rounded-2xl font-bold text-white w-[20%]" onClick={redirect}>Start</button>
        </div>
    )
}

export default Welcome