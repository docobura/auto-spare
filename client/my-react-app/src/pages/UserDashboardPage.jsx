import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
            <nav className="flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-lg text-black">
                    <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
                    <div className="text-lg">AutoSavy</div>
                </Link>
                <div className="flex gap-4 text-sm text-black">
                    <Link to="/shop">Shop</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/servicing">Servicing</Link>
                    <Link to="/reviews">Reviews</Link>
                </div>
            </nav>
        </header>
    );
};

// DashboardItem Component
const DashboardItem = ({ title, icon, link }) => {
    return (
        <div className="flex flex-col items-center w-full max-w-[200px]">
            <div className={`flex shrink-0 rounded-full aspect-square bg-zinc-300 h-[200px] ${icon}`} />
            <div className="mt-4 text-center">
                <Link to={link} className="text-white">{title}</Link>
            </div>
        </div>
    );
};

// Dashboard Items
const dashboardItems = [
    { title: 'Profile', icon: 'profile-icon', link: '/profile' },
    { title: 'My Orders', icon: 'orders-icon', link: '/my-orders' },
    { title: 'My Reviews', icon: 'reviews-icon', link: '/my-reviews' },
    { title: 'Log Out', icon: 'logout-icon', link: '/logout' }
];

// UserDashboardPage Component
const UserDashboardPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex flex-col flex-1 items-center pt-48 px-80 pb-72">
                <section className="flex flex-wrap justify-center gap-40 w-full max-w-screen-xl">
                    {dashboardItems.map((item, index) => (
                        <DashboardItem
                            key={index}
                            title={item.title}
                            icon={item.icon}
                            link={item.link}
                        />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default UserDashboardPage;
