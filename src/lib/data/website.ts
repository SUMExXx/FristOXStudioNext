interface WebSite{
    url: string
}

export const website: WebSite = {
    url: '',
}

interface WebData{
    title: string,
    description: string,
    keywords: string[]
}

export const webData: WebData = {
    title: 'Frist\'OX Studio',
    description: "Your designs? Too good to stay flat. Your creativity? Too powerful to be stuck in 2D. It's time to bring your vision to life—no fancy software, no tech skills, just pure creative power at your fingertips. Upload Your Design. Watch It Instantly Transform. Download & Dominate.",
    keywords: ['Suman', 'Debnath', 'Suman Debnath', 'Web', 'Web Developer', 'Flutter', 'Flutter Developer', 'profile', 'blog', 'NextJS', 'SGSITS', 'Computer', 'Science', 'Engineering', 'Engineer', 'Software', 'Developer']
}

interface NavbarLink{
    text: string,
    link: string 
}

export const navbarLinks: NavbarLink[] = [
    {
        text: "About",
        link: "/"
    },
    {
        text: "Projects",
        link: "/projects"
    },
    {
        text: "Experience",
        link: "/experience"
    },
    {
        text: "Contact",
        link: "#contact"
    }
]

interface Feature{
    name: string,
    text: string
}

interface QnA{
    question: string,
    answer: string
}

interface WebContent{
    name: string,
    login: string,
    signup: string,
    mainTitle: string,
    mainSubtitle: string,
    mainButton: string,
    text1: string,
    features: Feature[],
    usecases: Feature[],
    uniqueFeatures: Feature[],
    text2: string,
    text3: string,
    text4: string[],
    text5: string,
    text6: string,
    text7: string,
    text8: string,
    text9: string,
    pricing: string[][],
    text10: string,
    qna: QnA[],
    copyright: string,
    footerLinks: NavbarLink[],
    text11: string,
    text12: string,
    text13:string,
    text14: string,
    text15: string,
    text16: string,
    text17: string,
    text18: string,
    text19: string,
    text20: string,
    text21: string,
    text22: string,
    text23: string,
    text24: string,
    text25: string,
    text26: string
}

export const contents: WebContent= {
    name: 'Suman Debnath',
    login: 'LOGIN',
    signup: 'SIGNUP',
    mainTitle: 'From 2D to 3D in Seconds! No Magic Wand Required!',
    mainSubtitle: "Your designs? Too good to stay flat. Your creativity? Too powerful to be stuck in 2D. It's time to bring your vision to life—no fancy software, no tech skills, just pure creative power at your fingertips. Upload Your Design. Watch It Instantly Transform. Download & Dominate.",
    mainButton: 'START CREATING NOW',
    text1: 'Why settle for still when you can have movement?',
    features: [
        {
            name: 'Instant 3D Mockups',
            text: 'Watch your design wrap, stretch, and drape over fabric like it was meant to be there'
        },
        {
            name: 'Cinematic Animations',
            text: 'Spin it. Tilt it. Zoom in. Every angle, every detail, fully in motion'
        },
        {
            name: 'Instant Live Previews',
            text: 'What you see is exactly what you get. No surprises, just perfection'
        },
        {
            name: 'High-Res Exports',
            text: 'Need pro-level mockups for social media, your store, or a pitch? Done in seconds'
        },
        {
            name: '100% Browser Based',
            text: 'No downloads. No software. No waiting. Just pure creation'
        }
    ],
    usecases: [
        {
            name: 'Fashion Brands & Startups',
            text: "Sell your vision before it's even produced."
        },
        {
            name: 'Apparel Designers',
            text: 'Showcase your work like a pro, no expensive software needed.'
        },
        {
            name: 'E-Commerce Sellers',
            text: 'Stand out with next-level product visuals.'
        },
        {
            name: 'Content Creators & Marketers',
            text: 'Make your audience stop scrolling and start watching.'
        }
    ],
    uniqueFeatures: [
        {
            name: 'Custom Backgrounds',
            text: "Drop your design into any setting for instant wow-factor."
        },
        {
            name: 'Adjustable Motion',
            text: 'Control every angle, speed, and highlight. Show it off YOUR way.'
        },
        {
            name: 'Hyper-Realistic Fabric Simulation',
            text: 'Soft, stretchy, silky, textured—your designs will look and feel real.'
        },
        {
            name: 'Unlimited Free Mockups',
            text: 'No sign-up, no cost, no limits on creativity.'
        }
    ],
    text2: "The Features that change Everything",
    text3: "Pricing? Simple. Flexible. No Bull.",
    text4: ["No Watermarks.", "No Restrictions.", "Just Pure Creativity."],
    text5: "MOST POPULAR",
    text6: "Free",
    text7: "TRY FREE",
    text8: "UPGRADE",
    text9: "Go Pro $19/month",
    pricing: [
        [
            "Unlimited mockups",
            "No catch",
            "Jump in now"
        ],
        [
            "Full 3D animations",
            "High-res exports",
            "Premium templates and more"
        ],
    ],
    text10: "Your Questions. Our Answers.",
    qna: [
        {
            question: 'Do I need to sign up to start?',
            answer: 'Nope. Just upload and go. Zero barriers to creativity.'
        },
        {
            question: 'Is my artwork stored on your servers?',
            answer: 'No way. Your designs stay private on YOUR device.'
        },
        {
            question: 'How fast is the export process?',
            answer: 'Faster than your morning coffee. Instant downloads.'
        },
        {
            question: 'Can I change garment colors?',
            answer: 'Absolutely. Make it yours, down to the last detail.'
        },
        {
            question: 'Do you offer custom mockups?',
            answer: "Not yet—but we're working on it! Big things coming."
        }
    ],
    copyright: "© fristox studio 2025",
    footerLinks: [
        {
            text: "About Us",
            link: "/"
        },
        {
            text: "Pricing",
            link: "/"
        },
        {
            text: "Guides",
            link: "/"
        },
        {
            text: "Contact Us",
            link: "/"
        },
        {
            text: "Terms of Service",
            link: "/"
        },
        {
            text: "Legal License",
            link: "/"
        },
        {
            text: "Documentation",
            link: "/"
        },
        {
            text: "Copyright",
            link: "/"
        }
    ],
    text11: "What People say",
    text12: "Your designs? Too good to stay flat. Your creativity? Too powerful to be stuck in 2D. It's time to bring your vision to life—no fancy software, no tech skills, just pure creative power at your fingertips. Upload Your Design. Watch It Instantly Transform",
    text13: "Sign In",
    text14: "Welcome back! Please enter details",
    text15: "Email",
    text16: "Password",
    text17: "Forgot password?",
    text18: "SIGN IN",
    text19: "Don't have an account?",
    text20: "Sign Up",
    text21: "Enter your details to register",
    text22: "Already have an account?",
    text23: "Sign In",
    text24: "SIGN UP",
    text25: "Successfully Signed Up!",
    text26: "Redirecting to Sign In...",
}

interface Socials{
    linkedin: string,
    instagram: string,
    github: string,
    blogs: string
    phone: string,
    email: string
}

export const socials: Socials = {
    linkedin: 'https://www.linkedin.com/in/suman-debnath6/',
    instagram: 'https://www.instagram.com/sumex.in/',
    github: 'https://github.com/SUMExXx',
    blogs: '/blogs',
    phone: 'tel:+918974863731',
    email: 'mailto:sumexxx666@gmail.com'
}

export enum Types3D {
    shirt = 1,
    pants = 2,
}