(function() {
    const { ipcRenderer } = require('electron');
  
    const explorerHeader = document.getElementById('explorer-header');
    const explorerContent = document.getElementById('explorer-content');
    const toggleExplorer = document.getElementById('toggle-explorer');
  
    ipcRenderer.on('update-file-list', (event, files) => {
      console.log('Received file list:', files);
      const fileExplorerDiv = document.getElementById('explorer-content');
  
      // Clear previous file list
      fileExplorerDiv.innerHTML = '';
  
      // Add new file list
      files.forEach((file) => {
        const fileElement = document.createElement('div');
        fileElement.textContent = file;
        fileElement.style.color = 'white';
        fileElement.addEventListener('click', () => {
          // Handle file click, e.g., open file in editor
        });
        fileExplorerDiv.appendChild(fileElement);
      });
    });
})();
