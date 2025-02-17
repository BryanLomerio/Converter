import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AjaxConverter: React.FC = () => {
    const [inputFields, setInputFields] = useState<string>("employee_id, employee_name, employee_age");
    const [backendUrl, setBackendUrl] = useState<string>("index.php/controller_name/method_name");
    const [dialogSelector, setDialogSelector] = useState<string>("#dialog_add");
    const [functionName, setFunctionName] = useState<string>("");
    const [setlistFunction, setSetlistFunction] = useState<string>("SYS_table_name_List");
    const [generatedCode, setGeneratedCode] = useState<string>("");
    const [inputType, setInputType] = useState<string>("comma");

    const generateAjaxPostCode = (
        formFieldIds: { [key: string]: string },
        backendUrl: string,
        dialogSelector: string,
        functionName?: string,
        setlistFunction?: string
    ): string => {
        if (!functionName) {
            functionName = "ajaxPostFunction_" + Math.random().toString(36).substr(2, 9);
        }

        let code = "";
        code += "function " + functionName + "() {\n";
        code += "    let formData = {\n";
        const fields = Object.keys(formFieldIds);
        fields.forEach((field, index) => {
            code += `        ${field}: ${field}`;
            if (index < fields.length - 1) {
                code += ",";
            }
            code += "\n";
        });
        code += "    };\n\n";

        code += "    SYS_confirm(\"Do you wish to proceed?\", \"Information will be saved.\", \"warning\", \"Yes\", \"No\", function () {\n";
        code += "        sweetAlertClose();\n\n";
        code += "        $.ajax({\n";
        code += `            url: URL + "${backendUrl}",\n`;
        code += "            method: \"POST\",\n";
        code += "            data: formData,\n";
        code += "            success: function (data) {\n";
        code += "                var n = JSON.parse(data);\n";
        code += "                if (n.msg === \"\") {\n";
        code += "                    swal(\"Done\", \"Successfully saved\", \"success\");\n";
        if (setlistFunction) {
            code += `                    ${setlistFunction}();\n`;
        } else {
            code += "                     facultyRatesMaintenance_List();\n";
        }
        code += `                    $('${dialogSelector}').remove();\n`;
        code += "                } else {\n";
        code += "                    toastr.error(n.msg);\n";
        code += "                }\n";
        code += "            },\n";
        code += "            error: function (err) {\n";
        code += "                console.log(err);\n";
        code += "            }\n";
        code += "        });\n";
        code += "    });\n";
        code += "}\n";

        return code;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setInputFields(input);
    };

    const handleGenerate = () => {
        try {
            let mappingObj: { [key: string]: string } = {};
            if (inputType === "comma") {
                mappingObj = inputFields
                    .split(",")
                    .map((field) => field.trim())
                    .reduce((acc: { [key: string]: string }, field) => {
                        acc[field] = field;
                        return acc;
                    }, {});
            } else {
                mappingObj = JSON.parse(inputFields);
            }

            const code = generateAjaxPostCode(
                mappingObj,
                backendUrl,
                dialogSelector,
                functionName.trim() ? functionName.trim() : undefined,
                setlistFunction.trim() ? setlistFunction.trim() : undefined
            );
            setGeneratedCode(code);
        } catch (err) {
            setGeneratedCode("// Error: Invalid input.");
        }
    };

    useEffect(() => {
        if (inputType === "json") {
            setInputFields(
                JSON.stringify(
                    {
                        employee_id: "employee_id",
                        employee_name: "employee_name",
                        employee_age: "employee_age",
                    },
                    null,
                    4
                )
            );
        } else {
            setInputFields("employee_id, employee_name, employee_age");
        }
    }, [inputType]);

    const calculateRows = () => {
        const lines = inputFields.split("\n").length;
        return Math.max(lines, 3); 
    };

    return (
        <div className="ajax-converter" style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
            <h3>AJAX POST Code Generator</h3>
            <div>
                <label>Input Type:</label>
                <select
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                    style={{ marginBottom: "10px" }}
                >
                    <option value="comma">Comma-separated</option>
                    <option value="json">JSON</option>
                </select>
            </div>
            <div>
                <label>{inputType === "comma" ? "Form Field Mapping (Comma-separated):" : "Form Field Mapping (JSON):"}</label>
                <textarea
                    value={inputFields}
                    onChange={handleInputChange}
                    rows={calculateRows()} 
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
            </div>
            <div>
                <label>Backend URL:</label>
                <input
                    type="text"
                    value={backendUrl}
                    onChange={(e) => setBackendUrl(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "10px" }}
                />
            </div>
            <div>
                <label>Dialog Selector:</label>
                <input
                    type="text"
                    value={dialogSelector}
                    onChange={(e) => setDialogSelector(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "10px" }}
                />
            </div>
            <div>
                <label>Function Name (Optional):</label>
                <input
                    type="text"
                    value={functionName}
                    onChange={(e) => setFunctionName(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "10px" }}
                />
            </div>
            <div>
                <label>Setlist Function (Optional):</label>
                <input
                    type="text"
                    value={setlistFunction}
                    onChange={(e) => setSetlistFunction(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "10px" }}
                />
            </div>
            <button
                onClick={handleGenerate}
                style={{
                    padding: "10px 15px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                Generate AJAX Code
            </button>
            <div>
                <label>Generated Code:</label>
                <div
                    style={{
                        padding: "10px",
                        marginTop: "10px",
                        width: "100%",
                        overflowY: "auto",
                        borderRadius: "8px",
                    }}
                >
                    <SyntaxHighlighter language="javascript" style={solarizedlight}>
                        {generatedCode}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default AjaxConverter;
