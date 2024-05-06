import React from 'react'
import { makeStyles } from '@mui/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from '@mui/material';
import { CustTitle, LargeFont} from '../Styles'
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    profileContainer: {
        width: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    profileInfo: {
        width: "100px",
        display: "flex",
        justifyContent: "center",
    },
    notifCont: {
        position: "relative",
    },
    redCircle: {
        width: '15px',
        height: '15px',
        backgroundColor: "red",
        borderRadius: "50%",
        position:"absolute",
        color:"white",
        top:"-5px",
        left:"10px",
        fontSize:"10px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontWeight:'bold'
    },
    logo:{
        width:"auto",
        height:"20px"
    }

}))

const Topbar = () => {
    const classes = useStyles()
    const location = useLocation()

    let pageTitle = 'Main'; // Default title

    if (location.pathname === '/article') {
        pageTitle = 'Article';
    }

    return (
        <Grid container display="flex" justifyContent="space-between" sx={{ p: 3 }}>
            <Grid item md={3}>
                <CustTitle color="black" fontSize={LargeFont} fontWeight="Bold">{pageTitle}</CustTitle>
            </Grid>
            <Grid item md={3}>
                <div className={classes.profileContainer}>
                    <div className={classes.profileInfo}>
                        <img src="/assets/flag.png" />
                        <KeyboardArrowDownIcon sx={{ fontSize: "30px", }} />
                    </div>
                    <div className={classes.notifCont}>
                        <img className={classes.logo} src="assets/notif.svg" />
                        <div className={classes.redCircle}>12</div>
                    </div>
                    <div className={classes.profileInfo} style={{ borderLeft: "2px solid grey" }}>
                        <img style={{ borderRadius: "20px" }} src="/assets/profile.png" />
                        <KeyboardArrowDownIcon sx={{ fontSize: "30px", mt: 1 }} />
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Topbar

