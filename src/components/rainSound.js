const rainAudio = new Audio("/sounds/rain.mp3");
rainAudio.loop = true;
rainAudio.volume = 0.4;

export function playRain() {
  rainAudio.play().catch(() => {});
}
