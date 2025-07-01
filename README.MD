# 🏡 Data Analysis Tool  – Node.js + Eurostat API + AI

This project is an experimental Node.js API that takes natural language queries about the **Housing, Demographics, Economy, Education and Enviorment** and provides an **AI-generated analysis** based on official **Eurostat** data.

### 📌 Example query:
> _"What does the real estate market in Latvia look like in the past years?"_

---

## 🔍 Overview

The project processes the query, extracts relevant keywords, fetches housing-related datasets from **Eurostat**, and then sends this data to a local AI model for a structured analysis.

### ✅ Current Capabilities

- Accepts user queries in plain English  
- Extract user queries intent
- Extracts keywords for data selection  
- Fetches Eurostat data using the Eurostat API  
- Sends selected data to Gemini 1.5 Flash for intelligent interpretation and analysis
- Returns a human-readable analysis  

---

## 🧠 Technologies Used

- **Node.js** – Core backend framework  
- **Express.js** – API routing  
- **Eurostat API** – Data source for EU-level statistics  
- **Gemini 1.5 Flash** – Google’s advanced AI model used for fast, intelligent data insights

---

## 📊 Available Datasets

The API currently supports the following datasets grouped by thematic category:

### 🏘️ Housing & Living Conditions

1. **`PRC_HPI_A`** – House Price Index  
   Tracks changes in housing purchase prices over time.

2. **`PRC_HICP_AIND`** – Harmonised Index of Consumer Prices (Rent)  
   Measures rental price inflation.

3. **`STS_COBP_A`** – Building Permits  
   Indicates housing supply pipeline — how much residential construction is starting.

4. **`ILC_LVHO07A`** – Housing Cost Overburden Rate  
   Percentage of people spending more than 40% of their income on housing.

5. **`ILC_LVHO05A`** – Overcrowding Rate  
   Percentage of people living in overcrowded conditions.

### 👥 Demographics & Society

6. **`DEMO_PJAN`** – Population on 1 January  
   Size and growth of populations by country or region.

7. **`DEMO_MLEXPEC`** – Life Expectancy  
   Average life expectancy at birth.

8. **`ILC_PEPS01`** – At-Risk-of-Poverty Rate  
   Share of population with income below 60% of the national median.

9. **`ILC_DI03`** – Median Income  
   Median income after taxes/transfers — reflects income disparities.

### 💼 Economy & Labour Market

10. **`NAMA_10_GDP`** – Gross Domestic Product (GDP)  
    Measures overall economic output.

11. **`LC_LCI_R2_A`** – Labour Cost Index  
    Nominal annual index for wages and salaries in the business economy.

12. **`LFSA_ERGAN`** – Employment Rate  
    Share of the working-age (15–74) population currently employed.

13. **`UNE_RT_A`** – Unemployment Rate  
    Percentage of the labor force that is unemployed.

14. **`EXT_LT_INTRATRD`** – Export Values  
    Export values to all countries (in € million).

### 🎓 Education

15. **`EDAT_LFSE_03`** – Tertiary Education Rate  
    Share of population aged 15–64 with tertiary education (ISCED 5–8).

16. **`EDAT_LFSE_14`** – Early Leavers from Education and Training  
    % of 18–24-year-olds with only lower secondary education who are not in school.

### 🌍 Environment & Energy

17. **`NRG_IND_REN`** – Renewable Energy Share  
    Share of energy consumption from renewable sources.

---

## 🚧 Project Status

🛠️ **In development**   
- User query analysis could be improved
- Data analysis could be improved
- Cant get detailed data from Eurostat, just overall trends
- No frontend yet — API only  
- CI/CD should be implemented
