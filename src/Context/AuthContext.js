// // // src/Context/AuthContext.js
// // import { createContext, useContext, useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const formatImageUrl = (url) => {
// //     if (!url) return null;
// //     if (url.startsWith('http')) return url;
// //     return `https://facehiringapi.codingster.in/DisplayImages/Images/${url}`;
// //   };

// //   const fetchUserData = async (userId, token) => {
// //     try {
// //       const response = await axios.get(
// //         `https://facehiringapi.codingster.in/User/GetUserCareerProfileWithInfo/${userId}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       if (response.data.responseCode === 1) {
// //         const userData = response.data.data.user;
// //         return {
// //           ...userData,
// //           imageFile: formatImageUrl(userData.imageFile),
// //           id: userId // Ensure id is always set
// //         };
// //       }
// //       return null;
// //     } catch (error) {
// //       console.error("Error fetching user:", error);
// //       return null;
// //     }
// //   };

// //   const verifyAuth = async () => {
// //     const token = localStorage.getItem("token");
// //     const userId = localStorage.getItem("userId");

// //     if (!token || !userId) {
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const userData = await fetchUserData(userId, token);
// //       if (userData) {
// //         setUser(userData);
// //       } else {
// //         clearAuth();
// //       }
// //     } catch (error) {
// //       console.error("Auth verification error:", error);
// //       clearAuth();
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const clearAuth = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("userId");
// //     setUser(null);
// //   };

// //   useEffect(() => {
// //     verifyAuth();
// //   }, []);

// //   const login = async (userData, token, userId) => {
// //     localStorage.setItem("token", token);
// //     localStorage.setItem("userId", userId);
// //     const fullUserData = await fetchUserData(userId, token);
// //     setUser(fullUserData || {
// //       ...userData,
// //       imageFile: formatImageUrl(userData.imageFile)
// //     });
// //   };

// //   const logout = () => {
// //     clearAuth();
// //     toast.success("Logged out successfully");
// //     window.location.href = "/";
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         loading,
// //         login,
// //         logout,
// //         setUser,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuthContext = () => useContext(AuthContext);

