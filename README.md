A 3D simulation of the solar system using **Three.js**, showing the Sun and 8 orbiting planets.

Process to Run the Project Locally:

STEP-1:
1. Set Up Project Folder
    Create a folder for your project (e.g., solar-system) and add these files:

        solar-system/
        ├── index.html
        ├── script.js
     
2. USE below as index.html starter template

index.html:
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solar System</title>
    <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
    <script type="module" src="script.js" ></script>
    
    </head>
    <body>
        <canvas id="wbgl"></canvas>
    </body>
    </html>



3. Use terminal to enter into Project folder If not in folder:
    USE **cd Project_folder_name** command in terminal to move inside folder where all html and js file located 

4. RUN this command 
        npm install --save three 
    to install three.js.

5. Run this command after running command at no 4. 
    npm install --save-dev vite

6.From your terminal, run:
   npx vite 
