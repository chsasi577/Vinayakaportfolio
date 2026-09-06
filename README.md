# WEST STREET YOUTH - మన వీధి వినాయక చవితి వేడుకలు 🌸🪔

A premium, modern, responsive static website created for the local **Vinayaka Chavithi celebrations** organized by **West Street Youth**.

---

## 📁 Project Structure

```
Sasiportfolio/
├── index.html                 # Complete website markup (English & Telugu)
├── css/
│   ├── style.css              # Responsive layout, colors, typography, cards
│   └── animations.css         # Diya flame flicker, Ganesha aura, button shimmer
├── js/
│   ├── main.js                # Sticky navbar, filters, copy UPI ID, lightbox, bell chime
│   └── petals.js              # Falling marigold flower petals particle canvas
├── assets/
│   └── images/
│       ├── ganesha-hero.svg          # Divine Lord Ganesha artwork
│       ├── toran.svg                 # Traditional marigold & mango leaf garland
│       ├── diya.svg                  # Glowing diya icon
│       ├── mandala.svg               # Traditional rangoli mandala watermark
│       ├── placeholder-avatar.svg    # Committee member avatar placeholder
│       ├── placeholder-gallery.svg   # Festival gallery photo placeholder
│       └── qr-placeholder.svg        # UPI QR Code placeholder
└── README.md                  # Customization & hosting guide
```

---

## 🛠️ How to Customize Placeholders

All placeholders in `index.html` are clearly marked for easy replacement:

### 1. Committee Members
Open `index.html` and search for the `<!-- MEMBER 1: PRESIDENT -->` block:
- **Member Name**: Replace `[MEMBER NAME]` with the real person's name.
- **Member Photo**: Add the member's photo inside `assets/images/` (e.g. `president.jpg`) and replace `src="assets/images/placeholder-avatar.svg"` with `src="assets/images/president.jpg"`.
- **Contact**: Replace `[CONTACT NUMBER]` with the committee member's phone number.

### 2. Donation & UPI Payment Details
Search for `<section id="donate"` in `index.html`:
- **UPI QR Code**: Replace `assets/images/qr-placeholder.svg` with your actual Google Pay, PhonePe, or Paytm QR code image screenshot.
- **UPI ID**: Change `[YOUR UPI ID]` to your actual VPA (e.g., `weststreetyouth@okhdfcbank`).
- **Payment Name**: Change `[PAYMENT NAME]` to your committee or person's registered UPI name.
- **Contact Number**: Change `[CONTACT NUMBER]` to the phone number donors can call for payment assistance.
- **WhatsApp Number**: Change `[WHATSAPP NUMBER]` to the committee WhatsApp number where donors send payment screenshots.

### 3. Location & Google Maps
Search for `<section id="contact"` in `index.html`:
- Replace `[LOCATION]` with your street address or landmark (e.g., `West Street, Near Rama Temple, Kakinada`).
- In `<a href="https://maps.google.com/?q=[LOCATION]">`, replace `[LOCATION]` with your exact landmark or Google Maps link.

### 4. Photo Gallery
Add your high-resolution festival photos into `assets/images/` and replace the placeholder images in the `<section id="gallery"` section.

---

## 🚀 How to Run & Host

### Running Locally
Simply double-click `index.html` to open it in any web browser (Chrome, Edge, Safari, Firefox). No servers or build steps are needed!

### Free Hosting Options
1. **GitHub Pages**:
   - Create a repository on GitHub.
   - Push these files to the `main` branch.
   - In repository Settings &rarr; Pages, select `Deploy from a branch: main` &rarr; Save.
2. **Netlify**:
   - Drag and drop the `Sasiportfolio` folder into [Netlify Drop](https://app.netlify.com/drop).
3. **Vercel**:
   - Run `vercel` in terminal or link the GitHub repository on [vercel.com](https://vercel.com).

---

## 🪔 Features Included
- **Lord Ganesha Theme:** Radiant vector Ganesha hero artwork with glowing aura and lotus throne.
- **Festive Motifs:** Traditional hanging mango leaf and marigold garland (Toran) across the header and glowing flickering earthen diyas.
- **Interactive Flower Shower:** Falling marigold petals on canvas with an interactive toggle switch.
- **Synthesized Temple Bell Chime:** Realistic metallic bell sound effect powered by the Web Audio API without needing external MP3 files.
- **One-Click Copy UPI ID:** Instant clipboard copy with feedback notification.
- **Filterable Program Schedule:** Switch between All Events, Daily Puja, Cultural Programs, Annadanam, and Nimajjanam.
- **Full-Screen Photo Lightbox:** Tap/click any photo to view in high resolution.
- **Mobile Responsive:** Designed with touch-friendly navigation drawer, smooth scrolling, and optimized typography for every screen size.
