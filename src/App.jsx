import { HeaderBanner } from "./components/HeaderBanner";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Container, Grid, Paper } from "@mui/material";
import { blue, orange } from "@mui/material/colors";
import { useState, useEffect } from "react";
import BookingForm from "./components/BookingForm";
import Featured from "./components/Featured";
import Rentals from "./components/Rentals";

const theme = createTheme({
  typography: {
    fontFamily: '"Cabin", "Helvetica", "Arial", sans-serif'
  },
  palette: {
    primary: blue,
    secondary: orange
  }
});

function App() {
  const [toggleBookingForm, setToggleBookingForm] = useState(false);
  const [toggleBooking, setToggleBooking] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [searchRentals, setSearch] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    console.log(`http://localhost:3000/rentals`);
    const res = await fetch(`http://localhost:3000/rentals`);
    const data = await res.json();
    setRentals(data);
    setSearch(data);
  };

  const next = () => {
    setPage(prev => prev + 1);
  };
  //Toggle booking form
  const handleToggleBookingForm = () =>
    setToggleBookingForm(prevState => !prevState);

  const handleToggleBooking = () => setToggleBooking(prevState => !prevState);
  const updateBookings = newBooking => {
    setBookings(prev => [...prev, newBooking]);
  };

  //handleSearch
  const handleSearch = e => {
    const filtered = rentals.filter(r =>
      r.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearch(filtered);
  };

  const renderBookings = booking => {
    return (
      <p>
        Rental: {booking.rental} Date: {booking.date} Guests: {booking.guests}
      </p>
    );
  };
  console.log(rentals);
  console.log(searchRentals);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" className="App">
        <HeaderBanner />

        {/* Action buttons section with extra spacing */}
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
        ></input>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          style={{ marginTop: 32, marginBottom: 32 }}
        >
          <Grid item>
            <Button variant="contained" onClick={handleToggleBookingForm}>
              Add Booking
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleToggleBooking}>
              Bookings
            </Button>
          </Grid>
        </Grid>

        {toggleBookingForm && (
          <BookingForm
            rentals={rentals.map(r => r.name)}
            updateBookings={updateBookings}
          />
        )}
        {toggleBooking && bookings.map(renderBookings)}
        <Rentals rentals={searchRentals} />
        <Button onClick={next}> next </Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
