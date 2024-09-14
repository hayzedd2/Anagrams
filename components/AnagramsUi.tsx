"use client"
import { useState, useEffect } from "react";
import { AnagramGameData } from "./AnagramGameContent";
import { motion } from "framer-motion"
import { Button } from "./ui/button";

interface gameDataType {
    id: number,
    letters: string[]
    validWords: string[]
}

const AnagramsUi = () => {
    const defaultGameData = {
        id: 1,
        letters: ["Y", "D", "A", "M", "Z", "E"],
        validWords: [
            "MAZE",
            "DAZE",
            "MADE",
            "DAME",
            "YEAM",
            "MAZY",
            "MEAD",
            "AMAZE",
            "ZED",
            "DAY",
            "MAD",
            "YAM",
            "DAM",
            "MAY",
            "DEY",
            "AYE",
        ],
    }
    const [currGameData, setCurrGameData] = useState<gameDataType>(defaultGameData);
    const [shallowCurrGameData, setShallowCurrGameData] = useState<gameDataType>(defaultGameData);
    const [anagramNumber, setAnagramNumber] = useState<number>(1);
    const [currGameAnswer, setCurrGameAnswer] = useState<string[]>([]);
    const [savedAnswers, setSavedAnswers] = useState<string[]>([])
    const getRandomAnagramNumber = (): number => {
        return Math.floor(Math.random() * 42) + 1;
    };
    const updateGameData = () => {
        const newAnagramNumber = getRandomAnagramNumber();
        const updatedGameData = AnagramGameData[newAnagramNumber];
        setShallowCurrGameData(updatedGameData)
        setCurrGameData(updatedGameData);
        setAnagramNumber(newAnagramNumber);
    };
    useEffect(() => {
        updateGameData();
    }, []);
    const pushUserAnswer = (letter: string, index: number) => {
        setCurrGameAnswer(prevAnswer => [...prevAnswer, letter]);
        setCurrGameData(prevGameData => ({
            ...prevGameData,
            letters: prevGameData.letters.filter((_, i) => i !== index)
        }));
    };
    const removeUserAnswer = () => {
        setCurrGameAnswer(prevAnswer => prevAnswer.slice(0, -1));
    }
    const saveUserAnswer = () => {
        const userAnswer = currGameAnswer.join('');
        if (savedAnswers.includes(userAnswer)) {
            alert("Already chosen")
            ResetOptions()
        }
        else if (currGameData.validWords.includes(userAnswer)) {
            setSavedAnswers(prevAnswers => [...prevAnswers, userAnswer]);
            ResetOptions()
        } else {
            alert('Invalid answer');
            ResetOptions()
            // LOGIC TO RESET TO DEFAULT
        }
    }

    const ResetOptions = () => {
        setCurrGameData(shallowCurrGameData)
        setCurrGameAnswer([])
        console.log(savedAnswers)
    }
    return (
        <section className="py-10 xl:px-4 sm:px-0">
            <div className="min-h-[400px] max-h-[400px]  pb-4 animation-container">
                <div>

                    <div className="flex gap-4 flex-col items-center justify-center">
                        <div className="flex gap-3">
                            {Array.from({ length: 6 }, (_, index) => (
                                <div key={index} className="w-10 h-10 text-[1.25rem] bg-gray-400  rounded-[4px] bx-shadow cursor-pointer font-[700] flex items-center justify-center text-white">
                                    {currGameAnswer[index] || ''}

                                </div>
                            ))}

                        </div>
                        <div className="flex gap-3">
                            {currGameData.letters.map((letter, index) => {
                                return (
                                    <motion.div whileTap={{
                                        scale: 0.8
                                    }} style={{
                                        background: `
                                      linear-gradient(90deg, 
                                        rgba(139, 69, 19, 0.8) 0%, 
                                        rgba(160, 82, 45, 0.8) 50%, 
                                        rgba(139, 69, 19, 0.8) 100%
                                      ),
                                      repeating-linear-gradient(
                                        0deg,
                                        transparent,
                                        transparent 5px,
                                        rgba(0, 0, 0, 0.1) 5px,
                                        rgba(0, 0, 0, 0.1) 10px
                                      ),
                                      repeating-linear-gradient(
                                        90deg,
                                        rgba(139, 69, 19, 0.8),
                                        rgba(139, 69, 19, 0.8) 10px,
                                        rgba(160, 82, 45, 0.8) 10px,
                                        rgba(160, 82, 45, 0.8) 20px
                                      )
                                    `,
                                    }} onClick={() => pushUserAnswer(letter, index)} key={index} className="w-10 h-10 text-[1.25rem]  rounded-[4px] bx-shadow cursor-pointer font-[700] flex items-center justify-center text-white">{letter}</motion.div>
                                )
                            })}
                        </div>
                        <Button onClick={saveUserAnswer} className="font-[700] bg-gray-600 mt-3 hover:bg-gray-600 rounded-[6px] h-10 w-[10rem] text-white" disabled={currGameAnswer.length <= 2}>
                            ENTER
                        </Button>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AnagramsUi