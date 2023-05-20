import React from 'react'

const Profile = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    return (
        <div>
            <h1>More Features will be Added Soon!</h1>
            <div>
                <p>Hi <b>{userInfo.name}</b></p>
                <p>Email: {userInfo.email}</p>
            </div>
        </div>
    )
}

export default Profile