import compImg1 from '../../Assests/Images/competition1.jpg';
import compImg2 from '../../Assests/Images/competition2.jpg';
import compImg3 from '../../Assests/Images/competition3.jpg';
import compImg4 from '../../Assests/Images/competition1.jpg';
import compImg5 from '../../Assests/Images/competition2.jpg';
import compImg6 from '../../Assests/Images/competition3.jpg';
import courseImg1 from '../../Assests/Images/profile-img1.png';
import courseImg2 from '../../Assests/Images/profile-img2.png';
import courseImg3 from '../../Assests/Images/profile-img3.png';
import courseImg4 from '../../Assests/Images/course-4.png';
import courseImg5 from '../../Assests/Images/course-5.png';
import courseImg6 from '../../Assests/Images/course-6.png';

const competitions = [
  {
    id: 1,
    title: 'UI/UX DESIGN CHALLENGE',
    subtitle: 'UI/UX Design Challenge 2025',
    description: 'Participate in an industry-led design challenge to showcase your creative skills and win exciting reward.',
    deadline: 'Apr 25',
    prize: '10,000',
    level: 'Intermediate',
    daysLeft: 2,
    applied: 84,
    image: compImg1,
    logo: courseImg1,
    isFree: true,
    isOnline: true,
  },
  {
    id: 2,
    title: 'UI/UX DESIGN PRINCIPLES',
    subtitle: 'UI/UX Design Challenge 2025',
    description: 'Participate in an industry-led design challenge to showcase your creative skills and win exciting reward.',
    deadline: 'Apr 25',
    prize: '10,000',
    level: 'Intermediate',
    daysLeft: 2,
    applied: 84,
    image: compImg2,
    logo: courseImg2,
    isFree: true,
    isOnline: true,
  },
  {
    id: 3,
    title: 'DATA ANALYTICS CHALLENGE',
    subtitle: 'Analytics Pro 2025',
    description: 'Showcase your data skills and win prizes in this analytics challenge.',
    deadline: 'May 10',
    prize: '15,000',
    level: 'Advanced',
    daysLeft: 10,
    applied: 120,
    image: compImg3,
    logo: courseImg3,
    isFree: false,
    isOnline: true,
    price: '1499',
  },
  {
    id: 4,
    title: 'HACKATHON 2025',
    subtitle: 'Global Hackathon',
    description: 'Join the global hackathon and solve real-world problems.',
    deadline: 'May 20',
    prize: '20,000',
    level: 'Beginner',
    daysLeft: 15,
    applied: 200,
    image: compImg4,
    logo: courseImg4,
    isFree: true,
    isOnline: false,
  },
  {
    id: 5,
    title: 'BUSINESS PLAN CONTEST',
    subtitle: 'BizPlan 2025',
    description: 'Pitch your business idea and win funding.',
    deadline: 'Jun 1',
    prize: '25,000',
    level: 'Intermediate',
    daysLeft: 20,
    applied: 60,
    image: compImg5,
    logo: courseImg5,
    isFree: false,
    isOnline: true,
  },
  {
    id: 6,
    title: 'QUIZ MASTERS',
    subtitle: 'Quiz Masters 2025',
    description: 'Test your knowledge and win exciting prizes.',
    deadline: 'Jun 10',
    prize: '5,000',
    level: 'Beginner',
    daysLeft: 30,
    applied: 150,
    image: compImg6,
    logo: courseImg6,
    isFree: true,
    isOnline: true,
  },
];

export default competitions; 