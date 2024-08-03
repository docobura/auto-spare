import React from 'react';
import RecentParts from '../components/Shop/RecentParts';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

function ShopPage() {
    return (
        <div>
            {/* Navbar Component */}
            <Navbar />

            {/* Main Shop Content */}
            <div className="shop-page-content">
                <h1 className="text-5xl font-bold text-center my-8">Shop</h1>
                <RecentParts />
            </div>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}

export default ShopPage;