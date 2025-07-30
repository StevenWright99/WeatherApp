import React, { useState } from 'react';
import locationPin from '../assets/Sidebar/location-pin.svg'
import weatherIcon from '../assets/Sidebar/weather.svg'

export default function Sidebar(props) {

    // useState replaced js button scripts
    const [isOpen, setIsOpen] = useState(false);

    const sidebar_open = () => setIsOpen(true);
    const sidebar_close = () => setIsOpen(false);

    // Hide menu button when clicked
    const [isVisible, setIsVisible] = useState(true);

    const hideButton = () => setIsVisible(false);
    const showButton = () => setIsVisible(true);

    // Called when Menu button is clicked. Opens menu and hides menu button
    const openMenu = () => {
        hideButton();
        sidebar_open();
    }

    // Called when X is clicked. Close menu, shows menu button again
    const closeMenu = () => {
        sidebar_close();
        showButton();
    }
    return (
        <>
            {isOpen && (
                <section className="sidebar-container" id='mySidebar'>
                    <button id='sidebar_close_button'
                        onClick={closeMenu}>&times;</button>
                    <div className="header-container">
                        <img id='weather-logo' src={weatherIcon} alt="Fun logo" />
                        <h1 className="weather-app-title">Weather App</h1>
                    </div>
                    <div id='divider1'></div>
                    <section className="location-box">
                        <img id='pin-icon' src={locationPin} alt="location_pic_icon" />
                        <div className="vertical-flex-location">
                            <div id='city'>{props.city}</div>
                            <div id='state_country'>{props.state}, {props.country}</div>
                        </div>
                    </section>
                    <section id='search-box'>
                        {/* props.children - VERY NECESSARY - renders <LocationSearch /> to the page*/}
                        {props.children}
                    </section>
                    <div className="footer">© Copyright 2024 - Steven Wright</div>
                </section>
            )}
            {/* This diaplays menu button that can be clicked to open sidebar */}

            {isVisible && (
                <section id='sidebar-always-displayed'>
                    <button id="menu_button" onClick={openMenu}>☰</button>
                </section>
            )}
        </>
    )
}