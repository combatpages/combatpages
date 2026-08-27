const routes = {
  '/': 'view-home',
  '/visits': 'view-visits',
  '/gyms': 'view-gyms',
  '/journal': 'view-journal'
};

const errorBar = document.getElementById('error-bar');
const section_view_gyms = document.querySelector("section#view-gyms");
const section_view_visits = document.querySelector("section#view-visits");
[section_view_gyms, section_view_visits].forEach(each_section => {
  if (each_section) {
    const jsonInput = each_section.querySelector('.json-input');
    each_section.querySelector("button.fetch_btn")?.addEventListener("click", fetch_json);
    each_section.querySelector("button.format_btn")?.addEventListener("click", format_json);
    each_section.querySelector("button.copy_btn")?.addEventListener("click", copy_json);
    each_section.querySelector("button.save_btn")?.addEventListener("click", save_json);
    each_section.querySelector("button.load_btn")?.addEventListener("click", load_json);
    each_section.querySelector("textarea.json-input")?.addEventListener("input", handleInput);
  }
})

function showError(msg) {
  if (msg) {
    errorBar.textContent = msg;
    errorBar.style.display = 'block';
  } else {
    errorBar.style.display = 'none';
  }
}

async function fetch_json(e) {
  try {
    const data_file = e.target.dataset['file'];
    const closest_section = e.target.closest("section");
    if (closest_section) {
      const json_editor = closest_section.querySelector(".json-input");

      const response = await fetch(data_file);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      json_editor.value = JSON.stringify(data, null, 2);
    }
  } catch (error) {
    console.error("Failed to load json data:", error);
  }
}

function format_json(e) {
  try {
    const closest_section = e.target.closest("section");
    if (closest_section) {
      const json_editor = closest_section.querySelector(".json-input");
      const parsed = JSON.parse(json_editor.value);
      json_editor.value = JSON.stringify(parsed, null, 2);
      showError(null);
    }
  } catch (e) {
    showError("Cannot format invalid JSON.");
  }
}

async function copy_json(e) {
  try {
    const btn = e.target;
    const closest_section = e.target.closest("section");
    if (closest_section) {
      const json_editor = closest_section.querySelector(".json-input");
      await navigator.clipboard.writeText(json_editor.value);

      // Provide quick visual feedback
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }

  } catch (err) {
    console.error('Failed to copy JSON: ', err);
    alert('Failed to copy text to clipboard.');
  }
}

function save_json(e) {
  try {
    const btn = e.target;
    const filename = btn.dataset['file'] || 'data.json';
    const closest_section = e.target.closest("section");
    const json_editor = closest_section.querySelector(".json-input");
    const parsed = JSON.parse(json_editor.value);
    const content = JSON.stringify(parsed, null, 2);
    const blob = new Blob([content], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", url);
    downloadAnchor.setAttribute("download", filename);

    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (e) {
    showError("Fix JSON errors before exporting.");
  }
}

function handleInput(e) {
  try {
    const closest_section = e.target.closest("section");
    const json_editor = closest_section.querySelector(".json-input");
    JSON.parse(json_editor.value);
    showError(null);
  } catch (e) {
    showError("Invalid JSON: " + e.message);
  }
}

async function load_json(e) {
  const event = e;
  const closest_section = e.target.closest("section");
  const json_editor = closest_section.querySelector(".json-input");
  if ('showOpenFilePicker' in window) {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [{ description: 'JSON Files', accept: { 'application/json': ['.json'] } }]
      });
      const file = await fileHandle.getFile();
      json_editor.value = await file.text();
      handleInput(e);
    } catch (err) { }
  } else {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = ev => {
        json_editor.value = ev.target.result;
        handleInput(event);
      };
      reader.readAsText(file);
    };
    input.click();
  }
}

// Register external service worker
if ('serviceWorker' in navigator) {
  //navigator.serviceWorker.register('sw.js');
}

let deferredPrompt;
const installBtn = document.getElementById('install-btn');
if (installBtn) {
  // Capture the install prompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install button in your UI
    installBtn.style.display = 'inline-block';
  });

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (isIOS && !isStandalone) {
    installBtn.style.display = 'inline-block';
  }


  // Handle the install button click
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    // Show the native browser install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Clear the deferred prompt variable since it can only be used once
    deferredPrompt = null;

    // Hide the button regardless of outcome
    installBtn.style.display = 'none';
  });

  // Hide button if the app is already installed/launched as a standalone PWA
  window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
    deferredPrompt = null;
  });
}

