const datasets ={
    // Housing price index annual data
    PRC_HPI_A: {
        id: 'PRC_HPI_A',
        staticParams: {
            purchase: 'TOTAL',
            unit: 'I15_A_AVG'
        },
    },

    // Actual Rent Prices 
    PRC_HICP_AIND: {
        id: 'PRC_HICP_AIND',
        staticParams: {
            coicop: 'CP041',
            unit: 'INX_A_AVG'
        },
    },

    // Building Permits (new housing supply)
    STS_COBP_A: {
        id: 'STS_COBP_A',
        staticParams: {
            indic_bt: 'BPRM_SQM',
            cpa2_1: 'CPA_F41001_41002',
            s_adj: 'NSA',
            unit: 'MIO_M2',
        },
    },

    // Housing Cost Overburden Rate
    ILC_LVHO07A: {
        id: 'ILC_LVHO07A',
        staticParams: {
            unit: 'PC',
            incgrp: 'TOTAL',
            age: 'TOTAL',
            sex: 'T',
        },
    },

    // Population by Region
    DEMO_PJAN: {
        id: 'DEMO_PJAN',
        staticParams: {
            unit: 'NR',
            age: 'TOTAL',
            sex: 'T',
        }
    },

    // GDP
    NAMA_10_GDP: {
        id: 'NAMA_10_GDP',
        staticParams: {
            unit: 'CP_MEUR',
            na_item: 'B1GQ',
        },
    },

    // Employment rate of working-age population.
    LFSA_ERGAN: {
        id: 'LFSA_ERGAN',
        staticParams: {
            age: 'Y15-74',
            sex: 'T',
            citizen: 'TOTAL'
        }
    },

    // Overall unemployment trends
    UNE_RT_A: {
        id: 'UNE_RT_A',
        staticParams: {
            age: 'Y15-74',
            unit: 'PC_POP',
            sex: 'T'
        }
    },

    // Export value to all countries.
    EXT_LT_INTRATRD: {
        id: 'EXT_LT_INTRATRD',
        staticParams: {
            indic_et: 'MIO_EXP_VAL',
            partner: 'WORLD',
            sitc06: 'TOTAL',
        }
    },

    // Education level ??
    EDAT_LFSE_03: {
        id: 'EDAT_LFSE_03',
        staticParams: {
            sex: 'T',
            age: 'Y15-64',
            isced11: 'ED5-8'
        }
    },

    // Percentage of population leaving school early.
    EDAT_LFSE_14: {
        id: 'EDAT_LFSE_14',
        staticParams: {
            sex: 'T',
            wstatus: 'POP'
        }
    },

    // Share of renewable energy in gross consumption
    NRG_IND_REN: {
        id: 'NRG_IND_REN',
        staticParams: {
            nrg_bal: 'REN',
        }
    },

    // General health outcomes and longevity
    DEMO_MLEXPEC: {
        id: 'DEMO_MLEXPEC',
        staticParams: {
            sex: 'T',
            age: 'Y_LT1',
        }
    },

    // Poverty and social inequality
    ILC_PEPS01: {
        id: 'ILC_PEPS01',
        staticParams: {
            unit: 'PC',
            sex: 'T',
            age: 'TOTAL',
        }
    },

    // Income disparities across countries
    ILC_DI03: {
        id: 'ILC_DI03',
        staticParams: {
            unit: 'EUR',
            sex: 'T',
            age: 'TOTAL',
            indic_il: 'MEI_E'
        }
    },


    // Measures housing space adequacy
    ILC_LVHO05A: {
        id: 'ILC_LVHO05A',
        staticParams: {
            age: 'TOTAL',
            sex: 'T',
            incgrp: 'TOTAL',
        }
    },


    // Economic competitiveness and workforce expenses
    LC_LCI_R2_A: {
        id: 'LC_LCI_R2_A',
        staticParams: {
            lcstruct: 'D11',
            nace_r2: 'B-N',
            unit: 'I16'
        }
    },
};

module.exports = {
    datasets
}

