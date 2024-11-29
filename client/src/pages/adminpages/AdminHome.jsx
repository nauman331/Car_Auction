import AdminNav from "../../components/admincomponents/AdminNav"
import {Outlet} from "react-router-dom"

const adminHome = () => {
  return (
    <>
    <div className="admin-body">
     <AdminNav />
     <div className="admin-outlet">
     <Outlet />
     </div>
     </div>
    </>
  )
}

export default adminHome