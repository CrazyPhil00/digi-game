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
    <h2 style="color: black;">Number Guesser Game</h2>
    <p style="color: black;">Guess a number between 4 and 10:</p>
    <input type="number" style="color: black;" id="guessInput" min="4" max="10">
    <button onclick="checkGuess()" style="color: black;">Submit Guess</button>
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
  const confetti = document.createElement("script");
  confetti.innerHTML = `
  var confetti = {
    maxCount: 1500,		//set max confetti count
    speed: 2,			//set the particle animation speed
    frameInterval: 15,	//the confetti animation frame interval in milliseconds
    alpha: 1.0,			//the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
    gradient: false,	//whether to use gradients for the confetti particles
    start: null,		//call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
    stop: null,			//call to stop adding confetti
    toggle: null,		//call to start or stop the confetti animation depending on whether it's already running
    pause: null,		//call to freeze confetti animation
    resume: null,		//call to unfreeze confetti animation
    togglePause: null,	//call to toggle whether the confetti animation is paused
    remove: null,		//call to stop the confetti animation and remove all confetti immediately
    isPaused: null,		//call and returns true or false depending on whether the confetti animation is paused
    isRunning: null		//call and returns true or false depending on whether the animation is running
  };
  
  (function() {
    confetti.start = startConfetti;
    confetti.stop = stopConfetti;
    confetti.toggle = toggleConfetti;
    confetti.pause = pauseConfetti;
    confetti.resume = resumeConfetti;
    confetti.togglePause = toggleConfettiPause;
    confetti.isPaused = isConfettiPaused;
    confetti.remove = removeConfetti;
    confetti.isRunning = isConfettiRunning;
    var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
    var streamingConfetti = false;
    var animationTimer = null;
    var pause = false;
    var lastFrameTime = Date.now();
    var particles = [];
    var waveAngle = 0;
    var context = null;
  
    function resetParticle(particle, width, height) {
      particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
      particle.color2 = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
      particle.x = Math.random() * width;
      particle.y = Math.random() * height - height;
      particle.diameter = Math.random() * 10 + 5;
      particle.tilt = Math.random() * 10 - 10;
      particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
      particle.tiltAngle = Math.random() * Math.PI;
      return particle;
    }
  
    function toggleConfettiPause() {
      if (pause)
        resumeConfetti();
      else
        pauseConfetti();
    }
  
    function isConfettiPaused() {
      return pause;
    }
  
    function pauseConfetti() {
      pause = true;
    }
  
    function resumeConfetti() {
      pause = false;
      runAnimation();
    }
  
    function runAnimation() {
      if (pause)
        return;
      else if (particles.length === 0) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        animationTimer = null;
      } else {
        var now = Date.now();
        var delta = now - lastFrameTime;
        if (!supportsAnimationFrame || delta > confetti.frameInterval) {
          context.clearRect(0, 0, window.innerWidth, window.innerHeight);
          updateParticles();
          drawParticles(context);
          lastFrameTime = now - (delta % confetti.frameInterval);
        }
        animationTimer = requestAnimationFrame(runAnimation);
      }
    }
  
    function startConfetti(timeout, min, max) {
      var width = window.innerWidth;
      var height = window.innerHeight;
      window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            return window.setTimeout(callback, confetti.frameInterval);
          };
      })();
      var canvas = document.getElementById("confetti-canvas");
      if (canvas === null) {
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "confetti-canvas");
        canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
        document.body.prepend(canvas);
        canvas.width = width;
        canvas.height = height;
        window.addEventListener("resize", function() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }, true);
        context = canvas.getContext("2d");
      } else if (context === null)
        context = canvas.getContext("2d");
      var count = confetti.maxCount;
      if (min) {
        if (max) {
          if (min == max)
            count = particles.length + max;
          else {
            if (min > max) {
              var temp = min;
              min = max;
              max = temp;
            }
            count = particles.length + ((Math.random() * (max - min) + min) | 0);
          }
        } else
          count = particles.length + min;
      } else if (max)
        count = particles.length + max;
      while (particles.length < count)
        particles.push(resetParticle({}, width, height));
      streamingConfetti = true;
      pause = false;
      runAnimation();
      if (timeout) {
        window.setTimeout(stopConfetti, timeout);
      }
    }
  
    function stopConfetti() {
      streamingConfetti = false;
    }
  
    function removeConfetti() {
      stop();
      pause = false;
      particles = [];
    }
  
    function toggleConfetti() {
      if (streamingConfetti)
        stopConfetti();
      else
        startConfetti();
    }
    
    function isConfettiRunning() {
      return streamingConfetti;
    }
  
    function drawParticles(context) {
      var particle;
      var x, y, x2, y2;
      for (var i = 0; i < particles.length; i++) {
        particle = particles[i];
        context.beginPath();
        context.lineWidth = particle.diameter;
        x2 = particle.x + particle.tilt;
        x = x2 + particle.diameter / 2;
        y2 = particle.y + particle.tilt + particle.diameter / 2;
        if (confetti.gradient) {
          var gradient = context.createLinearGradient(x, particle.y, x2, y2);
          gradient.addColorStop("0", particle.color);
          gradient.addColorStop("1.0", particle.color2);
          context.strokeStyle = gradient;
        } else
          context.strokeStyle = particle.color;
        context.moveTo(x, particle.y);
        context.lineTo(x2, y2);
        context.stroke();
      }
    }
  
    function updateParticles() {
      var width = window.innerWidth;
      var height = window.innerHeight;
      var particle;
      waveAngle += 0.01;
      for (var i = 0; i < particles.length; i++) {
        particle = particles[i];
        if (!streamingConfetti && particle.y < -15)
          particle.y = height + 100;
        else {
          particle.tiltAngle += particle.tiltAngleIncrement;
          particle.x += Math.sin(waveAngle) - 0.5;
          particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
          particle.tilt = Math.sin(particle.tiltAngle) * 15;
        }
        if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
          if (streamingConfetti && particles.length <= confetti.maxCount)
            resetParticle(particle, width, height);
          else {
            particles.splice(i, 1);
            i--;
          }
        }
      }
    }
  })();
  `

  document.body.appendChild(confetti);

  const script = document.createElement("script");
  script.innerHTML = `

  var mark_elements = document.getElementsByClassName("notification-title ng-binding ng-scope");

  for (var i = 0; i < mark_elements.length; i++) {
    console.log(mark_elements[i].innerHTML);
  }

  const secretNumber = ` + mark + `;

  const start = () => {
    setTimeout(function() {
        confetti.start()
    }, 500); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti 

const stop = () => {
    setTimeout(function() {
        confetti.stop()
    }, 5000);
};

   function closePopup() {
      const overlay = document.getElementById("overlay");
      const popup = document.getElementById("popup");
      overlay.style.display = "none";
      popup.style.display = "none";
    }
    
    function checkGuess() {
      const guess = parseInt(document.getElementById("guessInput").value);
      const resultElement = document.getElementById("result");
    
      resultElement.style = "color:black;";
      
      if (isNaN(guess) || guess < 4 || guess > 10) {
        resultElement.textContent = "Please enter a valid number between 4 and 10.";
      } else if (guess === secretNumber) {
        resultElement.textContent = "Congratulations! You guessed the correct number.";
        closePopup();
        start();
        stop();
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
    font-family: Arial, sans-serif;
    font-color: black;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  #popup {
    font-family: Arial, sans-serif;
    font-color: black;
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
    font-family: Arial, sans-serif;
    font-color: black;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    color: white;
  }
`;
document.head.appendChild(style);

injectScript(6);
showPopup();