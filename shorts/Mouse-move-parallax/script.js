const layers = document.querySelectorAll(".layer");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  layers.forEach((layer, index) => {
    const speed = (index + 1) * 2;
    layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});
