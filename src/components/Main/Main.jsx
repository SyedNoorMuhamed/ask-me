import React, { useContext, useEffect, useState } from "react";
import './Main.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input
    } = useContext(Context);
    const [hotData, setHotData] = useState(false);

    const handleCardClick = async (cardID) => {
        const paragraph = document.getElementById(cardID);
        const cardText = paragraph?.textContent;
        setInput(cardText)
        setHotData(true)
    }

    useEffect(() => {
        const sendInput = async () => {
            await onSent();
        }
        if (hotData && input) {
            sendInput()
            setHotData(false)
        }
    }, [hotData])

    return (
        <div className="main">
            <div className="nav">
                <p>NOOR AI</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    (
                        <>
                            <div className="greet">
                                <p><span>Welcome To Noor AI</span>
                                    <img className="logo" src={assets.noor_ai} alt="" />
                                </p>
                                <p>How can I help you</p>
                            </div>
                            <div className="cards">
                                <div className="card" onClick={() => handleCardClick('card1')}>
                                    <p id="card1">Suggest beautiful places to see on an upcoming road trip</p>
                                    <img src={assets.compass_icon} alt="" />
                                </div>
                                <div className="card" onClick={() => handleCardClick('card2')}>
                                    <p id="card2">Briefly summarize this concept: urban planning</p>
                                    <img src={assets.bulb_icon} alt="" />
                                </div>
                                <div className="card" onClick={() => handleCardClick('card3')}>
                                    <p id="card3">Brainstorm team bending activities for our work retreat</p>
                                    <img src={assets.message_icon} alt="" />
                                </div>
                                <div className="card" onClick={() => handleCardClick('card4')}>
                                    <p id="card4">Improve the readability of the following code</p>
                                    <img src={assets.code_icon} alt="" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="result">
                            <div className="result-title">
                                <img src={assets.user_icon} alt="" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="result-data">
                                <img src={assets.assist_icon} alt="" />
                                {loading ? (
                                    <div className="loader">
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                ) : (
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                )}
                            </div>
                        </div>
                    )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                            onKeyDown={(e) => onSent(e)} />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input && (
                                <img onClick={(e) => onSent(e)} src={assets.send_icon} alt="" />
                            )}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Noor AI may display inaccurate info, including about people, so double-check its response. Your privacy and Noor AI Apps
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Main;