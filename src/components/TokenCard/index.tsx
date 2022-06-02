import * as React from "react";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import ImagePixelated from "components/ImagePixelated";
import Image from "components/Image";

export interface TokenCardProps {
  title: string;
  name: string;
  src: string;
  height: number;
  width: number;
  pixelSize?: 8 | 16;
}

const TokenCard: React.FC<TokenCardProps> = ({
  name,
  title,
  src,
  pixelSize,
  height,
  width,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      borderRadius="0.5rem"
      overflow="hidden"
      background={colorMode === "dark" ? "gray.700" : "gray.100"}
      w="350"
    >
      {pixelSize ? (
        <ImagePixelated
          src={src}
          height={height}
          width={width}
          pixelSize={pixelSize}
        />
      ) : (
        <Image w={width} h={height} src={src} />
      )}

      <Box padding="1rem">
        <Text>{name}</Text>
        <Text>{title}</Text>
        <Text fontSize="1rem">
          Right-click on desktop or press-and-hold <br /> on mobile to save the
          image.
        </Text>
      </Box>
    </Flex>
  );
};

export default TokenCard;
