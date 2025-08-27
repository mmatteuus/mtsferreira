import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				heading: ['Inter', 'system-ui', 'sans-serif'],
				body: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Consolas', 'monospace'],
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-dark': 'var(--gradient-dark)',
				'gradient-text': 'var(--gradient-text)',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				purple: 'hsl(var(--purple))',
				orange: 'hsl(var(--orange))',
				yellow: 'hsl(var(--yellow))',
				cyan: 'hsl(var(--cyan))',
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'glow-purple': 'var(--shadow-glow-purple)',
				'glow-green': 'var(--shadow-glow-green)',
				'soft': 'var(--shadow-soft)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'section': 'var(--spacing-section)',
				'component': 'var(--spacing-component)',
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: 'var(--shadow-glow)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(217 91% 60% / 0.5)'
					}
				},
				'gradient-shift': {
					'0%': { 
						backgroundPosition: '0% 50%' 
					},
					'50%': { 
						backgroundPosition: '100% 50%' 
					},
					'100%': { 
						backgroundPosition: '0% 50%' 
					}
				},
				'color-cycle': {
					'0%': { 
						color: 'hsl(217 91% 60%)' 
					},
					'25%': { 
						color: 'hsl(142 76% 36%)' 
					},
					'50%': { 
						color: 'hsl(280 100% 70%)' 
					},
					'75%': { 
						color: 'hsl(45 100% 60%)' 
					},
					'100%': { 
						color: 'hsl(217 91% 60%)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in': 'slide-in 0.6s ease-out',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
				'color-cycle': 'color-cycle 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
