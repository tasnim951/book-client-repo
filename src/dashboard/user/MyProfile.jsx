import { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, photoURL);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-sky-700 mb-6">My Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Profile Image URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
