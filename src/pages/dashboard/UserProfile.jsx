import Header from "../../components/landingpage/Header";
import useCurrentUser from "../../hooks/useCurrentUser";
import { handleLogout } from "../../utils/logout";

const UserProfile = () => {
  const { userData, loading, error } = useCurrentUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>No user is logged in.</p>;
  }

  return (
    <div>
      <Header />
      <h1>
        Welcome, {userData.firstname}
        {userData.lastname}
      </h1>
      <p>Account Type: {userData.user_type}</p>

      <button onClick={handleLogout} className="btn btn-warning btn-sm">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
