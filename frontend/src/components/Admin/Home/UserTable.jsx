import { useEffect, useState } from "react";
import "./Home.css";
import Options from "./Options";
import { getUserData,deleteUserData } from "../../../slices/adminAuthAction";
import { useDispatch } from "react-redux";
import { format } from 'date-fns';
import { nanoid } from 'nanoid'


const UserTable = () => {
    
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await dispatch(getUserData());
            const userDataWithId = response.payload.map(item => ({
                ...item,
                nano_id: nanoid()
            }));
            setUserData(userDataWithId);
        }
        fetchUserData()
    }, [dispatch]);

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure? User will be deleted permanently!");
        if (confirmDelete) {
            const response = await dispatch(deleteUserData(userId));
            if (response.payload) {
                setUserData(prevData => prevData.filter(user => user._id !== userId));
            } else {
                alert("Something went wrong! Try again later.");
            }
        }
    };

    return (
        <table className="w-3/4 mb-10">
            <thead>
                <tr className="h-14">
                  
                    <td className="pl-5">Name</td>
                    <td>Date added</td>
                    <td>Date of birth</td>
                    <td>More</td>
                </tr>
            </thead>
            <tbody>
                {userData.map((item) => (
                    <tr key={item.nano_id}>
                       
                        <td className="w-80 flex gap-4 items-center py-4">
                            <div
                                className="h-14 w-14 rounded-full bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: item.profile_image ? `url(http://localhost:3000/public/${item.profile_image})` : "url(/src/assets/profile_10302971.png)" }}
                            >

                            </div>
                            <span>
                                <h1 className="font-semibold">{item.fname + " " + item.lname}</h1>
                                <h1>({item.email})</h1>
                            </span>
                        </td>
                        <td>{item.createdAt && format(new Date(item.createdAt), 'dd-MM-yyyy')}</td>
                        <td>{item.dob && format(new Date(item.dob), 'dd-MM-yyyy')}</td>
                        <td className="relative">
                            <Options userData={item}  onDeleteUser={handleDeleteUser}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserTable;
