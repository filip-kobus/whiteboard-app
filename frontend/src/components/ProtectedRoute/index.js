import { useAppContext } from "../../libs/contextLib";
import ProtectedPage from "./ProtectedPage";


function ProtectedRoute ({ children }) {
  const { isAuthenticated } = useAppContext();
  return (
    <div>
      { isAuthenticated && children  }
      { !isAuthenticated && <ProtectedPage />  }
    </div>
  );
};

export default ProtectedRoute;
