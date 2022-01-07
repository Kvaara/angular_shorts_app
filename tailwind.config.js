module.exports = {
  purge: {
    content: ["./src/**/*.{html,ts}"],
    options: {
      safelist: [
        "bg-blue-400",
        "bg-green-400",
        "bg-red-400",
        "cornflower-blue",
      ],
    },
  },
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        "cornflower-blue": "#043E86",
      },
    },
  },
  plugins: [],
};
