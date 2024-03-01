import "./Home.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';


const Home = () => {
    const userData = useSelector(state => state.auth.userInfo.userData);
    const navigate = useNavigate();

    return (
        <div className="home">
            <nav>
                <h1>HOME</h1>
                <div 
                    className="nav-view-user-profile cursor-pointer" 
                    style={{ backgroundImage: userData?.profile_image ? `url(http://localhost:3000/public/${userData.profile_image})` : '/src/assets/profile_10302971.png' }}
                    onClick={() => {navigate("/user/profile")}}
                    data-tooltip-id="my-tooltip" 
                    data-tooltip-content="profile"
                >
                </div>
                <Tooltip id="my-tooltip" />
            </nav>
            <div className="home-banner flex-col-reverse sm:flex-row">
            
                <div className="home-banner-description">
                <img 
                        src={userData?.profile_image ? `http://localhost:3000/public/${userData.profile_image}` : '/src/assets/profile_10302971.png'}
                        alt="Profile"
                        style={{ 
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    />
                    <h1 className="welcome">
                        Hello, <span className="text-4xl font-semibold">{userData.fname+" "+userData.lname}</span>
                    </h1>
                    <p className="px-20">
                    Hi how are you we hope you are fine
                    </p>
        
                </div>

                
               
            
            </div>
        </div>
    )
}

export default Home;