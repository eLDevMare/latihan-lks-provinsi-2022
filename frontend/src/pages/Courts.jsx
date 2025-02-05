import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Court = () => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const [selectedSessions, setSelectedSessions] = useState([]); 
    const [totalPrice, setTotalPrice] = useState(0); 
    const [sessionCount, setSessionCount] = useState(0); 
    const navigate = useNavigate();
    const { sport_id } = useParams();
    const [title, setTitle] = useState()

    const fetchdata = async (date) => {
        try {
            const response = await fetch(`http://localhost:8000/api/court/${sport_id}/${date}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const result = await response.json();
    
            console.log(result)
            if (result.data) {
                setData(Object.values(result.data));
            } else {
                console.error("Data tidak ditemukan atau format salah");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        fetchdata(today);

        if(sport_id == 1){
            setTitle("Badminton")
        }
        if(sport_id == 2){
            setTitle("Futsal")
        }
        if(sport_id == 3){
            setTitle("Tennis")
        }
        if(sport_id == 4){
            setTitle("Volleyball")
        }
    }, [sport_id]);

    const handleChange = (e) => {
        const nowDate = e.target.value;
        setDate(nowDate);
        fetchdata(nowDate);
    };
    
    const updateTotalPriceAndCount = (sessions) => {
        let total = 0;
        sessions.forEach((session) => {
            total += session.price
        })
        setTotalPrice(total);
        setSessionCount(sessions.length);
    };

    const handleSessionSelect = (courtId,session,price) => {
        setSelectedSessions(prev => {
            const exist = prev.some(item => item.court_id === courtId && item.sessions === session)
            if(exist){
                const newSession = prev.filter(item => !(item.court_id === courtId && item.sessions === session))
                updateTotalPriceAndCount(newSession)
                return newSession
            } else {
                const newSession = [...prev,{court_id: courtId, session,price}]
                updateTotalPriceAndCount(newSession)
                return newSession
            }
        })   
    }



    const handleSubmit = async () => {
        const payload = {
            book_date: date,
            session: selectedSessions
        };

        try {
            const response = await fetch('http://localhost:8000/api/court/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });
    
            const result = await response.json();
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim data.');
        }
    };

    return (
        <div>
            <div className="container-fluid bg-primary py-5 ps-5 text-white">
                <div className="ms-5">
                    <p className="py-3 fs-3 fw-bold">{title} Court</p>
                </div>
            </div>
            <div className="ms-5">
                <input type="date" className="w-25 form-control ms-5 mt-4" onChange={handleChange} />
            </div>
            <div className="px-5 mt-5 row text-center justify-content-center">
                {data[0] && (
                    <div className="col-md-3 mb-4">
                        <div className="card width-box text-start p-1" style={{ height: '250px' }}>
                            <h4 className="fs-5 mt-2 ps-3">{data[0].name}</h4>
                            <div className="px-1 py-2 ps-2">
                                {data[0].sessions.map((session) => (
                                    <button
                                        className={`badge text-dark border border-1 border-dark m-1 
                                            ${session.is_available ? (selectedSessions.some(item => item.court_id === data[0].id && item.session === session.sessions) ? 'bg-primary' : 'bg-white') : 'bg-body-secondary border-0'}`}
                                        disabled={!session.is_available}
                                        onClick={() => handleSessionSelect(data[0].id, session.sessions, session.price)}
                                    >
                                        {session.sessions}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {data[1] && (
                    <div className="col-md-3 mb-4">
                        <div className="card width-box text-start p-1" style={{ height: '250px' }}>
                            <h4 className="fs-5 mt-2 ps-3">{data[1].name}</h4>
                            <div className="px-1 py-2 ps-2">
                                {data[1].sessions.map((session) => (
                                    <button
                                        className={`badge text-dark border border-1 border-dark m-1 
                                            ${session.is_available ? (selectedSessions.some(item => item.court_id === data[1].id && item.session === session.sessions) ? 'bg-primary' : 'bg-white') 
                                                : 'bg-body-secondary border-0'}`}
                                        onClick={() => handleSessionSelect(data[1].id, session.sessions, session.price)}
                                    >
                                        {session.sessions}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {data[2] && (
                    <div className="col-md-3 mb-4">
                        <div className="card width-box text-start p-1" style={{ height: '250px' }}>
                            <h4 className="fs-5 mt-2 ps-3">{data[2].name}</h4>
                            <div className="px-1 py-2 ps-2">
                                {data[2].sessions.map((session) => (
                                    <button
                                        className={`badge text-dark border border-1 border-dark m-1 
                                            ${session.is_available ? 
                                                (selectedSessions.some(item => item.court_id === data[2].id && item.session === session.sessions) ? 'bg-primary' : 'bg-white') 
                                                : 'bg-body-secondary border-0'}`}
                                        disabled={!session.is_available}
                                        onClick={() => handleSessionSelect(data[2].id, session.sessions, session.price)}
                                    >
                                        {session.sessions}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {data[3] && (
                    <div className="col-md-3 mb-4">
                        <div className="card width-box text-start p-1" style={{ height: '250px' }}>
                            <h4 className="fs-5 mt-2 ps-3">{data[3].name}</h4>
                            <div className="px-1 py-2 ps-2">
                                {data[3].sessions.map((session) => (
                                    <button
                                        className={`badge text-dark border border-1 border-dark m-1 
                                            ${session.is_available ? 
                                                (selectedSessions.some(item => item.court_id === data[3].id && item.session === session.sessions) ? 'bg-primary' : 'bg-white') 
                                                : 'bg-body-secondary border-0'}`}
                                        disabled={!session.is_available}
                                        onClick={() => handleSessionSelect(data[3].id, session.sessions, session.price)}
                                    >
                                        {session.sessions}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="position-absolute end-0 row me-5">
                <div className="col">
                    <p className="p-0 m-0">Sesi yang dipilih: {sessionCount}</p>
                    <p className="p-0 m-0">Total Harga: Rp. {totalPrice}</p>
                </div>
                <button className="btn btn-primary col-auto" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Court;
