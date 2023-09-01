document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Asset Manager DOMContentLoaded');
    const { ipcRenderer } = require('electron');

    // Initialize DOM elements
    const assetList = document.getElementById('asset-list');
    
    // Validate if DOM elements exist
    if (!assetList) {
        console.error('Element with ID "asset-list" not found.');
        return;
    }

    // Asset data (replace with your data structure)
    const assets = [
        'asset1.png',
        'asset2.png',
        'asset3.png'
    ];

    // Load asset list
    function loadAssetList() {
        console.log('Loading asset list.');
        assetList.innerHTML = '';
        assets.forEach((asset) => {
            const assetElement = document.createElement('div');
            assetElement.textContent = asset;
            assetElement.title = "Click to edit or preview";  // Tooltip
            assetElement.addEventListener('click', () => handleAssetClick(asset));
            assetList.appendChild(assetElement);
        });
    }

    // Add new asset
    function addAsset(assetName) {
        console.log(`Adding asset: ${assetName}`);
        assets.push(assetName);
        loadAssetList();
    }

    // Remove asset
    function removeAsset(assetName) {
        console.log(`Removing asset: ${assetName}`);
        const index = assets.indexOf(assetName);
        if (index !== -1) {
            assets.splice(index, 1);
            loadAssetList();
        }
    }

    // Handle asset click
    function handleAssetClick(assetName) {
        console.log(`Asset clicked: ${assetName}`);
        // Implement your logic to open, edit, or preview the asset here
    }

    // Initial load
    loadAssetList();

    // IPC events
    ipcRenderer.on('add-asset', (event, assetName) => {
        addAsset(assetName);
    });

    ipcRenderer.on('remove-asset', (event, assetName) => {
        removeAsset(assetName);
    });
});
