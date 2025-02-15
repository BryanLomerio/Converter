import React, { useState, ChangeEvent } from "react";

const DEFAULT_BASE_FONT_SIZE = 16;

const PxToRemConverter: React.FC = () => {
    const [pxValue, setPxValue] = useState("");
    const [remValue, setRemValue] = useState("");
    const [copied, setCopied] = useState(false);

    const handlePxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const px = e.target.value;
        setPxValue(px);

        if (px) {
            const rem = parseFloat((parseFloat(px) / DEFAULT_BASE_FONT_SIZE).toFixed(4));
            setRemValue(rem.toString());

            copyToClipboard(`${rem}rem`);
        } else {
            setRemValue("");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <div className="converter-section">
            <h2>PX to REM Converter</h2>
            <p className="note">
                Automatically copied (including "rem") when you type!
            </p>
            <input
                type="number"
                value={pxValue}
                onChange={handlePxChange}
                placeholder="Enter PX value"
                className="file-input"
            />
            <div className="result-container">
                <span className="result">
                    REM: {remValue ? remValue + "rem" : "—"}
                </span>
                {remValue && copied && <span className="copied">✔ Copied!</span>}
            </div>
        </div>
    );
};

export default PxToRemConverter;
