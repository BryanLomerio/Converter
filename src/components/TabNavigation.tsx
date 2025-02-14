import React from "react";

interface TabNavigationProps {
    activeTab: "svg" | "webp" | "px-rem";
    onTabSwitch: (tab: "svg" | "webp" | "px-rem") => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabSwitch }) => {
    return (
        <div className="tab-container">
            <button onClick={() => onTabSwitch("svg")} className={`tab-button ${activeTab === "svg" ? "active" : ""}`}>
                SVG to PNG
            </button>
            <button onClick={() => onTabSwitch("webp")} className={`tab-button ${activeTab === "webp" ? "active" : ""}`}>
                .webp to PNG
            </button>
            <button onClick={() => onTabSwitch("px-rem")} className={`tab-button ${activeTab === "px-rem" ? "active" : ""}`}>
                PX to REM
            </button>
        </div>
    );
};

export default TabNavigation;
