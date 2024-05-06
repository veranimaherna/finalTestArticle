import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { makeStyles } from '@mui/styles';
import Mainpage from './components/Mainpage';
import { colorGreyDark } from './Styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colorGreyDark
  },
  contentContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: "column",
  },
  mainPage: {
    backgroundColor: "white",
    margin: "10px",

  }
});

function App() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Sidebar />
        <div className={classes.contentContainer}>
          <Topbar />
          <div className={classes.mainPage}>
            <Routes>
              <Route path="/" element={<h1>Main</h1>} />
              <Route path="/article" element={<Mainpage /> } />
            </Routes>
          
          </div>
        </div>
      </BrowserRouter>

    </div>
  )
}

{/* <MenuItem value="option1">
<IconButton >
    <SearchIcon />
</IconButton>
test
</MenuItem> */}
export default App
