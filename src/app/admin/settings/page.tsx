"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  FileText,
  Globe,
  UploadCloud,
  ImageIcon,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [name, setName] = useState("");
  const [eyebrow, setEyebrow] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [linkedinDisplay, setLinkedinDisplay] = useState("");
  const [github, setGithub] = useState("");
  const [githubDisplay, setGithubDisplay] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogImage, setOgImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.settings) {
          const s = data.settings;
          setName(s.name || "");
          setEyebrow(s.eyebrow || "");
          setLocation(s.location || "");
          setEmail(s.email || "");
          setPhone(s.phone || "");
          setLinkedin(s.linkedin || "");
          setLinkedinDisplay(s.linkedinDisplay || "");
          setGithub(s.github || "");
          setGithubDisplay(s.githubDisplay || "");
          setCvUrl(s.cvUrl || "");
          setProfileImage(s.profileImage || "");
          setMetaTitle(s.metaTitle || "");
          setMetaDescription(s.metaDescription || "");
          setOgImage(s.ogImage || "");
        }
      } catch (err) {
        console.error("Fetch settings error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cv"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "profile") setUploadingProfile(true);
    if (type === "cv") setUploadingCV(true);

    try {
      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.urls && data.urls.length > 0) {
        if (type === "profile") {
          setProfileImage(data.urls[0]);
        } else {
          setCvUrl(data.urls[0]);
        }
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading file");
    } finally {
      if (type === "profile") setUploadingProfile(false);
      if (type === "cv") setUploadingCV(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          eyebrow,
          location,
          email,
          phone,
          linkedin,
          linkedinDisplay,
          github,
          githubDisplay,
          cvUrl,
          profileImage,
          metaTitle,
          metaDescription,
          ogImage,
        }),
      });

      if (res.ok) {
        setSuccessMessage("Site settings saved successfully.");
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to save settings.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setErrorMessage("Network error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#7D6B91]/15 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#272838] flex items-center gap-3">
            <Settings className="w-6 h-6 text-accent-blue" />
            Site Settings &amp; Profile
          </h1>
          <p className="text-sm text-[#5D536B] mt-1 font-medium">
            Manage your personal profile, contact information, social links, and SEO metadata.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white font-semibold text-sm transition-all shadow-accent-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer self-start sm:self-auto"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving Changes..." : "Save Settings"}
        </button>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 p-4 bg-accent-blue/10 border border-accent-blue/20 rounded-xl text-accent-blue text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile & Identity */}
        <div className="bg-white border border-[#7D6B91]/15 shadow-card-subtle rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#7D6B91]/10">
            <User className="w-5 h-5 text-accent-blue" />
            <h2 className="text-lg font-bold text-[#272838]">Identity &amp; Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="AHMAD UBAI DULLAH"
                className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl px-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Professional Title / Eyebrow
              </label>
              <input
                type="text"
                value={eyebrow}
                onChange={(e) => setEyebrow(e.target.value)}
                placeholder="Full Stack Developer"
                className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl px-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#5D536B] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Tuban, Indonesia"
                  className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-3">
                {profileImage ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#7D6B91]/25 bg-[#EEF0F8] flex-shrink-0">
                    <img
                      src={profileImage}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#EEF0F8] border border-[#7D6B91]/25 flex items-center justify-center text-[#5D536B]">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <input
                  type="text"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  placeholder="/profile.png"
                  className="flex-1 bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl px-3 py-2 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#EEF0F8] text-xs font-semibold text-[#272838] cursor-pointer border border-[#7D6B91]/20 shadow-card-subtle transition-all">
                  <UploadCloud className="w-4 h-4 text-accent-blue" />
                  <span>{uploadingProfile ? "..." : "Upload"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "profile")}
                    disabled={uploadingProfile}
                  />
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Curriculum Vitae (CV / Resume PDF)
              </label>
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#5D536B] ml-1" />
                <input
                  type="text"
                  value={cvUrl}
                  onChange={(e) => setCvUrl(e.target.value)}
                  placeholder="/Ahmad_Ubai_Dullah_CV.pdf"
                  className="flex-1 bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl px-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                />
                <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEF0F8] text-xs font-semibold text-[#272838] cursor-pointer border border-[#7D6B91]/20 shadow-card-subtle transition-all">
                  <UploadCloud className="w-4 h-4 text-accent-blue" />
                  <span>{uploadingCV ? "Uploading..." : "Upload PDF"}</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "cv")}
                    disabled={uploadingCV}
                  />
                </label>
              </div>
              <p className="text-xs text-[#5D536B] mt-1.5 font-medium">
                Current PDF file linked to &quot;Download CV&quot; actions on the live website.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Details & Social Links */}
        <div className="bg-white border border-[#7D6B91]/15 shadow-card-subtle rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#7D6B91]/10">
            <Mail className="w-5 h-5 text-accent-blue" />
            <h2 className="text-lg font-bold text-[#272838]">Contact &amp; Channels</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5D536B] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahm.idlah773@gmail.com"
                  className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Phone Number (Discreet Contact Area)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#5D536B] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+62 819-1200-1721"
                  className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <Linkedin className="w-4 h-4 text-[#5D536B] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/ahmadubai"
                  className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                LinkedIn Display Label
              </label>
              <input
                type="text"
                value={linkedinDisplay}
                onChange={(e) => setLinkedinDisplay(e.target.value)}
                placeholder="linkedin.com/in/ahmadubai"
                className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl px-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                GitHub Profile URL
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-[#5D536B] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/ubaidlah773"
                  className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                GitHub Display Label
              </label>
              <input
                type="text"
                value={githubDisplay}
                onChange={(e) => setGithubDisplay(e.target.value)}
                placeholder="github.com/ubaidlah773"
                className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl px-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* SEO & Metadata */}
        <div className="bg-white border border-[#7D6B91]/15 shadow-card-subtle rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#7D6B91]/10">
            <Globe className="w-5 h-5 text-accent-blue" />
            <h2 className="text-lg font-bold text-[#272838]">SEO &amp; Social Meta</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="AHMAD UBAI DULLAH | Full Stack Developer"
                className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl px-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Full Stack Developer based in Tuban, Indonesia specializing in practical, database-driven web platforms, enterprise backends, and robust system workflows."
                className="w-full bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl px-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white resize-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#272838] mb-2">
                Social Share / OG Image URL
              </label>
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4 text-[#5D536B] ml-1" />
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="/brand/ubai-logo-gradient.png"
                  className="flex-1 bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl px-4 py-2.5 text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating / Bottom Action Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white font-semibold text-sm transition-all shadow-accent-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
