import React, { useState, createContext, useContext } from 'react';

const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
    const [showMap, setShowMap] = useState(true);
    const [showRouteMap, setShowRouteMap] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(false);

    const toggleShowMap = () => {
        setShowMap(true);
        setShowAboutUs(false);
        setShowRouteMap(false);
    }

    const toggleShowRouteMap = () => {
        setShowRouteMap(true);
        setShowMap(false);
        setShowAboutUs(false);
    }

    const toggleShowAboutUs = () => {
        setShowAboutUs(true);
        setShowMap(false);
        setShowRouteMap(false);
    }

    return (
        <PagesContext.Provider value={{ showMap, setShowMap, showRouteMap, setShowRouteMap, showAboutUs, setShowAboutUs, toggleShowMap, toggleShowRouteMap, toggleShowAboutUs }}>
            {children}
        </PagesContext.Provider>
    )
}

export const usePages = () => {
    return useContext(PagesContext);
}