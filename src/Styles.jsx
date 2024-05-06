import { Button, Typography, createTheme, styled } from "@mui/material"

export const colorGreen = "#51b15c"
export const colorGrey = "#f8fcf9"
export const colorGreyDark = "#f9f9f9"
export const smallFont = "12px"
export const mediumFont = "16px"
export const LargeFont = "24px"

export const CustTitle = styled(Typography)(({fontSize="16px", fontFamily="Open Sans",color=colorGreen,fontWeight}) => ({
    fontSize,
    fontFamily,
    color,
    fontWeight
}))

export const StyledButton = styled(Button)(({ bgcolor, fontcolor, fontWeight, fontSize = { smallFont }, width }) => ({
    backgroundColor:bgcolor,
    fontSize,
    color: fontcolor,
    textTransform: "initial",
    fontFamily: "Open Sans",
    fontWeight,
    width,
    height: "40px",
    borderRadius: "10px"
}))

//untuk ganti warna material ui
export const theme = createTheme({
    palette: {
        primary: {
            main: colorGreen,
        },
        secondary:{
            main:"#212121",
        }
    },
});
