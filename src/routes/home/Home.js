import React from 'react'
import './home.css'
import Announcements from '@homecompo/Announcements'
import Birthday from '@homecompo/Birthday'
import Newhires from '@homecompo/Newhires'
import Todaysleave from '@homecompo/Todaysleave'
import Upcomingholidays from '@homecompo/Upcomingholidays'
import Workanniversary from '@homecompo/Workanniversary'

const Home = () => {
    return (
        <>
        <div className="mainhome">
            <Announcements/>
            <Birthday/>
            <Newhires/>
            <Todaysleave/>
            <Workanniversary/>
            <Upcomingholidays/>
        </div>
        </>
    )
}

export default Home
