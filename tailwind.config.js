/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        titleIn: {
          from: {
            transform: 'rotateX(90deg)',
            opacity: 0,
          },
          to: {
            transform: 'rotateX(0)',
            opacity: 1,
          }
        },
        titleMove: {
          from: {
            transform: 'translateX(0) translateY(0)',
          },
          to: {
            transform: 'translateX(-70%) translateY(-100%)',
          }
        },
        imageIn: {
          from: {
            scale: 0,
            opacity: 0,
          },
          to: {
            scale: 1,
            opacity: 1,
          }
        },
        buttonIn: {
          from: {
            transform: 'translateX(-50px)',
            opacity: 0,
          },
          to: {
            transform: 'translateX(0)',
            opacity: 1,
          }
        },
        floatIn: {
          from: {
            transform: 'translateY(50px)',
            opacity: 0,
          },
          to: {
            transform: 'translateY(0)',
            opacity: 1,
          }
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          }
        }
      },
      animation: {
        titleMove: "titleMove 0.5s 1s ease-in-out forwards",
        title0In: 'titleIn 0.3s 0s ease-in-out forwards',
        title1In: 'titleIn 0.3s 0.3s ease-in-out forwards',
        title2In: 'titleIn 0.3s 0.6s ease-in-out forwards',
        imageIn: 'imageIn 0.3s 1.2s ease-in-out forwards',
        buttonIn: "buttonIn 0.3s 1.2s ease-in-out forwards",
        floatIn: "floatIn 0.5s 0.3s ease-in-out forwards",
        floatingWindowIn: "fadeIn 0.3s ease-in-out forwards",
      }
    },
  },
  plugins: [],
}

