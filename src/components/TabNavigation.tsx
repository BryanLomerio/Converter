import React from 'react';

export interface TabNavigationProps {
    activeTab: 'svg' | 'webp';
    onTabSwitch: (tab: 'svg' | 'webp') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabSwitch }) => {
    return (
        <div className="tab-container">
            <button
                onClick={() => onTabSwitch('svg')}
                disabled={activeTab === 'svg'}
                className={`tab-button ${activeTab === 'svg' ? 'active' : ''}`}
            >
                SVG to PNG
            </button>
            <button
                onClick={() => onTabSwitch('webp')}
                disabled={activeTab === 'webp'}
                className={`tab-button ${activeTab === 'webp' ? 'active' : ''}`}
            >
                .webp to PNG
            </button>
        </div>
    );
};

export default TabNavigation;
