"use client";
import { useState, useEffect } from "react";
import { AnagramGameData } from "./AnagramGameContent";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import toast from "./toast";
import paper from "./images/paper.jpg";
import { verifyWord } from "./verifyWord";
import MotionNumber from "motion-number";
import { useGlobalAudioPlayer } from 'react-use-audio-player';

import AnimatedNumbers from "react-animated-numbers"



interface gameDataType {
    id: number;
    letters: string[];
    validWords: string[];
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
    };
    const [currGameData, setCurrGameData] =
        useState<gameDataType>(defaultGameData);
    const [shallowCurrGameData, setShallowCurrGameData] =
        useState<gameDataType>(defaultGameData);
    const [scoreArr, setScoreArr] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const { load } = useGlobalAudioPlayer();
    const [anagramNumber, setAnagramNumber] = useState<number>(1);
    const [currGameAnswer, setCurrGameAnswer] = useState(Array(6).fill(""));
    const [savedAnswers, setSavedAnswers] = useState<string[]>([]);
    const [flash, setFlash] = useState<'none' | 'success' | 'error'>('none')
    const [finishedPlaying, setFinishedPlaying] = useState(false)
    const getRandomAnagramNumber = (): number => {
        return Math.floor(Math.random() * 42) + 1;
    };
    const updateGameData = () => {
        const newAnagramNumber = getRandomAnagramNumber();
        const updatedGameData = AnagramGameData[newAnagramNumber];
        console.log(updatedGameData);
        setShallowCurrGameData(updatedGameData);
        setCurrGameData(updatedGameData);
        setAnagramNumber(newAnagramNumber);
    };
    useEffect(() => {
        updateGameData();
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            setFinishedPlaying(true)
            alert("Time's up!");
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    const playSound = (soundPath: string) => {
        const audio = new Audio(soundPath);
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    };
    const pushUserAnswer = (letter: string, index: number) => {

        if (letter) {
            playSound("/sounds/btnclick.wav")
            load("/sounds/btnclick.wav")
            const emptyIndex = currGameAnswer.findIndex((l) => l === "");
            if (emptyIndex !== -1) {
                const newAnswer = [...currGameAnswer];
                newAnswer[emptyIndex] = letter;
                setCurrGameAnswer(newAnswer);
                const newLetters = [...currGameData.letters];
                newLetters[index] = "";
                setCurrGameData({ ...currGameData, letters: newLetters });
            }
        }
    };

    const removeLetterFromAnswer = (letter: string, index: number) => {

        if (letter) {
            // playSound("/sounds/btnclick.wav")
            const newAnswer = [...currGameAnswer];
            newAnswer[index] = "";
            setCurrGameAnswer(newAnswer);
            const originalIndex = shallowCurrGameData.letters.indexOf(letter);
            const newLetters = [...currGameData.letters];
            newLetters[originalIndex] = letter;
            setCurrGameData({ ...currGameData, letters: newLetters });
            console.log(newLetters);
        }
    };

    const addToScore = (score: number) => {
        setScoreArr((prevScore) => [...prevScore, score]);
    };
    const saveUserAnswer = () => {
        const userAnswer = currGameAnswer.join("");
        if (savedAnswers.includes(userAnswer)) {
            toast("Already chosen", "error");
            alert("already chosen");
            ResetOptions();
        } else {
            verifyWord(userAnswer)
                .then((isValid) => {
                    if (isValid) {
                        playSound('/sounds/success.wav')
                        setSavedAnswers((prevAnswers) => [...prevAnswers, userAnswer]);
                        toast(`${userAnswer}(+${userAnswer.length * 100})`, "success");
                        addToScore(userAnswer.length * 100);
                        setFlash('success')
                        setTimeout(() => setFlash('none'), 500)
                        ResetOptions();

                    } else {
                        alert("Invalid answer");
                        ResetOptions();
                        setFlash('error')
                        setTimeout(() => setFlash('none'), 500)
                        // LOGIC TO RESET TO DEFAULT
                    }
                })
                .catch((error) => {
                    console.error("Error verifying word:", error);
                });
        }
    };

    const ResetOptions = () => {
        setCurrGameData(shallowCurrGameData);
        setCurrGameAnswer(Array(6).fill(""));
    };
    const ResetGame = () => {
        updateGameData()
        setFinishedPlaying(false)
        setSavedAnswers([])
        setTimeLeft(60)
        setCurrGameAnswer(Array(6).fill(""));
    }
    const flashVariants = {
        none: { backgroundColor: '#ffffff' },
        success: { backgroundColor: ['#ffffff', 'rgba(74, 222, 128, 0.6)', '#ffffff'] },
        error: { backgroundColor: ['#ffffff', 'rgba(239, 68, 68, 0.6)', '#ffffff'] },
    }
    return (
        <section className="py-10 xl:px-4 sm:px-0">
            <div className="min-h-[400px] max-h-[400px]  relative  pb-4 animation-container">
                {finishedPlaying ? <div className="flex flex-col  justify-center">
                    <div
                        className="score-board flex items-center justify-center bg-contain bg-center w-[20rem] mb-10 h-[6rem] bg-gray-800"

                        style={{
                            backgroundImage: `url(${paper.src})`,
                        }}
                    >
                        <div className="flex-col gap-1 text-black ">
                            <h3 className="font-[600] text-[1.05rem]">
                                WORDS:
                                {savedAnswers.length}
                            </h3>

                            <h1 className="font-[700] text-[1.3rem]">
                                SCORE:{" "}
                                {scoreArr
                                    .reduce((acc, val) => acc + val, 0)
                                    .toString()
                                    .padStart(4, "000")}
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col  gap-2 h-[12rem] overflow-scroll indicator py-2  mt-[-20px]">
                        {savedAnswers.map((saved, index) => {
                            return (
                                <div className="flex justify-between items-center">
                                    <div className="woodish-bg bx-shadow rounded-[5px] px-2 py-1 ">
                                        <h2 className="font-[700] text-[0.85rem] text-white">{saved}</h2>

                                    </div>
                                    <p className="text-black text-[1.1rem] font-[600]">{saved.length * 100}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <Button
                            onClick={() => ResetGame()}

                            className="font-[600] bx-shadow bg-gray-600 mt-3 hover:bg-gray-600 rounded-[6px] h-10 w-[10rem] text-white"

                        >
                            Play Again
                        </Button>
                    </div>

                </div> : <>
                    <div className="timer rounded-[16px] px-3 bx-shadow-light absolute right-5 top-2 text-[0.7rem]">

                        <p className="mt-[2px] font-[600]">{formatTime(timeLeft)}</p>
                    </div>
                    <div>
                        <div
                            className="score-board flex items-center justify-center bg-contain bg-center w-[20rem] mb-10 h-[6rem] bg-gray-800"

                            style={{
                                backgroundImage: `url(${paper.src})`,
                            }}
                        >
                            <div className="flex-col gap-1 text-black ">
                                <h3 className="font-[600] text-[1.05rem]">
                                    WORDS:
                                    {savedAnswers.length}
                                </h3>

                                <h1 className="font-[700] flex text-[1.3rem]">
                                    SCORE:
                                    <MotionNumber format={{minimumIntegerDigits :4}} className="mt-[1px]" value={scoreArr.length<=0 ? "0000":scoreArr
                                        .reduce((acc, val) => acc + val, 0)
                                        } />
                                    {/* <AnimatedNumbers animateToNumber={scoreArr.length<=0 ? 0o0:scoreArr
                                        .reduce((acc, val) => acc + val, 0)
                                        }  /> */}
                                    {/* {scoreArr
                                        .reduce((acc, val) => acc + val, 0)
                                        .toString()
                                        .padStart(4, "000")} */}
                                </h1>
                            </div>
                        </div>

                        <div className="flex gap-4 flex-col items-center justify-center">
                            <div className="flex gap-3">
                                {currGameAnswer.map((letter, index) => {
                                    return (
                                        <motion.div
                                            animate={flash}
                                            variants={flashVariants}
                                            transition={{ duration: 0.5 }}
                                            whileTap={{
                                                scale: 0.8,
                                            }}
                                            onClick={() => removeLetterFromAnswer(letter, index)}
                                            key={index}
                                            className={`w-12 h-12 text-[1.25rem]  rounded-[4px] cursor-pointer font-[700] flex items-center justify-center text-white ${letter
                                                ? "woodish-bg  bx-shadow "
                                                : "bg-transparent border border-gray-200"
                                                }`}
                                        >
                                            {letter || ""}
                                        </motion.div>
                                    );
                                })}
                            </div>
                            <div className="flex gap-3">
                                {currGameData.letters.map((letter, index) => {
                                    return (
                                        <motion.div
                                            whileTap={{
                                                scale: 0.8,
                                            }}
                                            onClick={() => pushUserAnswer(letter, index)}
                                            key={index}
                                            className={`w-12 h-12 text-[1.25rem]  rounded-[4px] cursor-pointer font-[700] flex items-center justify-center text-white ${letter
                                                ? "woodish-bg  bx-shadow "
                                                : "bg-transparent border border-gray-300"
                                                }`}
                                        >
                                            {letter}
                                        </motion.div>
                                    );
                                })}
                            </div>
                            <Button
                                onClick={saveUserAnswer}
                                className="font-[700] bx-shadow bg-gray-600 mt-3 hover:bg-gray-600 rounded-[6px] h-10 w-[10rem] text-white"
                                disabled={currGameAnswer.filter(Boolean).length <= 2}
                            >
                                ENTER
                            </Button>
                        </div>
                    </div></>}


            </div>
        </section>
    );
};

export default AnagramsUi;
