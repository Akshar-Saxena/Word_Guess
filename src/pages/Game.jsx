import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import words from "../constants/words.json";
import WordDisplay from "../components/WordDisplay";
import toast, { Toaster } from "react-hot-toast";
import { VscDebugRestart } from "react-icons/vsc";
import { IoHome } from "react-icons/io5";

function Game() {
    const location = useLocation();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [attempts, setAttempts] = useState([]);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        }
    }, []);

    const selectedWords =
        location.state?.data.level === "noob" ? words[0].noob : words[1].pro;

    const randomWord =
        selectedWords[location?.state.data.randomId].toUpperCase();

    function result(g) {
        if (g.length == 5) {
            toast.success("You won!");
        } else {
            toast.error("Lost the game! The word was : " + randomWord);
        }
        setFlag(false);
    }

    function handleWord() {
        if (attempts.length > 5) {
            setInput("");
            toast.error("This game is ended! Retry");
            return;
        }
        if (input.length < 5) {
            toast.error("Please enter a 5 character word");
            return;
        }
        let y = [];
        let g = [];
        let checkedIds = [];
        for (let index = 0; index < 5; index++) {
            if (input.charAt(index) == randomWord.charAt(index)) {
                checkedIds.push(index);
                g.push(index);
            }
        }
        for (let x = 0; x < 5; x++) {
            for (let z = 0; z < 5; z++) {
                if (
                    input.charAt(x) == randomWord.charAt(z) &&
                    !checkedIds.includes(z) &&
                    x != z &&
                    !g.includes(x)
                ) {
                    checkedIds.push(z);
                    y.push(x);
                    break;
                }
            }
        }
        setAttempts((prev) => [
            ...prev,
            {
                input,
                yellow: y,
                green: g,
            },
        ]);
        setInput("");
        if (attempts.length == 5 || g.length == 5) {
            result(g);
        }
    }

    return (
        <div className="w-[500px] max-[500px]:w-[80%] flex flex-col justify-center items-center m-auto">
            <Toaster />
            <div className="bg-blue-300 rounded-3xl px-12 py-4 mt-4">
                <h1 className="text-xl font-semibold">
                    Welcome, {location.state?.data.name}
                </h1>
                <h1 className="text-sm font-semibold">
                    Difficulty: {location.state?.data.level}
                </h1>
                <button
                    onClick={() => {
                        navigate("/start", {
                            state: {
                                data: {
                                    name: location.state.data.name,
                                    level: location.state.data.level,
                                    randomId: Math.floor(Math.random() * 200),
                                },
                            },
                        });
                        setAttempts([]);
                        setFlag(true);
                    }}
                    className="flex justify-evenly items-center"
                >
                    <VscDebugRestart className="mr-3" /> Restart
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="flex justify-evenly items-center"
                >
                    <IoHome className="mr-3" /> Main Menu
                </button>
            </div>

            <div className="flex flex-col justify-center items-center">
                <input
                    type="text"
                    className="outline outline-2 outline-blue-500 rounded-md font-semibold text-2xl text-center mt-5 mb-4 py-2"
                    value={input}
                    disabled={!flag}
                    onChange={(e) => {
                        if (e.target.value.length > 5) return;
                        setInput(e.target.value.toUpperCase());
                    }}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            handleWord();
                        }
                    }}
                />
                <button
                    disabled={!flag}
                    className="bg-blue-950 mb-3 py-2 rounded-2xl font-bold text-white w-full"
                    onClick={handleWord}
                >
                    Check
                </button>
            </div>

            <div className="flex flex-col">
                {attempts.length > 0 &&
                    attempts.map((value, id) => (
                        <WordDisplay
                            key={id}
                            title={value.input}
                            yellow={value.yellow}
                            green={value.green}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Game;
