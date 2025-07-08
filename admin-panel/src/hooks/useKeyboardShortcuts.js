import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  const handleKeyboardShortcut = useCallback((event) => {
    // Only trigger shortcuts when not typing in input fields
    if (
      event.target.tagName === 'INPUT' || 
      event.target.tagName === 'TEXTAREA' || 
      event.target.contentEditable === 'true'
    ) {
      return;
    }

    // Check for modifier keys (Cmd on Mac, Ctrl on PC)
    const isModifierPressed = event.metaKey || event.ctrlKey;
    const isShiftPressed = event.shiftKey;

    // Global shortcuts with modifier keys
    if (isModifierPressed) {
      switch (event.key.toLowerCase()) {
        case 'k':
          // Search shortcut (already handled in GlobalSearch component)
          event.preventDefault();
          break;
        
        case '1':
          event.preventDefault();
          navigate('/dashboard');
          break;
        
        case '2':
          event.preventDefault();
          navigate('/users');
          break;
        
        case '3':
          event.preventDefault();
          navigate('/events');
          break;
        
        case '4':
          event.preventDefault();
          navigate('/campaigns');
          break;
        
        case '5':
          event.preventDefault();
          navigate('/content');
          break;
        
        case '6':
          event.preventDefault();
          navigate('/communications');
          break;
        
        case '7':
          event.preventDefault();
          navigate('/analytics');
          break;
        
        case '8':
          event.preventDefault();
          navigate('/settings');
          break;

        case 'n':
          // New item shortcuts
          event.preventDefault();
          if (isShiftPressed) {
            // Show quick create menu
            showQuickCreateMenu();
          }
          break;

        case 'r':
          // Refresh page
          event.preventDefault();
          window.location.reload();
          break;

        case '/':
          // Focus search
          event.preventDefault();
          focusSearch();
          break;

        default:
          break;
      }
    }

    // Single key shortcuts (without modifiers)
    if (!isModifierPressed && !isShiftPressed) {
      switch (event.key) {
        case '?':
          event.preventDefault();
          showKeyboardShortcutsHelp();
          break;

        case 'Escape':
          // Close modals, clear selections, etc.
          event.preventDefault();
          handleEscape();
          break;

        default:
          break;
      }
    }
  }, [navigate]);

  const showQuickCreateMenu = () => {
    // Dispatch custom event to show quick create menu
    window.dispatchEvent(new CustomEvent('showQuickCreateMenu'));
  };

  const focusSearch = () => {
    // Focus the main search input if available
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
      searchInput.focus();
    }
  };

  const handleEscape = () => {
    // Dispatch custom event to handle escape actions
    window.dispatchEvent(new CustomEvent('escapePressed'));
  };

  const showKeyboardShortcutsHelp = () => {
    // Dispatch custom event to show help modal
    window.dispatchEvent(new CustomEvent('showShortcutsHelp'));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcut);
    
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, [handleKeyboardShortcut]);

  return {
    showQuickCreateMenu,
    showKeyboardShortcutsHelp,
    focusSearch,
    handleEscape
  };
}

// Keyboard shortcut definitions for help display
export const keyboardShortcuts = [
  {
    category: 'Navigation',
    shortcuts: [
      { keys: ['⌘', '1'], description: 'Go to Dashboard' },
      { keys: ['⌘', '2'], description: 'Go to Supporters' },
      { keys: ['⌘', '3'], description: 'Go to Events' },
      { keys: ['⌘', '4'], description: 'Go to Campaigns' },
      { keys: ['⌘', '5'], description: 'Go to Content' },
      { keys: ['⌘', '6'], description: 'Go to Communications' },
      { keys: ['⌘', '7'], description: 'Go to Analytics' },
      { keys: ['⌘', '8'], description: 'Go to Settings' },
    ]
  },
  {
    category: 'Search & Filter',
    shortcuts: [
      { keys: ['⌘', 'K'], description: 'Open global search' },
      { keys: ['⌘', '/'], description: 'Focus page search' },
      { keys: ['⌘', 'F'], description: 'Open advanced filters' },
    ]
  },
  {
    category: 'Actions',
    shortcuts: [
      { keys: ['⌘', 'Shift', 'N'], description: 'Quick create menu' },
      { keys: ['⌘', 'R'], description: 'Refresh page' },
      { keys: ['⌘', 'A'], description: 'Select all' },
      { keys: ['Delete'], description: 'Delete selected items' },
    ]
  },
  {
    category: 'General',
    shortcuts: [
      { keys: ['?'], description: 'Show keyboard shortcuts' },
      { keys: ['Esc'], description: 'Close modal or clear selection' },
    ]
  }
];