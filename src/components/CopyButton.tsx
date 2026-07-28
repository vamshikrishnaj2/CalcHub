import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string | number;
  label?: string;
  className?: string;
}

export default function CopyButton({ value, label = 'Copy', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const textToCopy = typeof value === 'number' ? value.toString() : value;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      title="Copy result to clipboard"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
        copied
          ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
          : 'bg-white/80 dark:bg-zinc-800/80 text-gray-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-zinc-700 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200/60 dark:border-zinc-700/60'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check size={13} className="text-white animate-in zoom-in-50 duration-150" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={13} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
