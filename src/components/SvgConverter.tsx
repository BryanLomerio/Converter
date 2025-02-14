import React, { ChangeEvent } from 'react';

export interface SvgConverterProps {
    svgFile: File | null;
    conversionResult: string | null;
    onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    onConvert: () => void;
}

const SvgConverter: React.FC<SvgConverterProps> = ({ svgFile, conversionResult, onFileUpload, onConvert }) => {
    return (
        <div className="converter-section">
            <h2>SVG to PNG Converter</h2>
            <input
                type="file"
                accept=".svg"
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
                    disabled={!svgFile}
                    className="convert-button"
                >
                    Convert
                </button>
            )}
        </div>
    );
};

export default SvgConverter;
