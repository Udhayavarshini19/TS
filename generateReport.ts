import report from "multiple-cucumber-html-reporter";
import fs from "fs";
import path from "path";
import open from "open"; // ✅ Use default import

const jsonDir = path.join(__dirname, "reports");
const reportPath = path.join(jsonDir, "html-report");

// Ensure the directory exists
if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
}

console.log("🚀 Generating report...");

report.generate({
    jsonDir: jsonDir, // Path where Cucumber JSON results are stored
    reportPath: reportPath, // Path where the report will be generated
    metadata: {
        browser: {
            name: "chrome",
            version: "latest",
        },
        device: "VARSHINI",
        platform: {
            name: "Windows",
            version: "10",
        },
    },
    customData: {
        title: "Test Report",
        data: [
            { label: "Project", value: "CURA Automation" },
            { label: "Execution Date", value: new Date().toLocaleString() },
        ],
    },
    displayReportTime: true,
    openReportInBrowser: true,
    //attachScreenshots: true, //  Ensure screenshots & videos are attached in the report
});

//  Open the report using default import
//open(path.join(reportPath, "index.html"));
