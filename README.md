# Tars

**Tars** is your personal assistant for tackling LinkedIn screening questions with ease! This powerful Chrome extension bot is designed to save time, boost accuracy, and streamline your responses to hiring assistants, ensuring you stand out in the recruitment process.

<div style="text-align: center;">
  <img src="public/bot_screenshot.png" alt="Screenshot" width="200">
</div>

---

## ✨ Why Tars?

- ⚡ **Automate the tedious stuff**: Say goodbye to repetitive typing and hello to intelligent, dynamic responses.
- 🤖 **Smart interactions**: Tars adapts to missing information, asks clarifying questions, and generates professional responses.
- 🎯 **Tailored to you**: Customize how you respond for specific employers, ensuring you're always putting your best foot forward.
- 📊 **Clear summaries**: Get a concise overview of the interaction, so you're always in control.

---

## 🚦 How Does It Work?

### **1. Start Tars**

- Open a **LinkedIn messaging thread** with a hiring assistant.
- Click the **Tars** icon in your Chrome toolbar to activate the bot.

### **2. Provide Your Setup Details**

<div style="text-align: center;">
  <img src="public/setup_screenshot.png" alt="Screenshot" width="300">
</div>

Tars will ask you for:

- **Your LinkedIn Profile URL**: To gather key candidate information.
- **API Key**: For secure and personalized data handling.
- **Initial Questions**: Specify any predefined responses or details you'd like Tars to emphasize.
- **Additional Information**: Fill in gaps that aren’t on your LinkedIn profile (e.g., preferred job locations, extra skills, or unique experiences).

### **3. Automated Magic**

<div style="text-align: center;">
  <img src="public/chat_screenshot.png" alt="Screenshot" width="300">
</div>

- Tars detects screening questions in the chat and generates **tailored responses** in real-time.
- If Tars needs more details to provide an accurate response, it will prompt you for clarification.

### **4. Employer-Specific Handling**

- Define employers or job types that need unique responses. Tars ensures your answers are aligned with their expectations.

### **5. Summarization**

- At the end of the interaction, Tars provides a **summary** of all questions and responses, keeping you informed and prepared.

---

## Contribution

#### Node.js

Ensure you have the latest Node.js installed: [Node.js Official Website](https://nodejs.org/).

> **Note:** Sometimes, running `node -v` might show version 22 (latest), but an older version could still be in use under the hood.  
> If you encounter build errors, verify your Node.js versions with `volta list node`.  
> If the versions differ, update Node.js as required (e.g., using `nvm use 22`).

#### IDE

While using **VS Code** is optional, it is highly recommended.

**Suggested Extensions:**

- **ESLint**
- **Prettier**

---

#### Starting the Project

- **git clone**
- **npm install**
- **npm run build**
- In Google Chrome go to **chrome://extensions/** -> click **Load unpacked** -> select **dist** folder in extension
- In chrome extensions Pin **Tars**. Then click on it in top panel
