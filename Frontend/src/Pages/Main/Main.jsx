import React from 'react'
const Navbar = React.lazy(() => import('../Navbar/Navbar'));
const Clients = React.lazy(() => import('../../Components/ClientList/Clients'));
const Hero = React.lazy(() => import('../HeroSection/Hero'));
const About = React.lazy(() => import('../About/About'));
const Subscriptionplan = React.lazy(() => import('../SubscriptionPlan/Subscriptionplan'));

const Main = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Clients />
            <About />
            <Subscriptionplan />
        </div>
    )
}

export default Main