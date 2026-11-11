import React, { useState } from 'react';
import { X, Shield, Lock, User, AlertCircle, ArrowRight, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      // Demo credentials validation
      if (
        (username.trim().toLowerCase() === 'admin' && password === 'barber1luxury') ||
        (username.trim().toLowerCase() === 'marcus' && password === 'barber1luxury') ||
        (username.trim() === 'admin' && password === 'admin')
      ) {
        setLoading(false);
        onLoginSuccess();
        onClose();
      } else {
        setLoading(false);
        setError('Invalid credentials. Please use the demo credentials provided below.');
      }
    }, 400);
  };

  const handleQuickDemoFill = () => {
    setUsername('admin');
    setPassword('barber1luxury');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#141418] border border-[#282833] rounded-xl shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#282833]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#0b0b0e] border border-[#282833] flex items-center justify-center text-[#c5a059]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-white">
                Barber Management Portal
              </h3>
              <span className="text-[11px] text-[#8e8e9c]">Secure Staff & Owner Access</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9e9ea8] hover:text-white rounded hover:bg-[#202028]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-[#9e9ea8] block mb-1">Username / ID</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#71717e] absolute left-3 top-2.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full pl-9 pr-3 py-2 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-white focus:outline-none focus:border-[#c5a059]"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-[#9e9ea8] block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#71717e] absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-[#0b0b0e] border border-[#282833] rounded text-xs text-white focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#c5a059] hover:bg-[#d4af37] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Barber Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Helper Box */}
        <div className="p-3.5 bg-[#0b0b0e] border border-[#282833] rounded-lg text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#c5a059] font-medium flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Demo Login Credentials</span>
            </span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[11px] text-[#c5a059] hover:underline cursor-pointer font-semibold"
            >
              Click to Auto-fill
            </button>
          </div>
          <div className="text-[#8e8e9c] text-[11px] space-y-0.5">
            <div>
              Username: <code className="text-white font-mono bg-[#1b1b22] px-1 rounded">admin</code>
            </div>
            <div>
              Password: <code className="text-white font-mono bg-[#1b1b22] px-1 rounded">barber1luxury</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
