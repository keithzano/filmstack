import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

import { Link } from "react-router-dom"

export const Navbar = () => {
    return(
        <AppBar sx = {{ position: "sticky"}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
               <Typography variant="h6">FILMSTACK</Typography> 
               
               <Box>
                <Link to="/">
                    <Button color="secondary" >Home</Button>
                </Link>
                <Link to="/popular">
                    <Button color="secondary" >Popular</Button>
                </Link>
                <Link to="/nowplaying">
                    <Button color="secondary" >Now Playing</Button>
                </Link>
                <Link to="/upcoming">
                    <Button color="secondary" >Upcoming</Button>
                </Link>
                <Link to="/toprated">
                    <Button color="secondary" >Top Rated</Button>
                </Link>
               </Box>
            </Toolbar>
        </AppBar>
    )
}
