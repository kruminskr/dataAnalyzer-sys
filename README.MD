# 🏡 Eurostat Data Analysis – Node.js + Express + AI

A Node.js backend API that transforms natural language queries into intelligent analysis of **Eurostat** data using AI-powered interpretation and dataset selection.

## 🔍 Overview

This backend service processes user queries in plain English, selects relevant Eurostat datasets using LLM analysis, fetches the data, and returns comprehensive AI-generated insights with key findings, charts and limitations.

## Table of Contents

- [Overview](#-overview)
- [Process Flow](#-process-flow)
- [Quick Start](#-quick-start)
- [Technologies](#️-technologies)
- [Supported Data Categories](#-supported-data-categories)
- [AWS Infrastructure](#%EF%B8%8F-aws-infrastructure)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Possible Improvements](#-possible-improvements)
- [Related Projects](#-related-projects)

---

### 🔄 Process Flow
1. **Query intent**: User query analyzed by LLM to understand intent
2. **Needed datases**: LLM identifies most relevant datasets for the query
3. **Dataset dimensions**: Fetch dataset dimensions from Eurostat
4. **Create the params** LLM analyzes datasets dimensions to retrive only the relevant data
5. **Data Retrieval**: Fetch selected datasets with specified parameters from Eurostat API
6. **AI Analysis**: Based on the origanl queries intent and Eurostats data, generate an analysis

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation
```bash
git clone <repository-url>
npm install
```

### Environment Variables
```bash
APP_URL = http://localhost:5173

# AI
AI_MODEL = gemini-2.0-flash
AI_API_URL = https://generativelanguage.googleapis.com/v1beta/openai
AI_API_KEY = 

# Eurostat API
EUROSTAT_API_URL = https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data

```

### Run Locally
```bash
npm run dev
```

---

## 🛠️ Technologies

- **Node.js** – Runtime environment
- **Express.js** – Web framework and API routing
- **Eurostat API** – Official EU statistics data source
- **Gemini 2.0 Flash** – LLM for query analysis and data interpretation


---

## 📊 Supported Data Categories

- **Housing & Living Conditions** – Real estate, housing costs, living standards
- **Demographics & Society** – Population, migration, social statistics  
- **Economy & Labour Market** – GDP, employment, inflation
- **Education** – Educational attainment
- **Environment & Energy** – Renewable energy

---

## 🏗️ AWS Infrastructure

### Container Registry
- **AWS ECR** – Docker images stored in Elastic Container Registry
### Compute & Orchestration  
- **AWS ECS** – Elastic Container Service cluster management
- **Task Definitions** – Separate configurations for backend and frontend services

### Networking & Load Balancing
- **Application Load Balancer** – Traffic distribution with public endpoints
- **VPC Configuration** – Secure network isolation
- **Security Groups** – Controlled inbound/outbound traffic

### Secrets & Configuration
- **AWS Secrets Manager** – Secure API key and credential storage
- **Environment Variables** – Runtime configuration management

---

## 🔄 CI/CD Pipeline

### Deployment Process (AWS)
1. **Code Push** → GitHub repository
2. **Build** → Docker image creation
3. **Push** → ECR repository update
4. **Deploy** → ECS service force-new-deployment

---

## ✅ Possible improvments

- Improved LLM analysis (RAG, few-shot learning, Function calling, Context window management, Feedback loop)
- A chatbot style system (possible to save chats and ask multiple queries on the same problem)
---

## 🔗 Related Projects
- [Eurostat Data Analysis - frontend](https://github.com/kruminskr/dataAnalyzer-app)
