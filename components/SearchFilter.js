import React, { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { filterData, getFilterValues } from "../utils/filterData";
import { useRouter } from "next/router";
import { baseUrl, fecthApi } from "../utils/fecthApi";

const SearchFilter = () => {
  const [filters, setfilters] = useState(filterData);
  const [searchTerm, setsearchTerm] = useState("");
  const [locationData, setlocationData] = useState();
  const [showLocations, setshowLocations] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  function searchProperties(filterValues) {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query: query });
  }

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setloading(true);
        const data = await fecthApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setloading(false);
        setlocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);
  return (
    <Flex bg={"gray.100"} p="4" justifyContent={"center"} flexWrap="wrap">
      {filters?.map((item, key) => (
        <Box key={key}>
          <Select
            onChange={(e) =>
              searchProperties({
                [item.queryName]: e.target.value,
              })
            }
            placeholder={item.placeholder}
            w={"fit-content"}
            p="2"
          >
            {item?.items?.map((itemOption, key) => (
              <option key={key} value={itemOption.value}>
                {itemOption.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDir="column">
        <Button
          border={"1px"}
          borderColor="gray.200"
          marginTop={"2"}
          onClick={() => setshowLocations(!showLocations)}
        >
          Search Location
        </Button>

        {showLocations && (
          <Flex flexDir={"column"} pos="relative" paddingTop={"2"}>
            <Input
              placeholder="Type Here"
              value={searchTerm}
              w="300px"
              focusBorderColor="gray.300"
              onChange={(e) => setsearchTerm(e.target.value)}
            />
            {searchTerm !== "" && (
              <Icon
                as={MdCancel}
                pos="absolute"
                cursor={"pointer"}
                right="5"
                top={"5"}
                zIndex="100"
                onClick={() => setsearchTerm("")}
              />
            )}
            {loading && <Spinner margin={"auto"} marginTop="3" />}
            {showLocations && (
              <Box height={"300px"} overflow="auto">
                {locationData?.map((item, key) => (
                  <Box
                    key={key}
                    onClick={(e) => {
                      searchProperties({ locarionExternalID: item.externalID });
                      setshowLocations(false);
                      setsearchTerm(item.name);
                    }}
                  >
                    <Text
                      cursor={"pointer"}
                      bg="gray.200"
                      p="2"
                      borderBottom={"1px"}
                      borderColor="gray.100"
                    >
                      {item.name}
                    </Text>
                  </Box>
                ))}

                {loading && !locationData?.length && (
                  <Flex
                    justifyContent={"center"}
                    alignItems="center"
                    flexDir={"column"}
                    marginTop="5"
                    marginBottom={"5"}
                  >
                    <img
                      src="https://educationpro.a2sweb.com/demo/backend/themes/magenta/assets/custom/img/result.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <Text>Waitin to search</Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchFilter;
