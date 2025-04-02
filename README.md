# playwright ,cucumber framework with TypeScript

# Pre-requisites
    node.js
    vscode(ide)

# Installations
npm install

# Run scripts:

npm test     ///to run the test

npm run report     ///to open and view report

# Project structure
│── /src/

       │── /support/          
       
       |      │── hooks.ts     
       
       |      │── pageFixture.ts 
       
       │── /test/ 
       
       │      │── /features/        
       
       │      │── /pages/ 
       
       │      │── /steps/     
       
│── /results/

        │── /screenshots/ 
        
        │── /videos/ 
        
│── /config/

        │── .env.qa
        
│── /reports/

│── cucumber.json

│── generateReport.ts   

│── package.json        

│── tsconfig.json      

│── playwright.config.ts 

│── .gitignore        

│── package-lock.json

│── tsconfig.json

# config envdot

BASE_URL=https://katalon-demo-cura.herokuapp.com

USER=John Doe

PASSWORD=ThisIsNotAPassword

# NOTE: 

This is a sample framework repo which deploys a demo login page  test that generate reports which includes screenshots,videos and time of execution.
Basic functionalities are declared in the basepage.ts 
