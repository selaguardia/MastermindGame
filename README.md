## Table of contents
- [Table of contents](#table-of-contents)
- [🎰General Info 🔐](#general-info-)
- [👨🏻‍💻 How to Run 👩🏾‍💻](#-how-to-run-)
    - [**Step 1:**](#step-1)
    - [**Step 2:**](#step-2)
    - [**Step 3:**](#step-3)
  - [**Step 4:**](#step-4)
  - [**Step 5:**](#step-5)
        - [✨(Open the browser console to reveal the answer 😜)](#open-the-browser-console-to-reveal-the-answer-)
- [🧰 Technologies 🛠️](#-technologies-️)
- [✨ More about this project ✨](#-more-about-this-project-)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Creating the game and its functionality](#creating-the-game-and-its-functionality)
- [🔔 Creative Extensions Implemented / Attempted 🔔](#-creative-extensions-implemented--attempted-)
- [🔮 Future features 🔮](#-future-features-)
#
## 🎰General Info 🔐
This is a Mastermind game where the player tries to guess the number combination 🔒🔒🔒🔒 created by the computer.
#

## 👨🏻‍💻 How to Run 👩🏾‍💻
#### **Step 1:**
To run this project, you will need to have...
* Node.js installed locally on your computer. (to check type ```node -v``` in your terminal)
* Live Server extention installed on Visual Studio Code.

#### **Step 2:** 
Download zip file or fork the repository

#### **Step 3:**
In your terminal navigate to the project and install the dependencies required...
```
$ cd ../mastermindGame
$ npm install
$ npm start
```
### **Step 4:**
Inside Visual Studio Code, right click ```home.html``` and open with Liver Server.

### **Step 5:**
Enjoy the game
###### ✨(Open the browser console to reveal the answer 😜)
#

## 🧰 Technologies 🛠️
Project is created with:
* Node version: 16.4.2
* Express version: 4.18.1
* CORS  version: 2.5.5
* Node-fetch version 2.0.16
* Bootstrap version 5.2.0

#

## ✨ More about this project ✨
#### Backend
- The backend is seperated into its own folder
- In the ```server.js``` file...
   - the server is created using the Express framework
   - Using ```fetch-node```, I created an async function to call the RandomNumbers API, and return its data back. 
#### Frontend
- For the frontend, I created an HTML page and utilized Bootstrap5, a CSS framework to create the User Interface.

### Creating the game and its functionality
  - All variables declared at the begging
  - Create game object to hold game rules
  - Button click handler that initiates the game
  - Everytime the game starts it calls a new API and generates a new number combination
    - In case the call fails, I implemented a backup genetator to use
  - It also resets the game, so that no previous information is accidentally saved.
  - Once the player starts the game, the start game button now checks if the player guesses the correct combination
    - It first runs a function to decrease the number of attemtps remaining
    - Then it retrieves the player input, and through a forEach loop, it takes parses each string into a interger and pushes it to the end of the empty array I created in the begginging to store the players guesses
  - With two arrays now (user guess, and computer generated numbers) i run a function to compare both arrays and check if the player guesses a correct digit, or correct digit AND location(index).
    - If the user guesses all digits correctly, the game stops and shows a congratulatory message, and gives the user the option to restart the game
    - If not, the user can continue the game until attempts are depleted and the player history is added to the bottom of the User Interface through another function that insert HTML into the web page.
#
## 🔔 Creative Extensions Implemented / Attempted 🔔
- Added hints for each guess
    #### 🟩 ➡️ Correct
    #### 🟨 ➡️ Number too high
    #### 🟥 ➡️ Number too low

#
## 🔮 Future features 🔮

- Add timer ⌛ for level 2
- Remove color (red, yellow) for level 3
- Create profile for players




