import React from 'react';
import { Link } from 'react-router-dom';

// Header Component
const Header = () => {
    return (
        <header className="flex flex-wrap gap-5 justify-between max-w-full text-3xl text-black whitespace-nowrap w-[1287px]">
            <div className="flex gap-1.5">
                <div className="flex shrink-0 w-24 bg-black h-[58px] rounded-[29px]" />
                <div className="flex-auto my-auto">AutoSavy</div>
            </div>
            <nav className="flex gap-5 my-auto text-center max-md:max-w-full">
                <Link to="/shop" className="flex-auto">Shop</Link>
                <Link to="/dashboard" className="flex-auto">Dashboard</Link>
                <Link to="/servicing" className="flex-auto">Servicing</Link>
                <Link to="/reviews" className="flex-auto">Reviews</Link>
            </nav>
        </header>
    );
};

// DashboardItem Component
const DashboardItem = ({ title, icon, link }) => {
    return (
        <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-3xl text-center text-white whitespace-nowrap max-md:mt-10">
                <div className={`flex shrink-0 rounded-full aspect-square bg-zinc-300 h-[266px] ${icon}`} />
                <div className="self-center mt-6">
                    <Link to={link} className="text-white">{title}</Link>
                </div>
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
        <div className="flex flex-col min-h-screen overflow-hidden px-20 pt-24 pb-96 max-md:px-5 max-md:pb-24">
            <Header />
            <main className="self-center mt-36 ml-5 w-full max-w-[1570px] max-md:mt-10 max-md:max-w-full">
                <section className="flex gap-5 max-md:flex-col">
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
