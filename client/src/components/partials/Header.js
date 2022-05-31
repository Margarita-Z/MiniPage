import React from 'react';
import { getToken } from '../../utils/StorageFunctions';
import '../../style/header.css';


function Header() {

    const token = getToken()
    return (
        <div className='header'>
            <div className='container'>
            <ul class="nav justify-content-end">
                {!token ?
                <>
                <li class="nav-item">
                    <a class="nav-link home" aria-current="page" href="/" >Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link create" href="/register">Create account</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link login" href="/login">Login</a>
                </li>
                </>
                :
                <>
                <li class="nav-item">
                    <a class="nav-link logout" href="/login">Log out</a>
                </li>
                </>
}
            </ul>
</div>
        </div>
    )
}
export default Header