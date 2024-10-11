import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../redux/api/usersSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, refetch, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match!");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully!");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[7rem]">
      <div className="flex justify-center items-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="" className="block mb-2 font-semibold">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="rounded-sm w-full p-4 border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block mb-2 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-sm w-full p-4 border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block mb-2 font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="rounded-sm w-full p-4 border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block mb-2 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your Password"
                className="rounded-sm w-full p-4 border"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-5">
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem] "
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="user-orders bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader></Loader>}
      </div>
    </div>
  );
};

export default Profile;
