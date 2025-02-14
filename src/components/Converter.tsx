import React, { useState, ChangeEvent } from 'react';


const Converter: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'svg' | 'webp'>('svg');
    const [svgFile, setSvgFile] = useState<File | null>(null);
    const [webpFile, setWebpFile] = useState<File | null>(null);
    const [conversionResult, setConversionResult] = useState<string | null>(null);

    const handleTabSwitch = (tab: 'svg' | 'webp') => {
        setActiveTab(tab);
        setConversionResult(null);
    };

    const handleSvgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSvgFile(e.target.files[0]);
        }
    };

    const handleWebpUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setWebpFile(e.target.files[0]);
        }
    };

    // Convert SVG to PNG using canvas
    const convertSvgToPng = () => {
        if (!svgFile) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const url = URL.createObjectURL(blob);
                            setConversionResult(url);
                        }
                    }, "image/png");
                }
            };
            if (e.target?.result) {
                img.src = e.target.result as string;
            }
        };
        reader.readAsDataURL(svgFile);
    };

    // Convert .webp to PNG using canvas (unchanged)
    const convertWebpToPng = () => {
        if (!webpFile) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const url = URL.createObjectURL(blob);
                            setConversionResult(url);
                        }
                    }, "image/png");
                }
            };
            if (e.target?.result) {
                img.src = e.target.result as string;
            }
        };
        reader.readAsDataURL(webpFile);
    };

    return (
        <div className="converter-container">
            <div className="tab-container">
                <button
                    onClick={() => handleTabSwitch('svg')}
                    disabled={activeTab === 'svg'}
                    className={`tab-button ${activeTab === 'svg' ? 'active' : ''}`}
                >
                    SVG to PNG
                </button>
                <button
                    onClick={() => handleTabSwitch('webp')}
                    disabled={activeTab === 'webp'}
                    className={`tab-button ${activeTab === 'webp' ? 'active' : ''}`}
                >
                    .webp to PNG
                </button>
            </div>

            {activeTab === 'svg' && (
                <div className="converter-section">
                    <h2>SVG to PNG Converter</h2>
                    <input
                        type="file"
                        accept=".svg"
                        onChange={handleSvgUpload}
                        className="file-input"
                    />
                    <button
                        onClick={convertSvgToPng}
                        disabled={!svgFile}
                        className="convert-button"
                    >
                        Convert
                    </button>
                </div>
            )}

            {activeTab === 'webp' && (
                <div className="converter-section">
                    <h2>.webp to PNG Converter</h2>
                    <input
                        type="file"
                        accept="image/webp"
                        onChange={handleWebpUpload}
                        className="file-input"
                    />
                    <button
                        onClick={convertWebpToPng}
                        disabled={!webpFile}
                        className="convert-button"
                    >
                        Convert
                    </button>
                </div>
            )}

            {conversionResult && (
                <div className="download-section">
                    <h3>Download Converted File:</h3>
                    <a
                        href={conversionResult}
                        download="converted.png"
                        className="download-link"
                    >
                        Download PNG Image
                    </a>
                </div>
            )}
        </div>
    );
};

export default Converter;
