import { Box, Paper, Typography } from "@mui/material";



export default function Contact() {



  return (
    
      <>
        <Paper sx={{mb: 3}}>
          <Typography sx={{p:3}} variant="h4">Contact</Typography>
          <Typography sx={{px:3}} variant="subtitle1" fontSize={23} align="justify" style={{whiteSpace: 'pre-line'}} >
            Feel free to contact me directly by email at <b>alex_nash@live.co.uk</b> with any questions or queries; feedback
            is very much appreciated too, whether it's tips for improving the site, bugs etc everything will help me on my programming journey!
          </Typography>
        </Paper>
        <Box component={Paper} sx={{p: 4, maxWidth: "sm",mx: "auto"}}>
             
            </Box>
          </>
  )

}