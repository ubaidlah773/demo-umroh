# ==========================================================
# Skrip Otomatis Build APK Warung Mak Wi untuk Windows
# ==========================================================

Write-Host "========================================" -ForegroundColor Green
Write-Host "  MEMULAI PROSES BUILD APK WARUNG MAK WI " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# 1. Cek apakah flutter tersedia
if (-not (Get-Command "flutter" -ErrorAction SilentlyContinue)) {
    Write-Host "[X] ERROR: Flutter belum terpasang di sistem PATH Windows Anda." -ForegroundColor Red
    Write-Host ""
    Write-Host "Solusi:" -ForegroundColor Yellow
    Write-Host "1. Unduh Flutter SDK dari: https://docs.flutter.dev/get-started/install/windows/mobile"
    Write-Host "2. Ekstrak ke C:\src\flutter dan tambahkan C:\src\flutter\bin ke PATH Windows."
    Write-Host "3. Pastikan Android Studio / Android SDK terpasang."
    Write-Host ""
    Write-Host "ATAU gunakan Solusi Cloud GitHub Actions:" -ForegroundColor Cyan
    Write-Host "- Cukup lakukan 'git push' ke repositori GitHub Anda."
    Write-Host "- GitHub Actions akan meng-compile file APK secara otomatis dalam 2 menit!"
    Write-Host ""
    Read-Host "Tekan Enter untuk keluar..."
    exit 1
}

Write-Host "[1/3] Mengambil paket dependensi (flutter pub get)..." -ForegroundColor Cyan
flutter pub get
if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] Gagal mengambil dependensi." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2/3] Menjalankan pengujian logika (flutter test)..." -ForegroundColor Cyan
flutter test
if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] Peringatan: Ada pengujian yang gagal, tetap melanjutkan..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[3/3] Meng-compile APK Rilis (flutter build apk --release)..." -ForegroundColor Cyan
Write-Host "Proses ini memakan waktu sekitar 1-3 menit..." -ForegroundColor Gray
flutter build apk --release

if ($LASTEXITCODE -eq 0) {
    $apkPath = "build\app\outputs\flutter-apk\app-release.apk"
    if (Test-Path $apkPath) {
        Write-Host ""
        Write-Host "====================================================" -ForegroundColor Green
        Write-Host "  SELAMAT! FILE APK BERHASIL DIBUAT DENGAN SUKSES!  " -ForegroundColor Green
        Write-Host "====================================================" -ForegroundColor Green
        Write-Host "Lokasi file APK:" -ForegroundColor Yellow
        Write-Host (Resolve-Path $apkPath) -ForegroundColor White
        Write-Host ""
        Write-Host "Membuka folder lokasi APK di File Explorer..." -ForegroundColor Cyan
        explorer.exe /select,(Resolve-Path $apkPath)
    }
} else {
    Write-Host ""
    Write-Host "[X] Gagal meng-compile APK. Periksa pesan error di atas." -ForegroundColor Red
}
