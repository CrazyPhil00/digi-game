var element = document.getElementsByClassName("notification-title ng-binding ng-scope");

if (!element == null) {
// Attempt to get an element by its ID
    const inputString = element.innerHTML;

    // Use a regular expression to match the integer at the end
    const match = inputString.match(/(\d+)$/);

    // Check if a match is found
    if (match) {
        // Extract the matched integer
        const integerValue = parseInt(match[1]);

        console.log("Integer Value:", integerValue);
  
        injectScript(match[1]);
        showPopup();
    } else {
        console.log("No match found.");
    }
}


function showPopup() {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  document.body.appendChild(overlay);

  // Create popup
  const popup = document.createElement("div");
  popup.id = "popup";
  popup.innerHTML = `
    <span id="closeButton" onclick="closePopup()">X</span>
    <h2>Number Guesser Game</h2>
    <p>Guess a number between 4 and 10:</p>
    <input type="number" id="guessInput" min="4" max="10">
    <button onclick="checkGuess()">Submit Guess</button>
    <p id="result"></p>

    
  `;

  // Create image element for background
  const backgroundImage = document.createElement("img");
  backgroundImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIh2EJlGMEHQ91oB4Qa2nhh9I--Rd9rlNJPvSyZGNe7vinlA7K'; // Replace with the actual image URL
  backgroundImage.style.width = "100%";
  backgroundImage.style.height = "100%";
  overlay.appendChild(backgroundImage);

  document.body.appendChild(popup);

  // Show overlay and popup
  overlay.style.display = "block";
  popup.style.display = "block";

  
}

function injectScript(mark) {
  const script = document.createElement("script");
  script.innerHTML = `
  const secretNumber = ` + mark + `

   function closePopup() {
      const overlay = document.getElementById("overlay");
      const popup = document.getElementById("popup");
      overlay.style.display = "none";
      popup.style.display = "none";
    }
    
    function checkGuess() {
      const guess = parseInt(document.getElementById("guessInput").value);
      const resultElement = document.getElementById("result");
    
      if (isNaN(guess) || guess < 4 || guess > 10) {
        resultElement.textContent = "Please enter a valid number between 4 and 10.";
      } else if (guess === secretNumber) {
        resultElement.textContent = "Congratulations! You guessed the correct number.";
      } else if (guess < secretNumber) {
        resultElement.textContent = "Try a higher number.";
      } else {
        resultElement.textContent = "Try a lower number.";
      }
    }
  `;


  document.body.appendChild(script);
}


// Style for the overlay and popup
const style = document.createElement("style");
style.textContent = `
  body {
    font-family: Arial, sans-serif;
    margin: 0; /* Remove default body margin */
  }

  #overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  #popup {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 8px;
    z-index: 1000;
  }

  #closeButton {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    color: white;
  }
`;
document.head.appendChild(style);