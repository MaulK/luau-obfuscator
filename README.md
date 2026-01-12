# PROTOCOL: VOID RUNNER // LUAU OBFUSCATOR

![Version](https://img.shields.io/badge/VERSION-V1.0-neon?style=for-the-badge&color=ff003c)
![Author](https://img.shields.io/badge/CREATOR-MAULANA_KHOIRUSYIFA'-cyan?style=for-the-badge&logo=roblox&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **"Secure your code in the void."**

A premium, web-based Luau Script Obfuscator designed specifically for Roblox development. Built with a "Void Runner" cyberpunk aesthetic, featuring CRT visual effects, neon glow UI, and a robust Poly-XOR encryption algorithm.

---

## 👤 Creator & Version Info

| Attribute | Details |
| :--- | :--- |
| **Created By** | **Maulana Khoirusyifa'** |
| **Current Version** | **V1.0** |
| **Release Date** | January 2026 |
| **Theme** | Protocol: Void Runner (Dark Glass / Cyberpunk) |

---

## 🛡️ Key Features

### 🔐 Encryption Engine
* **Poly-XOR Algorithm:** Uses dynamic key generation and salt modulation to prevent simple reverse-engineering.
* **Dynamic Variable Renaming:** Converts readable variables into random hex strings (e.g., `_VOID_0x4A2`, `MEM_0xF1`).
* **Bitwise Compatibility:** Fully compatible with Roblox's Luau engine using `bit32` library fallbacks.
* **Anti-Tamper Logic:** The output script includes a self-contained decryption wrapper.

### 💻 User Interface (UI/UX)
* **Void Aesthetics:** Deep black backgrounds (`#030303`) with Electric Cyan and Hyper Pink neon accents.
* **Visual FX:** CRT Scanlines overlay, Glitch text effects, and breathing neon borders.
* **Responsive Design:** Optimized for Desktop and Mobile/Tablet views.
* **Interactive Elements:**
    * **Emergency Purge:** High-visibility delete button with pulse animation.
    * **Execute Animation:** "Hacking" text effect during the obfuscation process.

### 📂 File Management
* **Drag & Drop / Upload:** Support for `.lua` and `.txt` file uploads.
* **Direct Download:** One-click download of the obfuscated result as a `.lua` file.
* **Clipboard Integration:** One-click copy with visual feedback.

---

## 🛠️ Tech Stack

This project was built using the following modern web technologies:

* **Framework:** [React.js](https://react.dev/) (via Vite)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3.4)
* **Icons:** [FontAwesome 6](https://fontawesome.com/)
* **Fonts:** JetBrains Mono (For that authentic terminal feel)

---

## 🚀 Installation & Setup

Follow these steps to run the obfuscator locally on your machine.

### Prerequisites
* [Node.js](https://nodejs.org/) (Version 16 or higher)
* npm or yarn

### Steps

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/luau-obfuscator.git](https://github.com/your-username/luau-obfuscator.git)
    cd luau-obfuscator
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Access the App**
    Open your browser and navigate to `http://localhost:5173`

---

## 📖 Usage Guide

1.  **Input Source:** Paste your Lua script into the left panel or click `[UPLOAD_FILE]` to select a script from your computer.
2.  **Execute:** Click the large "EXECUTE" button in the center. Wait for the encryption sequence to finish.
3.  **Get Result:**
    * Click **SAVE_LUA** to download the file.
    * Click **COPY** to copy to clipboard.
    * Click the **Pink Trash Can** (Emergency Purge) to clear all data instantly.

---

## ⚠️ Disclaimer

This tool is intended for **educational purposes** and for developers to protect their own intellectual property within the Roblox platform. The creator (**Maulana Khoirusyifa'**) is not responsible for any misuse of this tool for malicious purposes.

---

© 2026 **Maulana Khoirusyifa'**. All Rights Reserved.