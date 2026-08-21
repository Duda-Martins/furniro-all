import { Link } from "react-router-dom";
import { Container } from "./Container";
import { FormNewsletter } from "./FormNewsletter";
import { scrollToTop } from "../utils/scrollToTop";

export function Footer() {
    return (
        <div className="border-t border-t-[#0000002B]">
            <Container className="my-12">
                <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1.2fr_1.6fr] md:gap-x-6 lg:grid-cols-[3fr_1.5fr_1.5fr_2fr] lg:gap-x-8 xl:gap-x-0">
                    <div className="flex flex-col gap-8 lg:gap-14">
                        <p className="font-poppins text-2xl font-bold">Funiro.</p>
                        <p className="font-poppins text-[#9F9F9F]">
                            400 University Drive Suite 200 Coral
                            <br />
                            Gables,
                            <br />
                            FL 33134 USA
                        </p>
                        <div className="flex flex-row gap-3">
                            <div className="flex items-center justify-center bg-white w-8.5 h-8.5 rounded-full shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-transform">
                                <a href="https://www.facebook.com/compass.uol/?locale=pt_BR">
                                    <svg
                                        width="6"
                                        height="12"
                                        viewBox="0 0 6 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.905 1.9925H6.0005V0.0845C5.8115 0.0585 5.1615 0 4.4045 0C2.825 0 1.743 0.9935 1.743 2.8195V4.5H0V6.633H1.743V12H3.88V6.6335H5.5525L5.818 4.5005H3.8795V3.031C3.88 2.4145 4.046 1.9925 4.905 1.9925Z"
                                            fill="black"
                                        />
                                    </svg>
                                </a>
                            </div>
                            <div className="flex items-center justify-center bg-white w-8.5 h-8.5 rounded-full shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-transform">
                                <a href="https://www.instagram.com/compass.uol/">
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 13 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_2105_2910)">
                                            <path
                                                d="M9.481 0H3.51898C1.57858 0 0 1.57858 0 3.51898V9.4811C0 11.4214 1.57858 13 3.51898 13H9.4811C11.4214 13 13 11.4214 13 9.4811V3.51898C13 1.57858 11.4214 0 9.481 0V0ZM12.2379 9.4811C12.2379 11.0012 11.0012 12.2379 9.481 12.2379H3.51898C1.99881 12.2379 0.762114 11.0012 0.762114 9.4811V3.51898C0.762114 1.99881 1.99881 0.762114 3.51898 0.762114H9.4811C11.0012 0.762114 12.2379 1.99881 12.2379 3.51898V9.4811Z"
                                                fill="black"
                                            />
                                            <path
                                                d="M6.50002 2.94531C4.53998 2.94531 2.94543 4.53986 2.94543 6.49989C2.94543 8.45993 4.53998 10.0545 6.50002 10.0545C8.46005 10.0545 10.0546 8.45993 10.0546 6.49989C10.0546 4.53986 8.46005 2.94531 6.50002 2.94531ZM6.50002 9.29236C4.96032 9.29236 3.70755 8.03969 3.70755 6.49989C3.70755 4.96019 4.96032 3.70743 6.50002 3.70743C8.03982 3.70743 9.29248 4.96019 9.29248 6.49989C9.29248 8.03969 8.03982 9.29236 6.50002 9.29236Z"
                                                fill="black"
                                            />
                                            <path
                                                d="M10.1396 1.68311C9.56035 1.68311 9.08923 2.15432 9.08923 2.73344C9.08923 3.31266 9.56035 3.78388 10.1396 3.78388C10.7188 3.78388 11.19 3.31266 11.19 2.73344C11.19 2.15422 10.7188 1.68311 10.1396 1.68311ZM10.1396 3.02166C9.98068 3.02166 9.85135 2.89233 9.85135 2.73344C9.85135 2.57445 9.98068 2.44522 10.1396 2.44522C10.2986 2.44522 10.4279 2.57445 10.4279 2.73344C10.4279 2.89233 10.2986 3.02166 10.1396 3.02166Z"
                                                fill="black"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2105_2910">
                                                <rect
                                                    width="13"
                                                    height="13"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </div>
                            <div className="flex items-center justify-center bg-white w-8.5 h-8.5 rounded-full shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-transform">
                                <a href="https://x.com/compassuol">
                                    <svg
                                        width="13"
                                        height="11"
                                        viewBox="0 0 13 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13 1.25044C12.5166 1.4625 12.0014 1.60306 11.4644 1.67131C12.0169 1.34144 12.4386 0.823062 12.6368 0.19825C12.1217 0.505375 11.5529 0.722313 10.9468 0.843375C10.4577 0.322563 9.76056 0 9.00006 0C7.52456 0 6.33669 1.19763 6.33669 2.66581C6.33669 2.87706 6.35456 3.08019 6.39844 3.27356C4.18275 3.1655 2.22219 2.10356 0.905125 0.485875C0.675187 0.884813 0.540313 1.34144 0.540313 1.833C0.540313 2.756 1.01562 3.57419 1.72413 4.04787C1.29594 4.03975 0.875875 3.91544 0.52 3.71962C0.52 3.72775 0.52 3.73831 0.52 3.74887C0.52 5.044 1.44381 6.11975 2.65525 6.36756C2.43831 6.42688 2.20187 6.45531 1.9565 6.45531C1.78587 6.45531 1.61362 6.44556 1.45194 6.40981C1.79725 7.46525 2.77713 8.24119 3.94225 8.26637C3.0355 8.97569 1.88419 9.40306 0.637812 9.40306C0.41925 9.40306 0.209625 9.39331 0 9.3665C1.18056 10.1278 2.57969 10.5625 4.0885 10.5625C8.99275 10.5625 11.674 6.5 11.674 2.97862C11.674 2.86081 11.6699 2.74706 11.6643 2.63412C12.1932 2.25875 12.6376 1.78994 13 1.25044Z"
                                            fill="black"
                                        />
                                    </svg>
                                </a>
                            </div>
                            <div className="flex items-center justify-center bg-white w-8.5 h-8.5 rounded-full shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-transform">
                                <a href="https://www.linkedin.com/company/compass-uol?originalSubdomain=br">
                                    <svg
                                        width="11"
                                        height="11"
                                        viewBox="0 0 11 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_2105_2924)">
                                            <path
                                                d="M10.9972 11V10.9996H11V6.96531C11 4.99173 10.5751 3.47144 8.26783 3.47144C7.15866 3.47144 6.41433 4.0801 6.11046 4.65714H6.07837V3.65569H3.89075V10.9996H6.16866V7.36314C6.16866 6.40569 6.35016 5.47985 7.53587 5.47985C8.70416 5.47985 8.72158 6.57252 8.72158 7.42456V11H10.9972Z"
                                                fill="black"
                                            />
                                            <path
                                                d="M0.181519 3.65601H2.46219V10.9999H0.181519V3.65601Z"
                                                fill="black"
                                            />
                                            <path
                                                d="M1.32092 0C0.591708 0 0 0.591708 0 1.32092C0 2.05013 0.591708 2.65421 1.32092 2.65421C2.05013 2.65421 2.64183 2.05013 2.64183 1.32092C2.64138 0.591708 2.04967 0 1.32092 0V0Z"
                                                fill="black"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2105_2924">
                                                <rect
                                                    width="11"
                                                    height="11"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 lg:gap-14">
                        <p className="font-poppins font-medium text-[#9F9F9F]">Links</p>
                        <ul className="flex flex-col gap-6 lg:gap-12">
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => scrollToTop()}
                                    className="font-poppins font-medium hover:underline"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop"
                                    onClick={() => scrollToTop()}
                                    className="font-poppins font-medium hover:underline"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-poppins font-medium hover:underline"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-poppins font-medium hover:underline"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-8 lg:gap-14">
                        <p className="font-poppins font-medium text-[#9F9F9F]">Help</p>
                        <ul className="flex flex-col gap-6 lg:gap-12">
                            <li>
                                <a
                                    href="#"
                                    className="font-poppins font-medium hover:underline"
                                >
                                    Payment Options
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-poppins font-medium hover:underline"
                                >
                                    Returns
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-poppins font-medium hover:underline"
                                >
                                    Privacy Policies
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-8 lg:gap-14">
                        <p className="font-poppins font-medium text-[#9F9F9F]">
                            Newsletter
                        </p>
                        <FormNewsletter />
                    </div>
                </div>
                <div className="pt-8 border-t border-t-[#0000002B]">
                    <p>2023 furino. All rights reverved</p>
                </div>
            </Container>
        </div>
    );
}
