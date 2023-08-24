import { Box, Container } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import SearchBar from "../Components/SearchBar";


export default function Home() {


  return(
    <Box sx={{ minHeight:500}}>
      <Container sx={{boxShadow:3, width:"80%", fontWeight:"bold", fontSize:"20px", padding:"50px", borderRadius:2, textAlign:"center"}}>
        Expressing thoughts, sharing insights through online journaling and articles.
      </Container>
      <Container>
        <SearchBar />
      </Container>
    </Box>
  )
}
