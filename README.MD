# 🏡 Housing Market Analysis Tool  – Node.js + Eurostat API + AI

This project is an experimental Node.js API that takes natural language queries about the **real estate market in Latvia** and provides an **AI-generated analysis** based on official **Eurostat** data.

### 📌 Example query:
> _"What does the real estate market in Latvia look like in the past years?"_

---

## 🔍 Overview

The project processes the query, extracts relevant keywords, fetches housing-related datasets from **Eurostat**, and then sends this data to a local AI model (via **Ollama**) for a structured analysis.

### ✅ Current Capabilities

- Accepts user queries in plain English  
- Extracts keywords for data selection  
- Fetches Eurostat data using the Eurostat API  
- Sends selected data to a local AI model (Ollama) for interpretation  
- Returns a human-readable analysis  

---

## 🧠 Technologies Used

- **Node.js** – Core backend framework  
- **Express.js** – API routing  
- **Eurostat API** – Data source for EU-level statistics  
- **Ollama** – Local AI model used for analysis  
  (Planned: API-based AI integration, e.g., OpenAI or Hugging Face)

---

## 📊 Available Datasets

Currently, the API supports 5 housing-related datasets:

1. **`prc_hpi_a`** – House Price Index  
2. **`PRC_HICP_AIND`** – Harmonised Indices of Consumer Prices  
3. **`sts_cobp_a`** – Short-term construction output  
4. **`ILC_LVHO07A`** – Housing cost overburden rate  
5. **`DEMO_PJAN`** – Population on 1 January (demographic context)

---

## 🚧 Project Status

🛠️ **In development**   
- Only 5 datasets integrated  
- Local AI via Ollama  
- No frontend yet — API only  