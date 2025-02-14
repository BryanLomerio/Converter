import React, { ChangeEvent } from 'react';

export interface WebpConverterProps {
    webpFile: File | null;
    conversionResult: string | null;
    onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    onConvert: () => void;
}

const WebpConverter: React.FC<WebpConverterProps> = ({ webpFile, conversionResult, onFileUpload, onConvert }) => {
    return (
        <div className="converter-section">
            <h2>.webp to PNG Converter</h2>
            <input
                type="file"
                accept="image/webp"
                onChange={onFileUpload}
                className="file-input"
            />
            {conversionResult ? (
                <a
                    href={conversionResult}
                    download="converted.png"
                    className="convert-button"
                >
                    Download
                </a>
            ) : (
                <button
                    onClick={onConvert}
                    disabled={!webpFile}
                    className="convert-button"
                >
                    Convert
                </button>
            )}
        </div>
    );
};

export default WebpConverter;
