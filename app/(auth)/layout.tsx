export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-base-200">
            <div className="w-full max-w-sm card bg-base-100 shadow-md p-6">
                {children}
            </div>
        </main>
    );
}
