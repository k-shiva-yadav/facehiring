import React, { useState } from 'react';
import './DiscussionForum.css';

const DiscussionForum = () => {
  const [tab, setTab] = useState('Q&A');
  const qna = [
    {
      id: 1,
      votes: 15,
      question: 'How do i request clarification on a problem?',
      meta: '1d ago',
      reply: 'Reply',
      organizer: true,
    },
    {
      id: 2,
      votes: 8,
      question: 'Will there be partial credit for incomplete solutions?',
      meta: '2d ago',
      reply: null,
      organizer: false,
    },
  ];
  const faqs = [
    { id: 1, question: 'How do I participate?', answer: 'Register and join the competition.' },
    { id: 2, question: 'What is the deadline?', answer: 'Check the rounds section for deadlines.' },
  ];
  const announcements = [
    { id: 1, text: 'Welcome to the competition! Stay tuned for updates.' },
  ];
  return (
    <div className="discussion-forum-container">
      <div className="discussion-forum-title">Discussion Forum</div>
      {/* Tabs */}
      <div className="discussion-tabs">
        {['Q&A', 'FAQs', 'Announcements'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`tab-btn ${tab === t ? 'active' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="tab-content">
        {tab === 'Q&A' && (
          <div>
            {qna.map((q, i) => (
              <div key={q.id} className="qna-item">
                <div className="qna-votes">{q.votes}</div>
                <div className="qna-main">
                  <div className="qna-question">{q.question}</div>
                  {q.reply && (
                    <div className="qna-reply">
                      <span className="reply-arrow">↳</span> {q.reply} <span className="organizer-tag">{q.organizer ? 'Organizer' : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'FAQs' && (
          <div>
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <div className="faq-question">{faq.question}</div>
                <div className="faq-answer">{faq.answer}</div>
              </div>
            ))}
          </div>
        )}
        {tab === 'Announcements' && (
          <div>
            {announcements.map((announcement) => (
              <div key={announcement.id} className="announcement-item">
                {announcement.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionForum; 