import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, ThemeProvider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import {colorGreyDark, mediumFont, smallFont, theme } from '../Styles'
import ListArticle from '../pages/ListArticle';
import AddArticle from "../pages/AddArticle"

const useStyles = makeStyles({
    imgRound: {
        border: `1px solid grey`,
        marginRight: "15px",
        width: "auto",
        height: "20px",
        padding: "10px",
        borderRadius: "100%",
    },
    title: {
        textTransform: "initial",
        fontSize: mediumFont,
        fontFamily: "Open Sans",
        fontWeight: "bold"
    },
    subDetail: {
        textTransform: "initial",
        fontFamily: "Open Sans",
        fontSize: smallFont
    }
})


const Mainpage = () => {
    const classes = useStyles()
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddArticleSubmit = (param) => {
        setValue(param);
      };

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Box>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider',bgcolor:colorGreyDark }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" indicatorColor='primary'>
                                <Tab sx={{ display: "flex", flexDirection: "row" }} label={<div style={{ textAlign: "left" }}>
                                    <p className={classes.title}>Article</p>
                                    <p className={classes.subDetail}>List Article</p>
                                </div>} value="1" icon={<img src="/assets/crud-icon.svg" className={classes.imgRound} />} />
                               
                                <Tab sx={{ display: "flex", flexDirection: "row" }} label={<div style={{ textAlign: "left" }}>
                                    <p className={classes.title}>Add/ Edit</p>
                                    <p className={classes.subDetail}>Detail Article</p>
                                </div>} value="2" icon={<img src="/assets/crud-icon.svg" className={classes.imgRound} />} />
                            </TabList>

                        </Box>
                        <TabPanel value="1">
                            <ListArticle onSubmit={() => handleAddArticleSubmit('2')} />
                            
                        </TabPanel>
                        <TabPanel value="2">
                            <AddArticle onSubmit={() => handleAddArticleSubmit('1')} />
                            
                        </TabPanel>
                    </TabContext>
                </Box>
            </ThemeProvider>

        </React.Fragment>
    )
}

export default Mainpage