import React, { useEffect, useRef, useState } from "react";
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'
import {
  FaShieldAlt,
  FaTachometerAlt,
  FaIdCard,
  FaExclamationTriangle,
  FaUserShield,
  FaEnvelope,
  FaShoppingBag,
  FaMoneyBill,
  FaStar,
  FaUsers,
  FaMapMarkerAlt,
  FaBuilding,
  FaGlobe,
  FaPhone,
  FaKey,
  FaLock,
  FaUser,
  FaSave,
  FaRedo,
  FaIdBadge,
  FaCalendarPlus,
  FaSignInAlt,
  FaUserTimes,
  FaTimes
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function Admin() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("overview");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [profile, setProfile] = useState({
    _id: "AJE93N94J4N9M92M345EJNHWI2",
    name: "Abdullah",
    email: "abdullahworld@gmail.com",
    role: "admin",
    phone: "0300-0000000",
    bio: "Tried his best to become Full Stack Developer",
    location: "TTS_FSD_PAKISTAN",
    company: "Techco",
    website: "abdullahworld.com",
    avatarUrl: "https://images.unsplash.com/photo-1738999635642-bf98c1a26f17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
    createdAt: "2022-07-04",
    lastLogin: new Date().toISOString().slice(0, 10),
  });



  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        if (!mounted) return;
        setLoading(false);
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || e.message || "Failed to load");
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const maskEmail = (e) => {
    if (!e) return "";
    const [user, domain] = e.split("@");
    if (!domain) return e;
    const masked = user.length <= 2 ? user[0] + "*" : user.slice(0, 2) + "***";
    return `${masked}@${domain}`;
  };

  const shortDate = (d) => {
    if (!d) return "";
    try {
      return new Date(d).toLocaleString().slice(0, 10);
    } catch {
      return d;
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setError("Password updating Failed!");
    toast.error("Password updating Failed!");

    setTimeout(() => {
      window.location.href = '/admin';
    }, 2000)
  }
  const handleDangerDelete = async () => {
    setError("Failed to delete account");
    toast.error("Failed to delete account");

  };


  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Spiral size="80" speed="0.9" color="black" />
      </div>
    );
  }

  return (
    <div >

      <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-blue-600 text-xl" />
            <h1 className="text-lg font-semibold">
              Admin Profile
            </h1>
          </div>
        </div>
        {error.length > 0 && (

          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}



      </header>


      <nav className="mx-auto max-w-6xl px-4 mt-4">
        <ul className="flex flex-wrap gap-2">
          <li>
            <button
              onClick={() => setTab("overview")}
              className={`px-3 py-2 rounded-full border text-sm flex items-center gap-2  ${tab === "overview"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white  "
                }`}
            >
              <FaTachometerAlt />
              Overview
            </button>
          </li>
          <li>
            <button
              onClick={() => setTab("details")}
              className={`px-3 py-2 rounded-full border text-sm flex items-center gap-2  ${tab === "details"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white  "
                }`}
            >
              <FaIdCard />
              Details
            </button>
          </li>
          <li>
            <button
              onClick={() => setTab("danger")}
              className={`px-3 py-2 rounded-full border text-sm flex items-center gap-2  ${tab === "danger"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white  "
                }`}
            >
              <FaExclamationTriangle />
              Danger
            </button>
          </li>
        </ul>
      </nav>


      {tab === "overview" && (
        <section className="mx-auto max-w-6xl px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-1 rounded-2xl border p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profile.avatarUrl || "/placeholder-avatar.png"}
                  alt="Avatar"
                  className="h-20 w-20 rounded-full object-cover border"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-lg">
                  {profile.name || "—"}
                </h3>
                <p className="text-sm text-neutral-600 ">
                  <FaUserShield className="mr-1.5" />
                  {profile.role || "admin"}
                </p>
                <p className="text-sm text-neutral-600 ">
                  <FaEnvelope className="mr-1.5" />
                  {maskEmail(profile.email)}
                </p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border p-3">
                <dt >Account Created</dt>
                <dd className="font-medium">
                  {shortDate(profile.createdAt)}
                </dd>
              </div>
              <div className="rounded-xl border p-3">
                <dt >Last Login</dt>
                <dd className="font-medium">
                  {shortDate(profile.lastLogin)}
                </dd>
              </div>
              <div className="rounded-xl border p-3">
                <dt >Two-Factor</dt>
                <dd className="font-medium">
                  {twoFAEnabled ? "Enabled" : "Disabled"}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setPasswordOpen(true)}
                className="px-3 py-2 rounded-lg border text-sm"

              >
                <FaKey className="mr-2" />
                Change Password
              </button>
              <button
                onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm "

              >
                <FaLock className="mr-2" />
                {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>
          </div>


          <div className="lg:col-span-2 rounded-2xl border p-4 bg-white">
            <h4 className="font-semibold mb-3">Quick Stats</h4>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <span className=" text-sm">Orders</span>
                  <FaShoppingBag />
                </div>
                <div className="mt-2 text-2xl font-bold">1284</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <span className=" text-sm">Revenue</span>
                  <FaMoneyBill />
                </div>
                <div className="mt-2 text-2xl font-bold">92,410-Rs</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <span className=" text-sm">Avg. Rating</span>
                  <FaStar />
                </div>
                <div className="mt-2 text-2xl font-bold">4.7</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <span className=" text-sm">Customers</span>
                  <FaUsers />
                </div>
                <div className="mt-2 text-2xl font-bold">3560</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">About</h4>
              <p className="text-sm  leading-6">
                {profile.bio ||
                  "No bio added yet."}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border bg-white">
                <FaMapMarkerAlt />
                <span >
                  {profile.location || "Unknown"}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border bg-white">
                <FaBuilding />
                <span >
                  {profile.company || "—"}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border bg-white">
                <FaGlobe />
                <span >
                  {profile.website || "—"}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border bg-white">
                <FaPhone />
                <span >
                  {profile.phone || "—"}
                </span>
              </span>
            </div>
          </div>
        </section>
      )}


      {tab === "details" && (
        <section className="mx-auto max-w-6xl px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 rounded-2xl border p-4 bg-white">
            <h4 className="font-semibold mb-4">Edit Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 " />
                  <input
                    className="w-full rounded-xl border pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                    value={profile.name || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 " />
                  <input
                    className="w-full rounded-xl border pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-600 "
                    value={profile.email || ""}
                    disabled
                  />
                </div>
                <p className="text-xs  mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Phone
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 " />
                  <input
                    className="w-full rounded-xl border pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                    value={profile.phone || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Website
                </label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-3 " />
                  <input
                    className="w-full rounded-xl border pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                    value={profile.website || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, website: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Company
                </label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-3 " />
                  <input
                    className="w-full rounded-xl border pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                    value={profile.company || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, company: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Location
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 " />
                  <input
                    className="w-full rounded-xl border pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                    value={profile.location || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium  mb-1">
                Bio
              </label>
              <textarea
                rows={5}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Write a short bio…"
                value={profile.bio || ""}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>

            <div className="mt-6 flex items-center gap-2">
              <button
                className="px-4 py-2 rounded-xl bg-blue-600 text-white "

              >
                <FaSave className="mr-2" />
                Save Changes
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-xl border"

              >
                <FaRedo className="mr-2" />
                Reset
              </button>
            </div>
          </div>


          <div className="rounded-2xl border p-4 bg-white">
            <h4 className="font-semibold mb-4">Meta</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FaIdBadge />
                  <span >User ID</span>
                </div>
                <span className="font-mono text-xs  max-w-[60%] ">
                  {profile._id || "—"}
                </span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FaUserShield />
                  <span >Role</span>
                </div>
                <span className="font-mono text-xs  max-w-[60%] ">
                  {profile.role || "—"}
                </span>
              </li>

              <li className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FaCalendarPlus />
                  <span >first Login</span>
                </div>
                <span className="font-mono text-xs  max-w-[60%] ">
                  {profile.createdAt || "—"}
                </span>
              </li>

              <li className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FaSignInAlt />
                  <span >last Login</span>
                </div>
                <span className="font-mono text-xs  max-w-[60%] ">
                  {profile.lastLogin || "—"}
                </span>
              </li>
            </ul>
          </div>
        </section>
      )}


      {tab === "danger" && (
        <section className="mx-auto max-w-6xl px-4 mt-6">
          <div className="rounded-2xl border p-4 bg-white">
            <h4 className="font-semibold text-red-600 flex items-center gap-2">
              <FaExclamationTriangle />
              Danger Zone
            </h4>
            <p className="text-sm text-neutral-600 mt-2">
              Deleting your account will remove all personal data and revoke access.
              This action cannot be undone.
            </p>
            <div className="mt-4">
              <button
                onClick={() => setConfirmOpen(true)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white"

              >
                <FaUserTimes className="mr-2" />
                Delete My Account
              </button>
            </div>
          </div>
        </section>
      )}


      {passwordOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPasswordOpen(false)}

          />
          <div className="relative z-50 w-full max-w-lg mx-4 rounded-2xl border bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h5 className="font-semibold">Change Password</h5>
              <button
                onClick={() => setPasswordOpen(false)}
                className="p-2 rounded"


              >
                <FaTimes />
              </button>
            </div>
            <form className="mt-3 space-y-4" onSubmit={handlePasswordChange} >
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Repeat new password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button

                  onClick={() => setPasswordOpen(false)}
                  className="px-4 py-2 rounded-xl border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white"
                >
                  <FaKey className="mr-2" />
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {confirmOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setConfirmOpen(false)}

          />
          <div className="relative z-50 w-full max-w-lg mx-4 rounded-2xl border bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-red-600">Delete Account</h5>
              <button
                onClick={() => setConfirmOpen(false)}
                className="p-2 rounded"

              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-6">
              <p className=" mb-4">
                This action cannot be undone. This will permanently delete your account and all associated data.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-800">
                  <FaExclamationTriangle className="mr-2" />
                  To confirm deletion, type <strong>DELETE</strong> in the field below
                </p>
              </div>

              <label className="block text-sm font-medium  mb-2">
                Type DELETE to confirm
              </label>
              <input
                type="text"
                id="deleteConfirm"
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 "
                placeholder="Type DELETE here..."
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button

                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>
              <button

                onClick={() => {
                  handleDangerDelete()
                  const input = document.getElementById('deleteConfirm');
                  if (input.value === 'DELETE') {
                    setConfirmOpen(false);
                    setTimeout(() => {
                      window.location.href = '/dashboard';
                    }, 2000);
                  } else {
                    setError('Please type DELETE to confirm');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white "
              >
                <FaUserTimes className="mr-2" />

                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

