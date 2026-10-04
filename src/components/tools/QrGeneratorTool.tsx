'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ToolWorkspace from '@/components/ui/ToolWorkspace';

type QRType = 'url' | 'text' | 'whatsapp' | 'wifi' | 'email' | 'phone' | 'vcard';

export default function QrGeneratorTool() {
  const [type, setType] = useState<QRType>('url');
  // Type specific fields
  const [url, setUrl] = useState('https://admintools.id');
  const [text, setText] = useState('');
  const [phone, setPhone] = useState('');
  const [waPhone, setWaPhone] = useState('6281234567890');
  const [waMessage, setWaMessage] = useState('Halo, saya ingin bertanya.');
  const [wifiSsid, setWifiSsid] = useState('Kantor-Staff');
  const [wifiPassword, setWifiPassword] = useState('secret123');
  const [wifiAuth, setWifiAuth] = useState('WPA');
  const [emailTo, setEmailTo] = useState('admin@example.com');
  const [emailSubject, setEmailSubject] = useState('');
  const [vcardName, setVcardName] = useState('Budi Santoso');
  const [vcardPhone, setVcardPhone] = useState('+6281234567890');
  const [vcardEmail, setVcardEmail] = useState('budi@example.com');
  const [vcardOrg, setVcardOrg] = useState('Perusahaan XYZ');

  // Options
  const [size, setSize] = useState('300');
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  // Output
  const [dataUrl, setDataUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Compute final payload string
  const getPayload = (): string => {
    switch (type) {
      case 'url':
        return url.startsWith('http') ? url : `https://${url}`;
      case 'text':
        return text || 'AdminTools';
      case 'whatsapp': {
        const cleanPhone = waPhone.replace(/\D/g, '');
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`;
      }
      case 'wifi':
        return `WIFI:T:${wifiAuth};S:${wifiSsid};P:${wifiPassword};;`;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;
      case 'phone':
        return `tel:${phone}`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nFN:${vcardName}\nORG:${vcardOrg}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
      default:
        return 'https://admintools.id';
    }
  };

  useEffect(() => {
    const payload = getPayload();
    const qrSize = parseInt(size, 10) || 300;

    const generate = async () => {
      try {
        const urlOut = await QRCode.toDataURL(payload, {
          width: qrSize,
          margin: 2,
          errorCorrectionLevel: errorCorrection,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });
        setDataUrl(urlOut);

        const svgOut = await QRCode.toString(payload, {
          type: 'svg',
          width: qrSize,
          margin: 2,
          errorCorrectionLevel: errorCorrection,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });
        setSvgString(svgOut);
      } catch (e) {
        console.error('QR code generation error:', e);
      }
    };

    generate();
  }, [
    type,
    url,
    text,
    phone,
    waPhone,
    waMessage,
    wifiSsid,
    wifiPassword,
    wifiAuth,
    emailTo,
    emailSubject,
    vcardName,
    vcardPhone,
    vcardEmail,
    vcardOrg,
    size,
    errorCorrection,
    fgColor,
    bgColor,
  ]);

  const downloadPng = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `qrcode-${type}.png`;
    a.click();
  };

  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-${type}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const leftContent = (
    <div className="space-y-4 text-left">
      <Select
        label="QR Type"
        value={type}
        onChange={(e) => setType(e.target.value as QRType)}
      >
        <option value="url">URL (Tautan Web)</option>
        <option value="text">Text (Teks Bebas)</option>
        <option value="whatsapp">WhatsApp (Nomor & Pesan Otomatis)</option>
        <option value="wifi">WiFi (Akses Jaringan)</option>
        <option value="email">Email</option>
        <option value="phone">Nomor Telepon</option>
        <option value="vcard">vCard (Kontak Digital)</option>
      </Select>

      {/* Dynamic Form per Type */}
      {type === 'url' && (
        <Input
          label="Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      )}

      {type === 'text' && (
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-dark">Isi Teks</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full p-3 text-sm bg-white text-dark border border-border rounded focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Tulis pesan atau catatan teks di sini..."
          />
        </div>
      )}

      {type === 'whatsapp' && (
        <div className="space-y-3">
          <Input
            label="Nomor WhatsApp (dengan kode negara)"
            value={waPhone}
            onChange={(e) => setWaPhone(e.target.value)}
            placeholder="contoh: 6281234567890"
            helperText="Gunakan format internasional tanpa tanda plus (+)."
          />
          <Input
            label="Pesan Awal"
            value={waMessage}
            onChange={(e) => setWaMessage(e.target.value)}
            placeholder="Halo, saya ingin menanyakan..."
          />
        </div>
      )}

      {type === 'wifi' && (
        <div className="space-y-3">
          <Input
            label="Nama Jaringan (SSID)"
            value={wifiSsid}
            onChange={(e) => setWifiSsid(e.target.value)}
            placeholder="Nama WiFi"
          />
          <Input
            label="Kata Sandi WiFi"
            type="password"
            value={wifiPassword}
            onChange={(e) => setWifiPassword(e.target.value)}
            placeholder="Password"
          />
          <Select
            label="Tipe Keamanan"
            value={wifiAuth}
            onChange={(e) => setWifiAuth(e.target.value)}
          >
            <option value="WPA">WPA / WPA2 / WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Tanpa Password (Terbuka)</option>
          </Select>
        </div>
      )}

      {type === 'email' && (
        <div className="space-y-3">
          <Input
            label="Alamat Email Tujuan"
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
            placeholder="nama@domain.com"
          />
          <Input
            label="Subjek Email"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            placeholder="Judul pesan"
          />
        </div>
      )}

      {type === 'phone' && (
        <Input
          label="Nomor Telepon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+6281234567890"
        />
      )}

      {type === 'vcard' && (
        <div className="space-y-3">
          <Input
            label="Nama Lengkap"
            value={vcardName}
            onChange={(e) => setVcardName(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Nomor Telepon"
              value={vcardPhone}
              onChange={(e) => setVcardPhone(e.target.value)}
            />
            <Input
              label="Alamat Email"
              value={vcardEmail}
              onChange={(e) => setVcardEmail(e.target.value)}
            />
          </div>
          <Input
            label="Organisasi / Perusahaan"
            value={vcardOrg}
            onChange={(e) => setVcardOrg(e.target.value)}
          />
        </div>
      )}

      {/* Options Panel inside Left column */}
      <div className="pt-4 border-t border-border space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
          Penyesuaian QR Code
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Ukuran (Pixels)"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="200">200 × 200 px</option>
            <option value="300">300 × 300 px</option>
            <option value="500">500 × 500 px</option>
            <option value="1000">1000 × 1000 px</option>
          </Select>

          <Select
            label="Error Correction"
            value={errorCorrection}
            onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}
          >
            <option value="L">Level L (7% recovery)</option>
            <option value="M">Level M (15% recovery)</option>
            <option value="Q">Level Q (25% recovery)</option>
            <option value="H">Level H (30% recovery)</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Warna QR (Foreground)"
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="h-10 cursor-pointer p-1"
          />
          <Input
            label="Warna Background"
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="h-10 cursor-pointer p-1"
          />
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="space-y-5 text-center">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted text-left">
        Live Preview
      </h3>

      {/* QR Code Canvas / Image Display */}
      <div className="p-4 bg-white border border-border rounded-lg inline-flex items-center justify-center mx-auto shadow-xs">
        {dataUrl ? (
          <img
            src={dataUrl}
            alt="Live QR Code Preview"
            className="w-52 h-52 object-contain"
          />
        ) : (
          <div className="w-52 h-52 flex items-center justify-center text-xs text-muted">
            Membuat QR Code...
          </div>
        )}
      </div>

      <div className="space-y-2 pt-2">
        <Button
          type="button"
          size="md"
          variant="primary"
          className="w-full"
          onClick={downloadPng}
        >
          <Download className="w-4 h-4 mr-1.5" />
          Download PNG
        </Button>
        <Button
          type="button"
          size="md"
          variant="outline"
          className="w-full"
          onClick={downloadSvg}
        >
          <Download className="w-4 h-4 mr-1.5" />
          Download SVG (Vector)
        </Button>
      </div>

      <p className="text-[11px] text-muted text-left border-t border-border pt-3">
        QR code dibuat langsung di perangkat browser Anda menggunakan rendering SVG dan Canvas standar.
      </p>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
