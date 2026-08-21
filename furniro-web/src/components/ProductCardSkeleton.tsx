export function ProductCardSkeleton() {
    return (
        <div className="relative flex w-full flex-col items-start bg-[#F4F5F7] animate-pulse">
            <div className="w-full h-75 bg-gray-300/70" />

            <div className="h-6 bg-gray-300/70 rounded-none w-3/4 mt-4 mx-4" />

            <div className="h-4 bg-gray-300/70 rounded-none w-1/2 mt-2 mx-4" />

            <div className="h-6 bg-gray-300/70 rounded-none w-1/3 mt-3 mx-4 mb-8" />
        </div>
    );
}
