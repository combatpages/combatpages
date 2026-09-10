<template>
  <section id="view-gyms" class="page-view">
      <div id="error-bar" class="error-bar"></div>
      <h3>Add New Gym</h3>
      <div class="panel">
        <!-- Form to Add / Edit Gym Entry -->
        <div class="gym-form-container">
          
          <form id="gymForm">
            <div class="form-row">
              <label for="gymCode">Code</label>
              <div style="display: flex; gap: 8px; width: 100%">
                <input type="text" id="gymCode" required />
                <button type="button" id="fetch-gym-btn" @click="fetchGymByCode()">Get</button>
              </div>
            </div>
            <div class="form-row">
              <label for="gymName">Name</label>
              <input type="text" id="gymName" required />
            </div>
            <div class="form-row">
              <label for="gymLocation">Location</label>
              <input type="text" id="gymLocation" />
            </div>
            <div class="form-row">
              <label for="gymWebsite">Website</label>
              <input type="url" id="gymWebsite" />
            </div>
            <div class="form-row">
              <label for="gymIG">Instagram</label>
              <input type="text" id="gymIG" />
            </div>
            <div class="form-row">
              <label for="gymClasses">Classes</label>
              <input type="text" id="gymClasses"/>
            </div>
            <div class="form-row button-row">
              <button type="button" id="addGymBtn" @click="add_gym">Add</button>
            </div>
          </form>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">Raw JSON Editor</div>
        <div class="editor-actions button-group">
          <button type="button" class="fetch_btn" data-file="../gyms.json" @click="fetch_json">Fetch JSON</button>
          <button type="button" class="format_btn" @click="format_json">Format</button>
          <button type="button" class="copy_btn" @click="copy_json">Copy to Clipboard</button>
          <button type="button" class="save_btn" data-file="gyms.json" @click="save_json">Save</button>
          <button type="button" class="load_btn" @click="load_json">Load</button>
        </div>
        <textarea id="gym_editor" class="json-input" placeholder="Paste or type JSON here..." @change="autosave_gym_edits" @input="autosave_gym_edits"></textarea>
      </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted( () => {
  autoload_gym_edits();
});
import gymsData from '../data/gyms.json';

async function fetch_json(e) {

  try {
    const data_file = e.target.dataset['file'];
    const closest_section = e.target.closest("section");
    if (closest_section) {
      const json_editor = closest_section.querySelector(".json-input");
/*
      const response = await fetch(data_file);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
*/
      const data = gymsData;
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
  console.log(e);
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
        handleInput(e);
      };
      reader.readAsText(file);
    };
    input.click();
  }
}

function add_gym() {
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
}

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


function showError(msg) {
  if (msg) {
    errorBar.textContent = msg;
    errorBar.style.display = 'block';
  } else {
    errorBar.style.display = 'none';
  }
}

</script>

<style scoped>


    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    body { background: var(--editor_bg); color: var(--editor_text); display: flex; flex-direction: column;  }
    
    header {
      background: var(--editor_card);
      padding: 0.75rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--editor_border);
    }
    header h1 { font-size: 1.25rem; font-weight: 600; color: var(--editor_accent); }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header_left {
  display: flex;
  align-items: center;
  gap: 12px; /* Adjust spacing between JSON Editor and Install App */
}

.header_right {
  display: flex;
  gap: 8px;
}

    .actions { display: flex; gap: 0.5rem; }
    
    button {
      background: var(--editor_accent);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s;
    }
    button:hover { background: var(--editor_accent-hover); }
    button.outline { background: transparent; border: 1px solid var(--editor_border); color: var(--editor_text); }
    button.outline:hover { background: var(--editor_border); }

    main { display: flex; flex: 1;  flex-direction: column}
    
    .panel { flex: 1; display: flex; flex-direction: column; padding: 1rem; gap: 0.5rem; }
    .panel-header { font-size: 0.875rem; color: var(--editor_text-muted); text-transform: uppercase; tracking: 0.05em; }

    textarea {
      width: 100%;
      min-height: 400px;
      flex: 1;
      background: var(--editor_card);
      color: #38bdf8;
      border: 1px solid var(--editor_border);
      border-radius: 8px;
      padding: 1rem;
      font-family: monospace;
      font-size: 0.9rem;
      resize: none;
      outline: none;
    }
    textarea:focus { border-color: var(--editor_accent); }

    .error-bar {
      background: rgba(239, 68, 68, 0.1);
      color: var(--editor_danger);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.85rem;
      display: none;
    }

.gym-form-container {
  max-width: 320px;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

/* Set a fixed width for labels so inputs line up evenly */
.form-row label {
  width: 80px;
  flex-shrink: 0;
  font-weight: bold;
}

/* Force inputs to stretch and fill the remaining horizontal space */
.form-row input {
  flex-grow: 1;
  padding: 4px 6px;
  box-sizing: border-box;
}

.button-row {
  justify-content: flex-start;
  margin-top: 12px;
}

.button-row button {
  margin-left: 80px; /* Aligns button left edge with inputs */
}

.button-group {
  display: flex;
  flex-wrap: wrap; /* Allows buttons to wrap onto the next line smoothly */
  gap: 8px;        /* Adjust this pixel value to increase or decrease space */
  margin-bottom: 12px; /* Adds space above the textarea below */
}

#install-btn {
  display: none;
}
</style>
