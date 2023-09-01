document.addEventListener('DOMContentLoaded', (event) => {
  console.log('File Explorer DOMContentLoaded');
  const { ipcRenderer } = require('electron');

  // Initialize DOM elements
  const explorerContent = document.getElementById('explorer-content');

  // Validate if DOM elements exist
  if (!explorerContent) {
      console.error('Essential DOM elements not found.');
      return;
  }

  ipcRenderer.on('update-file-list', (event, files) => {
      console.log('Received file list:', files);
      explorerContent.innerHTML = '';

      // Add new file list
      files.forEach((file) => {
          const fileElement = document.createElement('div');
          fileElement.textContent = file;
          fileElement.style.color = 'white';  // You can change this based on file type
          fileElement.addEventListener('click', () => {
              console.log(`File clicked: ${file}`);
              // Handle file click, e.g., open file in editor
          });
          explorerContent.appendChild(fileElement);
      });
  });
});
