import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="p-20 text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">
                404 - Page Not Found
            </h1>
            <Link
                to="/"
                className="text-blue-500 underline hover:text-blue-700"
            >
                Return to Home Page
            </Link>
        </div>
    );
}
