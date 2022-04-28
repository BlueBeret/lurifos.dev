
import { useEffect } from "react";
import { FaSearch } from 'react-icons/fa'
import { useState } from "react";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Diary = () => {
    const [diary, setDiary] = useState([]);
    const { data, error } = useSWR('/api/diary', fetcher)
    useEffect(() => {
        document.querySelector("body").classList.add("bg-grad-lred")
    }, []);
    if (error) return <div>failed to load</div>



    console.log(data)
    return (
        <div className="content-container">
            <div className="search-bar h-[35px] w-[90%] flex flex-row justify-center">
                <input type="text" placeholder="wanna search something?" className="bg-white rounded-l-full h-full shadow-xl pl-4 w-1/2"></input>
                <div className="searchbutton bg-sred h-full shadow-xl rounded-r-full pl-2 pr-3"><FaSearch className="text-white h-full" /></div>
            </div>
            <div className="content flex flex-col items-center justify-center h-max mt-10 flex-grow text-left">
                {(!data) ? <div>loading</div> : data.map((x, i) => {

                    return (<div key={i}>
                        {x.title}
                    </div>)
                })}
            </div>
        </div>
    )
}


export default Diary