import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="mainfooter w-full bg-gradient-to-r from-slate-900/90 via-indigo-900/90 to-purple-900/90 dark:from-slate-950/95 dark:via-slate-900/95 dark:to-slate-950/95 text-white py-10 px-4 transition-all duration-300 shadow-2xl dark:shadow-slate-900/50 border-t-4 border-indigo-400/40 dark:border-slate-600/40">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="item about">
                        <h4 className="font-bold text-lg mb-4 text-indigo-200 tracking-wide uppercase">About Food Zaika</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Contact Us</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">About Us</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Careers</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Stories</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Press</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Corporate Information</li>
                        </ul>
                    </div>
                    <div className="item help">
                        <h4 className="font-bold text-lg mb-4 text-indigo-200 tracking-wide uppercase">Help & Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Payments</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Order Tracking</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Cancellation & Returns</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">FAQs</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Report Issue</li>
                        </ul>
                    </div>
                    <div className="item policy">
                        <h4 className="font-bold text-lg mb-4 text-indigo-200 tracking-wide uppercase">Policy</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Return Policy</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Terms Of Use</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Security</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Privacy</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Sitemap</li>
                        </ul>
                    </div>
                    <div className="item social">
                        <h4 className="font-bold text-lg mb-4 text-indigo-200 tracking-wide uppercase">Follow Us</h4>
                        <div className="flex gap-4 mb-2">
                            <a href="#" className="hover:text-indigo-300 transition-colors" aria-label="Facebook"><FaFacebookF size={20} /></a>
                            <a href="#" className="hover:text-indigo-300 transition-colors" aria-label="Twitter"><FaTwitter size={20} /></a>
                            <a href="#" className="hover:text-indigo-300 transition-colors" aria-label="Youtube"><FaYoutube size={20} /></a>
                            <a href="#" className="hover:text-indigo-300 transition-colors" aria-label="Instagram"><FaInstagram size={20} /></a>
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Facebook</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Twitter</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Youtube</li>
                            <li className="hover:underline hover:text-indigo-300 cursor-pointer transition-colors">Instagram</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-indigo-400/40 mt-8 pt-8 text-center">
                    <p className="text-sm text-indigo-100 tracking-wide">© 2024 Food Zaika. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer




