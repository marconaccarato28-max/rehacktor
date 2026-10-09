import {
  createElement,
  useEffect,
  useState,
} from "react";

import { Navigate } from "react-router-dom";

import { supabase } from "../services/supabase.js";
import { useAuth } from "../context/AuthContext.jsx";

function ProfilePage() {
  const { user, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] =
    useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setUsername(
      user.user_metadata?.username || ""
    );

    setAvatarPreview(
      user.user_metadata?.avatar_url || ""
    );
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-base-200 p-6">
        <p className="text-center">
          Caricamento...
        </p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  async function handleProfileSubmit(event) {
    event.preventDefault();

    if (!username.trim()) {
      alert("Inserisci uno username");
      return;
    }

    setSaving(true);

    const { error } =
      await supabase.auth.updateUser({
        data: {
          username: username.trim(),
          avatar_url:
            user.user_metadata?.avatar_url || "",
        },
      });

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    alert("Profilo aggiornato");
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Seleziona un file immagine");
      event.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("L'immagine deve essere inferiore a 1 MB");
      event.target.value = "";
      return;
    }

    setAvatarFile(file);

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  }

  async function handleAvatarSubmit(event) {
    event.preventDefault();

    if (!avatarFile) {
      alert("Seleziona prima un'immagine");
      return;
    }

    setUploadingAvatar(true);

    const extension =
      avatarFile.name.split(".").pop() || "jpg";

    const filePath =
      `${user.id}/avatar-${Date.now()}.${extension}`;

    const { error: uploadError } =
      await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          contentType: avatarFile.type,
          upsert: false,
        });

    if (uploadError) {
      alert(uploadError.message);
      setUploadingAvatar(false);
      return;
    }

    const { data: publicUrlData } =
      supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

    const avatarUrl = publicUrlData.publicUrl;

    const { error: updateError } =
      await supabase.auth.updateUser({
        data: {
          username:
            user.user_metadata?.username ||
            username.trim(),
          avatar_url: avatarUrl,
        },
      });

    if (updateError) {
      alert(updateError.message);
      setUploadingAvatar(false);
      return;
    }

    setAvatarPreview(avatarUrl);
    setAvatarFile(null);
    setUploadingAvatar(false);

    alert("Avatar aggiornato");
  }

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold">
              Profilo
            </h1>

            <div className="flex justify-center">
              {avatarPreview ? (
                createElement("img", {
                  src: avatarPreview,
                  alt: "Avatar utente",
                  className:
                    "h-32 w-32 rounded-full object-cover",
                })
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-base-300 text-4xl font-bold">
                  {username
                    .charAt(0)
                    .toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div>
              <p className="font-bold">
                Email
              </p>

              <p>{user.email}</p>
            </div>

            <form
              onSubmit={handleProfileSubmit}
              className="mt-4 flex flex-col gap-4"
            >
              <div>
                <label className="mb-2 block font-bold">
                  Username
                </label>

                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-fit"
                disabled={saving}
              >
                {saving
                  ? "Salvataggio..."
                  : "Salva modifiche"}
              </button>
            </form>

            <div className="divider" />

            <form
              onSubmit={handleAvatarSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="mb-2 block font-bold">
                  Avatar
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleAvatarChange}
                />

                <p className="mt-2 text-sm opacity-70">
                  Solo immagini, massimo 1 MB.
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-secondary w-fit"
                disabled={uploadingAvatar}
              >
                {uploadingAvatar
                  ? "Caricamento..."
                  : "Carica avatar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;