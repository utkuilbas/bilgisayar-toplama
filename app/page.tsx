"use client";

import { useState, useEffect } from "react";
import Summary from "@/components/Summary";
import Sidebar from "@/components/Sidebar";
import PartList from "@/components/PartList";
import {
    CPU, Motherboard, RAM, GPU, Cooler, Storage,
    Case, PSU, Monitor, Keyboard, Mouse, BasePart, SelectedParts
} from "@/types/parts";
import {
    Cpu, Server, MemoryStick, HardDrive,
    LayoutDashboard, Power, Tv,
    Keyboard as KeyboardIcon, Mouse as MouseIcon, Snowflake
} from "lucide-react";
import {
    cpusData, motherboardsData, ramsData, gpusData, coolersData,
    storagesData, casesData, psusData, monitorsData, keyboardsData, miceData,
    checkCompatibility
} from "@/data";

type CategoryKey =
    'motherboard' | 'cpu' | 'ram' | 'gpu' | 'psu' |
    'case' | 'storage' | 'monitor' | 'keyboard' | 'mouse' | 'cooler';

export default function BuilderPage() {
    const [activeCategoryKey, setActiveCategoryKey] = useState<CategoryKey | null>(null);

    const [selectedMotherboard, setSelectedMotherboard] = useState<Motherboard | null>(null);
    const [selectedCpu, setSelectedCpu] = useState<CPU | null>(null);
    const [selectedRam, setSelectedRam] = useState<RAM | null>(null);
    const [selectedGpu, setSelectedGpu] = useState<GPU | null>(null);
    const [selectedPsu, setSelectedPsu] = useState<PSU | null>(null);
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<Storage | null>(null);
    const [selectedMonitor, setSelectedMonitor] = useState<Monitor | null>(null);
    const [selectedKeyboard, setSelectedKeyboard] = useState<Keyboard | null>(null);
    const [selectedMouse, setSelectedMouse] = useState<Mouse | null>(null);
    const [selectedCooler, setSelectedCooler] = useState<Cooler | null>(null);

    const [compatibility, setCompatibility] = useState<{ errors: string[]; warnings: string[] }>({ errors: [], warnings: [] });

    //sayfa yüklenince local storage'dan yükle
    useEffect(() => {
        const savedData = localStorage.getItem("pc-builder");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setSelectedMotherboard(parsed.motherboard || null);
            setSelectedCpu(parsed.cpu || null);
            setSelectedRam(parsed.ram || null);
            setSelectedGpu(parsed.gpu || null);
            setSelectedPsu(parsed.psu || null);
            setSelectedCase(parsed.case || null);
            setSelectedStorage(parsed.storage || null);
            setSelectedMonitor(parsed.monitor || null);
            setSelectedKeyboard(parsed.keyboard || null);
            setSelectedMouse(parsed.mouse || null);
            setSelectedCooler(parsed.cooler || null);
        }
    }, []);

    //değişiklikleri local storage'a kaydet
    useEffect(() => {
        const dataToSave: SelectedParts = {
            motherboard: selectedMotherboard,
            cpu: selectedCpu,
            ram: selectedRam,
            gpu: selectedGpu,
            psu: selectedPsu,
            case: selectedCase,
            storage: selectedStorage,
            monitor: selectedMonitor,
            keyboard: selectedKeyboard,
            mouse: selectedMouse,
            cooler: selectedCooler,
        };
        localStorage.setItem("pc-builder", JSON.stringify(dataToSave));

        const result = checkCompatibility(dataToSave);
        setCompatibility(result);
    }, [
        selectedMotherboard, selectedCpu, selectedRam,
        selectedGpu, selectedPsu, selectedCase,
        selectedStorage, selectedMonitor,
        selectedKeyboard, selectedMouse, selectedCooler
    ]);

    const clearAll = () => {
        setSelectedMotherboard(null);
        setSelectedCpu(null);
        setSelectedRam(null);
        setSelectedGpu(null);
        setSelectedPsu(null);
        setSelectedCase(null);
        setSelectedStorage(null);
        setSelectedMonitor(null);
        setSelectedKeyboard(null);
        setSelectedMouse(null);
        setSelectedCooler(null);
        setActiveCategoryKey(null);
        localStorage.removeItem("pc-builder");
        setCompatibility({ errors: [], warnings: [] });
    };

    const handleSelect = (key: CategoryKey, part: BasePart) => {
        switch (key) {
            case 'motherboard':
                setSelectedMotherboard(part as Motherboard);
                setSelectedCpu(null);
                setSelectedRam(null);
                setSelectedGpu(null);
                setSelectedPsu(null);
                setSelectedCase(null);
                setSelectedStorage(null);
                setSelectedMonitor(null);
                setSelectedKeyboard(null);
                setSelectedMouse(null);
                setSelectedCooler(null);
                break;
            case 'cpu': setSelectedCpu(part as CPU); break;
            case 'ram': setSelectedRam(part as RAM); break;
            case 'gpu': setSelectedGpu(part as GPU); break;
            case 'psu': setSelectedPsu(part as PSU); break;
            case 'case': setSelectedCase(part as Case); break;
            case 'storage': setSelectedStorage(part as Storage); break;
            case 'monitor': setSelectedMonitor(part as Monitor); break;
            case 'keyboard': setSelectedKeyboard(part as Keyboard); break;
            case 'mouse': setSelectedMouse(part as Mouse); break;
            case 'cooler': setSelectedCooler(part as Cooler); break;
        }
        //seçimden sonra bir sonraki kategoriye geç
        const order: CategoryKey[] = ['motherboard','cpu','ram','gpu','psu','case','storage','monitor','keyboard','mouse','cooler'];
        const idx = order.indexOf(key);
        let next: CategoryKey | null = null;
        if (idx >= 0 && idx < order.length - 1) {
            next = order[idx + 1];
        }

        const simulatedSelected = {
            motherboard: key === 'motherboard' ? (part as Motherboard) : selectedMotherboard,
            cpu: key === 'cpu' ? (part as CPU) : selectedCpu,
            ram: key === 'ram' ? (part as RAM) : selectedRam,
            gpu: key === 'gpu' ? (part as GPU) : selectedGpu,
            psu: key === 'psu' ? (part as PSU) : selectedPsu,
            case: key === 'case' ? (part as Case) : selectedCase,
            storage: key === 'storage' ? (part as Storage) : selectedStorage,
            monitor: key === 'monitor' ? (part as Monitor) : selectedMonitor,
            keyboard: key === 'keyboard' ? (part as Keyboard) : selectedKeyboard,
            mouse: key === 'mouse' ? (part as Mouse) : selectedMouse,
            cooler: key === 'cooler' ? (part as Cooler) : selectedCooler,
        } as unknown as SelectedParts;

        while (next) {
            const enabled = (() => {
                switch (next) {
                    case 'cpu': return !!simulatedSelected.motherboard;
                    case 'ram': return !!simulatedSelected.cpu;
                    case 'gpu': return !!simulatedSelected.ram;
                    case 'psu': return !!simulatedSelected.gpu;
                    case 'case': return !!simulatedSelected.psu;
                    case 'storage': return !!simulatedSelected.case;
                    case 'monitor': return !!simulatedSelected.storage;
                    case 'keyboard': return !!simulatedSelected.monitor;
                    case 'mouse': return !!simulatedSelected.keyboard;
                    case 'cooler': return !!simulatedSelected.mouse;
                    default: return true;
                }
            })();
            if (enabled) break;
            const nextIdx = order.indexOf(next);
            if (nextIdx < 0 || nextIdx >= order.length - 1) { next = null; break; }
            next = order[nextIdx + 1];
        }

        setActiveCategoryKey(next);
    };

    const categoryConfigurations = [
        { key: 'motherboard', title: 'Anakart', IconComponent: Server, options: motherboardsData, disabled: false },
        { key: 'cpu', title: 'İşlemci', IconComponent: Cpu, options: cpusData, disabled: !selectedMotherboard },
        { key: 'ram', title: 'RAM', IconComponent: MemoryStick, options: ramsData, disabled: !selectedCpu },
        { key: 'gpu', title: 'Ekran Kartı', IconComponent: Tv, options: gpusData, disabled: !selectedRam },
        { key: 'psu', title: 'Güç Kaynağı (PSU)', IconComponent: Power, options: psusData, disabled: !selectedGpu },
        { key: 'case', title: 'Kasa', IconComponent: LayoutDashboard, options: casesData, disabled: !selectedPsu },
        { key: 'storage', title: 'Depolama', IconComponent: HardDrive, options: storagesData, disabled: !selectedCase },
        { key: 'monitor', title: 'Monitör', IconComponent: Tv, options: monitorsData, disabled: !selectedStorage },
        { key: 'keyboard', title: 'Klavye', IconComponent: KeyboardIcon, options: keyboardsData, disabled: !selectedMonitor },
        { key: 'mouse', title: 'Fare', IconComponent: MouseIcon, options: miceData, disabled: !selectedKeyboard },
        { key: 'cooler', title: 'CPU Soğutucu', IconComponent: Snowflake, options: coolersData, disabled: !selectedMouse },
    ];

    const activeCategoryData = activeCategoryKey
        ? categoryConfigurations.find(c => c.key === activeCategoryKey)
        : null;

    const selectedParts: SelectedParts = {
        motherboard: selectedMotherboard, cpu: selectedCpu, ram: selectedRam,
        gpu: selectedGpu, psu: selectedPsu, case: selectedCase, storage: selectedStorage,
        monitor: selectedMonitor, keyboard: selectedKeyboard, mouse: selectedMouse, cooler: selectedCooler
    };

    return (
        <main className="w-full px-2 py-4 flex flex-col items-center justify-center">
            <div className="flex flex-row gap-8 max-w-[1400px] w-full mx-auto">
                {/* sidebar - sol menü */}
                <div className="hidden md:block w-[320px] shrink-0">
                    <div className="sticky top-8">
                        <Sidebar
                            categories={categoryConfigurations}
                            onCategorySelect={(key) => setActiveCategoryKey(key as CategoryKey)}
                            activeCategoryKey={activeCategoryKey}
                            selectedParts={selectedParts}
                        />
                    </div>
                </div>

                {/* orta alan: parça seçimi */}
                <div className="flex-grow max-w-[580px]">
                    <div className="sticky top-8" style={{ height: 'calc(100vh - 12rem)' }}>
                        {activeCategoryData && !activeCategoryData.disabled ? (
                            <PartList
                                title={activeCategoryData.title}
                                options={activeCategoryData.options as BasePart[]}
                                onSelect={(part) => handleSelect(activeCategoryData.key as CategoryKey, part)}
                                onClose={() => setActiveCategoryKey(null)}
                                maxHeight="calc(100vh - 12rem)"
                            />
                        ) : (
                            <div className="modern-card flex flex-col items-center justify-center h-full text-center">
                                <h2 className="modern-title text-3xl mb-4">Bilgisayar Toplamaya Başla</h2>
                                <p className="modern-subtitle">Parçaları seçmek için sol menüyü kullan.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* sağ alan: özet/sonuç */}
                <div className="hidden lg:block w-[400px] shrink-0">
                    <div className="sticky top-8">
                        <Summary selectedParts={selectedParts} onClearAll={clearAll} compatibility={compatibility} />
                    </div>
                </div>
            </div>
        </main>
    );
}
