import UserNav from "../../components/usercomponents/userpanel/usernav"
import {Outlet} from "react-router-dom"

const UserPanel = () => {
  return (
    <>
    <div className="admin-body">
     <UserNav />
     <div className="admin-outlet">
     <Outlet />
     </div>
     </div>
    </>
  )
}

export default UserPanel