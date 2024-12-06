import React from 'react'

function WordDisplay(props) {
    const yellow = props.yellow
    const green = props.green


    function colorDecider(id) {
        for (let i = 0; i < yellow.length; i++) {
            if (yellow[i] == id)
                return "#FFEA00";
        }
        for (let i = 0; i < green.length; i++) {
            if (green[i] == id)
                return "#7FFF00";
        }
        return "#BEBEBE";
    }

    return (
        <div className='flex'>
            {props.title.split("").map((letter, id) => (
                <span key={id} style={{ backgroundColor: colorDecider(id) }} className='w-[40px] h-[40px] font-bold text-2xl shadow-md flex justify-center items-center m-1 rounded-lg'>{letter}</span>
            ))}
        </div>
    )
}

export default WordDisplay