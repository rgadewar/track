import React, { useEffect, useState } from "react";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GetDailyAchievements, GET_CATEGORIES } from "../utils/queries.js"; // Import the query for fetching categories
import DatePickerComponent from "../components/DatePicker";
import MyLineChart from "../components/ChartComponent"; // Import your chart component
import {
  Typography,
  Select,
  MenuItem,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";
// import { makeStyles } from "@mui/styles"; // Import makeStyles

function ShowLogPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Biking");
  const [pageLoaded, setPageLoaded] = useState(true);

  const { loading, error, data } = useQuery(GetDailyAchievements, {
    variables: {
      userId: userProfile?.data?._id || "",
      name: selectedCategory, // Use selectedCategory instead of 'Biking'
      startDate: startDate ? startDate.toISOString().split("T")[0] : "",
      endDate: endDate ? endDate.toISOString().split("T")[0] : "",
    },
  });

  // Fetch categories using Apollo Client
  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      // Get the user's profile data from the JWT token
      const userProfile = AuthService.getProfile();

      // Access the username
      const username = userProfile.username;

      // Update the userProfile state
      setUserProfile(userProfile);
      // Set the page as loaded
      setPageLoaded(true);
    }
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const performSearch = () => {
    // Perform search logic here
    // Set searching to true while the search is in progress
    setSearching(true);

    // Simulate a delay to mimic an API call
    setTimeout(() => {
      // Replace this with your actual search logic
      // For now, let's assume the search results are in an array called `filteredData`
      const filteredData = data?.getDailyAchievements || [];
      console.log("filteredData", filteredData);

      // Filter data based on the selected category
      const filteredDataByCategory =
        selectedCategory === selectedCategory
          ? filteredData
          : filteredData.filter((item) => item.category === selectedCategory);

      // Set searchResults to the filtered data
      setSearchResults(filteredDataByCategory);

      // After the search is complete, you can set searching to false
      setSearching(false);
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <Container>
      {/* {userProfile ? (
        <Typography variant="h4">Welcome, {userProfile.data._id}</Typography>
      ) : (
        <Typography variant="h4">Welcome!</Typography>
      )} */}
      <Typography variant="h4">Your Daily Achievements</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Select Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="Biking">Biking</MenuItem>
              <MenuItem value="Running">Running</MenuItem>
              <MenuItem value="Walking">Walking</MenuItem>
              <MenuItem value="Swimming">Swimming</MenuItem>
              {categoryData?.categories
                .filter((category) => category.name !== "All") // Exclude the 'All' category
                .map((category) => (
                  <MenuItem key={category._id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DatePickerComponent
            selectedDate={startDate}
            handleDateChange={handleStartDateChange}
            label="Select Start Date"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DatePickerComponent
            selectedDate={endDate}
            handleDateChange={handleEndDateChange}
            label="Select End Date"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button fullWidth variant="contained" onClick={performSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
      <ul>
        {searching ? (
          <li>Searching...</li>
        ) : searchResults ? (
          searchResults.map((item, index) => (
            <li key={index}>
              Date: {item.date}, Value: {item.value}
            </li>
          ))
        ) : (
          <li>No activities found</li>
        )}
      </ul>
      <MyLineChart data={searchResults} />
    </Container>
  );
}

export default ShowLogPage;
