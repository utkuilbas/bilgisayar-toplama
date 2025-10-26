import { BasePart } from "@/types/parts"
import {ElementType} from "react"

interface PartCategoryProps {
    IconComponent: ElementType
    title: string
    selectedPart: BasePart | null
    onSelectClick: () => void
    disabled?: boolean
}


export default function PartCategory({ IconComponent, title, selectedPart, onSelectClick, disabled = false }: PartCategoryProps) {
    return (
        <div className={`modern-card flex items-center justify-between transition-all duration-300 ${disabled ? 'opacity-50' : ''}`}
            style={{
                background: disabled ? 'linear-gradient(90deg, #e0e7ff 0%, #f6f7fb 100%)' : 'var(--surface)',
                boxShadow: disabled ? 'none' : 'var(--card-shadow)',
            }}
        >
            <div className="flex items-center gap-5">
                <div className={`rounded-xl p-2 ${disabled ? 'bg-gray-200' : 'bg-gradient-to-br from-primary to-accent'}`}>
                    <IconComponent className={`h-9 w-9 text-white drop-shadow`} />
                </div>
                <div>
                    <h3 className={`modern-title text-xl mb-1 ${disabled ? 'text-text-secondary' : ''}`}>{title}</h3>
                    {selectedPart ? (
                        <p className="modern-subtitle text-accent font-semibold">{selectedPart.ad}</p>
                    ) : (
                        <p className="modern-subtitle">Seçim yapılmadı</p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-6">
                {selectedPart && (
                    <p className="hidden sm:block text-lg font-bold text-primary tracking-tight">{selectedPart.fiyat_try.toLocaleString()} TL</p>
                )}
                <button
                    onClick={onSelectClick}
                    disabled={disabled}
                    className={`modern-btn ${!selectedPart ? 'modern-accent' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                    style={{ minWidth: '90px' }}
                >
                    {selectedPart ? 'Değiştir' : 'Seç'}
                </button>
            </div>
        </div>
    );
}