import getLatestQuestions from "@/helpers/getLatestQuestion";
import Content from "@/components/askme/Content";
import { FaSearch } from 'react-icons/fa'
import { useEffect, useState } from "react";
import Stairs from "@/components/loading/Stairsy";
import Link from "next/link";

import toast, { Toaster } from "react-hot-toast";

export default function Index(props) {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [contentDispay, setContentDispay] = useState('diary')
    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const search = (e) => {
        e.preventDefault()
        setContentDispay('searching')
        fetch('/api/askme/search?search=' + searchQuery).then(res => res.json()).then(
            data => {
                setSearchResult(data)
                setContentDispay('search_result')
            }
        )


    }

    useEffect(() => {
        document.querySelector("body").classList.add("bg-grad-lred")
        // toast(
        //     <div>

        //         <div className="text-sm">This feature is still in development, bugs are expected. If you found one, you can
        //             <Link href="/contact"><a>contact me</a></Link> or submit it
        //             <Link href="/bugs"><a>here</a></Link></div>
        //     </div>

        //     , {
        //         icon: <div className="font-bold">ProTip!</div>,
        //         position: "bottom-center",
        //         duration: 15000
        //     })
    }, []);

    return (
        <div className="content-container items-center fillheight">
            <form className="search-bar h-[35px] w-[90%] flex flex-row justify-center" onSubmit={search}>
                <input type="text" placeholder="wanna search something?" className="bg-white rounded-l-full h-full shadow-xl pl-4 w-3/4 sm:w-1/2"
                    name="searchquery" value={searchQuery} onChange={handleChange}></input>
                <button type='submit' className="searchbutton bg-syellow h-full shadow-xl rounded-r-full pl-2 pr-3 hover:cursor-pointer" ><FaSearch className="text-white h-full" /></button>
            </form>
            <Link href="/askme/ask">
                <a className="mt-2 rounded-lg px-2 bg-syellow text-white shadow-xl font-bold hover:scale-110 transition-all">Ask a question</a></Link>
            {contentDispay === 'searching' && <div className="content
        content-askme-mobile sm:content-askme
        flex flex-col items-start text-left max-w-[900px] mx-auto p-7 sm:p-[45px]
        overflow-y-auto"><div className="mx-auto w-min">
                    <Stairs className="bg-syellow" />
                </div></div>}
            <div className="items-start w-full">
                {contentDispay === "search_result" && <Content key={searchResult} data={searchResult} searchresult={true} back={() => setContentDispay('diary')} />}
                {contentDispay === "diary" && <Content data={props.data} />}

            </div>
            <Toaster />
        </div>
    );
}

export const getServerSideProps = async () => {
    const data = await getLatestQuestions()
    return {
        props: { data: data }
    };
};
