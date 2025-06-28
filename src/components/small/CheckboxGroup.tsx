import { cn } from "@/lib/cn";
import React from "react";

interface Option {
    label: string;
    value: string;
}

interface CheckboxGroupProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    label?: string;
    error?: string;
    selectAllLabel?: string;
    optionClass?: string;
    checkboxClass?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    options,
    value,
    onChange,
    label,
    error,
    selectAllLabel,
    optionClass = "",
    checkboxClass = "",
}) => {
    const allSelected = value.length === options.length && options.length > 0;

    return (
        <div>
            {label && <label className="block text-gray-700 font-bold mb-1">{label}</label>}
            {selectAllLabel && <div className="flex items-center mb-2">
                <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => onChange(allSelected ? [] : options.map(o => o.value))}
                    className="mr-2 accent-green-600"
                />
                <span className="text-sm">{selectAllLabel}</span>
            </div>}
            <div className={cn("grid grid-cols-2 gap-2 max-h-40 overflow-y-auto", optionClass)}>
                {options.map((opt) => {
                    const checked = value.includes(opt.value);
                    return (
                        <label
                            key={opt.value}
                            className={cn(
                                "flex items-center text-gray-700 border text-xs md:text-sm rounded px-2 py-1 transition-colors duration-150 cursor-pointer",
                                checked ? "border-green-600 bg-green-50" : "border-gray-200"
                            )}
                        >
                            <input
                                type="checkbox"
                                value={opt.value}
                                checked={checked}
                                onChange={() =>
                                    checked
                                        ? onChange(value.filter((v) => v !== opt.value))
                                        : onChange([...value, opt.value])
                                }
                                className={cn("mr-2 accent-green-600 cursor-pointer", checkboxClass)}
                            />
                            {opt.label}
                        </label>
                    );
                })}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default CheckboxGroup;
