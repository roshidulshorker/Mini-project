function createRipple(button) {
  // Add ripple effect
  button.style.transform = "scale(0.95)";
  setTimeout(() => {
    button.style.transform = "scale(1.1)";
  }, 100);
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 300);

  // Change colors randomly
  const colors = [
    "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
    "linear-gradient(45deg, #667eea, #764ba2)",
    "linear-gradient(45deg, #f093fb, #f5576c)",
    "linear-gradient(45deg, #4facfe, #00f2fe)",
    "linear-gradient(45deg, #43e97b, #38f9d7)",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  button.style.background = randomColor;
}

function speedUpMorph(shape) {
  shape.style.animationDuration = "0.5s";
  shape.style.transform = "scale(1.3)";
  setTimeout(() => {
    shape.style.animationDuration = "4s";
    shape.style.transform = "scale(1)";
  }, 2000);
}

function triggerPulse(ring) {
  ring.style.borderColor = "#ff6b6b";
  ring.style.transform = "scale(1.2)";
  setTimeout(() => {
    ring.style.borderColor = "rgba(255, 255, 255, 0.3)";
    ring.style.transform = "scale(1)";
  }, 1000);
}

function animateText(textElement) {
  const spans = textElement.querySelectorAll("span");
  spans.forEach((span, index) => {
    setTimeout(() => {
      span.style.color = "#ff6b6b";
      span.style.transform = "scale(1.5) rotate(360deg)";
      setTimeout(() => {
        span.style.color = "white";
        span.style.transform = "scale(1) rotate(0deg)";
      }, 500);
    }, index * 100);
  });
}

// Add random floating particles
function createParticle() {
  const particle = document.createElement("div");
  particle.style.position = "fixed";
  particle.style.width = Math.random() * 10 + 5 + "px";
  particle.style.height = particle.style.width;
  particle.style.background = "rgba(255, 255, 255, 0.5)";
  particle.style.borderRadius = "50%";
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = window.innerHeight + "px";
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "1000";
  document.body.appendChild(particle);

  const animation = particle.animate(
    [
      { transform: "translateY(0px)", opacity: 1 },
      { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 },
    ],
    {
      duration: Math.random() * 3000 + 2000,
      easing: "linear",
    }
  );

  animation.onfinish = () => particle.remove();
}

// Create particles every 500ms
setInterval(createParticle, 500);

// Add mouse trail effect
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.style.position = "fixed";
  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";
  trail.style.width = "6px";
  trail.style.height = "6px";
  trail.style.background = "rgba(255, 107, 107, 0.6)";
  trail.style.borderRadius = "50%";
  trail.style.pointerEvents = "none";
  trail.style.zIndex = "9999";
  document.body.appendChild(trail);

  setTimeout(() => {
    trail.style.transition = "all 0.5s ease-out";
    trail.style.transform = "scale(0)";
    trail.style.opacity = "0";
    setTimeout(() => trail.remove(), 500);
  }, 10);
});
