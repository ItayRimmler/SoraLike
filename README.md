
# SoraLike – AdGPT Frontend Developer Task

This is the submission for the **Frontend Developer Interview Task** for [AdGPT.com](http://adgpt.com/), inspired by Sora's image/video interface. The project simulates a rich, interactive frontend user experience for exploring, generating, and interacting with media (images and videos) in various aspect ratios.

## 🚀 Features

### 1. Media Display Interface
- Responsive media viewer supporting 3 aspect ratios:
  - 📱 9:16 (Vertical)
  - 🔳 1:1 (Square)
  - 🖥️ 16:9 (Wide)
- Toggle aspect ratios using UI buttons or side tabs
- Smooth transitions with optional prefetching

### 2. Prompt-to-Image Generation
- Input field for prompts (ChatGPT-style)
- Selectable aspect ratio before generation
- Integration with OpenAI's DALL·E API (or mocked)
- Render generated images in the selected format

### 3. Video Handling
- Display and play video thumbnails
- Autoplay on hover, loop enabled
- Aspect ratio-aware video rendering

### 4. Explore (AdFeed) Experience
- Infinite scroll grid layout
- Mixed media (images/videos) in all ratios
- Placeholder/mock content provided
- Fluid and aesthetic layout inspired by Sora

### 5. Media Interaction
- Click an image to:
  - View in full size
  - Edit its generation prompt and regenerate
- Save modified prompts/images locally (state or `localStorage`)

---

## 🛠️ Tech Stack

- **Framework:** React + Next.js (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Zustand (or other)
- **Animations:** Framer Motion
- **API Integration:** OpenAI DALL·E (or mock)
- **Deployment:** [Vercel](https://vercel.com/) or [Render](https://render.com/)

---

## 📦 Installation & Running Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/ItayRimmler/SoraLike.git
   cd SoraLike
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Visit:**
   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure (Simplified)

```
/app             - Next.js app directory (App Router)
/components      - Reusable UI components (MediaCard, PromptInput, etc.)
/hooks           - Custom React hooks
/store           - Zustand store for global state
/public          - Static assets
/styles          - Tailwind and global styles
/utils           - Utility functions (e.g. API helpers)
```

---

## 📸 Screenshots

(Add screenshots here to show UI/UX polish.)

---

## 📞 Final Submission

Submitted by: **Itay Rimmler**  
Live demo ready via Zoom/Google Meet  
Email: itayrimmler@gmail.com  
Repository: [https://github.com/ItayRimmler/SoraLike](https://github.com/ItayRimmler/SoraLike)

---

## 📄 License

This project is for evaluation purposes only and not intended for commercial use.
