module.exports = {
  purge: {
    content: ["./src/**/*.{html,ts}"],
    options: {
      safelist: [
        "bg-blue-400",
        "bg-green-400",
        "bg-red-400",
        "cornflower-blue",
        "forest-green",
        "rounded-xl",
        "rounded-3xl",
      ],
    },
  },
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        "cornflower-blue": "#043E86",
        "forest-green": "#0D4923",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
