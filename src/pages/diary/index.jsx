
import { useEffect } from "react";
import { FaSearch } from 'react-icons/fa'
import { useRef, useState } from "react";
import useSWR from 'swr'

import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Diary = () => {
    const { data, error } = useSWR('/api/diary', fetcher)
    const [activeDiary, setActiveDiary] = useState(null)
    const diary = useRef(null)
    useEffect(() => {
        document.querySelector("body").classList.add("bg-grad-lred")
    }, []);

    if (error) return <div>failed to load</div>


    const parseDate = (date) => {
        const dateObj = new Date(date)
        const now = new Date()
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        if (dateObj.getFullYear() === now.getFullYear()) {
            if (dateObj.getMonth() === now.getMonth()) {
                if (dateObj.getDate() === now.getDate()) {
                    return `${dateObj.getHours() - now.getHours()} hours ago`
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

    const toogleBody = (e, id) => {
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
        } else {
            setActiveDiary(id)
            if (activeDiary !== null) {
                const elem = diary.current
                const target = elem.querySelector(`#body-${activeDiary}`)
                const arrow = elem.querySelector(`#arrow-${activeDiary}`)
                arrow.classList.toggle("rotate-180")
                target.classList.toggle('max-h-0')
                target.classList.toggle('max-h-96')
            }

            
        }

        toggle()
        
    }

    return (
        <div className="content-container items-start">
            <div className="search-bar h-[35px] w-[90%] flex flex-row justify-center">
                <input type="text" placeholder="wanna search something?" className="bg-white rounded-l-full h-full shadow-xl pl-4 w-1/2"></input>
                <div className="searchbutton bg-sred h-full shadow-xl rounded-r-full pl-2 pr-3"><FaSearch className="text-white h-full" /></div>
            </div>
            <div className="content flex flex-col items-start justify-center h-max mt-10 flex-grow text-left" ref={diary}>
                {(!data) ? <div>loading</div> : data.map((x, i) => {
                    return (<div key={i} className="mt-2">
                        <div className="flex flex-row justify-start items-center gap-1 hover:cursor-pointer" onClick={(e) => toogleBody(e, x.uuid)}>
                            <h3 className="text-md font-bold">{x.title}</h3>
                            <div className="flex flex-row justify-start items-center gap-1">
                                <span className="text-gray-600">@lurifos ·</span>
                                <span>{parseDate(x.timecreated)}</span>
                                
                            </div>
                            <div className="transition duration-500 text-lg" id={`arrow-${x.uuid}`}>
                                <MdKeyboardArrowDown/>
                                </div>

                        </div>
                        <div id={`body-${x.uuid}`} className="transition-max-height duration-500 text-gray-600 max-h-0 overflow-clip">{x.body}</div>
                    </div>)
                })}
            </div>
        </div>
    )
}


export default Diary