import { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

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
    <div className="bg-white shadow rounded p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4 text-sky-800">My Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Profile Image URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={e => setPhotoURL(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
