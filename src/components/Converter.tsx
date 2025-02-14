import React, { useState, ChangeEvent } from "react";
import TabNavigation from "./TabNavigation";
import SvgConverter from "./SvgConverter";
import WebpConverter from "./WebpConverter";
import PxToRemConverter from "./PxToRemConverter";

const Converter: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"svg" | "webp" | "px-rem">("svg");
    const [svgFile, setSvgFile] = useState<File | null>(null);
    const [webpFile, setWebpFile] = useState<File | null>(null);
    const [conversionResult, setConversionResult] = useState<string | null>(null);

    const handleTabSwitch = (tab: "svg" | "webp" | "px-rem") => {
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

    // SVG to PNG
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

    // WebP to PNG
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
            <TabNavigation activeTab={activeTab} onTabSwitch={handleTabSwitch} />
            {activeTab === "svg" && (
                <SvgConverter svgFile={svgFile} conversionResult={conversionResult} onFileUpload={handleSvgUpload} onConvert={convertSvgToPng} />
            )}
            {activeTab === "webp" && (
                <WebpConverter webpFile={webpFile} conversionResult={conversionResult} onFileUpload={handleWebpUpload} onConvert={convertWebpToPng} />
            )}
            {activeTab === "px-rem" && <PxToRemConverter />}
        </div>
    );
};

export default Converter;
