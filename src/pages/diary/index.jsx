import { reactStrictMode } from "next.config";
import { useEffect } from "react";

const Diary = () => {
    useEffect(() => { document.querySelector("body").classList.add("bg-grad-lred") }, []);
    return (
        <div className="content px-10 pt-6 lg:mt-10 flex flex-col md:px-20 lg:px-36 items-center ">
            This is diary
        </div>
    )
}

export async function getServerSideProps() {
    const res = {
        nices: 'true'
    }
    const data = await res.json();
}

export default Diary