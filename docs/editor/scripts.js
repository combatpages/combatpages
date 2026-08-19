const routes = {
  '/': 'view-home',
  '/visits': 'view-visits',
  '/gyms': 'view-gyms',
  '/journal': 'view-journal'
};

const errorBar = document.getElementById('error-bar');

const section_view_gyms = document.querySelector("section#view-gyms");
const section_view_visits = document.querySelector("section#view-visits");
[section_view_gyms,section_view_visits].forEach(each_section => {
  if (each_section) {
    const jsonInput = each_section.querySelector('.json-input');
    const fetch_btn = each_section.querySelector("button.fetch_btn");
    if (fetch_btn) {
      fetch_btn.addEventListener("click", fetch_json);
    }
    const format_btn = each_section.querySelector("button.format_btn");
    if (format_btn) {
      format_btn.addEventListener("click", format_json);
    }
    const copy_btn = each_section.querySelector("button.copy_btn");
    if (copy_btn) {
      copy_btn.addEventListener("click", copy_json);
    }
    const save_btn = each_section.querySelector("button.save_btn");
    if (save_btn) {
      save_btn.addEventListener("click", save_json);
    }
    const load_btn = each_section.querySelector("button.load_btn");
    if (load_btn) {
      load_btn.addEventListener("click", load_json);
    }
    const json_input = each_section.querySelector("textarea.json-input");
    if (json_input){
      json_input.addEventListener("input",handleInput);
    }
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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(parsed, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
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
      classes: classesInput.value.trim()
    }
  };

  const updatedData = {
    ...newGym,
    ...currentData
  };

  // Update editor value formatted with 2 spaces
  jsonEditor.value = JSON.stringify(updatedData, null, 2);

  // Clear inputs after successful add
  codeInput.value = '';
  nameInput.value = '';
  locationInput.value = '';
  websiteInput.value = '';
  classesInput.value = '';
});

