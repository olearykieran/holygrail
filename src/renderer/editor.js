const { ipcRenderer } = require('electron');

ipcRenderer.on('get-app-path', (event, appPath) => {
    try {
      const acePath = require.resolve('ace-builds/src-noconflict/ace');
      console.log("Ace path:", acePath);
      const ace = require('ace-builds/src-noconflict/ace');
      require('ace-builds/src-noconflict/theme-monokai');
      require('ace-builds/src-noconflict/mode-javascript');
      console.log("Ace loaded:", ace);
  
      // Set the path for Ace's worker files
      ace.config.set('basePath', appPath + '/node_modules/ace-builds/src-noconflict');
  
      const editor = ace.edit('editor');
      editor.setTheme('ace/theme/monokai');
      editor.session.setMode('ace/mode/javascript');
    } catch (error) {
      console.error("Error:", error);
    }
  });
  
