import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accountAPI"

export default function UserAuth() {

    const {data: user, isLoading} = useUserInfoQuery();
    const location = useLocation();

    if(isLoading) return <div>Loading...</div>;

    if(!user)
    {
        return <Navigate to="/login" state={{from: location}}/>
    }


  return (
    <Outlet/>
  )
}