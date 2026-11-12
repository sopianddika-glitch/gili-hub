# Laporan inisialisasi Gili Hub

Tanggal validasi: 12 November 2026 (Asia/Makassar).
Lokasi proyek: `/workspace/gili-hub`.

## A. Environment

| Komponen | Hasil |
| --- | --- |
| Sistem operasi | Debian GNU/Linux 13, Linux x86_64 |
| Node.js | 24.22.1; baseline proyek Node 24 LTS |
| npm | 11.9.0 |
| Git | 2.52.0 |
| Framework | Next.js 16.4.6, App Router |
| React / React DOM | 19.3.0 |
| TypeScript | 5.9.3, strict, aplikasi TypeScript saja |
| Tailwind CSS | 4.3.3, integrasi Turbopack resmi dari scaffold |
| ESLint | 9.39.5, flat config dengan aturan Next/React/TypeScript/accessibility |
| Ikon | Lucide React 1.72.0 |
| Browser validasi | Chromium headless melalui Playwright |
| Status | Development berjalan pada port 3000; production build berhasil |

Dokumentasi instalasi Next.js dan metadata kompatibilitas npm diperiksa sebelum scaffold. Node memenuhi minimum Next.js >=20.9. ESLint 10 sempat diperiksa, tetapi plugin import, React, dan accessibility bawaan Next masih mendeklarasikan dukungan sampai ESLint 9. Karena itu versi 9.39.5 dipakai untuk kompatibilitas; npm menandai lini ini deprecated. Upgrade lint perlu dilakukan bersama dukungan plugin, tanpa memaksa peer dependencies. Instalasi bersih menggunakan `npm ci` berhasil.

Direktori home environment dibatasi. Cache npm dan konfigurasi create-next-app dialihkan ke `/tmp` saat setup, tanpa mengubah home atau membuat konfigurasi mesin tersebut sebagai ketergantungan proyek.

## B. Struktur dan keputusan arsitektur

Struktur lengkap ada di README utama. Folder yang benar-benar tersedia:

```text
gili-hub/
├── docs/
├── public/images/
├── src/
│   ├── app/api/health/
│   ├── assets/fonts/
│   ├── components/{ui,layout,shared}/
│   ├── features/{places,categories,search,maps}/
│   ├── lib/
│   ├── types/
│   ├── data/
│   ├── config/
│   └── hooks/
├── .env.example
├── .gitignore
├── .nvmrc
├── AGENTS.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

- `app` mengatur route, metadata, dan komposisi halaman; `/api/health` memakai Route Handler.
- `components` berisi presentasi yang dapat digunakan ulang. `features` memisahkan domain direktori, kategori, pencarian, dan peta.
- `types` menyimpan kontrak domain; `data` hanya berisi taksonomi kategori. Belum ada data bisnis.
- `lib`, `hooks`, serta domain tanpa implementasi memiliki dokumentasi singkat sebagai tempat pengembangan berikutnya.
- Integrasi database/auth/storage nantinya berada di adapter/repository server; layanan domain menangani business logic, terpisah dari UI dan Route Handler. Belum dibuat abstraksi layanan yang belum diperlukan.
- Font dan gambar disimpan lokal. Server Components menjadi default; aplikasi tidak menambahkan state/client hooks. Menu mobile memakai HTML native.
- Metadata halaman starter memakai `noindex, nofollow` sampai persiapan peluncuran selesai.

Git lokal diinisialisasi dengan branch `main`. Commit awal disiapkan untuk sinkronisasi ke GitHub sesuai instruksi berikutnya dari pengguna. Remote `origin` diarahkan ke `https://github.com/sopianddika-glitch/gili-hub.git`; repository remote belum berhasil dibuat karena keterbatasan izin integrasi. Belum ada push/deployment. `.env.example` diikutkan, sedangkan environment rahasia, `node_modules`, `.next`, dan artefak pengujian diabaikan.

## C. Hasil validasi

| Pemeriksaan yang dijalankan | Hasil |
| --- | --- |
| `npm ci` | Lulus: instalasi ulang dari lockfile |
| `npm run typecheck` | Lulus: route type generation dan `tsc --noEmit` |
| `npm run lint` | Lulus: nol error dan warning |
| `npm run build` | Lulus: production build, halaman `/` statis, health route dinamis |
| `npm run dev -- --hostname 0.0.0.0` | Berjalan, halaman HTTP 200 pada localhost:3000 |
| `npm start -- --hostname 127.0.0.1 --port 3001` | Dijalankan dan diuji, halaman HTTP 200 |
| `GET /api/health` pada development dan production | HTTP 200, JSON `{"status":"ok","service":"gili-hub"}`, `Cache-Control: no-store` |
| `POST /api/health` pada kedua server | HTTP 405 sesuai method yang didukung |
| Tailwind | Warna/tinggi header terverifikasi melalui computed styles browser |
| Browser desktop dan mobile | Screenshot diperiksa pada 1440px dan 390px |
| Responsive overflow | Tidak ada horizontal overflow pada 320, 390, 768, 1024, dan 1440px |
| Menu mobile | Buka dengan keyboard dan navigasi anchor berhasil |
| Skip link | Dapat difokuskan dan menuju konten utama dengan keyboard |
| Placeholder | Search dan delapan kategori disabled; keterangan coming soon tampil |
| Aset dan anchor | Hero image termuat; target semua anchor tersedia |
| Runtime browser | Nol page error/console error pada production dan development melalui localhost |
| Security headers | nosniff, referrer policy, dan frame DENY terverifikasi; X-Powered-By tidak ada |
| `npm audit --omit=dev --json` | Nol kerentanan dependensi produksi yang dilaporkan |
| axe-core 4.10.3 | Nol pelanggaran otomatis WCAG 2 A/AA dan 2.1 A/AA pada desktop/mobile; bukan sertifikasi aksesibilitas |

