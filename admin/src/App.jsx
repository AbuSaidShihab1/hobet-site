import { Route, Routes, useLocation,Navigate } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import AdminLogin from "./pages/AdminLogin";
import GamesTable from "./components/games/GamesTable";
import Gamelogs from "./components/games/Gamelogs";
import Activeuser from "./components/users/Activeuser";
import Pendingdeposit from "./components/depoist/Pendingdeposit";
import Pendingwithdraw from "./components/withdraw/Pendingwithdraw";
import Pendingticket from "./components/Support/Pendingticket";
import TransactionLogs from "./components/reports/TransactionLogs";
import Setting from "./components/system/Setting";
import Generalsettings from "./components/settings/Generalsettings";
import Reportsandrequest from "./components/request/Reportsandrequest";
import LogoFaviconUploader from "./components/system/LogoFaviconUploader";
import Configuration from "./components/system/Configuration";
import SEOConfig from "./components/system/SEOConfig";
import NotificationTemplates from "./components/system/NotificationTemplates";
import RobotsTxtForm from "./components/system/RobotsTxtForm";
import UserDetail from "./components/users/userdetails/UserDetail";
import Banneduserdetail from "./components/users/banneduser/Banneduserdetail";
import Banneduser from "./components/users/Banneduser";
import Alluser from "./components/users/Alluser";
import NotificationPage from "./components/users/NotificationPage";
import DepositRequest from "./components/depoist/deposit_details/DepositRequest";

function App() {
	const location = useLocation();
	const hideSidebar = location.pathname === "/hobet-admin-login";
	const isAdminAuthenticated = localStorage.getItem("admin");
	return (
		<div className='flex h-screen  text-gray-100 overflow-hidden'>
			{/* BG */}
			{/* <div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div> */}

			{!hideSidebar && <Sidebar />}

      <Routes>
  <Route path="/hobet-admin-login" element={<AdminLogin />} />
  
  {!isAdminAuthenticated ? (
    <Route path="*" element={<Navigate to="/hobet-admin-login" replace />} />
  ) : (
    <>
      <Route path="/" element={<OverviewPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/games" element={<GamesTable />} />
      <Route path="/games/game-log" element={<Gamelogs />} />
      {/* ----------------------users----------------------------- */}
      <Route path="/users/all-user" element={<Alluser />} />
      <Route path="/users/send-notification" element={<NotificationPage />} />
      <Route path="/users/active-user" element={<Activeuser />} />
      <Route path="/users/banned-user" element={<Banneduser />} />
      <Route path="/users/user-detail/:id" element={<UserDetail />} />
      <Route path="/users/banned-user-detail/:id" element={<Banneduserdetail />} />

      {/* ----------------------users----------------------------- */}

      {/* ---------------------deposit-------------------------- */}
      <Route path="/deposits/pending-deposit" element={<Pendingdeposit />} />
      <Route path="/deposits/pending-deposit-details/:id" element={<DepositRequest />} />
      {/* ---------------------deposit-------------------------- */}

      <Route path="/withdrawals/pending-withdrawal" element={<Pendingwithdraw />} />
      <Route path="/supports/pending-support" element={<Pendingticket />} />
      <Route path="/reports/transaction-history" element={<TransactionLogs />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/request-reports" element={<Reportsandrequest />} />
      <Route path="/settings/general-settings" element={<Generalsettings />} />
      <Route path="/settings/logo-icon" element={<LogoFaviconUploader />} />
      <Route path="/settings/system-config" element={<Configuration />} />
      <Route path="/settings/seo-config" element={<SEOConfig />} />
      <Route path="/settings/notification" element={<NotificationTemplates />} />
      <Route path="/settings/robot-text" element={<RobotsTxtForm />} />
    </>
  )}
</Routes>

		</div>
	);
}

export default App;
