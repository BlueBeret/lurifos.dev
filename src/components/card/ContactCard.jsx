
export default function ContactCard({ data }) {
    const click = (link) => {
        if (link !== "#") {
            window.open(link, "_blank");
        }
    }

    return (
        <div className={`transition duration-500 group flex flex-row bg-white rounded-lg items-center p-4 gap-4 w-[260px] sm:w-[400px] h-[150px]
        shadow-xl
        hover:cursor-pointer
        group-hover:text-white ${data.bg_color}`} onClick={(e) => click(data.link)}>
            <div className={`text-[60px] ${data.icon_color} group-hover:text-white`}>
                {data.icon}
            </div>
            <div>
                <div className="font-bold text-base sm:text-lg text-wrap group-hover:text-white">
                    {data.contact}
                </div>
                <div className="text-grey  text-sm sm:text-base group-hover:text-white">
                    {data.desc}
                </div>
            </div>
        </div>
    )
}