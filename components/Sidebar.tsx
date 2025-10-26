import { ElementType } from "react";
import { SelectedParts } from "@/types/parts";

interface CategoryConfig {
    key: string;
    title: string;
    IconComponent: ElementType;
    disabled: boolean;
}

interface SidebarProps {
    categories: CategoryConfig[];
    onCategorySelect: (key: string) => void;
    activeCategoryKey: string | null;
    selectedParts: SelectedParts;
}

export default function Sidebar({ categories, onCategorySelect, activeCategoryKey, selectedParts }: SidebarProps) {
    return (
        <aside className="modern-card flex flex-col gap-4 w-full max-w-[320px] py-10 px-6 items-stretch">
            {categories.map((cat) => {
                const isSelected = !!selectedParts[cat.key as keyof SelectedParts];
                const isActive = activeCategoryKey === cat.key;
                return (
                    <button
                        key={cat.key}
                        onClick={() => {
                            if (!cat.disabled) onCategorySelect(cat.key);
                        }}
                        disabled={cat.disabled}
                        className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 text-left shadow-none border-none modern-category w-full text-lg
                            ${isActive ? "selected ring-2 ring-accent" : ""}
                            ${cat.disabled ? "opacity-40 cursor-not-allowed" : ""}
                        `}
                    >
                        <cat.IconComponent size={28} className="mr-2" />
                        <span className="font-semibold flex-1">{cat.title}</span>
                        {isSelected && <span className="text-accent font-bold text-xl">✓</span>}
                    </button>
                );
            })}
        </aside>
    );
}
