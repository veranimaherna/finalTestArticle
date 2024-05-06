import { Grid, InputBase, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { CustTitle, LargeFont, StyledButton, colorGreen, colorGrey, colorGreyDark, mediumFont } from '../Styles'
import PaperIcon from "/assets/add/paper.svg"
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import { baseUrl } from '../constant'

const CustInput = styled(InputBase)(({ width, height, color }) => ({
  width,
  height,
  backgroundColor: color,
  border: `1px solid ${color}`,
  borderRadius: "10px",
  fontFamily: "Open Sans",
}))

const useStyles = makeStyles({
  logo: {
    width: "auto",
    height: "20px",
    marginRight: "10px",
  }
})




const AddArticle = ({ onSubmit }) => {
  // ambil id pakai localstorage
  const editData = JSON.parse(localStorage.getItem('articleData'));
  localStorage.removeItem('articleData');

  const classes = useStyles()
  const [formData, setFormData] = React.useState(
    {
      id: editData ? editData.id : null,
      title: editData ? editData.title : '',
      content: editData ? editData.content : '',
      status:editData ? "edit" : null
    }
  )

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitVal = async (e) => {
    try {
      let response
      if (formData.id != null) {
        response = await axios.put(`${baseUrl}/api/articles/${formData.id}`, { title: formData.title, content: formData.content })
        alert("data berhasil di update")

      } else {
        response = await axios.post(`${baseUrl}/api/articles`, { title: formData.title, content: formData.content })
        alert("data berhasil ditambahkan")
      }
      onSubmit()
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const deleteBtn = async (data) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/articles/${data}`);
        console.log(response); // Log the response if needed
        alert("delete berhasil")
        onSubmit()
      } catch (error) {
        console.error('Error:', error);
      }
  }

  return (
      <Grid container>
        <Grid item md={8}>
          <CustTitle fontSize={LargeFont} sx={{ mb: 2 }} color="black" fontWeight="Bold"> 
          {formData.status != null ? `Edit ${formData.id}` : 'Add'}
          </CustTitle>
          <hr />
        </Grid>
        <Grid item md={8} sx={{ mt: 3 }}>
          <CustTitle fontSize={mediumFont} color="black" fontWeight="Bold">Title</CustTitle>
          <CustInput
            sx={{ ml: 1, flex: 1 }}
            width="300px"
            height="40px"
            color={colorGrey}
            onChange={handleInputChange}
            startAdornment={<img src={PaperIcon} className={classes.logo} alt="paper" />}
            inputProps={{ 'aria-label': 'input', name: "title" }}
            value={formData.title}
          />
        </Grid>
        <Grid item md={8} sx={{ mt: 3 }}>
          <CustTitle fontSize={mediumFont} color="black" fontWeight="Bold">Content</CustTitle>
          <CustInput
            width="500px"
            multiline
            rows={6}
            color={colorGrey}
            sx={{ p: 1 }}
            onChange={handleInputChange}
            startAdornment={<img src={PaperIcon} style={{ marginBottom: "auto" }} className={classes.logo} alt="paper" />}
            inputProps={{ 'aria-label': 'input', name: "content" }}
            value={formData.content}
          />
        </Grid>
        <Grid item md={8} sx={{ mt: 3 }}>
          <StyledButton bgcolor={colorGreen} fontcolor="white" width="100px" onClick={submitVal}>
            Save
          </StyledButton>
        </Grid>
        {formData.status != null ? <Grid item md={1} sx={{ mt: 3 }}>
          <StyledButton bgcolor="red" fontcolor="white" width="100px" onClick={() => deleteBtn(formData.id)}>
            Delete
          </StyledButton>
        </Grid> : ""}

      </Grid>
  )
}

export default AddArticle