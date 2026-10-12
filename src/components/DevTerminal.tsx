import React, { useState, useRef, useEffect } from 'react';
import {Terminal, X} from "lucide-react";
import { projectsData } from '../data/portfolioData';

interface DevTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme?: (mode?: 'dark' | 'light') => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const DevTerminal: React.FC<DevTerminalProps> = ({ isOpen, onClose, onToggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'welcome',
      output: (
        <div>
          <p style={{ color: 'var(--accent-cyan)' }}>🚀 Mohamed Ahmed (Ma16q) Developer Terminal [v2.4.0]</p>
          <p style={{ color: 'var(--text-muted)' }}>Type <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>help</span> to view available system commands.</p>
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let output: React.ReactNode;

    switch (lower) {
      case 'help':
        output = (
          <div style={{ lineHeight: 1.7 }}>
            <p style={{ color: 'var(--accent-cyan)' }}>Available Commands:</p>
            <p>• <span style={{ color: '#38bdf8' }}>projects</span> : List all published and open-source projects</p>
            <p>• <span style={{ color: '#38bdf8' }}>skills</span> : Display technical engineering stack</p>
            <p>• <span style={{ color: '#38bdf8' }}>play</span> : View Android applications published on Google Play</p>
            <p>• <span style={{ color: '#38bdf8' }}>bio</span> : About Mohamed Ahmed (IAU & Industr-iathon)</p>
            <p>• <span style={{ color: '#38bdf8' }}>theme light</span> / <span style={{ color: '#38bdf8' }}>theme dark</span> : Toggle website color theme</p>
            <p>• <span style={{ color: '#38bdf8' }}>clear</span> : Clear terminal output</p>
            <p>• <span style={{ color: '#38bdf8' }}>exit</span> : Close developer terminal</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div>
            <p style={{ color: 'var(--accent-cyan)' }}>⚡ Projects Directory:</p>
            {projectsData.map((p) => (
              <p key={p.id} style={{ margin: '0.2rem 0' }}>
                • <strong style={{ color: '#f8fafc' }}>{p.title}</strong> — <span style={{ color: 'var(--text-muted)' }}>{p.summary.slice(0, 75)}...</span>
              </p>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div>
            <p style={{ color: 'var(--accent-cyan)' }}>🛠️ Technical Skills:</p>
            <p>• Languages: Python, Java, TypeScript, JavaScript, HTML5/CSS3</p>
            <p>• Mobile: Android Studio (Java SDK), Flutter (Learning)</p>
            <p>• 3D & Graphics: Three.js, WebGL, GLTF/DRACO Pipelines</p>
            <p>• Tools: Git & GitHub, VS Code, Google Cloud Platform (GCP)</p>
          </div>
        );
        break;

      case 'play':
        output = (
          <div>
            <p style={{ color: '#10b981' }}>📱 Published Google Play Apps:</p>
            <p>1. <strong>مستحبات السنن</strong> (Sunnah Habits Tracker)</p>
            <p>2. <strong>مسبحتي</strong> (Digital Tasbih Ring Simulator)</p>
          </div>
        );
        break;

      case 'bio':
        output = (
          <div>
            <p>Student at <strong>Imam Abdulrahman Bin Faisal University (IAU)</strong>, Eastern Province, Saudi Arabia.</p>
            <p>Participant in <strong>Industr-iathon</strong> (Advanced Tech Track with ISE Club).</p>
          </div>
        );
        break;

      case 'theme dark':
        if (onToggleTheme) onToggleTheme('dark');
        output = <p style={{ color: '#38bdf8' }}>Theme switched to Dark Mode 🌙</p>;
        break;

      case 'theme light':
        if (onToggleTheme) onToggleTheme('light');
        output = <p style={{ color: '#f59e0b' }}>Theme switched to Light Mode ☀️</p>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        output = (
          <p style={{ color: '#ef4444' }}>
            Command not recognized: "{cmd}". Type <span style={{ color: '#f59e0b' }}>help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog">
      <div className="terminal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Titlebar */}
        <div className="terminal-titlebar">
          <div className="terminal-controls">
            <span className="term-dot dot-red" onClick={onClose} title="Close"></span>
            <span className="term-dot dot-yellow" title="Minimize"></span>
            <span className="term-dot dot-green" title="Maximize"></span>
          </div>
          <div className="terminal-title">
            <Terminal size={14} style={{ color: 'var(--accent-cyan)' }} />
            <span>bash - mohamed@iau-workstation:~</span>
          </div>
          <button type="button" className="term-close-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                <span>➜</span>
                <span style={{ color: '#818cf8' }}>~</span>
                <strong style={{ color: '#f8fafc' }}>{item.command}</strong>
              </div>
              <div style={{ marginTop: '0.25rem', paddingLeft: '1rem', color: '#cbd5e1' }}>
                {item.output}
              </div>
            </div>
          ))}

          {/* Prompt line */}
          <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--accent-cyan)' }}>➜</span>
            <span style={{ color: '#818cf8' }}>~</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="terminal-input"
              placeholder="type 'help', 'projects', 'theme light'..."
              autoFocus
            />
            <button type="submit" style={{ display: 'none' }}></button>
          </form>
          <div ref={bottomRef}></div>
        </div>
      </div>
    </div>
  );
};
