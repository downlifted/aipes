import * as React from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  Input,
  Flex,
  Button,
  FormControl,
  FormHelperText,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import logo from "./img/logo.png";
import Image from "components/Image";
import axios from "axios";
import TokenCard from "components/TokenCard";

const prefixUrl = `https://ipfs.io/ipfs`;
const AINIGHT_CONTRACT_ADDRESS =
  "0x43ebbeda1ab50de58e2adbc071ab78d27864b5e4";

const useGetTokenMedata = () => {
  const {
    data: tokenMetadataResult,
    isLoading: isLoadingMetadata,
    mutate,
  } = useMutation((tokenId: string) =>
    axios.get(`${prefixUrl}/${AINIGHT_CONTRACT_ADDRESS}/${tokenId}`)
  );

  const metadata = tokenMetadataResult?.data;
  const imgUrl = metadata?.image
    ? `${prefixUrl}/${metadata?.image.replace("ipfs://", "")}`
    : null;

  return {
    mutate,
    isLoading: isLoadingMetadata,
    hiResImg: imgUrl,
    metadata,
  };
};

const FieldName = "tokenId";

export const App = () => {
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");
  const { mutate, hiResImg, metadata, isLoading } = useGetTokenMedata();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (value: any) => {
    mutate(value[FieldName]);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Image borderRadius="50%" w="24" h="24" src={logo} />

          <Heading>AINightbirds</Heading>
          <Text size="md">
            Search & Download Hi-Resolution, Pixelated Ai nightbird
          </Text>

          <Flex>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <FormControl display="flex">
                <Box mr="2">
                  <Input
                    disabled={isLoading}
                    placeholder="Search by Token Id"
                    {...register(FieldName, {
                      required: "This is required",
                      minLength: {
                        value: 1,
                        message: "Minimum length should be 1",
                      },
                      maxLength: {
                        value: 5,
                        message: "Max length should be 1",
                      },
                    })}
                  />
                  <FormHelperText textAlign="left" color="red.500">
                    {errors[FieldName] && errors[FieldName].message}
                  </FormHelperText>
                  <FormHelperText>
                    You don't even have to connect you're address Hoot Hoot!
                  </FormHelperText>
                </Box>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  disabled={isLoading}
                >
                  Search
                </Button>
              </FormControl>
            </form>
          </Flex>

          {hiResImg && (
            <Flex
              gap="1rem"
              flexWrap={isLargerThan720 ? "nowrap" : "wrap"}
              justifyContent="center"
            >
              <TokenCard
                name={metadata?.name}
                title="Hi-Resolution"
                src={hiResImg}
                height={350}
                width={350}
              />
              <TokenCard
                name={metadata?.name}
                title="16-bit"
                src={hiResImg}
                height={350}
                width={350}
                pixelSize={8}
              />
              <TokenCard
                name={metadata?.name}
                title="8-bit"
                src={hiResImg}
                height={350}
                width={350}
                pixelSize={16}
              />
            </Flex>
          )}

          {/* <Text fontSize="16px">
            This site is not affiliated with AINightbirds <br /> © Made with
            React, Vercel
          </Text> */}
          <Text fontSize="16px">
            If you love this service, would be greatful <br /> for a donation
            airdrop to <b>onlyayep.eth</b>
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
};
