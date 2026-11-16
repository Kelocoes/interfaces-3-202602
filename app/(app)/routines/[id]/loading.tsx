
export default function Loading() {
    return (
        <div className="flex flex-col gap-4">
            <div className="skeleton h-8 w-48" />
            <div className="skeleton h-4 w-72" />
            <div className="mt-4 flex flex-col gap-3">
                <div className="skeleton h-16 w-full" />
                <div className="skeleton h-16 w-full" />
                <div className="skeleton h-16 w-full" />
            </div>
        </div>
    );
}
