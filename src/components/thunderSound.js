const thunderAudio = new Audio("/sounds/thunder.mp3");
thunderAudio.volume = 0.8;

export function playThunder() {
  thunderAudio.currentTime = 0;
  thunderAudio.play().catch((e) => {
    console.warn("Trueno bloqueado por autoplay:", e.message);
  });
}
