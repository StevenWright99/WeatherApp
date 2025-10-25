import { useState } from "react";
export default function Overlay() {

    //Logic for turning overlay on and off
    const [isOn, setIsOn] = useState(false); //Overlay off by default

    const toggle = () => setIsOn(prev => !prev);


    return (
        <>
            <div id='button1-container'>
                <div id='overlay-text'>Overlay On/Off</div>
                <label className="switch">
                    <input type="checkbox" checked={isOn}
                        onChange={toggle}></input>
                    <span className="slider"></span>
                </label>
            </div>

            {/* <label className="switch">
                <input type="checkbox"></input>
                <span className="slider"></span>
            </label> */}
            {isOn && (
                <div className="container">
                    <div className="video-overlay">
                    </div>
                    {/* <video autoplay playsinline muted loop preload>
                        <source src="" />
                    </video> */}
                </div>
            )}
        </>

    )

}