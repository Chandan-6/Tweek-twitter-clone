import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "custom-blue-1" : "rgb(29, 155, 240)",
        "custom-blue-dim" : "rgba(91, 112, 131, 0.4)",
      },
    },

    screens: {
      '2xl': {'max': '1340px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1022px'},
      // => @media (max-width: 1023px) { ... }
      
      'lg2': {'max': '1105px'},

      'md': {'max': '950px'},
      // => @media (max-width: 767px) { ... }

      'tablet' : {'max' : '700px'},
      
      'md2': {'max': '780px'},

      'xs': {'max': '600px'},

      'sm': {'max': '550px'},

      // => @media (max-width: 639px) { ... }
      
      'mobile': {'max': '470px'},
      
    }
  },
  plugins: [],
};
export default config;
