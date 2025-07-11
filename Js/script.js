//© Zero - Código libre no comercial

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() { //seguidores
  let text = getURLParam('text');
  if (!text) {
    text = `Para Silvana Teletubi:\n\nYa estás por terminar el ciclo… y no cualquier ciclo, sino *tu primer ciclo*.\n\n¿Entiendes lo que eso significa? Has logrado superar cada desafío y obstáculo que se te presentó en el camino.\n\nQuizás aún no confíes del todo en ti misma, pero créeme: todavía no te das cuenta del enorme potencial que llevas dentro. Eres mucho más capaz de lo que imaginas.\n\nTe he visto esforzarte, luchar contra las dudas… y aún así, seguir. Y eso no lo hace cualquiera.\n\nMe enorgullece tanto ver lo lejos que has llegado, y aún más, saber que esto es solo el comienzo. Tienes un camino brillante por delante, y no tengo duda de que lo recorrerás con esa mezcla única de ternura, fuerza y perseverancia que te caracteriza.\n\nSigue creyendo en ti, incluso en los días difíciles. Espero que te vaya bien en tus exposiciones y finales.\n\nAtentamente,\nAnthony pues, quien mas xd`;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }

  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      setTimeout(showSignature, 600);
    }
  }
  type();
}

// Firma manuscrita animada
function showSignature() {
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
}

// Controlador de objetos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }
  spawn();
}

// Cuenta regresiva o fecha especial
function showCountdown() {
  const container = document.getElementById('countdown');
  let startParam = getURLParam('start');
  let eventParam = getURLParam('event');
  let startDate = startParam ? new Date(startParam + 'T00:00:00') : new Date('2024-08-03T00:00:00');
  let eventDate = eventParam ? new Date(eventParam + 'T00:00:00') : new Date('2025-08-03T00:00:00');

  function update() {
    const now = new Date();
    let diff = now - startDate;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let eventDiff = eventDate - now;
    let eventDays = Math.max(0, Math.floor(eventDiff / (1000 * 60 * 60 * 24)));
    let eventHours = Math.max(0, Math.floor((eventDiff / (1000 * 60 * 60)) % 24));
    let eventMinutes = Math.max(0, Math.floor((eventDiff / (1000 * 60)) % 60));
    let eventSeconds = Math.max(0, Math.floor((eventDiff / 1000) % 60));

    container.innerHTML =
      `Llevamos juntos: <b>${days}</b> días<br>` +
      `Nuestro aniversario: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b>`;
    container.classList.add('visible');
  }
  update();
  setInterval(update, 1000);
}

// --- Música de fondo ---
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  let musicaParam = getURLParam('musica');
  if (musicaParam) {
    musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .\-]/g, '');
    audio.src = 'Music/' + musicaParam;
  }

  let youtubeParam = getURLParam('youtube');
  if (youtubeParam) {
    let helpMsg = document.getElementById('yt-help-msg');
    if (!helpMsg) {
      helpMsg = document.createElement('div');
      helpMsg.id = 'yt-help-msg';
      helpMsg.style.position = 'fixed';
      helpMsg.style.right = '18px';
      helpMsg.style.bottom = '180px';
      helpMsg.style.background = 'rgba(255,255,255,0.95)';
      helpMsg.style.color = '#e60026';
      helpMsg.style.padding = '10px 16px';
      helpMsg.style.borderRadius = '12px';
      helpMsg.style.boxShadow = '0 2px 8px #e6002633';
      helpMsg.style.fontSize = '1.05em';
      helpMsg.style.zIndex = 100;
      helpMsg.innerHTML = 'Para usar música de YouTube, descarga el audio (por ejemplo, usando y2mate, 4K Video Downloader, etc.), colócalo en la carpeta <b>Music</b> y usa la URL así:<br><br><code>?musica=nombre.mp3</code>';
      document.body.appendChild(helpMsg);
      setTimeout(() => { if (helpMsg) helpMsg.remove(); }, 15000);
    }
  }

  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = '🔊 Música';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.style.background = 'rgba(255,255,255,0.85)';
    btn.style.border = 'none';
    btn.style.borderRadius = '24px';
    btn.style.padding = '10px 18px';
    btn.style.fontSize = '1.1em';
    btn.style.cursor = 'pointer';
    document.body.appendChild(btn);
  }
  audio.volume = 0.7;
  audio.loop = true;
  audio.play().then(() => {
    btn.textContent = '🔊 Música';
  }).catch(() => {
    btn.textContent = '▶️ Música';
  });
  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊 Música';
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };
}
window.addEventListener('DOMContentLoaded', () => {
  // Mostrar el loader durante 3 segundos
  setTimeout(() => {
    const loader = document.getElementById('loader');

    // ❗ Verificar si el ancho de pantalla es mayor a 1000px
    if (window.innerWidth > 1000) {
      // Detener todo, dejar solo el loader visible
      loader.classList.remove('fade-out');
      loader.style.opacity = '1';
      loader.innerHTML = '<p style="color: black; font-size: 1.2em; text-align: center;">Este contenido solo está disponible en pantallas pequeñas 📱</p>';
      return; // ❌ No continuar con el resto del programa
    }

    // Continuar con el fade-out y cargar el contenido normalmente
    loader.classList.add('fade-out');

    // Esperar a que termine la transición y luego quitarlo
    setTimeout(() => {
      loader.remove();

      // Iniciar todo
      showDedicationText();
      startFloatingObjects();
      showCountdown();
      playBackgroundMusic();

    }, 600);

  }, 3000);
});

function showSignature() {
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }

  // Mostrar el modal después de la firma
  setTimeout(() => {
     showMagicModal();
  }, 4000);
}





const magicModal = document.getElementById('magic-modal');
const magicInput = document.getElementById('magic-input');
const magicBtn = document.getElementById('magic-reveal-btn');
const magicCountdown = document.getElementById('magic-countdown');
const magicResult = document.getElementById('magic-result');
const magicContent = magicModal.querySelector('.modal-content');

// Mostrar el modal mágico (llámalo cuando quieras)
function showMagicModal() {
  magicInput.value = '';
  magicCountdown.textContent = '';
  magicResult.textContent = '';
  magicModal.classList.remove('hidden');
}

// Lógica al presionar "Adivinar"
magicBtn.addEventListener('click', () => {
  const value = magicInput.value.trim();
  if (!value || isNaN(value)) {
    magicResult.textContent = "¡Eso no es un número válido!";
    return;
  }

  let countdown = 3;
  magicCountdown.textContent = `Concentrándome en tu mente en... ${countdown}`;
  magicResult.textContent = '';

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      magicCountdown.textContent = `Concentrándome en tu mente en... ${countdown}`;
    } else {
      clearInterval(interval);
      magicCountdown.textContent = '';
      magicResult.textContent = `¡Tu número es: ${value}! JAJAJA`;
    }
  }, 1000);
});

// Cerrar modal si se hace clic fuera del contenido
magicModal.addEventListener('click', (e) => {
  if (!magicContent.contains(e.target)) {
    magicModal.classList.add('hidden');
  }
});