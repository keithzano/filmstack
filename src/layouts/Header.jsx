import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Home } from "../pages/Home"
import { Movie } from "../pages/Movie"
import { NowPlaying } from "../pages/NowPlaying"
import { Popular } from "../pages/Popular"
import { TopRated } from "../pages/TopRated"
import { Upcoming } from "../pages/Upcoming"

import { Navbar } from "./Navbar"

export const Header = () => {
    return(
        <>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/popular" element={<Popular/>}/>
                    <Route path="/nowplaying" element={<NowPlaying/>}/>
                    <Route path="/upcoming" element={<Upcoming/>}/>
                    <Route path="/toprated" element={<TopRated/>}/>
                    <Route path="movies/:title" element={<Movie/>}/>
                </Routes>
            </Router>
        </>
    )
}