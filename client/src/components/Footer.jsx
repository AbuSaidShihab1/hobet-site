import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const AccordionItem = ({ title, content, slug, isOpen, toggle }) => {
  return (
    <div className="border border-gray-700 rounded-lg mb-2 bg-[#1F222F] text-white">
      <button
        className="flex justify-between w-full p-4 text-lg font-semibold"
        onClick={toggle}
      >
        {title}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-700">
          <ul className="mt-2 space-y-1 text-gray-300">
            {content.map((item, index) => (
              <li key={index}>
                <Link to={`/${slug}/${item.replace(/\s+/g, '-').toLowerCase()}`} className="hover:underline">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "Documents",
      slug: "documents",
      content: ["Terms and conditions", "Betting rules", "Privacy policy"],
    },
    {
      title: "For Clients",
      slug: "for-clients",
      content: ["Client Agreements", "Service Terms", "Support Information"],
    },
    {
      title: "Promotions",
      slug: "promotions",
      content: ["Elon Battles", "Bonus Offers", "Special Events"],
    },
  ];

  return (
    <div className=" bg-[#171924] font-bai text-white flex flex-col items-center p-8">
    
      <div className="w-full">
      <h1 className="text-[16px] xl:text-[17px] text-left font-bold mb-6">Documents</h1>
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            slug={item.slug}
            content={item.content}
            isOpen={openIndex === index}
            toggle={() => toggleAccordion(index)}
          />
        ))}
      </div>
      <footer className="mt-10 text-gray-400 text-sm text-center">
        <p>
          18+. Copyright &copy; 2023 Elon is owned by Sknet Tech Ltd., a limited
          liability company registered in Belize with company registration
          number 000042585, licensed in the State of Anjouan under the Computer
          Gaming Licensing Act 007 of 2005.
        </p>
        <p className="mt-2">
          By accessing this site, you accept that we use cookies to improve your
          experience.
        </p>
      </footer>
    </div>
  );
}
