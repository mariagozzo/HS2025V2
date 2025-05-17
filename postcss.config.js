export default {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.ts'
    },
    autoprefixer: {
      grid: true,
      flexbox: true
    },
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': true,
        'nesting-rules': true,
        'custom-media-queries': true
      }
    }
  }
}
