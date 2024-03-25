import { useState, useEffect } from "react";
import "./App.css";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import ContactForm from "./components/ContactForm";

// Main component
function App() {
  // State variables to hold countdown values
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Set the target date for the countdown (in UTC)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const targetDate = new Date("2024-08-01T00:00:00Z");

  // Update the countdown values every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Calculate days, hours, minutes, and seconds
      const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesRemaining = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);

      // Update state with new values
      setDays(daysRemaining);
      setHours(hoursRemaining);
      setMinutes(minutesRemaining);
      setSeconds(secondsRemaining);

      // If the countdown is over, clear the interval
      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <main className="bg-black">
      <div className="max-w-screen-xl mx-auto h-screen md:h-screen md:flex justify-center items-center gap-2">
        <div className="w-full md:w-1/2 h-full flex flex-col gap-5 items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold uppercase">
            Coming Soon
          </h1>
          <p className="text-center px-6 md:px-0">
            Welcome to our website! We are currently working hard behind the
            scenes to bring you something exciting. Stay tuned for updates and
            announcements. In the meantime, feel free to explore our social
            media channels for more content and updates.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <CountdownBox value={days} unit="DAYS" />
            <CountdownBox value={hours} unit="HOURS" />
            <CountdownBox value={minutes} unit="MINUTES" />
            <CountdownBox value={seconds} unit="SECONDS" />
          </div>
          <SocialMediaIcons />
        </div>
        <ContactForm />
      </div>
    </main>
  );
}

// CountdownBox component
// eslint-disable-next-line react/prop-types
function CountdownBox({ value, unit }) {
  return (
    <div className="border-2 border-white flex flex-col items-center justify-center w-24 h-24 p-3">
      <h2 className="font-bold text-2xl md:text-3xl">{value}</h2>
      <h4 className="font-semibold text-lg md:text-xl">{unit}</h4>
    </div>
  );
}

// SocialMediaIcons component
function SocialMediaIcons() {
  return (
    <div className="flex gap-3 mt-5">
      <FaFacebookSquare size={30} />
      <FaInstagramSquare size={30} />
      <FaTwitterSquare size={30} />
    </div>
  );
}

export default App;
