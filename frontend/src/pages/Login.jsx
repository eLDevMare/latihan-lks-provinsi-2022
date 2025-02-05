import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const Login = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const [data,setData] = useState({
        'email':'',
        'password':''
    });

    const handleSubmit =  async(e) => {
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()
            if(!result.status == "error"){
                navigate('/dashboard')
                console.log("sigma")
            }
            localStorage.setItem('token', result.token)
        }catch(e){
            console.log(e)
        }
    }

    const handeChange = (e) => {
        const {name,value} = e.target;
        setData((setPrev) => ({
            ...setPrev,
            [name]:value
        }))
    }

    useEffect(() => {
        if(token){
            navigate('/dashboard')
        }
    })

    return(
        <div>
            <Nav/>
            <div className="bg-info min-vh-100 row justify-content-center text-center align-items-center">
                <form  className="card width border-1 border p-3 bg-light" onSubmit={handleSubmit}>
                    <p className="fs-4">Login</p>
                    <div className="input-group mt-2">
                        <span className="input-group-text">Email</span>
                        <input type="text" 
                            className="form-control"
                            name="email"
                            value={data.email}
                            onChange={handeChange}/>
                    </div>
                    <div className="input-group mt-2">
                        <span className="input-group-text">Password</span>
                        <input type="text" 
                            className="form-control"
                            name="password"
                            value={data.password}
                            onChange={handeChange}/>
                    </div>
                    <div className="row justify-content-between px-2 align-items-end d-flex p-0 m-0 mt-4">
                        <p className="col-auto p-0 m-0">Not Have Account?</p>
                        <a href={'/register'} className="text-primary text-decoration-none col-auto p-0 m-0">Register</a>
                    </div>
                    <button type="submit" className="mt-1 btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;