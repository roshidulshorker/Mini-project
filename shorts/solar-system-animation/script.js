const planets = [
    { name: "Mercury", radius: 8, distance: 100, color: "#A9A9A9", period: 88 },
    { name: "Venus", radius: 12, distance: 140, color: "#E6E6FA", period: 225 },
    { name: "Earth", radius: 13, distance: 180, color: "#1E90FF", period: 365 },
    { name: "Mars", radius: 10, distance: 220, color: "#FF4500", period: 687 },
    { name: "Jupiter", radius: 30, distance: 300, color: "#FFA500", period: 4333 },
    { name: "Saturn", radius: 25, distance: 380, color: "#F0E68C", period: 10759 },
    { name: "Uranus", radius: 20, distance: 440, color: "#AFEEEE", period: 30687 },
    { name: "Neptune", radius: 19, distance: 500, color: "#4169E1", period: 60190 }
];

let animationSpeed = 1;
let isPaused = false;
const container = document.querySelector('.container');

function createStars() {
    for (let i=0; i<200; i++){
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random()*100 + '%';
        star.style.top = Math.random()*100 + '%';
        const size = Math.random()*2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = Math.random()*0.7 + 0.3;
        container.appendChild(star);
    }
}

function animateStars(){
    document.querySelectorAll('.star').forEach(star=>{
        star.style.opacity = 0.3 + Math.random()*0.7;
    });
    requestAnimationFrame(animateStars);
}

function createSolarSystem(){
    planets.forEach(planet=>{
        const orbit = document.createElement('div');
        orbit.classList.add('orbit');
        orbit.style.width = `${planet.distance*2}px`;
        orbit.style.height = `${planet.distance*2}px`;
        container.appendChild(orbit);

        const planetEl = document.createElement('div');
        planetEl.classList.add('planet');
        planetEl.style.width = `${planet.radius*2}px`;
        planetEl.style.height = `${planet.radius*2}px`;
        planetEl.style.backgroundColor = planet.color;

        const label = document.createElement('div');
        label.classList.add('planet-label');
        label.textContent = planet.name;
        planetEl.appendChild(label);

        planetEl.addEventListener('click', () => {
            alert(`${planet.name}\nOrbital Period: ${planet.period} Earth days\nDistance from Sun: ${planet.distance} million km`);
        });

        container.appendChild(planetEl);
    });
}

function animateSolarSystem(){
    const time = Date.now()*0.001*animationSpeed;

    planets.forEach((planet,index)=>{
        const planetEl = document.querySelectorAll('.planet')[index];
        if(!isPaused){
            const angle = (time / (planet.period / 50)) % (2*Math.PI);
            const x = Math.cos(angle)*planet.distance;
            const y = Math.sin(angle)*planet.distance;
            planetEl.style.transform = `translate(${x}px, ${y}px)`;
        }
        const label = planetEl.querySelector('.planet-label');
        label.style.transform = `translate(-50%, -${planet.radius+15}px)`;
    });

    requestAnimationFrame(animateSolarSystem);
}

function init(){
    createStars();
    createSolarSystem();
    animateSolarSystem();
    animateStars();

    document.getElementById('speedUp').addEventListener('click', ()=>{animationSpeed*=1.5;});
    document.getElementById('speedDown').addEventListener('click', ()=>{animationSpeed/=1.5;});
    document.getElementById('pauseResume').addEventListener('click', ()=>{
        isPaused = !isPaused;
        document.getElementById('pauseResume').textContent = isPaused ? 'Resume' : 'Pause';
    });
}

window.addEventListener('load', init);