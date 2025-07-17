import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import OTP from './Components/OTP';
import ResetPassword from './Components/ResetPassword';
import UIpost from './pages/UIpost';
import { HeaderProvider } from './Context/HeaderContext';
import { FormProvider } from './Context/FormContext';
import { AuthProvider } from './Context/AuthContext';
import { PostProvider } from './Context/PostContext';
import MyNetworkPage from './Connections/MyNetworkPage';
import ProfilePage from './Components/Profile/ProfilePage';
import PostJob from './Jobs/PostJob';
import JobDescription from './Jobs/JobDescription';
import ScreeningQuestions from './Jobs/ScreeningQuestions';
import IdealQualifications from './Jobs/IdealQualifications';
import ConfirmEmail from './Jobs/ConfirmEmail';
import VerifyEmail from './Jobs/VerifyEmail';
import StartHiringAI from './Jobs/StartHiringAI';
import JobSettingsInterface from './Jobs/JobSettingsInterface';
import QualificationsInterface from "./Jobs/QualificationsInterface";
import CompetitionsPage from './Components/Competitions/CompetitionsPage';
import CompetitionRegister from './Components/Competitions/CompetitionRegister';
import MyTeam from './Components/Competitions/MyTeam';
import CompetitionProgress from './Components/Competitions/CompetitionProgress';
import TechnicalAssessment from './Components/Competitions/TechnicalAssessment';
import FileSubmission from './Components/Competitions/FileSubmission';
import ResultsLeaderboard from './Components/Competitions/ResultsLeaderboard';
import PostCompetition from './Components/Competitions/PostCompetition';
import HostCompetitionPage from './Components/Competitions/EmployerDashboardV2';
import ViewAllCompetitionsPage from './Components/Competitions/ViewAllCompetitionsPage';
import JobDashboard from './Jobs/JobDashboard';
import PostedJobs from './Jobs/PostedJobs';
import JobDetailPage from './Jobs/JobDetailPage';
import CandidatesPage from './Jobs/CandidatesPage';
import JobListings from './Jobs/JobListings';
import { JobActionsProvider } from './Context/JobActionsContext';
import PostedJobDetailPage from './Jobs/PostedJobDetailPage';
import ScrollToTop from './Components/ScrollToTop';

function App() {
  console.log("App component is rendering!");
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderProvider>
        <AuthProvider>
          <FormProvider>
            <PostProvider>
              <JobActionsProvider>
                <div className="App">
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/otp" element={<OTP />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    <Route path="/uipost" element={<UIpost />} />
                    <Route path="/network" element={<MyNetworkPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                    <Route path="/postjob" element={<PostJob />} />
                    <Route path="/job-description" element={<JobDescription />} />
                    <Route path="/screeningquestions" element={<ScreeningQuestions />} />
                    <Route path="/idealqualifications" element={<IdealQualifications />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/start-hiring-ai" element={<StartHiringAI />} />
                    <Route path="/job-settings" element={<JobSettingsInterface />} />
                    <Route path="/qualifications" element={<QualificationsInterface />} />
                    <Route path="/competitions" element={<CompetitionsPage />} />
                    <Route path="/competitions/view-all" element={<ViewAllCompetitionsPage />} />
                    <Route path="/competition/register" element={<CompetitionRegister />} />
                    <Route path="/competition/registration-success" element={<MyTeam />} />
                    <Route path="/competition/progress" element={<CompetitionProgress />} />
                    <Route path="/competition/1/assessment" element={<TechnicalAssessment />} />
                    <Route path="/competition/1/file-submission" element={<FileSubmission />} />
                    <Route path="/competition/1/leaderboard" element={<ResultsLeaderboard />} />
                    <Route path="/post-competition" element={<PostCompetition />} />
                    <Route path="/host-competition" element={<HostCompetitionPage />} />
                    <Route path="/job-dashboard" element={<JobDashboard />} />
                    <Route path="/posted-jobs" element={<PostedJobs />} />
                    <Route path="/job/:id" element={<JobDetailPage />} />
                    <Route path="/job/:id/candidates" element={<CandidatesPage />} />
                    <Route path="/joblistings" element={<JobListings />} />
                    <Route path="/posted-job/:id" element={<PostedJobDetailPage />} />
                    <Route path="/test" element={<h1>HELLO ROUTE</h1>} />
                  </Routes>
                  <Footer />
                  <ToastContainer position="top-right" autoClose={3000} />
                </div>
              </JobActionsProvider>
            </PostProvider>
          </FormProvider>
        </AuthProvider>
      </HeaderProvider>
    </BrowserRouter>
  );
}
export default App;