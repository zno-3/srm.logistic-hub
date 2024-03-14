import UserMenu from "../../components/Menu/UserMenu";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function Dashbord() {
  const authUser = useAuthUser();
  console.log(authUser);

  return (
    <>
      <UserMenu />
    </>
  );
}

export default Dashbord;
