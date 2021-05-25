import React from 'react';

import {
  Link
} from "react-router-dom";

import {
    Box,
    Button,
    VStack
  } from '@chakra-ui/react';
  
  
  const Sidebar = () => {
    return (
      <Box
        position="fixed"
        left={0}
        p={5}
        w="200px"
        top={0}
        h="100%"
        bg="#dfdfdf"
      >
        
        <VStack>
          <Button w="100%">
            <Link to='/api-clients'>API-Clients</Link>
          </Button>
          <Button w="100%">
            <Link to='/user-data'>User-Data</Link>
          </Button>
        </VStack>

      </Box>
    )
  }
  
  export default Sidebar