document.getElementById('addGymBtn').addEventListener('click', () => {
  const codeInput = document.getElementById('gymCode');
  const nameInput = document.getElementById('gymName');
  const locationInput = document.getElementById('gymLocation');
  const websiteInput = document.getElementById('gymWebsite');
  const instaInput = document.getElementById('gymIG');
  const classesInput = document.getElementById('gymClasses');

  const code = codeInput.value.trim();
  const name = nameInput.value.trim();

  if (!code || !name) {
    alert('Please provide at least a Code and a Name.');
    return;
  }

  // Get the textarea editor reference (adjust selector if using an ID)
  const jsonEditor = document.querySelector('textarea');

  let currentData = {};
  let updatedData = {};
  try {
    currentData = JSON.parse(jsonEditor.value || '{}');
  } catch (err) {
    alert('The RAW JSON EDITOR currently contains invalid JSON. Please fix it before adding.');
    return;
  }

  // Define the new gym object
  const newGym = {
    [code]: {
      name: name,
      location: locationInput.value.trim(),
      website: websiteInput.value.trim(),
      instagram: instaInput.value.trim(),
      classes: classesInput.value.trim()
    }
  };

  if (currentData[code]) {
    currentData[code] = newGym[code];
    updatedData = currentData;
  }
  else {
    updatedData = {
      ...newGym,
      ...currentData
    };
  }

  // Update editor value formatted with 2 spaces
  jsonEditor.value = JSON.stringify(updatedData, null, 2);
  autosave_gym_edits();

  // Clear inputs after successful add
  codeInput.value = '';
  nameInput.value = '';
  locationInput.value = '';
  websiteInput.value = '';
  instaInput.value = '';
  classesInput.value = '';
});

function fetchGymByCode() {
  const codeInput = document.getElementById('gymCode');
  const code = codeInput ? codeInput.value.trim() : '';

  if (!code) {
    alert('Please enter a gym code.');
    return;
  }

  // Get raw JSON text from your editor textarea/element
  const jsonEditor = document.querySelector('section#view-gyms .json-input');
  
  if (!jsonEditor || !jsonEditor.value) {
    alert('JSON data is empty or editor not found.');
    return;
  }

  try {
    const gymsData = JSON.parse(jsonEditor.value);
    const gym = gymsData[code];

    if (!gym) {
      alert(`No gym found for code: ${code}`);
      return;
    }

    // Populate the form fields with matched gym details
    if (document.getElementById('gymName')) document.getElementById('gymName').value = gym.name || '';
    if (document.getElementById('gymLocation')) document.getElementById('gymLocation').value = gym.location || '';
    if (document.getElementById('gymWebsite')) document.getElementById('gymWebsite').value = gym.website || '';
    if (document.getElementById('gymIG')) document.getElementById('gymIG').value = gym.instagram || '';
    if (document.getElementById('gymClasses')) document.getElementById('gymClasses').value = gym.classes || '';

  } catch (error) {
    alert('Failed to parse JSON data. Please ensure the RAW JSON EDITOR contains valid JSON.');
    console.error(error);
  }
}

function autoload_gym_edits(){
  const STORAGE_KEY = 'gym_editor_autosave_draft';
  const textarea = document.getElementById('gym_editor');
  //Sanity check
  if (!textarea) return;

  // Restore saved content on page load if present
  const savedContent = localStorage.getItem(STORAGE_KEY);
  if (savedContent !== null) {
    textarea.value = savedContent;
  }
}
function autosave_gym_edits(){
  const STORAGE_KEY = 'gym_editor_autosave_draft';
  const textarea = document.getElementById('gym_editor');
  //Sanity check
  if (!textarea) return;
  
  localStorage.setItem(STORAGE_KEY, textarea.value);
}

(function () {
  autoload_gym_edits()
  const textarea = document.getElementById('gym_editor');
  textarea.addEventListener('input', autosave_gym_edits);
  textarea.addEventListener('change', autosave_gym_edits);
})();