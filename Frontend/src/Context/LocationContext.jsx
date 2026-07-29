import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {

    const [location, setLocation] = useState({
        district: "",
        area: "",
        available: false,
    });

    const [showLocationModal, setShowLocationModal] = useState(true);

    return (
        <LocationContext.Provider
            value={{
                location,
                setLocation,
                showLocationModal,
                setShowLocationModal,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);