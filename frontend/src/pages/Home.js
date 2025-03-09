import '../styles/Home.css'
import { useNavigate } from "react-router"

export default function Home() {
	const navigate = useNavigate();
  
	const handleOpenWhiteboard = () => {
	  navigate("/whiteboard");
	};
  
	return (
	  <div className="mainHeading">
		<h1>Welcome to whiteboard app</h1>
		<button onClick={handleOpenWhiteboard}>OPEN WHITEBOARD</button>
	  </div>
	);
  }
