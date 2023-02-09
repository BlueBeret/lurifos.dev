import ContactCard from "@/components/card/ContactCard"
import { FaTwitter } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { SiDiscord } from 'react-icons/si'



const Contact = () => {
    const contactData = [
        {
            name: "github",
            contact: "Blueberet",
            link: "https://github.com/BlueBeret",
            icon: <AiFillGithub />,
            icon_color: "text-[#23315A]",
            bg_color: "hover:bg-[#23315A]",
            desc: "Exploring the world of computer science."
        },
        {
            name: "twitter",
            contact: "@lurifos",
            link: "https://twitter.com/lurifos",
            icon: <FaTwitter />,
            icon_color: "text-[#1DA1F2]",
            bg_color: "hover:bg-[#1DA1F2]",
            desc: "Currently a programmer, hopefully can also be a pro gamer."
        },
        {
            name: "discord",
            contact: "Lurifos#3482",
            link: "#",
            icon: <SiDiscord />,
            icon_color: "text-[#7289DA]",
            bg_color: "hover:bg-[#7289DA]",
            desc: "I play some games in the weekend"
        },
        {
            name: "email",
            contact: "google@lurifos.dev",
            link: "mailto: google@lurifos.dev",
            icon: <FiMail />,
            icon_color: "text-[#000]",
            bg_color: "hover:bg-[#000]",
            desc: "I might give a late reply, that's because of the pigeon."
        }
    ]
    return (
        <div className="content-container gap-4">
            <h1 className="p-3 text-4xl">
                Contact
            </h1>
            <div className="flex flex-row flex-wrap  justify-center items-center gap-10 mt-2 sm:mt-10 max-h-[60vh]
            overflow-auto max-w-[1080px]">
                {contactData.map((item, index) => {

                    return (<ContactCard data={item} key={index} />)
                })}
            </div>
        </div>
    )
}

export default Contact