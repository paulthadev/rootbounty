import useCurrentUser from "../hooks/useCurrentUser";

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
      <h1>
        Welcome, {userData.firstname}
        {userData.lastname}
      </h1>
      <p>Account Type: {userData.user_type}</p>
      {/* Add more user details if needed */}
    </div>
  );
};

export default UserProfile;
