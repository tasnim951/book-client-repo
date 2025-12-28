import { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

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

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#e0f2fe",
        color: "#0369a1",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to update profile",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#fef2f2",
        color: "#b91c1c",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6">
        My Profile
      </h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-300"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
            Profile Image URL
          </label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors duration-300"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;