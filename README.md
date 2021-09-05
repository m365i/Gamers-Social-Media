# Gaming-Social-Media-Platform  
a social media website for gamers.  

## requirements

1. nodejs (https://nodejs.org/en/)  
2. mongodb installed (https://www.mongodb.com/try/download/community)  

## install  
```   
git clone https://github.com/m365i/Gamers-Social-Media.git   
cd Gamers-Social-Media  
cd client  
npm install  
cd ..  
cd server  
npm install  
```  

#### recommended vscode extensions 
swagger editor  
https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi  
eslint  
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint  

## development  
run the server by using `nodemon` command or `npm start` in the server directory.  
the client can be started with `npm start` in the client directory.  

## deployment with docker
```
docker-compose up
```