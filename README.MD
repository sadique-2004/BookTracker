# 📚 Book Review & Reading Tracker

🔗 **Live Demo:** [View App](https://book-tracker-5yz5.vercel.app/)

A powerful reading tracker with built-in review and annotation tools — designed for readers who want more than just logging books.

This app combines a reading log with interactive UI features like 3D visual streaks, timestamped notes, emoji reactions, and genre clouds to give users a full-on reading companion that’s both functional and fun.

---

## ✨ Core Features

- ✅ **Streak Badge Tracker**  
  Track your daily reading habit visually using a dynamic 3D streak badge.

- 📕 **Step-Based Review Reader**  
  Reviews broken into clean steps for easier reading, like a guided flow.

- 📝 **Timestamped Highlights**  
  Add notes tied to moments in the book — perfect for quotes, ideas, or reminders.

- 😄 **Live Emoji Reactions**  
  React to reviews and quotes in real-time with a quick emoji burst.

- 📚 **Smart Book Suggestions**  
  Hover on related titles to get floating tooltips of similar reads.

- 🌗 **Dark/Light Mode**  
  Switch themes instantly with built-in support.

- ☁️ **Animated Word Cloud**  
  A dynamic word cloud that reflects your favorite genres and topics.

- 🔐 **Clerk Authentication**  
  User login and session management handled securely.

---

## ⚙️ Tech Stack

| Tech | Purpose |
|------|---------|
| `React` | Core UI |
| `Three.js` + `@react-three/fiber` | 3D visualizations |
| `@react-three/drei` | 3D helpers and effects |
| `Chart.js` + `react-chartjs-2` | Visual stats (e.g. streak analytics) |
| `Clerk` | Authentication |
| `Typed.js` | Typewriter animation |
| `Lucide-react` | Icon system |
| `React Router DOM` | Routing/navigation |

---

## 📦 Dependencies

```json
{
  "@clerk/clerk-react": "^5.32.0",
  "@react-three/drei": "^10.3.0",
  "@react-three/fiber": "^9.1.2",
  "@types/three": "^0.177.0",
  "chart.js": "^4.4.1",
  "lucide-react": "^0.522.0",
  "react": "^19.1.0",
  "react-chartjs-2": "^5.2.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.2",
  "three": "^0.177.0",
  "typed.js": "^2.1.0"
}
``