Axe menandai satu pemeriksaan link-in-text-block pada logo beranda di footer untuk peninjauan manual pada masing-masing viewport, karena rasio kontras tidak dapat dihitung otomatis akibat overlap elemen. Logo merupakan tautan mandiri yang terpisah dari tagline, dengan simbol dan nama merek yang terlihat jelas; screenshot serta navigasi keyboard diperiksa. Tidak dilakukan uji pembaca layar atau seluruh kombinasi browser/perangkat.

Batasan development yang teramati: HMR tersambung di `http://localhost:3000`, sedangkan URL `http://127.0.0.1:3000` menghasilkan error handshake WebSocket di Chromium. Halaman dan API HTTP tetap merespons pada kedua alamat. Gunakan URL localhost yang sudah diuji untuk development; ini tidak memengaruhi production preview. Tidak ada perubahan pada file internal framework untuk menutupi kondisi ini.

Bukti lokal (diabaikan Git): `artifacts/desktop.png`, `artifacts/mobile.png`, `artifacts/mobile-menu.png`, dan `artifacts/validation.json`. Pemeriksaan otomatis menggunakan Playwright yang tersedia di environment, tanpa menambah dependency browser testing ke proyek.

## D. Menjalankan proyek

```bash
cd /workspace/gili-hub
npm ci
npm run dev
# Buka http://localhost:3000

npm run typecheck
npm run lint
npm run build
npm start
```

Tidak ada variabel environment wajib pada fase pertama. Health endpoint hanya menguji liveness aplikasi, bukan database atau layanan eksternal.

## E. Urutan fase berikutnya

1. Rancang schema place/category, provenance data, proses verifikasi, dan kepemilikan konten.
2. Rancang migrasi, role dan izin akses, lalu integrasikan Supabase untuk database/auth/storage.
3. Bangun direktori read-only dan detail bisnis dengan data terverifikasi serta empty/loading/error states.
4. Tambahkan search/filter/pagination, kemudian MapLibre.
5. Implementasikan autentikasi, administrasi, dan pengelolaan bisnis dengan otorisasi yang diuji.
6. Tambahkan inquiry/reservation links dan ulasan setelah desain moderasi.
7. Tambahkan Bahasa Indonesia, observability, persiapan SEO publik, dan pipeline deployment.

Gambar pantai merupakan mood image dekoratif, belum diverifikasi sebagai foto Gili Trawangan. Sumber/lisensinya dicatat di `public/images/README.md`; ganti dengan foto lokal berlisensi sebelum peluncuran publik. Belum ada integrasi layanan eksternal, booking/payment, atau informasi bisnis/medis/transportasi buatan.

## Catatan akses dari perangkat pengguna

Pemeriksaan HTTP dan browser di atas dilakukan di environment cloud. `localhost:3000` hanya berlaku pada mesin yang menjalankan server, sehingga URL itu tidak otomatis dapat dibuka dari komputer pengguna. Percobaan jalur preview environment mengalami timeout `relay could not open browser port 4173: timed out waiting for relay readiness`. Pembukaan panel browser melalui app juga hanya berstatus queued, belum merupakan bukti akses pengguna berhasil.

Sebagai alternatif, `artifacts/gili-hub-preview.html` menyediakan tampilan statis dengan CSS, gambar, dan font tertanam, tanpa JavaScript atau koneksi server. `artifacts/gili-hub-source.zip` berisi source untuk menjalankan Next.js di perangkat sendiri. Keduanya bukan deployment publik dan tidak dimasukkan ke Git.

## Persiapan GitHub

Akun terautentikasi pada GitHub connector dan GitHub CLI adalah `sopianddika-glitch`. Pembuatan repository private `gili-hub` dicoba melalui GraphQL dan REST API resmi menggunakan koneksi yang tersedia. Keduanya ditolak dengan `Resource not accessible by integration` (`HTTP 403` pada REST). Percobaan browser juga tidak berhasil karena runtime browser tidak dapat membaca requirements. Tidak ada repository remote yang berhasil dibuat, dan tidak ada source yang diunggah.

Source dipersiapkan sebagai commit awal lokal; pengecekan staging memastikan hanya 36 file source/dokumentasi/konfigurasi yang diikutkan. Tidak ada `node_modules`, `.next`, artefak preview, atau environment rahasia. Pemindaian pola kredensial umum tidak menemukan kecocokan. Untuk melanjutkan, pemilik akun perlu membuat repository kosong private bernama `gili-hub` atau menyediakan koneksi yang memiliki izin membuat repository. Push masih memerlukan izin contents/write untuk repository yang baru dibuat tersebut.
