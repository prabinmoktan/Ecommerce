import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

const ToggleDarkmode = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const darkTheme = localStorage.getItem("theme");
    if (darkTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  const handleDarkmode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return <button onClick={handleDarkmode}>
    {darkMode ? (< FaMoon />) : < IoMdSunny/>}
  </button>;
};
export default ToggleDarkmode;
