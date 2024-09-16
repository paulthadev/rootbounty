import ButtonSpinner from "../../components/ButtonSpinner";
import useCurrentUser from "../../hooks/useCurrentUser";

function BuyerProfile() {
  const { userData, loading } = useCurrentUser();

  if (loading) {
    return <ButtonSpinner />;
  }
  return (
    <>
      {userData && (
        <section>
          <h1 className=" text-3xl pb-3 font-semibold capitalize">
            buyer details
          </h1>
          <h3 className="text-xl font-semibold">
            <span className="capitalize ">{userData?.business_name}</span>
          </h3>
          <div className="max-w-lg">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type={"text"}
                labelText={"first name"}
                placeholder={userData?.firstname}
              />
              <Input
                type={"text"}
                labelText={"last name"}
                placeholder={userData?.lastname}
              />
            </div>

            <Input
              type={"email"}
              labelText={"email"}
              placeholder={userData?.email}
            />
            <Input
              type={"tel"}
              labelText={"phone number"}
              placeholder={userData?.phone}
            />
          </div>
        </section>
      )}
    </>
  );
}

export function Input({ type, labelText, placeholder }) {
  return (
    <div className="form-control  mt-6">
      <label htmlFor="" className="label">
        <span className="label-text capitalize font-semibold">{labelText}</span>
      </label>
      <input
        type={type}
        className="input w-full placeholder:text-xl "
        disabled
        placeholder={placeholder}
      />
    </div>
  );
}

export default BuyerProfile;
