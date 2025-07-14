import React, { useState } from 'react';
import LeftSidebar from '../Components/Sidebar/LeftSidebar';
import { FaSearch } from 'react-icons/fa';
import { MdEdit, MdDelete, MdFileDownload } from 'react-icons/md';
import avatar1 from '../Assests/Images/profile-img1.png';
import avatar2 from '../Assests/Images/profile-img2.png';
import avatar3 from '../Assests/Images/profile-img3.png';
import avatar4 from '../Assests/Images/profile1.jpg';
import avatar5 from '../Assests/Images/profie.jpeg';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
const stageOptions = ['Applied', 'Screening', '1st Interview', '2nd Interview', 'Hiring', 'Rejected'];

// Generate 100 mock candidates
const mockCandidates = Array.from({ length: 100 }, (_, i) => ({
  name: 'Priyanka Chandra',
  email: 'priyanka123@gmail.com',
  phone: '9634587546',
  resume: 'Resume.pdf',
  date: '01/04/2025',
  stage: stageOptions[i % stageOptions.length],
  avatar: avatars[i % avatars.length],
}));

const CandidatesPage = () => {
  const [search, setSearch] = useState('');
  const [candidates, setCandidates] = useState(mockCandidates);
  const [page, setPage] = useState(1);

  // Filtered candidates (simple search by name/email/phone)
  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  // Pagination logic
  const perPage = 10;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <main className="jos-page-main-header">
      <div className="job-dashboard-container">
        <LeftSidebar />
        <div className="dashboard-main">
          <div className="candidates-container">
            <div className="posted-jobs-header d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h2 className="candidates-title">Candidates</h2>
                <div className="candidates-subtitle">Here's all candidates list</div>
              </div>
              <form className="candidates-search-bar  d-flex align-items-center" onSubmit={e => e.preventDefault()}>
                <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                </div>
                <button className="candidates-search-btn" type="submit">Search</button>
              </form>
            </div>
            <div className="candidates-table-responsive">
              <table className="candidates-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>Resume/CV</th>
                    <th>Create Date</th>
                    <th>Stages</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((c, i) => (
                    <tr key={i}>
                      <td>
                        <div className="candidates-name-cell">
                          <img src={c.avatar} alt="avatar" className="candidates-avatar" />
                          <div>
                            <div className="candidates-name">{c.name}</div>
                            <div className="candidates-email">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{c.phone}</td>
                      <td>
                        <a href="#" className="candidates-resume-link">
                          {c.resume} <MdFileDownload className="candidates-resume-icon" />
                        </a>
                      </td>
                      <td>{c.date}</td>
                      <td>
                        <select className="candidates-stage-select" value={c.stage} onChange={e => {
                          const updated = [...candidates];
                          updated[(page-1)*perPage + i].stage = e.target.value;
                          setCandidates(updated);
                        }}>
                          {stageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </td>
                      <td>
                        <MdEdit className="candidates-action-icon" title="Edit" />
                        <MdDelete className="candidates-action-icon" title="Delete" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="candidates-pagination-row">
              <span className="candidates-pagination-info">Showing {((page-1)*perPage)+1}-{Math.min(page*perPage, filtered.length)} from {filtered.length}</span>
              <div className="candidates-pagination">
                {Array.from({length: totalPages}, (_, i) => (
                  <button
                    key={i}
                    className={`candidates-pagination-btn${page === i+1 ? ' active' : ''}`}
                    onClick={() => setPage(i+1)}
                  >
                    {i+1}
                  </button>
                )).slice(0,5)}
                {totalPages > 5 && <span className="candidates-pagination-ellipsis">...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CandidatesPage; 