import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightToBracket,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { USERS } from "../data/users";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

interface LoginProps {
  onLogin: (name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { theme } = useTheme();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const login = name.trim().toLowerCase();
    if (!USERS.includes(login) || pin.trim().toLowerCase() !== login) {
      setError("Login yoki parol noto'g'ri!");
      return;
    }
    onLogin(login);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-bg-light dark:bg-bg-dark">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="grid-overlay absolute inset-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="bg-white dark:bg-panel-dark border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-2xl p-8 md:p-10 text-center">
          {/* Profile Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-slate-900 dark:bg-brand rounded-full flex items-center justify-center text-white shadow-lg">
              <FontAwesomeIcon icon={faUser} className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-montserrat">
            O'quvchi kirish
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
            Testlarni topshirish uchun login va parolingizni kiriting
          </p>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="w-3.5 h-3.5 shrink-0"
                />{" "}
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 ml-1">
                Login
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Loginni kiriting"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-brand outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 ml-1">
                Parol
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Parolni kiriting"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-brand outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 dark:bg-brand hover:bg-slate-800 dark:hover:bg-brand-dark text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <FontAwesomeIcon icon={faRightToBracket} className="w-5 h-5" />
              Kirish
            </button>
          </form>

          <p className="mt-8 text-slate-400 dark:text-slate-500 text-xs">
            Muammo bo'lsa, maktabingiz ma'muriga murojaat qiling
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
