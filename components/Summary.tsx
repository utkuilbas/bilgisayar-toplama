import {SelectedParts} from "@/types/parts";
import {useMemo} from "react";
import {PackageCheck} from "lucide-react";

interface SummaryProps {
    selectedParts: SelectedParts,
    onClearAll?: () => void,
    compatibility?: { errors: string[]; warnings: string[] }
}


export default function Summary({selectedParts, onClearAll, compatibility}: SummaryProps) {
    const totalPrice = useMemo(() => {
        return Object.values(selectedParts).reduce((total, part) => {
            return total + (part?.fiyat_try || 0);
        }, 0);
    }, [selectedParts]);

    const isAnySelected = useMemo(() => {
        return Object.values(selectedParts).some(Boolean);
    }, [selectedParts]);

    return (
        <div className="modern-summary sticky top-8">
            <div className="mb-4 pb-3 border-b border-gray-200 flex items-center justify-between gap-3">
                <h2 className="modern-title flex items-center gap-3 text-2xl">
                    <PackageCheck className="text-accent"/>
                    Sistem Özeti
                </h2>
                {onClearAll && (
                    <button
                        type="button"
                        onClick={onClearAll}
                        disabled={!isAnySelected}
                        className="modern-btn modern-danger text-xs sm:text-sm font-semibold px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-disabled={!isAnySelected}
                    >
                        Tümünü Temizle
                    </button>
                )}
            </div>
            <ul className="space-y-4 my-6">
                {Object.entries(selectedParts).map(([key, part]) => {
                    if (!part) return null;
                    const labels: Record<string, string> = {
                        motherboard: 'Anakart',
                        cpu: 'İşlemci',
                        ram: 'RAM',
                        gpu: 'Ekran Kartı',
                        psu: 'Güç Kaynağı',
                        case: 'Kasa',
                        storage: 'Depolama',
                        monitor: 'Monitör',
                        keyboard: 'Klavye',
                        mouse: 'Fare',
                        cooler: 'CPU Soğutucu'
                    };
                    const label = labels[key] ?? key;
                    return (
                        <li key={key} className="flex justify-between items-start text-base">
                            <span className="font-semibold text-primary w-1/3">{label}:</span>
                            <span className="text-right text-text-main w-2/3">{part.ad}</span>
                        </li>
                    );
                })}
            </ul>
            <div className="mt-6 pt-4 border-t-2 border-gray-100">
                <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-primary">Toplam:</span>
                    <span className="text-accent">{totalPrice.toLocaleString()} TL</span>
                </div>
            </div>
            {compatibility && (compatibility.errors.length > 0 || compatibility.warnings.length > 0) && (
                <div className="mt-6">
                    {compatibility.errors.length > 0 && (
                        <div className="mb-2">
                            <span className="text-danger font-bold">Uyumsuzluklar:</span>
                            <ul className="list-disc ml-6 text-danger">
                                {compatibility.errors.map((err, i) => <li key={i}>{err}</li>)}
                            </ul>
                        </div>
                    )}
                    {compatibility.warnings.length > 0 && (
                        <div>
                            <span className="text-accent font-bold">Uyarılar:</span>
                            <ul className="list-disc ml-6 text-accent">
                                {compatibility.warnings.map((warn, i) => <li key={i}>{warn}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}