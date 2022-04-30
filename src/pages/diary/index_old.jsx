
import { useEffect } from "react";
import { FaSearch } from 'react-icons/fa'
import { useRef, useState } from "react";
import useSWR from 'swr'
import sleep from '@/utils/sleep'
import truncate from "@/utils/truncate";
import { MdKeyboardArrowDown } from 'react-icons/md'
import Stairs from "@/components/loading/Stairs";
import { ImNewTab } from 'react-icons/im'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Diary = () => {
    const { data, error } = useSWR('/api/diary/diary', fetcher)
    const [activeDiary, setActiveDiary] = useState(null)
    const diary = useRef(null)
    useEffect(() => {
        document.querySelector("body").classList.add("bg-grad-lred")
    }, []);

    const reload = (e) => {

    }

    if (error) return <div className="content-container items-center">
        <div className="search-bar h-[35px] w-[90%] flex flex-row justify-center">
            <input type="text" placeholder="wanna search something?" className="bg-white rounded-l-full h-full shadow-xl pl-4 w-1/2"></input>
            <div className="searchbutton bg-sred h-full shadow-xl rounded-r-full pl-2 pr-3"><FaSearch className="text-white h-full" /></div>
        </div>
        <div className="content flex flex-col items-center justify-center h-max mt-10 flex-grow text-left max-w-[900px] mx-auto" ref={diary}>
            <h1>Houston, we got a problem!</h1>
            <button className="transition bg-sred text-white shadow-lg rounded-lg px-4 py-2 mt-2 hover:scale-105 font-bold" onClick={reload}>reload</button>

        </div>
    </div>

    const parseDate = (date) => {
        const dateObj = new Date(date)
        const now = new Date()
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        if (dateObj.getFullYear() === now.getFullYear()) {
            if (dateObj.getMonth() === now.getMonth()) {
                if (dateObj.getDate() === now.getDate()) {
                    return `${now.getHours() - dateObj.getHours()} hours ago`
                } else if (dateObj.getDate() === now.getDate() - 1) {
                    return `Yesterday`
                } else {
                    return `${month[dateObj.getMonth()]} ${dateObj.getDate()}`
                }
            } else {
                return `${month[dateObj.getMonth()]} ${dateObj.getDate()}`
            }
        }

        return `${dateObj.toLocaleDateString()}`
    }

    const toogleBody = async (e, id) => {
        switch (e.detail) {
            case 1:
                const toggle = (e) => {
                    const elem = diary.current
                    const target = elem.querySelector(`#body-${id}`)
                    const arrow = elem.querySelector(`#arrow-${id}`)
                    arrow.classList.toggle("rotate-180")
                    target.classList.toggle('max-h-0')
                    target.classList.toggle('max-h-96')
                }


                if (activeDiary === id) {
                    setActiveDiary(null)
                    toggle()
                } else {

                    if (activeDiary !== null) {
                        const elem = diary.current
                        const target = elem.querySelector(`#body-${activeDiary}`)
                        const arrow = elem.querySelector(`#arrow-${activeDiary}`)
                        arrow.classList.toggle("rotate-180")
                        target.classList.toggle('max-h-96')
                        await sleep(200);

                    }

                    toggle()
                    setActiveDiary(id)
                }
                break;
            case 2:
                window.open(`/diary/${id}`, '_blank')
                break;
            default:
                break;
        }




    }

    return (
        <div className="content-container items-center">
            <div className="search-bar h-[35px] w-[90%] flex flex-row justify-center">
                <input type="text" placeholder="wanna search something?" className="bg-white rounded-l-full h-full shadow-xl pl-4 w-1/2"></input>
                <div className="searchbutton bg-sred h-full shadow-xl rounded-r-full pl-2 pr-3"><FaSearch className="text-white h-full" /></div>
            </div>
            <div className="content flex flex-col items-start justify-center h-max mt-10 flex-grow text-left max-w-[900px] mx-auto" ref={diary}>
                {(!data) ? <div className=""><Stairs /></div> : data.map((x, i) => {
                    return (<div key={i} className={`transition mt-3 animate-fade-in-up duration-500 ${activeDiary === x.uuid || activeDiary === null ? '' : 'opacity-50'} ${activeDiary === x.uuid ? 'scale-110' : 'scale-100'}`}>
                        <div className="flex flex-row justify-start items-center gap-1 hover:cursor-pointer" onClick={(e) => toogleBody(e, x.uuid)}>
                            <h3 className="text-md font-bold noselect">{x.title}</h3>
                            <div className="flex flex-row justify-start items-center gap-1">
                                <span className="text-gray-600">@lurifos ·</span>
                                <span>{parseDate(x.timecreated)}</span>

                            </div>
                            <div className="transition duration-500 text-lg" id={`arrow-${x.uuid}`}>
                                <MdKeyboardArrowDown />
                            </div>

                        </div>
                        <div id={`body-${x.uuid}`} className="transition-max-height duration-500 text-gray-600 slide overflow-clip">
                            {truncate(x.body, 256)}
                            <a href={'/diary/' + x.uuid} className="text-sm ml-1  text-blue-500" target='_blank' rel="noreferrer">{x.body.length > 256 ? "Read More" : ''}
                            </a>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}



export default Diary