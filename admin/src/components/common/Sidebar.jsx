import { BarChart2, DollarSign, Menu, Settings, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoGameController, IoTicketOutline, IoBugOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/",
	},
	{
		name: "Manage Games",
		icon: IoGameController,
		color: "#8B5CF6",
		submenu: [
			{ name: "Games", href: "/games" },
			{ name: "Games Log", href: "/games/game-log" },
		],
	},
	{ name: "Manage Users", icon: Users, color: "#EC4899", href: "/users",submenu: [
		{ name: "Active Users", href: "/users/active-user" },
		{ name: "Banned Users", href: "/games/slog" },
		{ name: "Email Unverified", href: "/games/slog" },
		{ name: "Mobile Unverified", href: "/games/slog" },
		{ name: "With Balance", href: "/games/slog" },
		{ name: "All Users", href: "/games/slog" },
		{ name: "Send Notification", href: "/games/slog" },
	],},
	{ name: "Deposits", icon: DollarSign, color: "#10B981", href: "/deposits",submenu: [
		{ name: "Pending Deposits", href: "/deposits/pending-deposit" },
		{ name: "Approved Deposits", href: "/games/slog" },
		{ name: "Successful Deposits", href: "/games/slog" },
		{ name: "Mobile Unverified", href: "/games/slog" },
		{ name: "Rejected Deposits", href: "/games/slog" },
		{ name: "All Deposits", href: "/games/slog" },
	] },
	{ name: "Withdrawal", icon: FaRegCreditCard, color: "#F59E0B", href: "/withdrwals" ,submenu: [
		{ name: "Pending Withdrawals", href: "/withdrawals/pending-withdrawal" },
		{ name: "Approved Withdrawals", href: "/games/slog" },
		{ name: "Rejected Withdrawals", href: "/games/slog" },
		{ name: "All Withdrawals", href: "/games/slog" },
	]},
	{ name: "Reports", icon: TbReportAnalytics, color: "#a55eea", href: "/reports",submenu: [
		{ name: "Transaction History", href: "/reports/transaction-history" },
		{ name: "Login History", href: "/games/slog" },
		{ name: "Notification History", href: "/games/slog" },
	]  },
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	{ name: "Support Tickets", icon: IoTicketOutline, color: "#2bcbba", href: "/supports",submenu: [
		{ name: "Pending Ticket", href: "/supports/pending-support" },
		{ name: "Closed Ticket", href: "/games/slog" },
		{ name: "Answered Ticket", href: "/games/slog" },
		{ name: "All Ticket", href: "/games/slog" },
	] },
	{ name: "System Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
	{ name: "Reports & Request", icon: IoBugOutline, color: "#eb3b5a", href: "/request-reports" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [openSubmenus, setOpenSubmenus] = useState({});

	const toggleSubmenu = (index) => {
		setOpenSubmenus((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full overflow-y-auto bg-[#071251] custom-scrollbar backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<div className='flex justify-between items-center'>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className='p-[10px] rounded-full hover:bg-[#4634FF]  transition-colors max-w-fit'
					>
						<Menu size={24} />
					</motion.button>
					<div className='py-4 px-4 sm:px-6 lg:px-8'>
			<div className="relative text-[30px] font-extrabold flex items-center tracking-wide ">
        <span className="text-bg5 drop-shadow-lg">H</span>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-2 animate-spin">
        <circle cx="12" cy="12" r="10" stroke="#FFC312" strokeWidth="2" />
        <polygon points="10,8 14,12 10,16" fill="#F79F1F" />
        </svg>
        <span className="text-white drop-shadow-lg">BET</span>
      </div>
			</div>
				</div>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item, index) => (
						<div key={index}>
							{item.submenu ? (
								<div>
									<div
										onClick={() => toggleSubmenu(index)}
										className='flex items-center px-[10px] py-[10px] text-sm font-medium rounded-lg hover:bg-[#4634FF] transition-colors mb-2 cursor-pointer'
									>
										<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
										<AnimatePresence>
											{isSidebarOpen && (
												<motion.span className='ml-4 whitespace-nowrap'>{item.name}</motion.span>
											)}
										</AnimatePresence>
										<motion.div
											className='ml-auto'
											animate={{ rotate: openSubmenus[index] ? 180 : 0 }}
										>
											<IoChevronDown size={16} />
										</motion.div>
									</div>

									<AnimatePresence>
										{openSubmenus[index] && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												className='ml-8'
											>
												{item.submenu.map((sub, subIndex) => (
													<Link key={subIndex} to={sub.href} className='block p-2 text-sm text-gray-400 hover:text-white'>
														{sub.name}
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							) : (
								<Link to={item.href} className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#4634FF] transition-colors mb-2'>
									<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
									{isSidebarOpen && <span className='ml-4'>{item.name}</span>}
								</Link>
							)}
						</div>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
