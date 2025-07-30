const datasets = {
    // Housing & Living Conditions
    // Housing price index annual data
    PRC_HPI_A: {
        id: 'PRC_HPI_A',
        description: 'Tracks changes in housing purchase prices over time',
    },

    // Actual Rent Prices 
    PRC_HICP_AIND: {
        id: 'PRC_HICP_AIND',
        description: 'Measures rental price inflation',
    },

    // Building Permits (new housing supply)
    STS_COBP_A: {
        id: 'STS_COBP_A',
        description: 'Indicates housing supply pipeline — how much residential construction is starting',
    },

    // Housing Cost Overburden Rate
    ILC_LVHO07A: {
        id: 'ILC_LVHO07A',
        description: 'Percentage of people spending more than 40% of income on housing',
    },

    // Measures housing space adequacy
    ILC_LVHO05A: {
        id: 'ILC_LVHO05A',
        description: 'Percentage of people living in overcrowded conditions',
    },

    // Demographics & Society
    // Population by Region
    DEMO_PJAN: {
        id: 'DEMO_PJAN',
        description: 'Size and growth of populations by country or region',
    },

    // General health outcomes and longevity
    DEMO_MLEXPEC: {
        id: 'DEMO_MLEXPEC',
        description: 'Average life expectancy at birth',
    },

    // Poverty and social inequality
    ILC_PEPS01: {
        id: 'ILC_PEPS01',
        description: 'Share of population with income below 60% of national median',
    },

    // Income disparities across countries
    ILC_DI03: {
        id: 'ILC_DI03',
        description: 'Median income after taxes/transfers — shows income disparities',
    },

    //  Economy & Labour Market
    // GDP
    NAMA_10_GDP: {
        id: 'NAMA_10_GDP',
        description: 'Gross Domestic Product - measures economic output',
    },

    // Economic competitiveness and workforce expenses (complex)
    LC_LCI_R2_A: {
        id: 'LC_LCI_R2_A',
        description: 'Nominal annual Labour Cost Index for total wages and salaries in the business economy',
    },

    // Employment rate of working-age population.
    LFSA_ERGAN: {
        id: 'LFSA_ERGAN',
        description: 'Share of working-age (15-74) population currently employed',
    },

    // Overall unemployment trends
    UNE_RT_A: {
        id: 'UNE_RT_A',
        description: 'Unemployment rate - percentage of labor force that is unemployed',
    },

    // Export value to all countries.
    EXT_LT_INTRATRD: {
        id: 'EXT_LT_INTRATRD',
        description: 'Export values (in € million) to trading partners (all countries)',
    },

    // Education level ??
    EDAT_LFSE_03: {
        id: 'EDAT_LFSE_03',
        description: 'Share of population with tertiary education (ISCED 5-8)',
    },

    // Percentage of population leaving school early.
    EDAT_LFSE_14: {
        id: 'EDAT_LFSE_14',
        description: '% of 18-24-year-olds with only lower secondary education who are not in school',
    },

    // Environment & Energy
    // Share of renewable energy in gross consumption
    NRG_IND_REN: {
        id: 'NRG_IND_REN',
        description: 'Share of energy consumption from renewable sources',
    },
};

module.exports = {
    datasets
}

// const datasets = {
//     // Employment rate of working-age population.
//     LFSA_ERGAN: {
//         id: 'LFSA_ERGAN',
//         description: 'Share of working-age (15-74) population currently employed',
//         params: {
//             age: {
//                 'Y15-24': '15-24 years',
//                 'Y25-49': '25-49 years',
//                 'Y50-74': '50-74 years',
//                 'Y15-74': '15-74 years'
//             }, 
//             sex: {
//                 T: 'Total',
//                 M: 'Male',
//                 F: 'Female'
//             },
//             citizen: {
//                 'EU27_2020': 'European Union - 27 countries (from 2020)',
//                 'EU27_2020_FOR': 'EU27 countries (from 2020) except reporting country',
//                 'NEU27_2020_FOR': 'Non-EU27 countries (from 2020) nor reporting country',
//                 'FOR': 'Foreign country',
//                 'NAT': 'Reporting country',
//                 'STLS': 'Stateless',
//                 'TOTAL': 'Total',
//                 'NRP': 'No response'
//             }
//         }
//     },
// 
//     // Export value to all countries.
//     EXT_LT_INTRATRD: {
//         id: 'EXT_LT_INTRATRD',
//         description: 'Export values (in € million) to trading partners (all countries)',
//         params: {
//             indic_et: {
//                 'PC_TOT_IMP': 'Share of imports by partner in total imports (%)',
//                 'PC_TOT_EXP': 'Share of exports by partner in total exports (%)',
//                 'CONT_IMP_EU': 'Share of imports by Member State (%)',
//                 'CONT_EXP_EU': 'Share of exports by Member State (%)',
//                 'MIO_BAL_VAL': 'Trade balance in million ECU/EURO',
//                 'MIO_EXP_VAL': 'Exports in million of ECU/EURO',
//                 'MIO_IMP_VAL': 'Imports in million of ECU/EURO',
//                 'PC_IMP_PROD': 'Share of imports by product (%)',
//                 'PC_EXP_PROD': 'Share of exports by product (%)'
//             },
//             sitc06: {
//                 'TOTAL': 'Total - all products',
//                 'SITC0_1': 'Food, drinks and tobacco',
//                 'SITC2_4': 'Raw materials',
//                 'SITC3': 'Mineral fuels, lubricants and related materials',
//                 'SITC5': 'Chemicals and related products, n.e.s.',
//                 'SITC6_8': 'Other manufactured goods',
//                 'SITC7': 'Machinery and transport equipment',
//                 'SITC9': 'Commodities and transactions not classified elsewhere in the SITC'
//             },
//             partner: {
//                 'EU27_2020': 'European Union - 27 countries (from 2020)',
//                 'EXT_EU27_2020': 'Extra-EU27 (from 2020)',
//                 'WORLD': 'All countries of the world'
//             },
//         }
//     },
// }


