const datasets ={
    // Housing & Living Conditions
    // Housing price index annual data
    PRC_HPI_A: {
        id: 'PRC_HPI_A',
        description: 'Tracks changes in housing purchase prices over time',
        staticParams: {
            purchase: 'TOTAL',
            unit: 'I15_A_AVG'
        },
    },

    // Actual Rent Prices 
    PRC_HICP_AIND: {
        id: 'PRC_HICP_AIND',
        description: 'Measures rental price inflation',
        staticParams: {
            coicop: 'CP041',
            unit: 'INX_A_AVG'
        },
    },

    // Building Permits (new housing supply)
    STS_COBP_A: {
        id: 'STS_COBP_A',
        description: 'Indicates housing supply pipeline — how much residential construction is starting',
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
        description: 'Percentage of people spending more than 40% of income on housing',
        staticParams: {
            unit: 'PC',
            incgrp: 'TOTAL',
            age: 'TOTAL',
            sex: 'T',
        },
    },

    // Measures housing space adequacy
    ILC_LVHO05A: {
        id: 'ILC_LVHO05A',
        description: 'Percentage of people living in overcrowded conditions',
        staticParams: {
            age: 'TOTAL',
            sex: 'T',
            incgrp: 'TOTAL',
        }
    },

    // Demographics & Society
    // Population by Region
    DEMO_PJAN: {
        id: 'DEMO_PJAN',
        description: 'Size and growth of populations by country or region',
        staticParams: {
            unit: 'NR',
            age: 'TOTAL',
            // sex: 'T',
        }
    },

    // General health outcomes and longevity
    DEMO_MLEXPEC: {
        id: 'DEMO_MLEXPEC',
        description: 'Average life expectancy at birth',
        staticParams: {
            sex: 'T',
            age: 'Y_LT1',
        }
    },

    // Poverty and social inequality
    ILC_PEPS01: {
        id: 'ILC_PEPS01',
        description: 'Share of population with income below 60% of national median',
        staticParams: {
            unit: 'PC',
            sex: 'T',
            age: 'TOTAL',
        }
    },

    // Income disparities across countries
    ILC_DI03: {
        id: 'ILC_DI03',
        description: 'Median income after taxes/transfers — shows income disparities',
        staticParams: {
            unit: 'EUR',
            sex: 'T',
            age: 'TOTAL',
            indic_il: 'MEI_E'
        }
    },

    //  Economy & Labour Market
    // GDP
    NAMA_10_GDP: {
        id: 'NAMA_10_GDP',
        description: 'Gross Domestic Product - measures economic output',
        staticParams: {
            unit: 'CP_MEUR',
            na_item: 'B1GQ',
        },
    },

    // Economic competitiveness and workforce expenses (complex)
    LC_LCI_R2_A: {
        id: 'LC_LCI_R2_A',
        description: 'Nominal annual Labour Cost Index for total wages and salaries in the business economy',
        staticParams: {
            lcstruct: 'D11',
            nace_r2: 'B-N',
            unit: 'I16'
        }
    },

    // Employment rate of working-age population.
    LFSA_ERGAN: {
        id: 'LFSA_ERGAN',
        description: 'Share of working-age (15-74) population currently employed',
        staticParams: {
            age: 'Y15-74',
            sex: 'T',
            citizen: 'TOTAL'
        }
    },

    // Overall unemployment trends
    UNE_RT_A: {
        id: 'UNE_RT_A',
        description: 'Unemployment rate - percentage of labor force that is unemployed',
        staticParams: {
            age: 'Y15-74',
            unit: 'PC_POP',
            sex: 'T'
        }
    },

    // Export value to all countries.
    EXT_LT_INTRATRD: {
        id: 'EXT_LT_INTRATRD',
        description: 'Export values (in € million) to trading partners (all countries)',
        staticParams: {
            indic_et: 'MIO_EXP_VAL',
            partner: 'WORLD',
            sitc06: 'TOTAL',
        }
    },

    // Education level ??
    EDAT_LFSE_03: {
        id: 'EDAT_LFSE_03',
        description: 'Share of population with tertiary education (ISCED 5-8)',
        staticParams: {
            sex: 'T',
            age: 'Y15-64',
            isced11: 'ED5-8'
        }
    },

    // Percentage of population leaving school early.
    EDAT_LFSE_14: {
        id: 'EDAT_LFSE_14',
        description: '% of 18-24-year-olds with only lower secondary education who are not in school',
        staticParams: {
            sex: 'T',
            wstatus: 'POP'
        }
    },

    // Environment & Energy
    // Share of renewable energy in gross consumption
    NRG_IND_REN: {
        id: 'NRG_IND_REN',
        description: 'Share of energy consumption from renewable sources',
        staticParams: {
            nrg_bal: 'REN',
        }
    },
};

module.exports = {
    datasets
}

