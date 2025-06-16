import MyOrdersPage from "./MyOrdersPage"

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                {/* Left section */}
                <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
                    <h1 className="text-xl md:text-2xl font-bold mb-4">
                        Nigar Ashurova
                    </h1>
                    <p className="text-md text-gray-600 mb-4">niagrashurova4@gmail.com</p>
                    <button className="w-full bg-red-500 text-white py-2 px-4 hover:bg-red-600 text-md">
                        Logout
                    </button>
                </div>
                {/* right section */}
                <div className="w-full md:w-2/3 lg:w-3/4">
                    <MyOrdersPage/>
                </div>
            </div>
        </div>      
    </div>
  )
}

export default Profile