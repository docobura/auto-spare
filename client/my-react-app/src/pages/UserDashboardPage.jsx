import React from 'react';

function Header() {
    return (
        <header className="flex flex-wrap gap-5 justify-between max-w-full text-3xl text-black whitespace-nowrap w-[1287px]">
            <div className="flex gap-1.5">
                <div className="flex shrink-0 w-24 bg-black h-[58px] rounded-[29px]" />
                <div className="flex-auto my-auto">AutoSavy</div>
            </div>
            <nav className="flex gap-5 my-auto text-center max-md:max-w-full">
                <a href="#" className="flex-auto">Shop</a>
                <a href="#" className="flex-auto">Dashboard</a>
                <a href="#" className="flex-auto">Servicing</a>
                <a href="#" className="flex-auto">Reviews</a>
            </nav>
        </header>
    );
}

function DashboardItem({ title, icon }) {
    return (
        <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-3xl text-center text-white whitespace-nowrap max-md:mt-10">
                <div className={`flex shrink-0 rounded-full aspect-square bg-zinc-300 h-[266px] ${icon}`} />
                <div className="self-center mt-6">{title}</div>
            </div>
        </div>
    );
}

const dashboardItems = [
    { title: 'Profile', icon: 'profile-icon' },
    { title: 'My Orders', icon: 'orders-icon' },
    { title: 'My Reviews', icon: 'reviews-icon' },
    { title: 'Log Out', icon: 'logout-icon' }
];

function UserDashboardPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden px-20 pt-24 pb-96 max-md:px-5 max-md:pb-24">
            <Header />
            <main className="self-center mt-36 ml-5 w-full max-w-[1570px] max-md:mt-10 max-md:max-w-full">
                <section className="flex gap-5 max-md:flex-col">
                    {dashboardItems.map((item, index) => (
                        <DashboardItem key={index} title={item.title} icon={item.icon} />
                    ))}
                </section>
            </main>
        </div>
    );
}

export default UserDashboardPage;