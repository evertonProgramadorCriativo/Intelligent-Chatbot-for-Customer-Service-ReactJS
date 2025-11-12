 # Intelligent Chatbot for Customer Service


**Description**: Responsive chatbot interface integrated with generative AI for automated customer service, featuring sentiment analysis and contextualized responses.

##### Run Project
```
 npm i
 npm run dev
```
**Main Structure:**

* **CATEGORIES**: Array with 4 categories, each with an icon, color, and description

* **COLOR_CLASSES**: Mapping of colors to CSS classes (Tailwind)

* **API_CONFIG**: API settings

* **App Component**: Displays the categories and tests the imports



````bash 
This code implements a React application that imports and tests configurations of constants organized in a separate file. The `App` component displays a list of categories (Products, Orders, Complaints, and Questions) and logs the imported configurations for verification in the console.
````


**Sentiment Analysis Test**

**Test 1: Positive Sentiment**
Text: "Thank you! The product is excellent!"

Result: Positive — Happy

**Test 2: Negative Sentiment**
Text: "Terrible service! Defective product!"

Result: Negative — Sad

**Test 3: Neutral Sentiment**
Text: "What is the delivery time?"

Result: Neutral — Neutral

**Test 4: General Statistics**
Positive: 2
Negative: 1
Neutral: 1
Total: 4

## Teste - API Configuration
**Configurações da API:**
**Endpoint:** https://api.anthropic.com/v1/messages

**Model:** claude-sonnet-4-20250514

**Max Tokens:** 1000

## Author : Everton Eduardo 