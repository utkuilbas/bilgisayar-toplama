"use client";

import { BasePart } from "@/types/parts";
import { useState, useMemo } from "react";
import { ArrowLeft } from 'lucide-react';

interface PartListProps<T extends BasePart> {
    title: string;
    options: T[];
    onSelect: (part: T) => void;
    onClose: () => void;
    maxHeight?: string;
    compatibilityCheck?: (part: T) => { compatible: boolean; message?: string };
}


export default function PartList<T extends BasePart>({ title, options, onSelect, onClose, maxHeight = "540px" }: PartListProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options;
        return options.filter(option => option.ad.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [options, searchTerm]);

    return (
        <div className="modern-card flex flex-col" style={{ maxHeight }}>
            <div className="flex items-center p-4 border-b border-gray-200">
                <button onClick={onClose} className="modern-btn modern-accent mr-4" style={{ padding: '0.5rem', minWidth: 'unset', borderRadius: '50%' }}>
                    <ArrowLeft size={22} className="text-white" />
                </button>
                <h2 className="modern-title text-2xl">{title} Seç</h2>
            </div>

            <div className="p-4 border-b border-gray-100">
                <input
                    type="text"
                    placeholder="Parça adı ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 bg-gradient-to-r from-[#e0e7ff] to-[#f6f7fb] border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-main text-base shadow-sm"
                />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredOptions.length > 0 ? filteredOptions.map(part => (
                    <div
                        key={part.id}
                        onClick={() => { if (part.stok.durum !== 'out_of_stock') onSelect(part); }}
                        className={`modern-card flex justify-between items-center py-4 px-5 cursor-pointer transition-all duration-200 ${part.stok.durum === 'out_of_stock' ? 'opacity-40 cursor-not-allowed' : 'hover:ring-2 hover:ring-accent'}`}
                        style={{ boxShadow: part.stok.durum === 'out_of_stock' ? 'none' : 'var(--card-shadow)' }}
                    >
                        <div>
                            <h4 className="font-semibold text-primary text-lg">{part.ad}</h4>
                            {part.stok.durum === 'out_of_stock' && <p className="text-danger font-semibold text-sm">Stokta Yok</p>}
                        </div>
                        <p className="text-lg font-bold text-accent">{part.fiyat_try.toLocaleString()} TL</p>
                    </div>
                )) : (
                    <div className="text-center py-16 text-text-secondary">
                        <p className="text-lg">Uygun parça bulunamadı.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
