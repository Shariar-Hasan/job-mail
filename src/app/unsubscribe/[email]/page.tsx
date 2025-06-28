import { APP_CONSTANTS } from "@/constants/app-constants";
import { ROUTES } from "@/constants/route";
import tryCatch from "@/lib/tryCatch";
import { api } from "@/services/fetch/fetchService";
import Link from "next/link";

interface Props {
    params: Promise<{ email: string }>;
}

const UnSubscribePage = async ({ params }: Props) => {
    console.log("UnsubscribePage params:", decodeURIComponent((await params).email));
    const { data, error } = await tryCatch(async () => {
        const res = await api.post<{ message: string, success: boolean }>(
            `/unsubscribe`,
            {
                email: decodeURIComponent((await params).email)
            }
        );
        return res;
    });
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold mb-2 text-red-700">Unsubscribe Failed</h1>
                    <p className="text-gray-700 mb-2">An error occurred while trying to unsubscribe.</p>
                    <p className="text-sm text-gray-400">Please try again later or contact support.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                {data?.success ? (
                    <>
                        <svg className="mx-auto mb-4" width="64" height="64" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="#22c55e" />
                            <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1 className="text-2xl font-bold mb-2 text-green-700">Unsubscribed Successfully</h1>
                        <p className="text-gray-700 mb-2">{data.message}</p>
                        <p className="text-sm text-gray-400">If you change your mind, you can always <Link href={ROUTES.SUBSCRIBE()}>subscribe again</Link>.</p>
                    </>
                ) : (
                    <>
                        <svg className="mx-auto mb-4" width="64" height="64" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="#ef4444" />
                            <path d="M15 9l-6 6M9 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1 className="text-2xl font-bold mb-2 text-red-700">Unsubscribe Failed</h1>
                        <p className="text-gray-700 mb-2">{data?.message}</p>
                        <p className="text-sm text-gray-400">If you think this is a mistake, please <Link href={ROUTES.MAILTO(APP_CONSTANTS.APP_AUTHOR_EMAIL)}>contact support</Link>.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default UnSubscribePage;