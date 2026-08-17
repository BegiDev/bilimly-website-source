<div align="center">

<img src="https://www.bilimly.app/assets/images/logo/logo-5.svg" alt="Bilimly Logo" width="120" />

# Bilimly

### Learn by doing, learn by teaching.

[![App Store](https://img.shields.io/badge/App_Store-Download-0D96F6?style=for-the-badge&logo=app-store&logoColor=white)](https://apps.apple.com/ru/app/bilimly/id6756845318)
[![Google Play](https://img.shields.io/badge/Google_Play-Download-3DDC84?style=for-the-badge&logo=google-play&logoColor=white)](https://play.google.com/store/apps/details?id=com.bilimly.app)
[![Website](https://img.shields.io/badge/Website-bilimly.app-FF6B35?style=for-the-badge&logo=google-chrome&logoColor=white)](https://bilimly.app)

[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue)](#)
[![Languages](https://img.shields.io/badge/Language-Uzbek%20%7C%20Russian%20%7C%20English-green)](#)
[![Pricing](https://img.shields.io/badge/Pricing-One--time%20Purchase-orange)](#)

**A mobile-first microlearning platform that teaches AI, Data Analytics, and Cybersecurity through short, structured lessons — with a personalized AI Roadmap built just for you.**

[🚀 Quick Start](#-quick-start) · [✨ Features](#-features) · [🗺️ AI Roadmap](#️-ai-roadmap-new) · [📸 Screenshots](#-screenshots) · [🤝 Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About Bilimly](#-about-bilimly)
- [The Problem We Solve](#-the-problem-we-solve)
- [Features](#-features)
- [AI Roadmap ✨ New](#️-ai-roadmap-new)
- [Tech Stack](#️-tech-stack)
- [Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Product Roadmap](#-product-roadmap)
- [Business Model](#-business-model)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🧠 About Bilimly

Bilimly is a **mobile-first microlearning platform** that makes modern digital education accessible to everyone — regardless of language, location, or internet connection.

We teach **Artificial Intelligence, Data Analytics, and Cybersecurity** through bite-sized lessons that can be completed in minutes. No 40-hour video courses. No passive watching. Just clear, focused knowledge — built for how people actually learn on mobile.

Available in **Uzbek, Russian, and English**, Bilimly is built for learners across Central Asia and beyond.

> *"Most online courses fail because learners are passive. They watch, they nod, they forget."*  
> Bilimly fixes this — one short lesson at a time.

---

## 🔥 The Problem We Solve

| Challenge | How Bilimly Solves It |
|-----------|----------------------|
| Courses are too long | Microlessons you complete in minutes |
| Passive learning = forgetting | Active, structured knowledge units |
| Low course completion rates | Short lessons with one clear goal each |
| Subscription costs | One-time purchase, own it forever |
| No internet in some regions | Full offline access |
| Content only in English | Uzbek, Russian, and English support |

---

## ✨ Features

### 📚 Microlearning Lessons
Each lesson delivers **one clear idea** — no fluff, no filler. Complex topics broken into small, digestible units that build on each other progressively.

### 🎓 Focused Course Catalog
Deep-dive courses on the skills that matter most today:
- 🤖 **Artificial Intelligence** — how AI works, practical applications, real-world use cases
- 📊 **Data Analytics** — reading data, drawing insights, making decisions
- 🔐 **Cybersecurity** — staying safe online, understanding threats, protecting systems

### 📱 Mobile-First Design
Built from the ground up for smartphones. Clean, fast, and optimized for small screens — because that's where learning actually happens.

### 📶 Offline Access
Download lessons and learn anywhere — on the subway, in a village, on a plane. No internet required.

### 🌐 Multilingual Support
Full learning experience in **Uzbek**, **Russian**, and **English** — making quality tech education truly accessible across the region.

### 💳 Pay Once, Own Forever
No subscriptions. No monthly fees. Purchase once and keep your courses for life.

---

## 🗺️ AI Roadmap *(New)*

Bilimly's latest feature — **AI Roadmap** — creates a fully personalized learning plan in seconds.

Instead of guessing where to start, you answer **3 simple questions** and our AI builds a custom roadmap tailored to your goals, background, and available time.

```
┌─────────────────────────────────────────────────────────┐
│                    AI Roadmap Flow                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Q1: What is your goal?                                │
│       e.g. "I want to work in AI" / "Understand data"   │
│                          ↓                              │
│   Q2: What is your current level?                       │
│       Beginner / Some experience / Professional         │
│                          ↓                              │
│   Q3: How much time can you dedicate per day?           │
│       15 min / 30 min / 1 hour+                         │
│                          ↓                              │
│   ✅  Your personalized roadmap is ready!               │
│       Step-by-step path from where you are              │
│       to where you want to be.                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

The roadmap adapts as you progress — always showing you the most relevant next steps.

---

## 🛠️ Tech Stack

```
Mobile:      iOS · Android (Mobile-first)
Frontend:    HTML5 · CSS3 · JavaScript
AI Layer:    Anthropic Claude API (AI Roadmap)
Offline:     Service Workers / Local Storage
Languages:   Uzbek · Russian · English (i18n)
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have:

- [Git](https://git-scm.com/) `v2.x+`
- A modern browser (Chrome, Firefox, Safari, Edge)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/BegiDev/Bilimly-demo-code.git
cd Bilimly-demo-code
```

**2. Launch the demo**

Choose any of these methods:

```bash
# Option A — Python (no install needed)
python3 -m http.server 8000
# Then open: http://localhost:8000
```

```bash
# Option B — Node.js
npx serve .
# Open the URL shown in terminal
```

```bash
# Option C — VS Code Live Server
# Install the "Live Server" extension, then:
# Right-click index.html → "Open with Live Server"
```

```bash
# Option D — Open directly (simplest)
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Running Locally

After launching, visit:

```
http://localhost:8000
```

You should see the Bilimly demo homepage. ✅

---

## 📁 Project Structure

```
Bilimly-demo-code/
│
├── 📁 images/               # Logos, screenshots, and app assets
│   └── logo.png
│
├── 📄 index.html            # Main entry point — open this to run the demo
├── 🎨 favicon.ico           # App icon shown in browser tab
└── 📖 README.md             # You are here
```

---

## 📸 Screenshots

<div align="center">

| Home | Lesson | AI Roadmap | Offline |
|------|--------|------------|---------|
| <img src="images/screenshot-home.png" width="160"/> | <img src="images/screenshot-lesson.png" width="160"/> | <img src="images/screenshot-roadmap.png" width="160"/> | <img src="images/screenshot-offline.png" width="160"/> |

</div>

---

## 🎥 Setup Video

> Watch how to clone and run Bilimly locally in under 3 minutes.

[![Watch Setup Tutorial](https://img.shields.io/badge/▶_Watch_Setup_Tutorial-YouTube-red?style=for-the-badge&logo=youtube)](https://youtube.com/watch?v=YOUR_VIDEO_ID)

---

## 📍 Product Roadmap

### ✅ Shipped
- [x] Microlearning lesson system
- [x] AI, Data Analytics, Cybersecurity courses
- [x] Offline access
- [x] Multilingual support (Uzbek, Russian, English)
- [x] One-time purchase model
- [x] **AI Roadmap** — personalized learning path from 3 questions

### 🔜 Coming Soon
- [ ] Interactive simulations and practice exercises
- [ ] Expanded course library
- [ ] Progress certificates
- [ ] Community leaderboards and streaks
- [ ] Enterprise / corporate training packages
- [ ] Additional language expansion

---

## 💼 Business Model

Bilimly uses a **one-time purchase model** — buy a course once, keep it forever.

| Tier | Description |
|------|-------------|
| **Core Courses** | One-time purchase per course |
| **Course Packs** *(coming soon)* | Bundled courses at a discount |
| **Professional Tracks** *(coming soon)* | Curated paths for career changers |
| **Enterprise** *(coming soon)* | Corporate training and team licenses |

---

## 🤝 Contributing

We welcome contributions! Here's how:

```bash
# 1. Fork this repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes (use conventional commits)
git commit -m "feat: add your feature description"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request — we'll review it promptly
```

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for our code of conduct and guidelines.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 📬 Contact

<div align="center">

| Channel | Link |
|---------|------|
| 🌐 Website | [bilimly.app](https://bilimly.app) |
| 📧 General | [hello@bilimly.app](mailto:hello@bilimly.app) |
| 🛟 Support | [support@bilimly.app](mailto:support@bilimly.app) |
| 🐦 Twitter/X | [@bilimlyapp](https://twitter.com/bilimlyapp) |
| 💼 LinkedIn | [linkedin.com/company/bilimly](https://linkedin.com/company/bilimly) |

</div>

---

<div align="center">

Built with ❤️ for learners across Central Asia

**[⬆ Back to top](#bilimly)**

</div>
