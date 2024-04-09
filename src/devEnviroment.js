const LOCAL_URL = 'http://localhost:3000/src/main.js';
const REMOTE_URL = 'https://commute-agency.github.io/commute-redesign/dist/main.js';

async function handleUrl(url) {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    if (response.ok) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = url;
      document.head.appendChild(script);
    }
  } catch (error) {
    console.errorp(`Failed to fetch and append script from ${url}:`, error);
    throw error;
  }
}

async function initDevEnvironment() {
  try {
    await handleUrl(LOCAL_URL);
  } catch (error) {
    await handleUrl(REMOTE_URL);
  }
}

initDevEnvironment();