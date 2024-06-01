/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",

  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  // important: true,

  theme: {
    fontSize: {
      xs: ["12px", "14px"],
      sm: ["16px", "18px"],
      base: ["18px", "20px"],
      lg: ["20px", "22px"],
      xl: ["22px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "30px"],
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
        999999: "999999",
        99999: "99999",
        9999: "9999",
        999: "999",
        99: "99",
        9: "9",
        1: "1",
      },
      animation: {
        rotating: "rotating 30s linear infinite",

        "fade-in": "fadeIn 0.5s ease",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "50%": { opacity: "0.5" },
          "100%": { opacity: 1 },
        },
        rotating: {
          "0%, 100%": { transform: "rotate(360deg)" },
          "50%": { transform: "rotate(0deg)" },
        },
      },
      padding: {
        "ly-pad": "20px",
        "md-ly-pad": "15px",
        "sm-ly-pad": "10px",
        0.8: "8px",
        "0.10": "10px",
        0.5: "6px",
        1: "12px",
        2: "18px",
        3: "25px",
        1.5: "15px",
        xs: "1px",
        sm: "2px",
        md: "3px",
        lg: "4px",
        xl: "5px",
        "2xl": "6px",
        "3xl": "7px",
        "4xl": "8px",
      },
      margin: {
        "ly-m": "20px",
        "md-ly-m": "15px",
        "sm-ly-m": "10px",
        0.5: "6px",
        0.1: "10px",
        0.8: "8px",
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
        profile: "350px",
        2.5: "0.625rem",
        3: "0.75rem",
        4: "1rem",
        11: "2.75rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        22.5: "5.625rem",
        25: "6.25rem",
        30: "7.5rem",
        34: "8.5rem",
        35: "8.75rem",
        40: "10rem",
        42.5: "10.625rem",
        44: "11rem",
        45: "11.25rem",
        70: "17.5rem",
        90: "22.5rem",
        94: "23.5rem",
        125: "31.25rem",
        132.5: "33.125rem",
        142.5: "35.625rem",
        150: "37.5rem",
        180: "45rem",
        203: "50.75rem",
        230: "57.5rem",
        242.5: "60.625rem",
        270: "67.5rem",
        280: "70rem",
        292.5: "73.125rem",
      },
      minWidth: {
        22.5: "5.625rem",
        42.5: "10.625rem",
        47.5: "11.875rem",
        75: "18.75rem",
      },
      minHeight: {
        "gig-card-h": "232px",

        35: "8.75rem",
        70: "17.5rem",
        90: "22.5rem",
        550: "34.375rem",
        300: "18.75rem",
      },
      colors: {
        primary: "#000000",

        lightblack: "#1C2434",
        bodydark: "#AEB7C0",

        bodydark1: "#DEE4EE",
        bodydark2: "#8A99AF",
        active: "rgba(88,88,88,0.19)",
        // secondary: "#00c3c7",
        // dark: "#ffcf22",
        "white ": "#ffffff",
        "slate-gray": "#D9D9D9",
        "light-gray": "#555F5E",
        grey: "#404145",
        // "black": "101010",
        "black-50": "rgba(0, 0, 0, 0.5)",
        "black-90": "rgba(0, 0, 0, 0.8)",

        "black-transparent": "rgba(0, 0, 0, 0.1)",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },

      gap: {
        xs: "4px",
        sm: "6px",
        lg: "18px",
        0.8: "8px",
        "0.10": "10px",
        1: "12px",
        1.5: "18px",
        2: "25px",
        3: "35px",
      },
      boxShadow: {
        "2xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "3xl": "2px 8px  10px #ccc",
      },
      backgroundImage: {
        gradient: "linear-gradient(to right,#D9D9D9 42%,#ffffff 42% 100%)",
        "blur-gradient":
          "linear-gradient(to right, #000000 42%, #ffffff 42% 100%)",
        bar1: "url('/src/assets/images/hero1.jpg')",
        bar2: "url('/src/assets/images/hero2.jpeg')",
        bar3: "url('/src/assets/images/hero3.jpeg')",
        bar4: "url('/src/assets/images/islamabad judge.jpeg')",
        bar5: "url('/src/assets/images/peshawar.jpeg')",
        bar6: "url('/src/assets/images/blouchitan.jpg')",
        bar7: "url('/src/assets/images/federalshariat.jpeg')",
      },

      width: {
        img: "150px",
        "md-img": "100px",
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
        "icon-width": "30px",
        "md-icon-width": "25px",
        "sm-icon-width": "20px",
        "brand-logo": "170px",
        "md-brand-logo": "100px",
        "sm-brand-logo": "80px",
      },
      height: {
        "img-height": "150px",
        "md-img-height": "100px",
        "sm-img": "50px",
        "xs-img": "40px",
        "c-img-h": "150px",
        "min-c-img-h": "130px",
        "md-min-c-img-h": "120px",
        "sm-min-c-img-h": "110px",
        "md-c-img-h": "140px",
        "sm-c-img-h": "130px",
        avatar: "60px", 
        "md-avatar": "50px",
        "sm-avatar": "40px",
        "icon-height": "30px",
        "md-icon-height": "25px",
        "sm-icon-height": "20px",
        "brand-logo": "60px",
        "md-brand-logo": "50px",
        "sm-brand-logo": "40px",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
      },
      dropShadow: {
        1: "0px 1px 0px #E2E8F0",
        2: "0px 1px 4px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
