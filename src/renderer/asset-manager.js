(function() {
    const { ipcRenderer } = require('electron');
  
    // Initialize DOM elements
    const assetList = document.getElementById('asset-list');
    const addAssetButton = document.getElementById('add-asset');
    
    // Asset data (you can replace this with your own data structure)
    const assets = [
      'asset1.png',
      'asset2.png',
      'asset3.png'
    ];
    
    // Load asset list
    function loadAssetList() {
      assetList.innerHTML = '';
      assets.forEach((asset) => {
        const assetElement = document.createElement('div');
        assetElement.textContent = asset;
        assetElement.addEventListener('click', () => handleAssetClick(asset));
        assetList.appendChild(assetElement);
      });
    }
  
    // Add new asset
    function addAsset(assetName) {
      assets.push(assetName);
      loadAssetList();
    }
    
    // Remove asset
    function removeAsset(assetName) {
      const index = assets.indexOf(assetName);
      if (index !== -1) {
        assets.splice(index, 1);
        loadAssetList();
      }
    }
    
    // Handle asset click
    function handleAssetClick(assetName) {
      // Implement your logic to open, edit, or preview the asset here
    }
    
    // Load asset list on initialization
    loadAssetList();
    
    // Listen for events to add or remove assets
    ipcRenderer.on('add-asset', (event, assetName) => {
      addAsset(assetName);
    });
    
    ipcRenderer.on('remove-asset', (event, assetName) => {
      removeAsset(assetName);
    });
  })();
  