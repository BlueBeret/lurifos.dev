import Link from "next/link"
import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/router";


function Navbar(props) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const toogleMenu = () => {
        setIsOpen(!isOpen);
    }
    const signInColor = {
        '/': 'bg-sblue',
        '/diary': 'bg-sred',
        '/askme': 'bg-syellow',
        '/contact': 'bg-sblue'
    }

    const menu = [
        {
            name: 'Home',
            alias: "/",
            link: '/'
        }, {
            name: 'Diary',
            alias: '/diary',
            link: '/diary'
        }, {
            name: 'Ask Me',
            alias: '/askme',
            link: '/askme'
        }, {
            name: 'Contact',
            alias: '/contact',
            link: '/contact'
        },
    ]
    return (<div className="w-full h-auto">
        <nav className={`bg-transparent pl-10 flex items-center p-3 md:px-20 lg:pl-36 h-30px border-b-[2px]`}>
            <Link href="/">
                <a className="inline-flex items-center">
                    <Image src="/navbrand.png" height={50} width={50} layout="fixed" alt="logo" />
                    <span className="hidden sm:flex font-semibold text-2xl ml-[20px] text-black">
                        Lurifos
                    </span>
                </a>
            </Link>

            <div className="lg:ml-[60] xl:ml-[95px] inline-flex p-2">
                {
                    menu.map((item, index) => {
                        return (
                            <Link href={item.link} key={index} className="md:inline-flex md:flex-row md:ml-auto md:w-auto w-full md:items-center items-start  flex flex-col md:h-auto">
                                <a className={`hidden ${router.pathname == item.alias ? 'text-black font-bold hover:animate-pulse' : 'text-grey hover:scale-125 hover:text-black'} transition md:inline-flex md:w-auto md:mx-1 lg:mx-4 w-full px-3 py-2 rounded font-medium items-center justify-center
                                `}>
                                    {item.name}
                                </a>
                            </Link>
                        )
                    })
                }
            </div>
            <button className={` ${signInColor[router.pathname]} transition ml-auto inline-flex p-2 px-4 font-bold rounded-2xl text-white outline-none hover:scale-125`}>
                Sign In
            </button>
            <button className='text-sblue inline-flex p-2 mx-2 rounded md:hidden sm:text-primary outline-none' onClick={toogleMenu}>
                <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 6h16M4 12h16M4 18h16'
                    />
                </svg>
            </button>
        </nav>
        <div id="botnav" className={`${isOpen ? 'h-40' : 'h-0'}
                px-10
                md:hidden
                flex flex-col justify-center 
                transition-all duration-300 ease
                
                `}>
            {
                menu.map((item, index) => {
                    return (
                        <Link href={item.link} key={index} className="">
                            <a onClick={toogleMenu} className={`${router.pathname == item.alias ? 'text-black font-bold' : 'text-grey'} overflow-hidden transition-none sm:text-primary w-full py-1 text-black font-bold items-center justify-center border-none `}>
                                {item.name}
                            </a>
                        </Link>
                    )
                })
            }

        </div>

    </div>)
}

export default Navbar