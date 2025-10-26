import { SelectedParts, CPU, Motherboard, RAM, GPU, Cooler, Case, PSU } from "@/types/parts";

export function checkCompatibility(parts: SelectedParts) {
    const errors: string[] = [];
    const warnings: string[] = [];

    const { cpu, motherboard, ram, gpu, psu, case: chassis, cooler } = parts;

    const mergeResults = (res: { errors?: string[]; warnings?: string[] } = {}) => {
        if (res.errors) errors.push(...res.errors);
        if (res.warnings) warnings.push(...res.warnings);
    };

    mergeResults(checkCpuVsMotherboard(cpu, motherboard));
    mergeResults(checkRamVsMotherboard(ram, motherboard));
    mergeResults(checkGpuVsChassis(gpu, chassis));
    mergeResults(checkCoolerVsChassis(cooler, chassis));
    mergeResults(checkCoolerVsCpu(cooler, cpu));
    mergeResults(checkPsuVsGpu(psu, gpu));
    mergeResults(checkPsuVsChassis(psu, chassis));

    return { errors, warnings };
}

function checkCpuVsMotherboard(cpu?: CPU | null, motherboard?: Motherboard | null) {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (!cpu || !motherboard) return { errors, warnings };

    if (cpu.soket !== motherboard.soket)
        errors.push("Anakart ve işlemci soketleri uyuşmuyor.");

    if (!motherboard.cpu_uyumluluk.nesiller.includes(cpu.nesil))
        warnings.push("İşlemci nesli anakart tarafından resmi olarak desteklenmeyebilir.");

    if (cpu.bellek_destek.tip !== motherboard.bellek.tip)
        errors.push("Anakart ve işlemci farklı RAM türlerini destekliyor.");

    return { errors, warnings };
}

function checkRamVsMotherboard(ram?: RAM | null, motherboard?: Motherboard | null) {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (!ram || !motherboard) return { errors, warnings };
    if (ram.tip !== motherboard.bellek.tip)
        errors.push("RAM tipi anakartla uyuşmuyor (DDR4 / DDR5 farkı).");
    return { errors, warnings };
}

function checkGpuVsChassis(gpu?: GPU | null, chassis?: Case | null) {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (!gpu || !chassis) return { errors, warnings };
    if (gpu.boyut.uzunluk_mm > chassis.gpu_uzunluk_max_mm)
        errors.push("Ekran kartı kasaya sığmıyor (uzunluk fazla).");
    return { errors, warnings };
}

function checkCoolerVsChassis(cooler?: Cooler | null, chassis?: Case | null) {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (!cooler || !chassis) return { errors, warnings };

    if (cooler.tip === "Air" && cooler.yukseklik_mm && cooler.yukseklik_mm > chassis.cpu_sogutucu_yukseklik_max_mm)
        errors.push("Hava soğutucu kasaya sığmıyor (yükseklik fazla).");

    if (cooler.tip === "Liquid" && cooler.radyator_mm) {
        const supported = [
            ...chassis.radyator_destek.front,
            ...chassis.radyator_destek.top,
            ...chassis.radyator_destek.rear
        ];
        if (!supported.includes(cooler.radyator_mm))
            errors.push("Kasa bu radyatör boyutunu desteklemiyor.");
    }

    return { errors, warnings };
}

function checkCoolerVsCpu(cooler?: Cooler | null, cpu?: CPU | null) {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (!cooler || !cpu) return { errors, warnings };

    if (!cooler.desteklenen_soketler.includes(cpu.soket))
        errors.push("Soğutucu bu işlemci soketini desteklemiyor.");

    if (cpu.tdp_w > cooler.max_tdp_w)
        warnings.push("İşlemcinin TDP değeri, soğutucunun maksimum kapasitesine yakın veya üzerinde.");

    return { errors, warnings };
}

function checkPsuVsGpu(psu?: PSU | null, gpu?: GPU | null) {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (!psu || !gpu) return { errors, warnings };
    if (gpu.guc.onerilen_psu_w > psu.guc_w)
        warnings.push("PSU watt değeri ekran kartı için yetersiz olabilir.");
    return { errors, warnings };
}

function checkPsuVsChassis(psu?: PSU | null, chassis?: Case | null) {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (!psu || !chassis) return { errors, warnings };
    if (!chassis.psu_destek.includes(psu.form_factor))
        errors.push("PSU form faktörü kasa ile uyumlu değil.");
    return { errors, warnings };
}
