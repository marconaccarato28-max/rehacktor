import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-8 text-center">
        Caricamento...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold">
              Profilo
            </h1>

            <div className="mt-4">
              <p className="font-bold">
                Username
              </p>

              <p>
                {user.user_metadata?.username || "Non disponibile"}
              </p>
            </div>

            <div>
              <p className="font-bold">
                Email
              </p>

              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;