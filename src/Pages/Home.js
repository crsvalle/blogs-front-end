import { Box, Container } from "@mui/material";
import SearchBar from "../Components/SearchBar";


export default function Home() {


  return(
    <Box sx={{ minHeight:500}}>
      <Container sx={{boxShadow:3, width:"80%", fontWeight:"bold", fontSize:"20px", padding:"50px", borderRadius:2, textAlign:"center"}}>
        Expressing thoughts, sharing insights through online journaling and articles.
      </Container>
      <Container sx={{marginTop:"40px"}}>
        <SearchBar />
      </Container>
    </Box>
  )
}
