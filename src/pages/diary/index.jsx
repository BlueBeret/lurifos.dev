
import getLatestDiary from "@/helpers/getLatestDiary";
import Content from "./Content";

export default function Index(props) {
    return (
        <>
            <div id="scrollable-target" className=" overflow-auto h-40">
                <Content data={props.data} />
            </div>
        </>
    );
}

export const getStaticProps = async () => {
    const baseUrl = 'undefined' === typeof window ? 'http://localhost:3000' : 'https://lurifos.dev';
    const data = await getLatestDiary()
    return {
        props: { data: data }
    };
};