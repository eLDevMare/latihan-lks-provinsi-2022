import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const Register = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const [data,setData] = useState({
        'fullname':'',
        'email':'',
        'password':''
    });

    const handleSubmit =  async(e) => {
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()
            console.log(result)
            if(!result.status == "error"){
                navigate('/dashboard')
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
        if(localStorage.getItem("token") === "undefined"){
            localStorage.removeItem("token")
            console.log("sigma")
        } else if(token){
            navigate('/dashboard')
        }

    })
    return(
        <div>
            <Nav/>
            <div className="bg-info min-vh-100 row justify-content-center text-center align-items-center">
                <form  className="card width border-1 border p-3 bg-light" onSubmit={handleSubmit}>
                    <p className="fs-4">Register</p>
                    <div className="input-group mt-2">
                        <span className="input-group-text">fullname</span>
                        <input type="text" 
                            className="form-control"
                            name="fullname"
                            value={data.fullname}
                            onChange={handeChange}/>
                    </div>
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
                        <p className="col-auto p-0 m-0">Have Account?</p>
                        <a href={'/login'} className="text-primary text-decoration-none col-auto p-0 m-0">Login</a>
                    </div>
                    <button className="mt-1 btn btn-primary" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;