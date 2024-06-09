
# Project Name: Tubes Reksti

# Overview
## Description
Penelitian ini bertujuan untuk mengembangkan Public Bus Monitoring System yang terintegrasi dan efisien menggunakan teknologi IoT. Dengan memanfaatkan sensor-sensor IoT dan sistem GPS, sistem ini memungkinkan pengguna untuk melacak lokasi bus secara real-time, memperkirakan waktu kedatangan dengan akurat, serta memantau kondisi keramaian bus. Selain itu, integrasi dengan aplikasi website memberikan kemudahan bagi pengguna dalam merencanakan perjalanan dan mengakses informasi transportasi.
Dalam penelitian ini, dirancang sebuah prototipe dan aplikasi website yang mampu melacak lokasi bus dan memonitor jumlah penumpang yang naik dan turun. Sistem ini diharapkan dapat memantau keramaian bus secara keseluruhan, memberikan kontribusi signifikan dalam meningkatkan efisiensi dan kualitas layanan transportasi bus. Dengan demikian, penelitian ini memberikan solusi yang lebih baik bagi pengguna dan operator transportasi dalam mengelola sistem transportasi perkotaan secara menyeluruh.

## Contributors | Kelompok 9
- 18221048 Syafiq Ziyadul Arifin
- 18221072 Hilmi Baskara Radanto
- 18221120 Carissa Tabina Rianda
- 18221138 Tara Chandani Haryono
- 18221162 Ceavin Rufus De Prayer Pruba

## Features
- **Peta Interaktif:** Menampilkan rute dan halte shuttle bus.
- **Informasi Perjalanan:** Menyediakan informasi detail perjalanan mengenai bus dan halte.
- **About Us:** Halaman tentang informasi tim pengembang.

# Technical Description

## User Guide
### Web Deployment
Web Public Bus Monitoring System dapat langsung diakses melalui link deployment berikut: https://tubes-reksti.vercel.app

### Installation
1. Clone repository ini ke komputer Anda:
    ```bash
    git clone https://github.com/username/tubes-reksti.git
    ```
2. Masuk ke direktori proyek:
    ```bash
    cd tubes-reksti
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Jalankan aplikasi:
    ```bash
    npm run dev
    ```

## Project Structure
Berikut adalah struktur folder dan file penting dalam proyek ini:

```
tubes-reksti-master/
│
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
│
├── public/
│   ├── fonts/
│   ├── images/
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
│
├── src/
│   ├── components/
│   │   ├── BusPopUp.tsx
│   │   ├── HaltePopUp.tsx
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── AboutUs.tsx
│   │   ├── Map.tsx
│   │   ├── Report.tsx
│   │   ├── RouteMap.tsx
│   │   └── SplashScreen.tsx
│   ├── services/
│   │   ├── MapDetailsContext.js
│   │   └── PagesContext.js
│   ├── styles/
│   │   ├── SplashScreen.module.css
│   │   └── global.css
│   ├── types/
│   │   └── Shuttle.ts
│   └── utils/
│       └── supabase/
│           └── supabaseClient.ts
│
├── .eslintrc.json
├── .gitignore
├── README.md
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
└── tailwind.config.ts
```

## Technologies Used
### Software
Sistem ini mengembangkan website sebagai dashboard untuk monitoring dengan beberapa framework sebagai berikut:
- **Next.js**: Framework React untuk pengembangan aplikasi web.
- **Tailwind CSS**: Framework CSS untuk styling.
- **TypeScript**: Bahasa pemrograman yang digunakan untuk mengembangkan proyek ini.
- **Supabase**: Backend as a Service (BaaS) untuk database.

### Hardware
Sistem ini juga memanfaatkan beberapa hardware IoT untuk memantau dan mengumpulkan data secara real-time:
- **ESP32:** Mikrokontroler yang digunakan untuk mengelola semua sensor dan modul.
- **SIM800L:** SIM800L memungkinkan perangkat untuk mengirim dan menerima data melalui jaringan seluler.
- **GPS NEO-6M:** Modul GPS yang menyediakan informasi lokasi secara real-time untuk melacak posisi shuttle bus secara akurat.
- **RFID Reader:** Digunakan untuk membaca data dari kartu RFID. RFID reader ini memungkinkan sistem untuk mengidentifikasi crowd penumpang.

