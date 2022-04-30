
import getLatestDiary from "@/helpers/getLatestDiary";
import Content from "./Content";
import { FaSearch } from 'react-icons/fa'
import { useEffect } from "react";


export default function Index(props) {
    useEffect(() => {
        document.querySelector("body").classList.add("bg-grad-lred")
    }, []);

    return (
        <div className="content-container items-center fillheight">
            <div className="search-bar h-[35px] w-[90%] flex flex-row justify-center">
                <input type="text" placeholder="wanna search something?" className="bg-white rounded-l-full h-full shadow-xl pl-4 w-3/4 sm:w-1/2"></input>
                <div className="searchbutton bg-sred h-full shadow-xl rounded-r-full pl-2 pr-3"><FaSearch className="text-white h-full" /></div>
            </div>
            <Content data={props.data} />
        </div>
    );
}

export const getStaticProps = async () => {
    const data = await getLatestDiary()
    return {
        props: { data: data }
    };
};
