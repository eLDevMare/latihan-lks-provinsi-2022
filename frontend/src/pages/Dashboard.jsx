import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const badminton = 1
    const futsal = 2
    const tennis = 3
    const volleyball = 4

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    },[token])
    return(
        <div>
            <div className="bg-info bg-gradient min-vh-100 text-center row justify-content-center align-items-center">
                <div className="p-0 m-0 row col-md-3">                    
                    <a href={`court/${badminton}`} className="text-decoration-none fs-4 text-white fw-semibold bg-primary my-2 py-1 card">Badminton</a>
                    <a href={`court/${futsal}`} className="text-decoration-none fs-4 text-white fw-semibold bg-success my-2 py-1 card">Futsal</a>
                    <a href={`court/${tennis}`} className="text-decoration-none fs-4 text-white fw-semibold bg-warning my-2 py-1 card">Tennis</a>
                    <a href={`court/${volleyball}`} className="text-decoration-none fs-4 text-white fw-semibold bg-danger my-2 py-1 card">Volleyball</a>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;