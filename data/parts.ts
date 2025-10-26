import { CPU, Motherboard, RAM, GPU, Cooler, Storage, Case, PSU, Monitor, Keyboard, Mouse } from "@/types/parts";

import rawCpus from "./islemci.json";
import rawMotherboards from "./anakart.json";
import rawRams from "./ram.json";
import rawGpus from "./ekran_karti.json";
import rawCoolers from "./islemci_sogutucu.json";
import rawStorages from "./depolama.json";
import rawCases from "./kasa.json";
import rawPsus from "./psu.json";
import rawMonitors from "./monitor.json";
import rawKeyboards from "./klavye.json";
import rawMice from "./fare.json";

function ensureArray<T>(x: any): T[] {
    return Array.isArray(x) ? (x as T[]) : [];
}

export const cpusData = ensureArray<CPU>(rawCpus);
export const motherboardsData = ensureArray<Motherboard>(rawMotherboards);
export const ramsData = ensureArray<RAM>(rawRams);
export const gpusData = ensureArray<GPU>(rawGpus);
export const coolersData = ensureArray<Cooler>(rawCoolers);
export const storagesData = ensureArray<Storage>(rawStorages);
export const casesData = ensureArray<Case>(rawCases);
export const psusData = ensureArray<PSU>(rawPsus);
export const monitorsData = ensureArray<Monitor>(rawMonitors);
export const keyboardsData = ensureArray<Keyboard>(rawKeyboards);
export const miceData = ensureArray<Mouse>(rawMice);

export function getAllParts() {
    return {
        cpusData,
        motherboardsData,
        ramsData,
        gpusData,
        coolersData,
        storagesData,
        casesData,
        psusData,
        monitorsData,
        keyboardsData,
        miceData,
    };
}