// // src/Context/AuthContext.js
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [networkData, setNetworkData] = useState({
//     connections: [],
//     recommendations: [],
//     pendingRequests: [],
//     sentRequests: []
//   });

//   const formatImageUrl = (url) => {
//     if (!url) return null;
//     if (url.startsWith('http')) return url;
//     return `https://facehiringapi.codingster.in/DisplayImages/Images/${url}`;
//   };

//   const fetchUserData = async (userId, token) => {
//     try {
//       const response = await axios.get(
//         `https://facehiringapi.codingster.in/User/GetUserCareerProfileWithInfo/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.responseCode === 1) {
//         const userData = response.data.data.user;
//         return {
//           ...userData,
//           imageFile: formatImageUrl(userData.imageFile),
//           id: userId
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       return null;
//     }
//   };

//   // Network related functions
//   const fetchConnections = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "https://facehiringapi.codingster.in/api/Connections/GetConnections",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       if (response.data.responseCode === 1) {
//         const formattedConnections = response.data.data.map(conn => ({
//           ...conn,
//           user: {
//             ...conn.user,
//             imageFile: formatImageUrl(conn.user.imageFile)
//           }
//         }));
//         setNetworkData(prev => ({ ...prev, connections: formattedConnections }));
//       }
//     } catch (error) {
//       console.error("Error fetching connections:", error);
//     }
//   };

//   const fetchRecommendations = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "https://facehiringapi.codingster.in/api/Connections/GetRecomendations?skip=0&take=10",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       if (response.data.responseCode === 1) {
//         const formattedRecs = response.data.recommendations.map(rec => ({
//           ...rec,
//           imageFile: formatImageUrl(rec.imageFile)
//         }));
//         setNetworkData(prev => ({ ...prev, recommendations: formattedRecs }));
//       }
//     } catch (error) {
//       console.error("Error fetching recommendations:", error);
//     }
//   };

//   const fetchPendingRequests = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "https://facehiringapi.codingster.in/api/Connections/GetPendingRequests",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       if (response.data.responseCode === 1) {
//         setNetworkData(prev => ({ ...prev, pendingRequests: response.data.data }));
//       }
//     } catch (error) {
//       console.error("Error fetching pending requests:", error);
//     }
//   };

//   const sendConnectionRequest = async (userId, connectionId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "https://facehiringapi.codingster.in/api/Connections/SendRequest",
//         {
//           userId,
//           connectionId,
//           isSent: true,
//           isReceive: false,
//           isAccepted: false,
//           isRejected: false
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("Connection request sent");
//       fetchRecommendations();
//     } catch (error) {
//       console.error("Error sending connection request:", error);
//       toast.error("Failed to send connection request");
//     }
//   };

//   const respondToRequest = async (connectionId, accept) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "https://facehiringapi.codingster.in/api/Connections/RespondToRequest",
//         {
//           connectionId,
//           accept
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       if (accept) {
//         toast.success("Connection request accepted");
//       } else {
//         toast.success("Connection request rejected");
//       }
      
//       fetchPendingRequests();
//       fetchConnections();
//     } catch (error) {
//       console.error("Error responding to request:", error);
//       toast.error("Failed to process request");
//     }
//   };

//   const cancelRequest = async (connectionId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "https://facehiringapi.codingster.in/api/Connections/RespondToRequest",
//         {
//           connectionId,
//           accept: false
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("Request cancelled");
//       fetchRecommendations();
//     } catch (error) {
//       console.error("Error cancelling request:", error);
//       toast.error("Failed to cancel request");
//     }
//   };

//   const verifyAuth = async () => {
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     if (!token || !userId) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const userData = await fetchUserData(userId, token);
//       if (userData) {
//         setUser(userData);
//         // Fetch network data after user is authenticated
//         await Promise.all([
//           fetchConnections(),
//           fetchRecommendations(),
//           fetchPendingRequests()
//         ]);
//       } else {
//         clearAuth();
//       }
//     } catch (error) {
//       console.error("Auth verification error:", error);
//       clearAuth();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearAuth = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     setUser(null);
//   };

//   useEffect(() => {
//     verifyAuth();
//   }, []);

//   const login = async (userData, token, userId) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("userId", userId);
//     const fullUserData = await fetchUserData(userId, token);
//     setUser(fullUserData || {
//       ...userData,
//       imageFile: formatImageUrl(userData.imageFile)
//     });
//   };

//   const logout = () => {
//     clearAuth();
//     toast.success("Logged out successfully");
//     window.location.href = "/";
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         logout,
//         setUser,
//         networkData,
//         sendConnectionRequest,
//         respondToRequest,
//         cancelRequest,
//         fetchConnections,
//         fetchRecommendations,
//         fetchPendingRequests
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkData, setNetworkData] = useState({
    connections: [],
    recommendations: [],
    pendingRequests: [],
    sentRequests: [],
  });
  const [pagination, setPagination] = useState({
    connections: { page: 1, total: 0 },
    recommendations: { page: 1, total: 0 },
    pendingRequests: { page: 1, total: 0 },
  });

  const formatImageUrl = (url) => {
    if (!url) return "https://placehold.co/150x150";
    if (url.startsWith("http")) return url;
    if (url.startsWith("D:\\") || url.startsWith("C:\\")) {
      return "https://placehold.co/150x150";
    }
    return `https://facehiringapi.codingster.in/DisplayImages/Images/${url}`;
  };

  const fetchUserData = async (userId, token) => {
    try {
      const response = await axios.get(
        `https://facehiringapi.codingster.in/User/GetUserCareerProfileWithInfo/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.responseCode === 1) {
        const userData = response.data.data.user;
        return {
          ...userData,
          imageFile: formatImageUrl(userData.imageFile),
          id: userId,
        };
      }
      toast.error("Failed to fetch user data");
      return null;
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Error fetching user data");
      return null;
    }
  };

  const fetchConnections = async (page = 1, pageSize = 10) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://facehiringapi.codingster.in/api/Connections/GetConnections?page=${page}&pageSize=${pageSize}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.responseCode === 1) {
        const formattedConnections = response.data.data.map((conn) => ({
          ...conn,
          user: {
            ...conn.user,
            imageFile: formatImageUrl(conn.user.imageFile),
            fullName: conn.user.fullname || conn.user.fullName,
          },
        }));
        setNetworkData((prev) => ({
          ...prev,
          connections: formattedConnections,
          sentRequests: formattedConnections.filter((c) => c.isSent && !c.isAccepted),
        }));
        setPagination((prev) => ({
          ...prev,
          connections: { page, total: response.data.total || formattedConnections.length },
        }));
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
      toast.error("Failed to fetch connections");
    }
  };

  const fetchRecommendations = async (page = 1, pageSize = 100) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://facehiringapi.codingster.in/api/Connections/GetRecomendations?skip=${(page - 1) * pageSize}&take=${pageSize}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.responseCode === 1) {
        const formattedRecs = response.data.recommendations.map((rec) => ({
          ...rec,
          imageFile: formatImageUrl(rec.imageFile),
        }));
        setNetworkData((prev) => ({ ...prev, recommendations: formattedRecs }));
        setPagination((prev) => ({
          ...prev,
          recommendations: { page, total: response.data.total || formattedRecs.length },
        }));
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast.error("Failed to fetch recommendations");
    }
  };

  const fetchPendingRequests = async (page = 1, pageSize = 100) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://facehiringapi.codingster.in/api/Connections/GetPendingRequests`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.responseCode === 1) {
        const formattedRequests = response.data.data.map((req) => ({
          id: req.connectionId,
          requestId: req.requestId,
          userId: req.senderId,
          user: {
            id: req.sender.id,
            fullName: req.sender.fullname,
            imageFile: formatImageUrl(req.sender.imageFile),
            email: req.sender.email || "N/A",
          },
        }));
        setNetworkData((prev) => ({ ...prev, pendingRequests: formattedRequests }));
        setPagination((prev) => ({
          ...prev,
          pendingRequests: { page, total: response.data.total || formattedRequests.length },
        }));
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      toast.error("Failed to fetch pending requests");
    }
  };

  const sendConnectionRequest = async (userId, connectionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://facehiringapi.codingster.in/api/Connections/SendRequest",
        { userId, connectionId, isSent: true, isReceive: false, isAccepted: false, isRejected: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Connection request sent");
      setNetworkData((prev) => ({
        ...prev,
        sentRequests: [
          ...prev.sentRequests,
          {
            id: `temp-${Date.now()}`,
            userId,
            connectionId,
            isSent: true,
            isAccepted: false,
            user: prev.recommendations.find((r) => r.id === connectionId),
          },
        ],
        recommendations: prev.recommendations.filter((r) => r.id !== connectionId),
      }));
      fetchRecommendations();
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast.error("Failed to send connection request");
    }
  };

  const respondToRequest = async (connectionId, accept) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://facehiringapi.codingster.in/api/Connections/RespondToRequest",
        { connectionId, accept },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(accept ? "Connection request accepted" : "Connection request rejected");
      setNetworkData((prev) => ({
        ...prev,
        pendingRequests: prev.pendingRequests.filter((req) => req.id !== connectionId),
        connections: accept
          ? [
              ...prev.connections,
              {
                id: connectionId,
                userId: user.id,
                connectionId: prev.pendingRequests.find((req) => req.id === connectionId)?.userId,
                isSent: false,
                isAccepted: true,
                user: prev.pendingRequests.find((req) => req.id === connectionId)?.user,
              },
            ]
          : prev.connections,
      }));
      fetchPendingRequests();
      fetchConnections();
    } catch (error) {
      console.error("Error responding to request:", error);
      toast.error("Failed to process request");
    }
  };

  const cancelRequest = async (connectionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://facehiringapi.codingster.in/api/Connections/RespondToRequest",
        { connectionId, accept: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Request cancelled");
      setNetworkData((prev) => ({
        ...prev,
        sentRequests: prev.sentRequests.filter((req) => req.id !== connectionId),
      }));
      fetchConnections();
      fetchRecommendations();
    } catch (error) {
      console.error("Error cancelling request:", error);
      toast.error("Failed to cancel request");
    }
  };

  const removeConnection = async (connectionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://facehiringapi.codingster.in/api/Connections/RemoveConnection/${connectionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Connection removed");
      setNetworkData((prev) => ({
        ...prev,
        connections: prev.connections.filter((conn) => conn.id !== connectionId),
      }));
      fetchConnections();
    } catch (error) {
      console.error("Error removing connection:", error);
      toast.error("Failed to remove connection");
    }
  };

  const searchUsers = async (query, page = 1, pageSize = 10) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://facehiringapi.codingster.in/api/Connections/SearchUsers?query=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.responseCode === 1) {
        return response.data.data.map((user) => ({
          ...user,
          imageFile: formatImageUrl(user.imageFile),
          fullName: user.fullname || user.fullName,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Failed to search users");
      return [];
    }
  };

  const verifyAuth = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      setLoading(false);
      return;
    }
    try {
      const userData = await fetchUserData(userId, token);
      if (userData) {
        setUser(userData);
        await Promise.all([fetchConnections(), fetchRecommendations(), fetchPendingRequests()]);
      } else {
        clearAuth();
      }
    } catch (error) {
      console.error("Auth verification error:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        clearAuth();
      }
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    setNetworkData({
      connections: [],
      recommendations: [],
      pendingRequests: [],
      sentRequests: [],
    });
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const login = async (userData, token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    const fullUserData = await fetchUserData(userId, token);
    setUser(fullUserData || { ...userData, imageFile: formatImageUrl(userData.imageFile) });
    await Promise.all([fetchConnections(), fetchRecommendations(), fetchPendingRequests()]);
  };

  const logout = () => {
    clearAuth();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser,
        networkData,
        pagination,
        sendConnectionRequest,
        respondToRequest,
        cancelRequest,
        removeConnection,
        searchUsers,
        fetchConnections,
        fetchRecommendations,
        fetchPendingRequests,
        formatImageUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);