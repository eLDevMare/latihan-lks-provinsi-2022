const Nav  = () => {
    return(
        <div className="position-fixed w-100">
            <div className="navbar navbar-expand-lg bg-primary px-5">
                <div className="container-fluid">
                    <a href="" className="navbar-brand text-white fs-4">Court</a>
                    <button className="navbar-toggler">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="navbar-item mx-3 text-decoration-none">
                            <a href={'/register'} className="navbar-link text-white text-decoration-none">Register</a>
                        </li>
                        <li className="navbar-item mx-3 text-decoration-none">
                            <a href={'/login'} className="navbar-link text-white text-decoration-none">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Nav;