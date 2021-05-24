import React from 'react';

import {
  Link
} from "react-router-dom";

import {
    Box,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    VStack,
  } from '@chakra-ui/react';
  
  interface Props {
    onClose: any//Function
    isOpen: boolean
    variant: 'drawer' | 'sidebar'
  }
  
  const SidebarContent = ({ onClick }: any) => (
    <VStack>
      <Button onClick={onClick} w="100%">
        Home
      </Button>
      <Button onClick={onClick} w="100%">
        About
      </Button>
      <Button onClick={onClick} w="100%">
        <Link to='/message-data'>Message Data</Link>
      </Button>
    </VStack>
  )
  
  const Sidebar = ({ isOpen, variant, onClose/*function*/ }: Props) => {
    return variant === 'sidebar' ? (
      <Box
        position="fixed"
        left={0}
        p={5}
        w="200px"
        top={0}
        h="100%"
        bg="#dfdfdf"
      >
        <SidebarContent onClick={onClose} />
      </Box>
    ) : (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Chakra-UI</DrawerHeader>
            <DrawerBody>
              <SidebarContent onClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  
  export default Sidebar