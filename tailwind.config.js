// create simple tailwindcss configuration file
const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./app/**/*.{html,js,jsx,ts,tsx}', './component/**/*.{html,js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                overlay: 'rgba(0,0,0,0.5)',
                'brand-blue': '#2563EB',
                'typo-primary': colors.slate[950],
                'typo-subtitle': colors.slate[700],
                'typo-disable': colors.slate[400],
                'typo-quaternary': colors.slate[400],
                'typo-link-button': colors.blue[600],
                'typo-warning': colors.amber[800],
                'typo-success': colors.green[800],
                'main-background': colors.gray[100],
                'sub-background': colors.blue[50],
                'transparent-background': 'rgba(2,6,23,0.5)',
                'gray-background': colors.gray[200],
                'badge-4-background': colors.blue[100],
                'badge-3-background': colors.green[100],
                'badge-2-background': colors.green[100],
                'badge-1-background': colors.amber[100],
                'white-background': colors.white,
                'status-neutral-icon-line': colors.blue[600],
                'status-success-icon': colors.green[500],
                'status-error-icon': colors.red[500],
                'status-warning-icon': colors.amber[500],
                'status-warning-background': colors.yellow[50],
                'status-error-background': colors.red[50],
                'status-success-background': colors.green[50],
                'status-neutral-background': colors.blue[50],
                'full-bleed': colors.gray[200],
                'full-bleed-2': colors.gray[300],
            },
            fontFamily: {
                'primary-100': 'InterThin',
                'primary-200': 'InterExtraLight',
                'primary-300': 'InterLight',
                'primary-400': 'InterRegular',
                'primary-500': 'InterMedium',
                'primary-600': 'InterSemiBold',
                'primary-700': 'InterBold',
                'primary-800': 'InterExtraBold',
                'primary-900': 'InterBlack',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
