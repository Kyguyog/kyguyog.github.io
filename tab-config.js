/* Global Tab Configuration Handler with User Customization */
(function() {
  // Storage key for user preferences
  const STORAGE_KEY = 'kw_tab_config';
  
  // Default configuration
  const DEFAULT_CONFIG = {
    name: "Dashboard",
    icon: "https://instructure-uploads.s3.amazonaws.com/account_29340000000000001/attachments/112692/Screen%20Shot%202018-08-20%20at%206.22.27%20PM.png"
  };

  // Get current page filename
  const getCurrentPageName = () => {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  };

  // Get user's custom configuration from localStorage
  const getUserConfig = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn('Failed to parse tab config from localStorage:', e);
      return null;
    }
  };

  // Save user configuration to localStorage
  const saveUserConfig = (config) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      applyTabConfig(); // Immediately apply changes
      return true;
    } catch (e) {
      console.warn('Failed to save tab config to localStorage:', e);
      return false;
    }
  };

  // Apply tab configuration
  const applyTabConfig = () => {
    const userConfig = getUserConfig();
    
    // Use user's custom config if available, otherwise use defaults
    const tabName = userConfig?.name || DEFAULT_CONFIG.name;
    const tabIcon = userConfig?.icon || DEFAULT_CONFIG.icon;

    // Update document title
    document.title = tabName;

    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
      favicon.href = tabIcon;
    } else {
      // Create favicon link if it doesn't exist
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = tabIcon;
      document.head.appendChild(link);
    }
  };

  // Expose functions globally for UI interaction
  window.getTabConfig = getUserConfig;
  window.setTabConfig = saveUserConfig;
  window.resetTabConfig = () => {
    localStorage.removeItem(STORAGE_KEY);
    applyTabConfig();
  };

  // Apply config when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTabConfig);
  } else {
    applyTabConfig();
  }
})();
