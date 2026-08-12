import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required,
  minLength,
  isPassword,
  rightElement,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-[#7a88a4] text-xs font-semibold uppercase tracking-wider">
          {label}
        </label>
        {rightElement}
      </div>

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7a88a4]">
            <Icon size={18} />
          </div>
        )}

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className={`w-full bg-[#1a2540] border border-[#252f45] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#5c6dff] focus:border-[#5c6dff] block outline-none transition-all placeholder-[#7a88a4]/50 p-3
            ${Icon ? "pl-10" : "pl-3"} 
            ${isPassword ? "pr-10" : "pr-3"}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7a88a4] hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
