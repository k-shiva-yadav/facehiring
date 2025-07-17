import React, { useState, useContext, useEffect } from 'react';
import { PostContext } from '../../Context/PostContext';
import { useAuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Comments from '../Comments/Comments';
import './post.css';
import {
  FaRegThumbsUp,
  FaRegComment,
  FaRetweet,
  FaRegPaperPlane,
  FaEllipsisH,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

const Post = ({
  id,
  author,
  content,
  images = [],
  videos = [],
  engagement = {},
  timeAgo,
  isPromoted,
  userReaction,
  reactions: initialReactions = [],
  onDeletePost,
  onEditPost,
  loading = false,
}) => {
  const { user } = useAuthContext();
  const { handleReaction, addReaction, fetchPostReactions } = useContext(PostContext);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showReactionBar, setShowReactionBar] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(engagement.comments || 0);
  const [showOptions, setShowOptions] = useState(false);
  const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState(false);
  const [postReactions, setPostReactions] = useState(initialReactions);
  const [currentUserReaction, setCurrentUserReaction] = useState(userReaction || null);
  const [isLoading, setIsLoading] = useState(loading);
  const [isVisible, setIsVisible] = useState(true); // For X/close button

  const allMedia = [
    ...images.map((url) => ({ type: 'image', url })),
    ...videos.map((url) => ({ type: 'video', url })),
  ];

  const reactions = [
    { name: 'like', icon: '👍', label: 'Like', color: '#0a66c2' },
    { name: 'love', icon: '❤️', label: 'Love', color: '#e02835' },
    { name: 'celebrate', icon: '🎉', label: 'Celebrate', color: '#068139' },
    { name: 'funny', icon: '😂', label: 'Funny', color: '#f28c38' },
    { name: 'insightful', icon: '💡', label: 'Insightful', color: '#f7c948' },
    { name: 'sad', icon: '😢', label: 'Sad', color: '#693896' },
  ];

  const loadPostReactions = async () => {
    try {
      const response = await fetchPostReactions(id);
      if (response?.responseCode === 1) {
        setPostReactions(response.reactions || []);
        if (response.alreadyReacted) {
          const reaction = reactions.find((r) => r.icon === response.reactionSymbol);
          if (reaction) {
            setCurrentUserReaction({
              name: reaction.name,
              symbol: reaction.icon,
            });
          }
        } else {
          setCurrentUserReaction(null);
        }
      }
    } catch (error) {
      console.error('Error loading reactions:', error);
    }
  };

  useEffect(() => {
    if (userReaction) {
      setCurrentUserReaction(userReaction);
    }
    if (engagement.likes > 0) {
      loadPostReactions();
    }
  }, [id, userReaction, engagement.likes]);

  const handleReactionClick = async (reactionName) => {
    if (!user) {
      toast.error('Please log in to react to posts');
      return;
    }

    setIsReacting(true);
    try {
      let success = false;

      if (currentUserReaction?.name === reactionName) {
        // Remove reaction
        success = await handleReaction(id, null);
        if (success) {
          setCurrentUserReaction(null);
          setPostReactions((prev) => prev.filter((r) => r.user.userId !== user.userId));
        }
      } else {
        // Add or update reaction
        success = currentUserReaction
          ? await handleReaction(id, reactionName)
          : await addReaction(id, reactionName);
        if (success) {
          const newReaction = reactions.find((r) => r.name === reactionName);
          setCurrentUserReaction({
            name: reactionName,
            symbol: newReaction.icon,
          });
          // Update reactions list
          setPostReactions((prev) => {
            const updatedReactions = prev.filter((r) => r.user.userId !== user.userId);
            return [
              ...updatedReactions,
              {
                reactionSymbol: newReaction.icon,
                user: {
                  userId: user.userId,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  profileimage: user.imageFile,
                },
                timeAgo: 'just now',
              },
            ];
          });
        }
      }

      if (success) {
        await loadPostReactions();
      }
    } catch (error) {
      toast.error('Failed to update reaction');
    } finally {
      setIsReacting(false);
      setShowReactionBar(false);
    }
  };

  const handleLikeButtonClick = () => {
    if (currentUserReaction) {
      handleReactionClick(currentUserReaction.name);
    } else {
      setShowReactionBar(true);
    }
  };

  const renderMediaItem = (item, index) => {
    if (item.type === 'image') {
      return (
        <img
          key={index}
          src={item.url.startsWith('http') ? item.url : `${item.url}`}
          alt="Post content"
          className="post-media"
          onError={(e) => {
            e.target.src = defaultProfileFallback;
          }}
        />
      );
    } else {
      return (
        <div key={index} className="video-wrapper">
          {!isVideoPlaying ? (
            <>
              <video className="post-media" src={item.url} />
              <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
                <FaPlay />
              </button>
            </>
          ) : (
            <video
              controls
              autoPlay
              className="post-media"
              src={item.url}
              onEnded={() => setIsVideoPlaying(false)}
            />
          )}
        </div>
      );
    }
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
    setIsVideoPlaying(false);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
    setIsVideoPlaying(false);
  };

  const toggleComments = () => {
    if (!user) {
      toast.error('Please log in to view comments');
      return;
    }
    setShowComments(!showComments);
  };

  const handleNewComment = () => {
    setCommentsRefreshTrigger((prev) => !prev);
    setCommentCount((prev) => prev + 1);
  };

  if (!isVisible) return null;
  return (
    <Card className={`linkedin-post ${isPromoted ? 'promoted-post' : ''}`}>
      <div className="post-top-bar-row">
        <span className="suggested-label">Suggested</span>
        <div className="post-top-actions">
          <div className="post-options">
            <button className="options-btn" onClick={() => setShowOptions(!showOptions)} title="More options">
              <FaEllipsisH />
            </button>
            {showOptions && (
              <div className="options-dropdown">
                {user?.userId === author.id && <button onClick={() => onEditPost(id)}>Edit Post</button>}
                {user?.userId === author.id && <button onClick={() => onDeletePost(id)}>Delete Post</button>}
                <button onClick={() => setIsVisible(false)}>Hide this post</button>
                <button onClick={() => setShowOptions(false)}>Cancel</button>
              </div>
            )}
          </div>
          <button className="post-dismiss-btn" onClick={() => setIsVisible(false)} title="Hide post">×</button>
        </div>
      </div>
      {/* The rest of the post content comes below this bar */}
      <div className="post-header">
          <div className="post-header-left">
            <img
              src={author.avatar || defaultProfileFallback}
              alt={author.name}
              className="post-avatar"
              onError={(e) => (e.target.src = defaultProfileFallback)}
            />
            <div className="post-author-info">
              <h4 className="post-author-name">{author.name}</h4>
              <p className="post-author-title">{author.title}</p>
              <span className="post-time">{timeAgo}</span>
              {isPromoted && <span className="promoted-tag">Promoted</span>}
            </div>
          </div>
        </div>

        <div className="post-content">
          <p>{content}</p>
        </div>

        {allMedia.length > 0 && (
          <div className="post-media-container">
            {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

            {allMedia.length > 1 && (
              <>
                <button className="carousel-nav prev" onClick={prevMedia}>
                  <FaChevronLeft />
                </button>
                <button className="carousel-nav next" onClick={nextMedia}>
                  <FaChevronRight />
                </button>
                <div className="media-indicators">
                  {allMedia.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentMediaIndex(index);
                        setIsVideoPlaying(false);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="post-stats">
          {(engagement.likes > 0 || commentCount > 0) && (
            <div className="stats-container">
              {engagement.likes > 0 && (
                <div className="likes-display" onClick={() => setShowReactionsModal(true)}>
                  <div className="like-icons">
                    {postReactions.slice(0, 3).map((reaction, index) => (
                      <div key={index} className="like-icon-container">
                        <span className="reaction-badge">{reaction.reactionSymbol}</span>
                        <img
                          src={reaction.user.profileimage || defaultProfileFallback}
                          alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
                          className={`like-avatar ${index > 0 ? 'stacked' : ''}`}
                          onError={(e) => (e.target.src = defaultProfileFallback)}
                        />
                      </div>
                    ))}
                  </div>
                  <span className="like-text">
                    {postReactions[0]?.user.firstName}
                    {postReactions.length > 1 && ` and ${postReactions.length - 1} others`}
                  </span>
                </div>
              )}
              {commentCount > 0 && (
                <span className="stat-item clickable" onClick={toggleComments}>
                  {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="post-actions">
          <div
            className="reaction-container"
            onMouseEnter={() => setShowReactionBar(true)}
            onMouseLeave={() => setShowReactionBar(false)}
          >
            <button
              className={`post-action-btn ${currentUserReaction ? 'active-reaction' : ''}`}
              onClick={handleLikeButtonClick}
              disabled={isReacting}
            >
              {currentUserReaction ? (
                <>
                  <span className="reaction-emoji">{currentUserReaction.symbol}</span>
                  <span className="reaction-label">
                    {reactions.find((r) => r.name === currentUserReaction.name)?.label}
                  </span>
                </>
              ) : (
                <>
                  <FaRegThumbsUp /> Like
                </>
              )}
            </button>

            {showReactionBar && (
              <div className="reaction-bar">
                {reactions.map((reaction) => (
                  <button
                    key={reaction.name}
                    className={`reaction-button ${currentUserReaction?.name === reaction.name ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReactionClick(reaction.name);
                    }}
                    title={reaction.label}
                    style={{ color: reaction.color }}
                  >
                    {reaction.icon}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="post-action-btn" onClick={toggleComments}>
            <FaRegComment /> Comment
          </button>
          <button className="post-action-btn">
            <FaRetweet /> Repost
          </button>
          <button className="post-action-btn">
            <FaRegPaperPlane /> Send
          </button>
        </div>

        {showComments && (
          <div className="post-comments-section">
            <Comments
              postId={id}
              refreshTrigger={commentsRefreshTrigger}
              onNewComment={handleNewComment}
            />
          </div>
        )}

        {showReactionsModal && (
          <div className="reactions-modal">
            <div className="modal-content">
              <h3>Reactions</h3>
              <button className="close-modal" onClick={() => setShowReactionsModal(false)}>
                ×
              </button>
              <div className="reactions-list">
                {postReactions.map((reaction) => (
                  <div key={reaction.id} className="reaction-item">
                    <img
                      src={reaction.user.profileimage || defaultProfileFallback}
                      alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
                      className="reaction-user-avatar"
                      onError={(e) => (e.target.src = defaultProfileFallback)}
                    />
                    <div className="reaction-user-info">
                      <span>
                        {reaction.user.firstName} {reaction.user.lastName}
                      </span>
                      <span className="reaction-symbol">{reaction.reactionSymbol}</span>
                      <span className="reaction-time">{reaction.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </Card>
  );
};

export default Post;