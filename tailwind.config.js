/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  important: true,

  theme: {
    fontSize: {
      xs: ["10px", "11px"],
      sm: ["14px", "15px"],
      base: ["16px", "18px"],
      lg: ["19px", "21px"],
      xl: ["22px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    borderRadius: {
      xxs: "4px",
      xs: "6px",
      sm: "8px",
      md: "12px",
      lg: "18px",
      full: "100%",
      base: "8px",
      1: "6px",
      
    },
    
    extend: {
      zIndex: {
        99: 99999,
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "50%": { opacity: "0.5" },
          "100%": { opacity: 1 },
        },
      },
      padding: {
        "ly-pad": "20px",
        "md-ly-pad": "15px",
        "sm-ly-pad": "10px",
        0.5: "6px",
        1: "12px",
        2: "18px",
        xs: "1px",
        sm: "2px",
        md: "3px",
        lg: "4px",
        xl: "5px",
        "2xl": "6px",
        "3xl": "7px",
        "4xl": "8px",
      },
      margin:{
        
          "ly-pad": "20px",
          "md-ly-pad": "15px",
          "sm-ly-pad": "10px",
          0.5: "6px",
          1: "12px",
          2: "18px",
          xs: "1px",
          sm: "2px",
          md: "3px",
          lg: "4px",
          xl: "5px",
          "2xl": "6px",
          "3xl": "7px",
          "4xl": "8px",
      
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
      },
      width: {
        "icon-width": "30px",
      },
      maxWidth: {
        "profile": "350px",
      },
      minHeight:{
        "gig-card-h": "232px",
      },
      colors: {
        primary: "#000000",
        "white ": "#ffffff",
        "slate-gray": "#D9D9D9",
        "light-gray": "#555F5E",
        "black-50": "rgba(0, 0, 0, 0.5)",
        "black-90": "rgba(0, 0, 0, 0.8)",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
    
      gap: {
        xs: "4px",
        sm: "6px",
        md: "18px",
        "10": "10px",
        1: "12px",
        2: "25px",
        3: "35px",
      },
      boxShadow: {
        "2xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "3xl": "2px 8px  10px #ccc",
      },
      backgroundImage: {
        gradient: "linear-gradient(to right,#D9D9D9 42%,#ffffff 42% 100%)",
      },
      

      width: {
        img: "150px",
        avatar: "60px",
        "md-avatar": "50px",
        "sm-avatar": "40px",
        "sm-img": "50px",
        "xs-img": "40px",
        "icon-width": "30px",
        "max-w-input": "900px",
        "md-menu-width": "200px",
        "menu-width": "150px",
        
        "lg-menu-width": "250px",
      },
      height: {
        "img-height": "150px",
        "sm-img": "50px",
        "xs-img": "40px",
        "c-img-h": "150px",
        "min-c-img-h": "130px",
        "md-min-c-img-h": "120px",
        "sm-min-c-img-h": "110px",
        "md-c-img-h": "130px",
        "sm-c-img-h": "120px",
        avatar: "60px",
        "md-avatar": "50px",
        "sm-avatar": "40px",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
