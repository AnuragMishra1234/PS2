# MICROGUARD — Deployment & Presentation Guide
**Problem Statement ID:** 26233 | **MoFPI**  
**Project:** Inline Microbial Contamination Detection Using Hyperspectral Edge Sensors

This guide covers all deployment options for the **MICROGUARD** interactive web prototype:
1. [Option 1: 1-Click Cloud Deployment (Vercel — Recommended for Judges)](#option-1-1-click-cloud-deployment-vercel--recommended)
2. [Option 2: Netlify (Drag-and-Drop or CLI)](#option-2-netlify-drag--drop-or-cli)
3. [Option 3: GitHub Pages](#option-3-github-pages)
4. [Option 4: Offline Local Network / Hotspot Demo (Hackathon Hall Setup)](#option-4-offline-local-network--hotspot-demo-hackathon-hall)
5. [Option 5: Raspberry Pi / Jetson Edge Deployment (Kiosk Mode)](#option-5-raspberry-pi--jetson-edge-kiosk-mode)
6. [Option 6: Docker Containerization](#option-6-docker-containerization)

---

## Pre-requisites & Verification

Ensure dependencies are installed and the production bundle builds without errors:

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Test production build
npm run build
```

This compiles optimized static assets into the `dist/` folder:
- `dist/index.html`
- `dist/assets/index-[hash].js`
- `dist/assets/index-[hash].css`

---

## Option 1: 1-Click Cloud Deployment (Vercel — Recommended)

Vercel provides a permanent, free `https://*.vercel.app` URL with global SSL and CDN, ideal for sharing via QR code with hackathon evaluators.

### Method A: Via Vercel CLI (Instant from terminal)

```bash
# Install / run Vercel CLI directly
npx vercel
```

1. Log in via GitHub/Email if prompted.
2. Set up and deploy `e:\sih-ps2`:
   - **Set up project?** `Y`
   - **Which scope?** (Select your account)
   - **Link to existing project?** `N`
   - **Project name?** `microguard-mofpi-ps26233`
   - **Directory?** `./`
   - **Want to modify settings?** `N` (Vite is auto-detected)
3. To deploy directly to production:
   ```bash
   npx vercel --prod
   ```

### Method B: Via GitHub Repository
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete microguard prototype"
   git branch -M main
   git remote add origin https://github.com/<your-username>/microguard-sih.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Framework Preset: **Vite**
5. Root Directory: `./`
6. Click **Deploy**.

---

## Option 2: Netlify (Drag & Drop or CLI)

### Method A: Drag and Drop (No Git required)
1. Run `npm run build` in your project folder.
2. Log into [app.netlify.com](https://app.netlify.com).
3. Drag the generated **`dist`** folder into the Netlify "Sites" drop-zone.
4. Your site is live immediately with a shareable URL.

### Method B: Netlify CLI
```bash
# Build production bundle
npm run build

# Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

---

## Option 3: GitHub Pages

1. Install `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. In `vite.config.ts`, add the `base` path matching your repo name:
   ```ts
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/<your-repo-name>/', // e.g. '/microguard/'
   })
   ```
3. Add deployment scripts in `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run:
   ```bash
   npm run deploy
   ```

---

## Option 4: Offline Local Network / Hotspot Demo (Hackathon Hall)

> [!TIP]
> **Hackathon Survival Tip:** Hackathon venues often suffer from overloaded, congested, or blocked Wi-Fi. Running the app locally over your laptop's Wi-Fi hotspot guarantees a zero-latency, 100% reliable demo.

### Step 1: Start the host server
Run Vite bound to all network interfaces (`0.0.0.0`):

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

Or using the production preview server:

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

### Step 2: Connect Devices
Terminal output will display:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```
1. Connect the judge's phone/tablet or your presentation screen to the same Wi-Fi / mobile hotspot.
2. Open `http://<your-laptop-ip>:5173/` in any mobile or desktop browser.
3. Generate a QR code using a free tool (e.g. `qr-code-generator.com`) pointing to this URL and stick it on your booth!

---

## Option 5: Raspberry Pi / Jetson Edge (Kiosk Mode)

To run MICROGUARD as an embedded industrial display on the physical prototype rig:

### Step 1: Setup Node.js on Raspberry Pi (OS 64-bit)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
```

### Step 2: Clone and build
```bash
git clone <repo-url> microguard
cd microguard
npm install
npm run build
```

### Step 3: Install lightweight static server
```bash
sudo npm install -g serve
```

### Step 4: Auto-start Kiosk on Boot (`/etc/xdg/autostart/kiosk.desktop`)
```ini
[Desktop Entry]
Type=Application
Name=MicroGuard Kiosk
Exec=bash -c "serve -s /home/pi/microguard/dist -l 5000 & sleep 3 && chromium-browser --kiosk --noerrdialogs --disable-infobars http://localhost:5000"
```

---

## Option 6: Docker Containerization

To deploy as a portable, self-contained container:

### `Dockerfile`
Create a `Dockerfile` in the project root:

```dockerfile
# Stage 1: Build static assets
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### `nginx.conf`
```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

### Build and Run
```bash
# Build image
docker build -t microguard:latest .

# Run container
docker run -d -p 8080:80 --name microguard-app microguard:latest

# Open browser at http://localhost:8080
```

---

## Quick Reference Commands

| Goal | Command |
| :--- | :--- |
| **Development Server** | `npm run dev` |
| **LAN Shared Server** | `npm run dev -- --host 0.0.0.0 --port 5173` |
| **Production Build** | `npm run build` |
| **Local Preview of Build** | `npm run preview -- --host 0.0.0.0 --port 4173` |
| **Deploy to Vercel** | `npx vercel --prod` |
| **Deploy to Netlify** | `npx netlify deploy --prod --dir=dist` |

---

## Judge Presentation Checklist

- [ ] Verify both `[ VIEW HARDWARE ]` and `[ RUN SOFTWARE DEMO ]` load smoothly.
- [ ] Test `[ PLAY HARDWARE FLOW ]` (ensure 7-second animation completes).
- [ ] Test `[ START SCAN ]` in Software Demo (verify live spectral graph morphs and risk counter updates).
- [ ] Test flagged product rejection (verify `⚠ CONTAMINATION RISK DETECTED` alert banner triggers and servo diverter animates).
- [ ] Have the offline local hotspot link or Vercel URL saved on your presentation device.
