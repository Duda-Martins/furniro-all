import { gallery } from "../data/grid";

export function PrincipalGrid() {
    return (
        <div className="grid grid-cols-13 auto-rows-15 gap-4 w-[1700px] shrink-0 -translate-x-20 scale-85 md:scale-100">
            {gallery.map((image, index) => (
                <div key={index} className={`overflow-hidden ${image.className}`}>
                    <img
                        src={image.src}
                        alt=""
                        className="h-full w-full object-cover duration-300 hover:scale-105"
                    />
                </div>
            ))}
        </div>
    );
}
