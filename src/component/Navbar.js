import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Model';
import Cart from './Cart';
import { useCart } from './ContextReducer';

function Navbar() {
    const [cartView, setCartView] = useState(false);
    let data = useCart();
    const navigate = useNavigate();

    const handlelogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgb(72, 207, 203)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className='container-fluid'>
                    <Link className="navbar-brand fs-1 mb-1" to="/" style={{ color: '#ffeb3b' }}>Food Mania</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ color: '#ffffff' }}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item active">
                                <Link className="nav-link active fs-5" aria-current="page" to="/" style={{ color: '#ffeb3b' }}>Home</Link>
                            </li>
                            {localStorage.getItem("authToken") &&
                                <li className="nav-item active">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder" style={{ color: '#ffeb3b' }}>My Orders</Link>
                                </li>
                            }
                        </ul>
                        {!localStorage.getItem("authToken")
                            ? <div className="d-flex">
                                <Link className="btn text-white mx-1" aria-current="page" to="/login" style={{ backgroundColor: '#87ceeb', border: 'none' }}>Login</Link>
                                <Link className="btn text-white mx-1" aria-current="page" to="/createuser" style={{ backgroundColor: '#87ceeb', border: 'none' }}>SignUp</Link>
                            </div>
                            : <div>
                                <div className="btn text-white mx-2" style={{ backgroundColor: '#87ceeb', border: 'none' }} onClick={() => { setCartView(true) }}>MyCart{"  "}
                                    <Badge pill bg="danger">{data.length}</Badge>
                                </div>
                                {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null}
                                <div className="btn text-white mx-2" style={{ backgroundColor: '#87ceeb', border: 'none' }} onClick={handlelogout}>LogOut</div>
                            </div>}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
