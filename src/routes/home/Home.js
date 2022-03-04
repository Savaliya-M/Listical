import React from 'react'
import home from './home.module.scss'
import Announcements from '@homecompo/Announcements'
import Birthday from '@homecompo/Birthday'
import Newhires from '@homecompo/Newhires'
import Todaysleave from '@homecompo/Todaysleave'
import Upcomingholidays from '@homecompo/Upcomingholidays'
import Workanniversary from '@homecompo/Workanniversary'

const Home = () => {
    return (
        <>
        <div className={home.mainhome}>
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
