import React, { useEffect, useState } from 'react';
import Carousel from '../../Components/Carousel';
import ActionCard from '../../Components/ActionCard';

const actions = [
    {
        "action": "Voter Applications",
        "icon": "application",
        "description": "Pending applications for verification.",
        "link": "/verification_officer/voter_applications",
    },
    
    // {
    //     "action": "Candidates",
    //     "icon": "candidate",
    //     "description": "Information about the election candidates.",
    //     "link": "/candidates"
    // },
    // {
    //   "action": "Manifestos",
    //   "icon": "manifesto",
    //   "description": "Read the manifestos of each party.",
    //   "link": "/manifestos"
    // },
    // {
    //     "action": "Elections",
    //     "icon": "election",
    //     "description": "General information about the elections.",
    //     "link": "/elections"
    // },
    // {
    //     "action": "Inquiries",
    //     "icon": "inquiry",
    //     "description": "Submit your inquiries here.",
    //     "link": "/inquiries"
    // },
    // {
    //     "action": "Announcements",
    //     "icon": "announcement",
    //     "description": "Latest announcements and updates.",
    //     "link": "/announcements"
    // }
];

const messages = {
    en: "Welcome to our website!",
    si: "අපගේ වෙබ් අඩවියට සාදරයෙන් පිළිගනිමු!",
    ta: "எங்கள் வலைத்தளத்திற்கு வரவேற்கிறோம்!"
};

const languageOrder = ['en', 'si', 'ta'];

export const VerificationHome = () => {
    const [language, setLanguage] = useState('en');
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setLanguage((prevLanguage) => {
                    const currentIndex = languageOrder.indexOf(prevLanguage);
                    const nextIndex = (currentIndex + 1) % languageOrder.length;
                    return languageOrder[nextIndex];
                });
                setFade(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6">
            <div className="h-1/5 flex-grow flex flex-col justify-center items-center text-3xl text-center">
                <h1 className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    {messages[language]}
                </h1>
            </div>
            <div className="h-2/5 flex-grow flex flex-wrap gap-4 justify-center items-center">
                {actions.map((action, index) => (
                    <ActionCard key={index} icon={action.icon} action={action.action} description={action.description} link={action.link} />
                ))}
            </div>
            <div className="h-[2/5] flex-grow flex flex-col justify-center items-center">
                <Carousel />
            </div>
        </div>
    );
};
