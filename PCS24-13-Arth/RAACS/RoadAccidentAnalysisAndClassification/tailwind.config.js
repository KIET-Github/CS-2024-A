const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'limeShade': 'rgb(7,191,103)'
      },
      backgroundImage: {
        'welcome-wallpaper': "url('/src/assets/wallpaper.jpg')"
      }
    },
    
  },
  plugins: [],
});