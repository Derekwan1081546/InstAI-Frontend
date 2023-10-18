1. cd src 
2. npm i --legacy-peer-deps
3. npm run build
4. cd ..
5  npm i --legacy-peer-deps

執行完畢後 打開MYSQL COMMAND LINE 創建DB及TABLE
 FOR LOGIN/REGISTER 以下指令

CREATE DATABASE test
CREATE TABLE test.login(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
)
CREATE TABLE test.photo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    image_data LONGBLOB NOT NULL
);
接下來回到terminal 
隨後就可以打開專案 npm start 成功後會看到 Connected to MYSQL database
打開以下網址: localhost:3000






製作Stable diffusion api interface -> TXT TO IMG / IMG TO IMG 
1. SOLVE THE DESIGN OF PAGE -> CSS / ANTDESIGN / MATERIAL UI
2. CONNECT THE API TO DELIVER PARAMETERS FROM SEVER 
3. TEST / PUSH 
