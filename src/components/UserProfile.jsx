import useCurrentUser from "../hooks/useCurrentUser";

const UserProfile = () => {
  const { user, loading, error } = useCurrentUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user is logged in.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>User ID: {user.id}</p>
      {/* Add more user details if needed */}
    </div>
  );
};

export default UserProfile;
