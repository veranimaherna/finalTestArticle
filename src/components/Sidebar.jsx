import React from 'react'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CustTitle, colorGreen, colorGrey, colorGreyDark } from '../Styles'
import { Link, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
    side: {
        width: "240px",
        height: "100vh",
        padding: "40px",
        border: `1px solid ${colorGreyDark}`,
        backgroundColor: "white"
    },
    btnNav: {
        display: "flex",
        justifyContent: "left",
        padding: "15px",
        textDecoration: "none",
    },
    btnActive: {
        borderLeft: `6px solid ${colorGreen}`,
        backgroundColor: colorGrey
    }

})

const Sidebar = () => {
    const classes = useStyles()
    const location = useLocation()

    const checkNav = (pathname) => {
        return `${classes.btnNav} ${location.pathname === pathname ? classes.btnActive : ''}`;
    
    } 

    return (
        <div className={classes.side}>
            <Grid container>
                <Grid item md={8}>
                    <img src="/assets/ri_menu-fold-line.png" alt="menu_icon" />
                </Grid>
                <Grid item md={8} sx={{ mt: 5 }} component={Link} to="/">
                    <img src="/assets/logo.png" alt="logo_icon" />
                </Grid>
                <Grid component={Link} to="/article" className={checkNav("/article")} item md={12} sx={{ mt: 9 }}>
                    <img src="/assets/news.svg" alt="article_icon" />
                    <CustTitle sx={{ marginLeft: "10px" }} fontWeight="bold" fontFamily="Open Sans">Article</CustTitle>
                </Grid>
                {/* <Grid component={Link} to="/" className={checkNav("/")} item md={12} sx={{ mt: 3 }}>
                    <CustTitle sx={{ marginLeft: "10px" }} fontWeight="bold" fontFamily="Open Sans">main</CustTitle>
                </Grid> */}
                
            </Grid>
        </div>
    )
}

export default Sidebar