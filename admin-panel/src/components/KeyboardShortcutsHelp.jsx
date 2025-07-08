import React, { useState, useEffect } from 'react';
import { X, Keyboard, Command } from 'lucide-react';
import { keyboardShortcuts } from '../hooks/useKeyboardShortcuts';

function ShortcutKey({ keys }) {
  return (
    <div className="flex items-center gap-1">
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
            {key === '⌘' ? (
              <Command size={12} />
            ) : (
              key
            )}
          </kbd>
          {index < keys.length - 1 && (
            <span className="text-gray-400">+</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ShortcutCategory({ category, shortcuts }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
        {category}
      </h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">{shortcut.description}</span>
            <ShortcutKey keys={shortcut.keys} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleShowShortcuts = () => {
      setIsOpen(true);
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('showShortcutsHelp', handleShowShortcuts);
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('showShortcutsHelp', handleShowShortcuts);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Keyboard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h2>
                <p className="text-sm text-gray-500">Boost your productivity with these shortcuts</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyboardShortcuts.map((category) => (
                <ShortcutCategory
                  key={category.category}
                  category={category.category}
                  shortcuts={category.shortcuts}
                />
              ))}
            </div>

            {/* Tips */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Pro Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use ⌘ on Mac or Ctrl on Windows/Linux</li>
                <li>• Shortcuts work from any page except when typing in inputs</li>
                <li>• Press ? anywhere to see this help again</li>
                <li>• Some shortcuts may vary based on your current page</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd> to close
              </span>
              <span className="text-gray-500">
                PLP Admin Panel v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}