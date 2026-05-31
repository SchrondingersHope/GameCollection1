This is how the app was set-up:
1) Create root folder: git init
-- add dist, .env and node_modules to .gitignore

2) Create frontend folder: npm create vite@latest frontendFolder
*) npm install   ( install all dependencies )
*) npm run dev

3) Create backend folder: npm init -y 
-- install all dependencies such as express dotenv cors mongoose nodemon etc etc

4) In root, *) git add .  *) git commit -m "commitmsg" 

-) To run frontend, npm run dev, 
-) To run backend, node/nodemon backendIndexFile.js