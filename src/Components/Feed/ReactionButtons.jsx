import React from 'react';

const reactions = [
  { 
    name: 'Like', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#0a66c2"/>
      </svg>
    ), 
    color: '#0a66c2' 
  },
  { 
    name: 'Celebrate', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-12h-2v6h2V8zm0 8h-2v2h2v-2z" fill="#068139"/>
      </svg>
    ), 
    color: '#068139' 
  },
  { 
    name: 'Support', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 6h2v6h-2zm0 8h2v2h-2z" fill="#693896"/>
      </svg>
    ), 
    color: '#693896' 
  },
  { 
    name: 'Love', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e02835"/>
      </svg>
    ), 
    color: '#e02835' 
  },
  { 
    name: 'Insightful', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-12h-2v6h2V8zm0 8h-2v2h2v-2z" fill="#f7c948"/>
      </svg>
    ), 
    color: '#f7c948' 
  },
  { 
    name: 'Funny', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-12h-2v6h2V8zm0 8h-2v2h2v-2z" fill="#f28c38"/>
      </svg>
    ), 
    color: '#f28c38' 
  }
];

const ReactionButtons = () => {
  return (
    <div>
      {reactions.map((reaction, index) => (
        <button 
          key={index} 
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: reaction.color,
            border: 'none',
            borderRadius: '5px',
            padding: '10px',
            margin: '5px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <div style={{ marginRight: '8px' }}>
            {reaction.icon}
          </div>
          {reaction.name}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
