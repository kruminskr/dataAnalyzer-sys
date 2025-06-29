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

    }
}

module.exports = {
    datasets
}