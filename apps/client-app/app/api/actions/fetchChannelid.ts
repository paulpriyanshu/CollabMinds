
// export const getChannelId = async () => {
//     if (session?.access_token) {
//       try {
//         const result = await dispatch(fetchChannelId(session.access_token));
//         if (fetchChannelId.fulfilled.match(result)) {
//           setChannel_id(result.payload.items[0]?.id || "")
//           console.log(result.payload.items[0]?.id);
//         } else {
//           console.error('Action was not fulfilled:', result);
//         }
//       } catch (error) {
//         console.error('Error dispatching fetchChannelId:', error);
//       }
//     } else {
//       console.error('Access token not available in session');
//     }
//   };