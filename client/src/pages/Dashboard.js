import React, {useEffect,useState} from 'react';
import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup, StyledFormArea, colors } from "../components/Styles";
//logo
import Logo from './../assets/logo.jpg';

//auyh & redux
import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userActions";
import { useNavigate } from "react-router-dom";
import {removeUserStorage} from '../utils/StorageFunctions';
import { getToken } from "../utils/StorageFunctions";

const Dashboard = () => {
    const [user, setUser] = useState([]);
    const token = getToken();
    let navigate = useNavigate();
    const profile = () => {

        fetch("http://localhost:4000/users", {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                    removeUserStorage()
                    navigate('/login')
                }
                else {
                    setUser(data.user)
                   
                }
            })
            .catch(err => alert(err))
    }

    useEffect(() => {
        profile();

    }, []);
    
    return (
        <div>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: 'transparent',
                width: '100%',
                padding: '15px',
                display: 'flex',
                justifyContent: 'flex-start',
            }}>
                <Avatar image={Logo} />
            </div >
            
            <StyledFormArea bg={colors.dark2} key={user.id}>
                <StyledTitle size={65}>
                    Welcome, {user.first_name}
                </StyledTitle>
                <StyledSubTitle size={27}>
                    Feel free to explore our page
                </StyledSubTitle>

                <ButtonGroup>
                    <StyledButton to='/' onClick={()=>removeUserStorage()}>Logout</StyledButton>
                </ButtonGroup>
            </StyledFormArea>

        </div>
    )
}
export default connect(null, {logoutUser}) (Dashboard);