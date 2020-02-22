const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const boom = require("@hapi/boom");

const utils = require("./utils");

app.use(bodyParser.json())

app.get("/bookings", function(req, res) {
  utils.getAllBookings();
  console.log(utils.getAllBookings());

    res.send(utils.getAllBookings());
});

 app.get("/bookings/:bookingId", function(req, res) {
  const bookingId = parseInt(req.params.bookingId);
  if (utils.checkBookingExists(bookingId)) {
    const booking = utils.getBooking(bookingId);
    console.log(booking);
    res.send(booking);
  } else {
    res.status(404).send(boom.notFound("wrong data"));
  }
});

app.delete("/bookings/:bookingId",function(req,res){
  const bookingId = parseInt(req.params.bookingId)
  if(utils.checkBookingExists(bookingId)){
   const deleteOne = utils.deleteBooking(bookingId)
   console.log(deleteOne)
   res.send(deleteOne)
  }else {
    res.status(404).send(boom.notFound("wrong data"));}
})

app.put("/bookings/:bookingId", function(req,res) {
  console.log(req.params, req.body)
 if (utils.checkBookingExists(parseInt(req.params.bookingId))){
 utils.editBooking(parseInt(req.params.bookingId),req.body)
 res.send()
 }else{
   res.status(404).send(boom.notFound("wrong data"));
}
}); 


app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});