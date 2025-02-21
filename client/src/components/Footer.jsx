import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-lg font-bold">BABU88 | দক্ষিণ এশিয়ায় বিশ্বস্ত অনলাইন ক্যাসিনো | বাংলাদেশ, ভারত, নেপাল, শ্রীলঙ্কা</h2>
            <p className="text-sm mt-2">
              BABU88 হল একটি অনলাইন বাজি কোম্পানি, যা বিভিন্ন পরিচিত বাজি এবং ক্যাসিনো বিস্তৃতির অংশ।
            </p>
            <img
              src="https://www.babu88h.com/static/image/footer/babu88-official.png"
              alt="Babu88 Official"
              className="mt-4 w-32"
            />
          </div>
          {/* Middle Section */}
          <div>
            <h2 className="text-lg font-bold">অফিসিয়াল পার্টনার এবং স্পন্সর</h2>
            <div className="flex space-x-4 mt-4">
              <img src="https://www.babu88h.com/static/image/footer/partner1.png" alt="Partner 1" className="w-20" />
              <img src="https://www.babu88h.com/static/image/footer/partner2.png" alt="Partner 2" className="w-20" />
              <img src="https://www.babu88h.com/static/image/footer/partner3.png" alt="Partner 3" className="w-20" />
            </div>
          </div>
          {/* Right Section */}
          <div>
            <h2 className="text-lg font-bold">আমাদের অনুসরণ করুন</h2>
            <div className="flex space-x-4 mt-4">
              <img src="https://www.babu88h.com/static/svg/hover_btm-fb.svg" alt="Facebook" className="w-8" />
              <img src="https://www.babu88h.com/static/svg/hover_btm-ig.svg" alt="Instagram" className="w-8" />
              <img src="https://www.babu88h.com/static/svg/hover_btm-yt.svg" alt="YouTube" className="w-8" />
            </div>
            <h2 className="text-lg font-bold mt-4">মূল্যপরিশোধ পদ্ধতি</h2>
            <div className="flex space-x-4 mt-4">
              <img src="https://www.babu88h.com/static/image/footer/icon_footer_bkash_colour.svg" alt="Bkash" className="w-16" />
              <img src="https://www.babu88h.com/static/image/footer/icon_footer_nagad_colour.svg" alt="Nagad" className="w-16" />
              <img src="https://www.babu88h.com/static/image/footer/icon_footer_rocket_colour.svg" alt="Rocket" className="w-16" />
              <img src="https://www.babu88h.com/static/image/footer/icon_footer_upay_colour.svg" alt="Upay" className="w-16" />
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
          কপিরাইট © 2025 | ব্র্যান্ড | সমস্ত অধিকার সংরক্ষিত
        </div>
      </div>
    </footer>
  );
};

export default Footer;