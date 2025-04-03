import React, { forwardRef } from "react";
import Search from "../../assets/icon/search";

interface CustomSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomSearch = forwardRef<HTMLInputElement, CustomSearchProps>(
  ({ value, onChange, placeholder = "Search", className = "" }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search width={20} height={20} className="text-gray-400" />
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full sm:w-[140px] h-[32px] pl-14 pr-3 text-[12px] border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
);

CustomSearch.displayName = "CustomSearch";

export default CustomSearch;
