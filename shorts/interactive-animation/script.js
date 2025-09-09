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
