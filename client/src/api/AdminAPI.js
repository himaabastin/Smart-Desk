import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
function AdminAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getAdmin = async () => {
        try {
          const res = await axios.get("/admin/refresh_token")
          console.log("API",res);
          
          setIsLogged(true);
          res.data.role === "admin" ? setIsAdmin(true) : setIsAdmin(false)
          
        } catch (err) {
          Swal.fire({
              text:err.response.data.msg,
          })
        //   alert(err.response.data.msg);
        }
      };
      getAdmin();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin:[isAdmin,setIsAdmin]
  };
}

export default AdminAPI;
