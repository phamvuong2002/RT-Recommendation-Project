/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        popi: 'Poppins',
        inter: 'Inter',
      },
      backgroundImage: {
        'category-main': "url('/img/category_template/template_main.png')",
        welcome: "url('/img/welcome.png')",
        'welcome-gilf': "url('/img/welcome2.png')",
        'flash-sale':
          "url('https://res.cloudinary.com/datpm13gx/image/upload/v1717065876/flash_sale_bg_bgeubb.png')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(252 165 165) white',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(31 41 55)',
            borderRadius: '20px',
            border: '1px solid white',
          },
          '.no-scrollbar::-webkit-scrollbar': {
            display: 'none',
          },

          /* Hide scrollbar for IE, Edge and Firefox */
          '.no-scrollbar': {
            '-ms-overflow-style': 'none' /* IE and Edge */,
            'scrollbar - width': 'none' /* Firefox */,
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    require('tailwindcss/plugin')(({ addVariant }) => {
      addVariant('search-cancel', '&::-webkit-search-cancel-button');
    }),
  ],
};
