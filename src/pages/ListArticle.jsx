import { Box, Grid, IconButton, InputBase, MenuItem, Modal, Paper, Select, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { CustTitle, LargeFont, StyledButton, colorGreen, colorGrey, colorGreyDark, mediumFont } from '../Styles';
import EditIcon from "/assets/list/edit-btn.svg"
import DeleteIcon from "/assets/list/delete.svg"
import TrashIcon from "/assets/list/trash-icon.svg";
import axios from 'axios';
import { baseUrl } from '../constant';

const useStyles = makeStyles({
    custTable: {
        fontFamily: "Open Sans",
        borderCollapse: 'collapse',
        width: '100%'
    },
    tableHead: {
        border: "1px solid black",
        fontFamily: "Open Sans",
        backgroundColor: "#eef7ef",
        color: colorGreen
    },
    tableRow: {
        border: "1px solid black",
        fontFamily: "Open Sans",
        padding: "20px",
        color: "black",
        textAlign: "justify"
    },
    icon: {
        border: `1px solid ${colorGrey}`,
        backgroundColor: `${colorGrey}`,
        borderRadius: "100%",
        width: "50px"
    },
    paginationBox: {
        width: "40px",
        height: "40px",
        color: "black",
        backgroundColor: colorGreyDark,
        border: `1px solid ${colorGrey}`,
        borderRadius: "10px",
        marginLeft: "5px",
        marginRight: "5px"
    },
    selected: {
        width: "40px",
        height: "40px",
        backgroundColor: colorGreen,
        border: `1px solid ${colorGreen}`,
        borderRadius: "10px",
        marginLeft: "5px",
        marginRight: "5px",
        color: "white"
    }
})

const StyledSelect = styled(Select)({
    width: "150px",
    height: "40px",
    backgroundColor: colorGreyDark,
    border: `1px solid ${colorGreyDark}`,
    borderRadius: "10px"
})


const ListArticle = ({ onSubmit }) => {
    const classes = useStyles()
    const [value, setValue] = useState('');
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [entry, setEntry] = useState(5)
    const [page, setPage] = useState({
        first_page: '1',
        last_page: '4',
    })
    const [searchText, setSearchText] = useState('')

    // fungsi untuk modal
    const handleOpen = (id) => {
        setSelectedData(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // menarik data dari api
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${baseUrl}/api/articles?search=${searchText}&page=${page.first_page}&page_size=${entry}`)
            setData(response.data.data.articles)
            const pages = response.data.data.page_info
            setPage({
                first_page: pages.current_page,
                last_page: pages.last_page,
            })
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    // pindah ke halaman tab
    const directPage = (data) => {
        localStorage.setItem('articleData', JSON.stringify({ id: data.id, title: data.title, content: data.content, stat: "edit" }));
        onSubmit()
    }

    // fungsi hapus record
    const deleteBtn = async (data) => {
        try {
            const response = await axios.delete(`${baseUrl}/api/articles/${data}`);
            alert("delete berhasil")
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error('Error:', error);
            // Handle error if needed
        }
    }

    // tombil pagination
    const handlePrev = () => {
        const nextPage = page.first_page - 1;
        setPage({
            first_page: nextPage,
            last_page: page.last_page,
        });
    }

    const handleNext = () => {
        const nextPage = page.first_page + 1;
        setPage({
            first_page: nextPage,
            last_page: page.last_page,
        });
    }

    // fungsi untuk search
    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }

    // fungsi untuk ganti halaman
    const handlePageChange = (pageNumber) => {
        setPage({ first_page: pageNumber, last_page: page.last_page })
    };


    const TableList = (({ data }) => {
        if (data == null) {
            return <h1>Loading ...</h1>
        } else {
            return <table className={classes.custTable}>
                <thead>
                    <tr className={classes.tableHead}>
                        <th className={classes.tableHead}>Date</th>
                        <th className={classes.tableHead}>Title</th>
                        <th className={classes.tableHead}>Content</th>
                        <th className={classes.tableHead}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((dt, idx) =>
                        <tr key={idx}>
                            <td className={classes.tableRow}>{dt.created_at.split("T")[0]}</td>
                            <td className={classes.tableRow}>{dt.title}</td>
                            <td className={classes.tableRow}>{dt.content}</td>
                            <td className={classes.tableRow} style={{ display: "flex", justifyContent: "center" }}>
                                <StyledButton onClick={() => directPage(dt)} startIcon={<img src={EditIcon} style={{ height: "50px" }} alt="Edit Icon" />} />
                                <StyledButton onClick={() => handleOpen(dt.id)} data={dt} startIcon={<img src={DeleteIcon} style={{ height: "50px" }} alt="Delete Icon" />} />
                            </td>

                        </tr>
                    )}
                    <Modal open={open} onClose={handleClose}>
                        <Box sx={{
                            backgroundColor: "white",
                            width: "400px",
                            height: "200px",
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: "20px",
                            padding: "30px"
                        }}>
                            <div style={{ display: "flex" }}>
                                <img src={TrashIcon} className={classes.icon} alt="trash" />
                                <CustTitle fontSize={LargeFont} color="black" fontWeight="bold" sx={{ mt: 1, mx: 2 }}>
                                    Delete Article
                                </CustTitle>
                            </div>
                            <CustTitle fontSize={mediumFont} color="black" sx={{ mt: 2 }}>
                                Are you sure you want to delete it? You can’t undo this action.
                            </CustTitle>
                            <div style={{ display: "flex", marginTop: "20px", justifyContent: 'flex-end' }}>
                                <StyledButton bgcolor="white" fontcolor={"grey"} fontSize={mediumFont} width="100px">
                                    Cancel
                                </StyledButton>
                                <StyledButton onClick={() => deleteBtn(selectedData)} bgcolor="red" fontcolor="white" fontSize={mediumFont} width="100px">
                                    Delete
                                </StyledButton>
                            </div>

                        </Box>
                    </Modal>

                </tbody>
            </table>
        }
    })

    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        let pageNumbers = [];

        if (totalPages <= 5) {
            pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
        } else {
            if (currentPage <= 3) {
                pageNumbers = [1, 2, 3, 4, '...', totalPages];
            } else if (currentPage >= totalPages - 2) {
                pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return (
            <div>
                {pageNumbers.map((pageNumber, idx) => (
                    <button
                        key={idx}
                        onClick={() => onPageChange(pageNumber)}
                        className={currentPage === pageNumber ? classes.selected : classes.paginationBox}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        );
    }

    useEffect(() => {
        localStorage.removeItem('articleData');
        fetchData();
    }, [entry, searchText, page.first_page]);


    return (
        <Grid container display="flex" justifyContent="space-between">
            <Grid item md={4}>
                <Paper component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                    <IconButton >
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Type here to search"
                        inputProps={{ 'aria-label': 'Type here to search' }}
                        onChange={handleSearch}
                    />
                </Paper>
            </Grid>
            <Grid item md={3} sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <StyledSelect
                    value={value}
                    fullWidth
                    displayEmpty
                >
                    <MenuItem value="">
                        <IconButton color="primary">
                            <CalendarTodayIcon sx={{ marginRight: "10px" }} />
                            <CustTitle color="black" fontSize={mediumFont} fontWeight="bold">
                                2023
                            </CustTitle>
                        </IconButton>
                    </MenuItem>
                </StyledSelect>

                <StyledButton startIcon={<AddIcon />} bgcolor={colorGreen} fontcolor="white" width="90px" >
                    Add
                </StyledButton>
            </Grid>

            <Grid item md={12} sx={{ mt: 4 }}>
                {
                    loading == null ? <h1>Loading</h1> : <TableList data={data} />}
            </Grid>

            {/* fitur pagination */}
            <Grid item md={12} sx={{ display: "flex", justifyContent: 'flex-end', mt: 3 }}>
                <CustTitle color="black" fontSize={LargeFont}>
                    Show
                </CustTitle>
                <Select value={entry} sx={{ width: "100px", height: '40px', mx: 2 }} onChange={(e) => setEntry(e.target.value)}>
                    {
                        Array.from({ length: 10 }, (_, index) => <MenuItem key={index} value={String(index + 1)}>
                            {index + 1}
                        </MenuItem>)
                    }
                </Select>
                <CustTitle color="black" fontSize={LargeFont}>
                    entries
                </CustTitle>
                <StyledButton onClick={handlePrev} width="10px" height="50px" fontcolor="white" bgcolor={colorGreyDark} sx={{ mx: 2 }}>
                    <NavigateBeforeIcon color="secondary" />
                </StyledButton>

                <Pagination currentPage={page.first_page} totalPages={page.last_page} onPageChange={handlePageChange} />

                <StyledButton onClick={handleNext} width="10px" height="50px" fontcolor="white" bgcolor={colorGreyDark} sx={{ mx: 2 }}>
                    <NavigateNextIcon color="secondary" />
                </StyledButton>
            </Grid>
        </Grid>
    )
}

export default ListArticle