import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

const HorizontalScrollableList = () => {
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];

  return (
    <Box
      w="100%" // Full width of the parent container
      h="8vh" // Height of the container
      overflowX="auto" // Enables horizontal scrolling
      whiteSpace="nowrap" // Prevents wrapping
      p={1} // Padding around the box
      bg="gray.100"
      borderRadius="md"
      boxShadow="sm"
    >
      <HStack spacing={1} align="center" w="full">
        {items.map((item, index) => (
          <Button
            key={index}
            bg="teal.500"
            color="white"
            p={0} // Remove padding for tight fitting
            fontSize="xs" // Smaller font size
            borderRadius="lg"
            w="auto" // Let the button size adjust to the content
            minW="auto" // Button width will fit content
            flex="1" // This makes the buttons share space evenly
            maxW="20%" // Maximum width per button to fit within the container
            _hover={{
              bg: "teal.600",
              transform: "scale(1.05)",
              transition: "0.2s",
            }}
          >
            {item}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default HorizontalScrollableList;
